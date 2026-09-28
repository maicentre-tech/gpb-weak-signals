from __future__ import annotations

from eti.scoring.filters import assess_candidate
from eti.scoring.source_policy import SourceEvidence, assess_source_evidence


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


def test_weak_single_source_is_excluded_with_auditable_reason() -> None:
    policy = assess_source_evidence(
        [SourceEvidence("companies", "low", "press release only")]
    )
    result = assess_candidate(
        maturity_stage="Emerging",
        scores={"market": 40, "cross_domain": 20},
        evidence_confidence=90,
        model_probability=0.9,
        min_confidence=60,
        source_policy=policy,
    )
    assert not result.passes_filters
    assert result.status == "noise_excluded"
    assert "single_source" in (result.reason or "")


def test_companies_are_not_weak_without_explicit_low_trust() -> None:
    policy = assess_source_evidence(
        [
            SourceEvidence("companies", "medium", "audited filing"),
            SourceEvidence("research", "high", "peer-reviewed paper"),
        ]
    )
    assert policy.allowed


def test_unknown_sources_are_never_eligible() -> None:
    policy = assess_source_evidence([SourceEvidence(None, None)])
    assert not policy.allowed
