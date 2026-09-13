"""Верификатор утверждений (§12).

Между генерацией и записью в БД стоит детерминированная проверка. Её смысл
в том, что гарантия непридумывания не должна опираться на послушание
модели: модель просят вернуть source_doc_ids, а верификатор проверяет, что
они вернулись, что такие документы существуют, что они входили в поданный
evidence set и что числа в тексте встречаются в источниках.

Утверждение, не прошедшее проверку, не исправляется и не смягчается — оно
удаляется или заменяется на «Недостаточно данных» (§12). Карточка с
выброшенным утверждением честнее карточки с недоказанным.
"""

from __future__ import annotations

import re
import uuid
from dataclasses import dataclass, field

from eti.rag.schema import NUMERIC_PATTERN, INSUFFICIENT_EVIDENCE, Claim, TrendCard


@dataclass
class EvidenceDocument:
    """Документ, поданный модели как основание."""

    document_id: uuid.UUID
    title: str | None
    abstract: str | None
    url: str | None = None
    published_year: int | None = None

    def searchable_text(self) -> str:
        parts = [self.title or "", self.abstract or ""]
        if self.published_year:
            parts.append(str(self.published_year))
        return " ".join(parts).casefold()


@dataclass
class ClaimVerdict:
    claim: Claim
    passed: bool
    reason: str = ""
    unsupported_numbers: list[str] = field(default_factory=list)


@dataclass
class VerificationResult:
    card: TrendCard
    verdicts: list[ClaimVerdict]
    removed: list[ClaimVerdict] = field(default_factory=list)

    @property
    def passed(self) -> bool:
        return all(v.passed for v in self.verdicts)

    @property
    def claim_source_coverage(self) -> float:
        """Доля утверждений с подтверждающими источниками — компонент
        EvidenceConfidence (§24.14)."""
        meaningful = [v for v in self.verdicts if not v.claim.is_insufficient]
        if not meaningful:
            return 0.0
        return sum(1 for v in meaningful if v.passed) / len(meaningful)


def normalize_number(token: str) -> str:
    """Приведение числа к сопоставимому виду.

    «1 234», «1,234» и «1234» — одно и то же число, записанное по-разному
    в русской и английской традиции. Без нормализации проверка числа в
    тексте источника проваливается на форматировании, а не по существу.
    """
    cleaned = re.sub(r"[\s ]", "", token)
    cleaned = cleaned.rstrip("%").strip()
    if re.fullmatch(r"\d{1,3}(,\d{3})+", cleaned):
        cleaned = cleaned.replace(",", "")
    elif re.fullmatch(r"\d{1,3}(\.\d{3})+", cleaned):
        cleaned = cleaned.replace(".", "")
    else:
        cleaned = cleaned.replace(",", ".")
    return cleaned.rstrip(".")


class ClaimVerifier:
    def __init__(
        self,
        evidence: list[EvidenceDocument],
        *,
        require_numbers_in_source: bool = True,
        computed_metrics: dict[str, float] | None = None,
    ) -> None:
        self.evidence = {doc.document_id: doc for doc in evidence}
        self.require_numbers_in_source = require_numbers_in_source
        self.computed_metrics = computed_metrics or {}
        """Значения, посчитанные пайплайном. Утверждение о метрике
        сверяется с ними, а не с текстами документов."""
        self._metric_numbers = {
            normalize_number(f"{value:.0f}")
            for value in self.computed_metrics.values()
            if value is not None
        } | {"100"}
        """100 — шкала показателей («75 из 100»), а не самостоятельное
        число, поэтому допускается всегда."""
        self._corpus = " ".join(doc.searchable_text() for doc in evidence)
        self._corpus_numbers = {
            normalize_number(match.group())
            for match in NUMERIC_PATTERN.finditer(self._corpus)
        }

    def verify_claim(self, claim: Claim) -> ClaimVerdict:
        if claim.is_insufficient:
            # «Недостаточно данных» — корректный ответ, а не утверждение.
            return ClaimVerdict(claim, passed=True, reason="явное признание нехватки данных")

        if not claim.text:
            return ClaimVerdict(claim, passed=False, reason="пустое утверждение")

        if claim.is_metric_claim:
            return self._verify_metric_claim(claim)

        if not claim.source_doc_ids:
            if claim.is_quantitative:
                return ClaimVerdict(
                    claim, passed=False, reason="количественное утверждение без источников"
                )
            return ClaimVerdict(
                claim, passed=False, reason="утверждение без источников"
            )

        unknown = [
            str(doc_id) for doc_id in claim.source_doc_ids if doc_id not in self.evidence
        ]
        if unknown:
            # Модель сослалась на документ, которого ей не давали, — это
            # выдуманная ссылка, худший вид галлюцинации: внешне карточка
            # выглядит обоснованной.
            return ClaimVerdict(
                claim,
                passed=False,
                reason=f"ссылка на документы вне evidence set: {', '.join(unknown[:3])}",
            )

        if self.require_numbers_in_source and claim.is_quantitative:
            unsupported = self._unsupported_numbers(claim)
            if unsupported:
                return ClaimVerdict(
                    claim,
                    passed=False,
                    reason="числа отсутствуют в указанных источниках",
                    unsupported_numbers=unsupported,
                )

        return ClaimVerdict(claim, passed=True, reason="подтверждено")

    def _verify_metric_claim(self, claim: Claim) -> ClaimVerdict:
        """Проверка утверждения о собственных показателях системы.

        Требуется версия расчёта и совпадение каждого числа с фактически
        посчитанным значением. Это не слабее проверки по документам:
        выдумать метрику так же нельзя — её просто не окажется среди
        рассчитанных.
        """
        if not claim.metric_provenance:
            return ClaimVerdict(
                claim, passed=False, reason="утверждение о метрике без версии расчёта"
            )

        unsupported = sorted(
            number
            for match in NUMERIC_PATTERN.finditer(claim.text)
            if (number := normalize_number(match.group())) and number not in self._metric_numbers
        )
        if unsupported:
            return ClaimVerdict(
                claim,
                passed=False,
                reason="числа не соответствуют рассчитанным показателям",
                unsupported_numbers=unsupported,
            )
        return ClaimVerdict(claim, passed=True, reason="подтверждено расчётом")

    def _unsupported_numbers(self, claim: Claim) -> list[str]:
        """Числа из утверждения, которых нет в указанных им источниках."""
        cited_text = " ".join(
            self.evidence[doc_id].searchable_text() for doc_id in claim.source_doc_ids
        )
        cited_numbers = {
            normalize_number(match.group()) for match in NUMERIC_PATTERN.finditer(cited_text)
        }
        claim_numbers = {
            normalize_number(match.group()) for match in NUMERIC_PATTERN.finditer(claim.text)
        }
        return sorted(n for n in claim_numbers if n and n not in cited_numbers)

    def verify(self, card: TrendCard) -> VerificationResult:
        """Проверяет карточку целиком.

        Обязательные поля (problem/advantage/case), не прошедшие проверку,
        заменяются на «Недостаточно данных»; необязательные (evidence,
        caveats) удаляются.
        """
        verdicts = [self.verify_claim(claim) for claim in card.all_claims()]
        removed: list[ClaimVerdict] = []

        for name in ("problem", "advantage", "case"):
            claim: Claim = getattr(card, name)
            verdict = next(v for v in verdicts if v.claim is claim)
            if not verdict.passed:
                removed.append(verdict)
                setattr(
                    card,
                    name,
                    Claim(text=INSUFFICIENT_EVIDENCE, source_doc_ids=[], claim_type=name),
                )

        kept_evidence, kept_caveats = [], []
        for claim in card.evidence:
            verdict = next(v for v in verdicts if v.claim is claim)
            (kept_evidence if verdict.passed else removed).append(
                claim if verdict.passed else verdict
            )
        for claim in card.caveats:
            verdict = next(v for v in verdicts if v.claim is claim)
            (kept_caveats if verdict.passed else removed).append(
                claim if verdict.passed else verdict
            )

        card.evidence = kept_evidence
        card.caveats = kept_caveats
        return VerificationResult(card=card, verdicts=verdicts, removed=removed)
