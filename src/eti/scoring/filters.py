"""Объяснимые отсечки зрелости, хайпа и информационного шума.

Модель отвечает на вопрос «насколько кандидат похож на обученные слабые
сигналы», но она не должна отменять проверяемые продуктовые ограничения.
Поэтому правила ниже применяются после ML-оценки и всегда возвращают причину.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class CandidateDecision:
    status: str
    reason: str | None
    passes_filters: bool


def assess_candidate(
    *,
    maturity_stage: str | None,
    scores: dict[str, float | None],
    evidence_confidence: float,
    model_probability: float | None,
    min_confidence: float,
) -> CandidateDecision:
    """Применяет правила отсечения, не выдавая отсутствие данных за ноль."""
    if maturity_stage in {"Mainstream", "Mature"}:
        return CandidateDecision(
            "mature_excluded",
            "Исключено: признаки указывают на массовое внедрение или зрелый рынок.",
            False,
        )

    market = scores.get("market")
    confirmations = [
        value for value in (scores.get("research"), scores.get("patent"), scores.get("cross_domain"))
        if value is not None
    ]
    confirmation = sum(confirmations) / len(confirmations) if confirmations else None
    if market is not None and market >= 70 and (confirmation is None or confirmation < 35):
        return CandidateDecision(
            "hype_suspected",
            "Исключено: медийно-рыночное внимание не подтверждено независимыми научными, патентными или кросс-источниковыми сигналами.",
            False,
        )

    cross_domain = scores.get("cross_domain")
    if evidence_confidence < min_confidence and (cross_domain is None or cross_domain < 30):
        return CandidateDecision(
            "noise_excluded",
            "Исключено: недостаточно качественных независимых источников для отделения сигнала от шума.",
            False,
        )

    if model_probability is not None and model_probability < 0.5:
        return CandidateDecision(
            "model_rejected",
            "Исключено: профиль кандидата не похож на обученные экспертные слабые сигналы.",
            False,
        )

    return CandidateDecision("eligible", None, True)
