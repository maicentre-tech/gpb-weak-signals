from __future__ import annotations

from eti.scoring.filters import assess_candidate


def test_mature_candidate_is_excluded_before_model() -> None:
    result = assess_candidate(
        maturity_stage="Mature", scores={}, evidence_confidence=95, model_probability=0.99,
        min_confidence=60,
    )
    assert result.status == "mature_excluded"
    assert not result.passes_filters


def test_hype_requires_independent_confirmation() -> None:
    result = assess_candidate(
        maturity_stage="Emerging",
        scores={"market": 90, "research": 10, "patent": None, "cross_domain": 20},
        evidence_confidence=90,
        model_probability=0.9,
        min_confidence=60,
    )
    assert result.status == "hype_suspected"


def test_confirmed_early_candidate_passes() -> None:
    result = assess_candidate(
        maturity_stage="Emerging",
        scores={"market": 45, "research": 75, "patent": 60, "cross_domain": 50},
        evidence_confidence=80,
        model_probability=0.8,
        min_confidence=60,
    )
    assert result.status == "eligible"
    assert result.passes_filters
