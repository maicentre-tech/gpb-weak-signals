"""Генерация карточки тренда (§9, DAG 4).

Две реализации с одним интерфейсом:

* ``MetricCardBuilder`` — собирает карточку напрямую из метрик и
  отобранных документов, без языковой модели. Каждое утверждение строится
  из значения, которое уже посчитано и уже имеет источник, поэтому
  верификацию проходит по построению.

* ``LlmCardGenerator`` — просит локальную модель переписать то же самое
  человеческим языком, после чего результат проходит тот же верификатор.

Разделение отражает архитектурный принцип ТЗ: «ML/статистика определяют
тренд, LLM объясняет результат». Фактическая часть карточки существует и
без модели; модель улучшает читаемость, а не создаёт содержание. Если
LLM-шлюз недоступен или вернул невалидный JSON, система отдаёт карточку
построителя, а не отказывает в ответе.
"""

from __future__ import annotations

import json
from typing import Protocol

import httpx
import structlog

from eti.rag.retrieval import EvidenceSet
from eti.rag.schema import INSUFFICIENT_EVIDENCE, Claim, TrendCard
from eti.rag.verifier import ClaimVerifier, VerificationResult

log = structlog.get_logger(__name__)

PROMPT_VERSION = "0.1.0"

SYSTEM_PROMPT = """Ты аналитик технологической разведки банка.

Тебе даны: название технологии, рассчитанные метрики и пронумерованный
список документов-источников. Твоя задача — изложить готовый результат
человеческим языком.

Жёсткие правила:
1. Запрещено сообщать любые факты, которых нет в поданных документах и
   метриках. Не добавляй известное тебе из других источников.
2. Каждое утверждение обязано указывать source_doc_ids — идентификаторы
   документов из поданного списка. Идентификаторы вне списка запрещены.
3. Любое число в тексте обязано встречаться в документе, на который ты
   ссылаешься.
4. Если данных для поля не хватает, верни ровно строку «Недостаточно данных».
   Не строй правдоподобных догадок.
5. Ответ — только JSON заданной структуры, без пояснений вокруг.
"""


class CardGenerator(Protocol):
    def build(self, context: "CardContext") -> TrendCard: ...


class CardContext:
    """Всё, что подаётся генератору. Ничего сверх этого он не видит."""

    def __init__(
        self,
        technology_name: str,
        evidence: EvidenceSet,
        metrics: dict[str, float | None],
        maturity_stage: str | None = None,
        scoring_version: str = "unknown",
    ) -> None:
        self.technology_name = technology_name
        self.evidence = evidence
        self.metrics = metrics
        self.maturity_stage = maturity_stage
        self.scoring_version = scoring_version

    def as_prompt(self) -> str:
        documents = "\n".join(
            f"[{i}] id={doc.document_id} ({doc.published_year or 'без даты'}) "
            f"{doc.title or 'без заголовка'}\n    {(doc.abstract or '')[:400]}"
            for i, doc in enumerate(self.evidence.documents, 1)
        )
        metrics = "\n".join(
            f"  {name}: {value:.1f}" if value is not None else f"  {name}: нет данных"
            for name, value in self.metrics.items()
        )
        return (
            f"Технология: {self.technology_name}\n"
            f"Стадия зрелости: {self.maturity_stage or 'не определена'}\n\n"
            f"Метрики (0–100):\n{metrics}\n\n"
            f"Документы:\n{documents}\n"
        )


class MetricCardBuilder:
    """Детерминированная сборка карточки из метрик и документов."""

    def build(self, context: CardContext) -> TrendCard:
        documents = context.evidence.documents
        primary = [doc.document_id for doc in documents[:3]]

        problem = Claim(text=INSUFFICIENT_EVIDENCE, claim_type="problem")
        if documents and documents[0].abstract:
            problem = Claim(
                text=_first_sentence(documents[0].abstract),
                source_doc_ids=[documents[0].document_id],
                claim_type="problem",
            )

        advantage = Claim(text=INSUFFICIENT_EVIDENCE, claim_type="advantage")
        growth, acceleration = context.metrics.get("growth"), context.metrics.get("acceleration")
        if growth is not None and acceleration is not None and primary:
            # Формулировка намеренно описывает *балл*, а не рост в мире:
            # «growth 75 из 100» проверяемо, «вырос в три раза» — нет.
            advantage = Claim(
                text=(
                    f"Показатель роста {growth:.0f} из 100 при ускорении "
                    f"{acceleration:.0f} из 100"
                ),
                source_doc_ids=primary,
                claim_type="metric",
                metric_provenance=f"scoring_version={context.scoring_version}",
            )

        case = Claim(text=INSUFFICIENT_EVIDENCE, claim_type="case")
        applied = next(
            (doc for doc in documents if doc.title and _looks_applied(doc.title)), None
        )
        if applied:
            case = Claim(
                text=applied.title or "",
                source_doc_ids=[applied.document_id],
                claim_type="case",
            )

        evidence_claims = [
            Claim(
                text=f"{doc.title}" + (f" ({doc.published_year})" if doc.published_year else ""),
                source_doc_ids=[doc.document_id],
                claim_type="evidence",
            )
            for doc in documents
            if doc.title
        ]

        caveats = []
        cross_domain = context.metrics.get("cross_domain")
        if cross_domain is not None and cross_domain < 30 and primary:
            caveats.append(
                Claim(
                    text=(
                        "Сигнал наблюдается в ограниченном числе независимых "
                        "экосистем источников"
                    ),
                    source_doc_ids=primary,
                    claim_type="caveat",
                )
            )

        return TrendCard(
            technology=context.technology_name,
            problem=problem,
            advantage=advantage,
            case=case,
            evidence=evidence_claims,
            caveats=caveats,
            confidence=context.metrics.get("evidence_confidence") or 0.0,
        )


class LlmCardGenerator:
    """Обёртка над локальным OpenAI-совместимым шлюзом."""

    def __init__(
        self,
        client: httpx.AsyncClient,
        *,
        base_url: str,
        model: str,
        api_key: str | None = None,
        max_repairs: int = 2,
    ) -> None:
        self.client = client
        self.base_url = base_url.rstrip("/")
        self.model = model
        self.api_key = api_key
        self.max_repairs = max_repairs
        self.fallback = MetricCardBuilder()

    async def build(self, context: CardContext) -> TrendCard:
        for attempt in range(1, self.max_repairs + 2):
            try:
                raw = await self._complete(context.as_prompt())
                return TrendCard.model_validate_json(raw)
            except Exception as exc:
                log.warning(
                    "llm_card_attempt_failed",
                    attempt=attempt,
                    model=self.model,
                    error=str(exc)[:200],
                )
        # §21.2 требует ≥99 % валидного structured output после repair.
        # Пока этот порог не подтверждён benchmark'ом, отказ модели не
        # должен приводить к отсутствию карточки: факты есть и без неё.
        log.info("llm_fallback_to_metric_card", technology=context.technology_name)
        return self.fallback.build(context)

    async def _complete(self, prompt: str) -> str:
        headers = {"Content-Type": "application/json"}
        if self.api_key:
            headers["Authorization"] = f"Bearer {self.api_key}"
        response = await self.client.post(
            f"{self.base_url}/chat/completions",
            headers=headers,
            json={
                "model": self.model,
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt},
                ],
                "temperature": 0.0,
                "response_format": {"type": "json_object"},
            },
            timeout=120,
        )
        response.raise_for_status()
        payload = response.json()
        return payload["choices"][0]["message"]["content"]


def generate_and_verify(
    generator_output: TrendCard,
    evidence: EvidenceSet,
    computed_metrics: dict[str, float] | None = None,
) -> VerificationResult:
    """Карточка проходит верификацию независимо от способа генерации."""
    return ClaimVerifier(
        evidence.documents, computed_metrics=computed_metrics
    ).verify(generator_output)


def _first_sentence(text: str, limit: int = 300) -> str:
    for separator in (". ", "! ", "? "):
        index = text.find(separator)
        if 40 < index < limit:
            return text[: index + 1].strip()
    return text[:limit].strip()


def _looks_applied(title: str) -> bool:
    markers = (
        "case", "application", "deploy", "industr", "enterprise", "bank",
        "practice", "real-world", "production", "внедрен", "применен", "практик",
    )
    lowered = title.casefold()
    return any(marker in lowered for marker in markers)
