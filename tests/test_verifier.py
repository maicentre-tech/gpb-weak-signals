"""Тесты верификатора утверждений — §12, жёсткое правило §9.

Гарантия «LLM не придумывает источники» проверяется здесь, а не доверием
к модели, поэтому тесты подробные: это единственное место, где нарушение
ловится до записи в БД.
"""

from __future__ import annotations

import uuid

import pytest

from eti.rag.schema import INSUFFICIENT_EVIDENCE, Claim, TrendCard
from eti.rag.verifier import ClaimVerifier, EvidenceDocument, normalize_number

DOC_A = uuid.UUID("11111111-1111-1111-1111-111111111111")
DOC_B = uuid.UUID("22222222-2222-2222-2222-222222222222")
GHOST = uuid.UUID("99999999-9999-9999-9999-999999999999")


@pytest.fixture
def evidence() -> list[EvidenceDocument]:
    return [
        EvidenceDocument(
            document_id=DOC_A,
            title="Agentic AI: Autonomous Intelligence for Complex Goals",
            abstract=(
                "Мы рассматриваем 342 работы по агентным системам. "
                "Число публикаций выросло на 45 % за год."
            ),
            published_year=2025,
        ),
        EvidenceDocument(
            document_id=DOC_B,
            title="Multi-agent orchestration frameworks",
            abstract="Обзор 17 фреймворков оркестрации агентов.",
            published_year=2024,
        ),
    ]


@pytest.fixture
def verifier(evidence: list[EvidenceDocument]) -> ClaimVerifier:
    return ClaimVerifier(evidence)


class TestNumberNormalization:
    @pytest.mark.parametrize(
        ("raw", "expected"),
        [
            ("1 234", "1234"),
            ("1,234", "1234"),
            ("1.234", "1234"),
            ("45 %", "45"),
            ("342", "342"),
            ("2025", "2025"),
        ],
    )
    def test_formats_collapse_to_same_value(self, raw: str, expected: str) -> None:
        """Проверка числа не должна падать из-за разделителя разрядов."""
        assert normalize_number(raw) == expected


class TestSourceRequirement:
    def test_claim_without_sources_rejected(self, verifier: ClaimVerifier) -> None:
        verdict = verifier.verify_claim(Claim(text="Технология быстро развивается"))
        assert not verdict.passed
        assert "без источников" in verdict.reason

    def test_quantitative_claim_without_sources_rejected(
        self, verifier: ClaimVerifier
    ) -> None:
        verdict = verifier.verify_claim(Claim(text="Публикации выросли на 45 %"))
        assert not verdict.passed
        assert "количественное" in verdict.reason

    def test_fabricated_source_id_rejected(self, verifier: ClaimVerifier) -> None:
        """Худший вид галлюцинации: ссылка на несуществующий документ
        делает карточку внешне обоснованной."""
        verdict = verifier.verify_claim(
            Claim(text="Агентные системы применяются в банках", source_doc_ids=[GHOST])
        )
        assert not verdict.passed
        assert "вне evidence set" in verdict.reason

    def test_supported_claim_passes(self, verifier: ClaimVerifier) -> None:
        verdict = verifier.verify_claim(
            Claim(text="Рассмотрено 342 работы по агентным системам", source_doc_ids=[DOC_A])
        )
        assert verdict.passed


class TestNumberGrounding:
    def test_number_absent_from_cited_source_rejected(
        self, verifier: ClaimVerifier
    ) -> None:
        """Ссылка есть, но числа в источнике нет — классическая подмена."""
        verdict = verifier.verify_claim(
            Claim(text="Публикации выросли на 87 %", source_doc_ids=[DOC_A])
        )
        assert not verdict.passed
        assert "87" in verdict.unsupported_numbers

    def test_number_from_other_document_not_accepted(
        self, verifier: ClaimVerifier
    ) -> None:
        """Число есть в корпусе, но не в том документе, на который ссылаются."""
        verdict = verifier.verify_claim(
            Claim(text="Рассмотрено 342 работы", source_doc_ids=[DOC_B])
        )
        assert not verdict.passed
        assert "342" in verdict.unsupported_numbers

    def test_number_present_in_cited_source_passes(self, verifier: ClaimVerifier) -> None:
        verdict = verifier.verify_claim(
            Claim(text="Обзор охватывает 17 фреймворков", source_doc_ids=[DOC_B])
        )
        assert verdict.passed

    def test_thousand_separator_does_not_break_match(self) -> None:
        verifier = ClaimVerifier(
            [EvidenceDocument(DOC_A, "Отчёт", "Всего 1 234 репозитория")]
        )
        verdict = verifier.verify_claim(
            Claim(text="Насчитывается 1,234 репозитория", source_doc_ids=[DOC_A])
        )
        assert verdict.passed


class TestHedgeWords:
    def test_vague_quantifier_requires_source(self, verifier: ClaimVerifier) -> None:
        """«Значительно вырос» так же непроверяемо, как «вырос на 40 %»."""
        claim = Claim(text="Интерес значительно вырос")
        assert claim.is_quantitative
        assert not verifier.verify_claim(claim).passed


class TestInsufficientEvidence:
    def test_explicit_insufficiency_is_valid(self, verifier: ClaimVerifier) -> None:
        """§12: при нехватке evidence поле заполняется явным признанием,
        а не правдоподобной догадкой."""
        verdict = verifier.verify_claim(Claim(text=INSUFFICIENT_EVIDENCE))
        assert verdict.passed

    def test_insufficiency_excluded_from_coverage(self, verifier: ClaimVerifier) -> None:
        card = _card(
            problem=Claim(text=INSUFFICIENT_EVIDENCE),
            advantage=Claim(text="Обзор охватывает 17 фреймворков", source_doc_ids=[DOC_B]),
            case=Claim(text=INSUFFICIENT_EVIDENCE),
        )
        result = verifier.verify(card)
        # Единственное содержательное утверждение прошло → покрытие 100 %.
        assert result.claim_source_coverage == pytest.approx(1.0)


class TestCardVerification:
    def test_failed_required_field_replaced_not_kept(
        self, verifier: ClaimVerifier
    ) -> None:
        card = _card(
            problem=Claim(text="Рынок вырастет на 300 % к 2030", source_doc_ids=[DOC_A]),
            advantage=Claim(text="Обзор охватывает 17 фреймворков", source_doc_ids=[DOC_B]),
            case=Claim(text=INSUFFICIENT_EVIDENCE),
        )
        result = verifier.verify(card)

        assert result.card.problem.text == INSUFFICIENT_EVIDENCE
        assert result.card.problem.source_doc_ids == []
        assert not result.passed

    def test_failed_optional_claim_removed(self, verifier: ClaimVerifier) -> None:
        card = _card(
            evidence=[
                Claim(text="Рассмотрено 342 работы", source_doc_ids=[DOC_A]),
                Claim(text="Выручка достигла 5 млрд", source_doc_ids=[DOC_A]),
            ]
        )
        result = verifier.verify(card)

        assert len(result.card.evidence) == 1
        assert "342" in result.card.evidence[0].text

    def test_clean_card_passes_untouched(self, verifier: ClaimVerifier) -> None:
        card = _card(
            problem=Claim(text="Рассмотрено 342 работы", source_doc_ids=[DOC_A]),
            advantage=Claim(text="Обзор охватывает 17 фреймворков", source_doc_ids=[DOC_B]),
            case=Claim(text="Агентные системы описаны в обзоре", source_doc_ids=[DOC_A]),
        )
        result = verifier.verify(card)

        assert result.passed
        assert result.card.problem.text.startswith("Рассмотрено")
        assert result.claim_source_coverage == pytest.approx(1.0)


def _card(**overrides) -> TrendCard:
    defaults = {
        "technology": "Agentic AI",
        "problem": Claim(text=INSUFFICIENT_EVIDENCE),
        "advantage": Claim(text=INSUFFICIENT_EVIDENCE),
        "case": Claim(text=INSUFFICIENT_EVIDENCE),
        "evidence": [],
        "caveats": [],
        "confidence": 50.0,
    }
    defaults.update(overrides)
    return TrendCard(**defaults)


class TestMetricClaims:
    """Утверждения о собственных показателях системы.

    ТЗ не различает факт из источника и рассчитанный показатель, хотя
    основания у них разные. Требовать документ для метрики — запретить
    системе сообщать свои результаты; ослабить требование для всех —
    открыть модели путь протаскивать выдуманные числа под видом метрик.
    """

    @pytest.fixture
    def metric_verifier(self, evidence: list[EvidenceDocument]) -> ClaimVerifier:
        return ClaimVerifier(
            evidence, computed_metrics={"growth": 8.3, "acceleration": 25.0}
        )

    def test_computed_metric_passes_without_document_numbers(
        self, metric_verifier: ClaimVerifier
    ) -> None:
        """Чисел 8 и 25 нет ни в одном документе — и не должно быть."""
        verdict = metric_verifier.verify_claim(
            Claim(
                text="Показатель роста 8 из 100 при ускорении 25 из 100",
                claim_type="metric",
                metric_provenance="scoring_version=0.1.0-baseline",
            )
        )
        assert verdict.passed
        assert "расчётом" in verdict.reason

    def test_fabricated_metric_value_rejected(self, metric_verifier: ClaimVerifier) -> None:
        """Путь «объявить выдуманное число метрикой» закрыт."""
        verdict = metric_verifier.verify_claim(
            Claim(
                text="Показатель роста 92 из 100",
                claim_type="metric",
                metric_provenance="scoring_version=0.1.0-baseline",
            )
        )
        assert not verdict.passed
        assert "92" in verdict.unsupported_numbers

    def test_metric_claim_without_version_rejected(
        self, metric_verifier: ClaimVerifier
    ) -> None:
        """Без версии расчёта показатель невоспроизводим (§21.5)."""
        verdict = metric_verifier.verify_claim(
            Claim(text="Показатель роста 8 из 100", claim_type="metric")
        )
        assert not verdict.passed
        assert "версии расчёта" in verdict.reason

    def test_scale_denominator_always_allowed(self, metric_verifier: ClaimVerifier) -> None:
        """«из 100» — шкала, а не самостоятельное число."""
        verdict = metric_verifier.verify_claim(
            Claim(
                text="Показатель роста 8 из 100",
                claim_type="metric",
                metric_provenance="scoring_version=0.1.0-baseline",
            )
        )
        assert verdict.passed

    def test_source_claim_still_needs_document(
        self, metric_verifier: ClaimVerifier
    ) -> None:
        """Разделение не ослабило проверку обычных утверждений."""
        verdict = metric_verifier.verify_claim(
            Claim(text="Рынок вырастет на 300 %", source_doc_ids=[DOC_A])
        )
        assert not verdict.passed
