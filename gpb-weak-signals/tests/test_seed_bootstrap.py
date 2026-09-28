from __future__ import annotations

from copy import deepcopy
from types import SimpleNamespace

from eti.seeding import fill_missing_fields, split_source_seed_spec


def test_source_seed_parts_can_be_reused_without_mutating_registry() -> None:
    seed_spec = {
        "code": "openalex",
        "license_status": "approved",
        "coverage": {"start": "2010-01-01", "lag_days": 0},
    }
    original = deepcopy(seed_spec)

    first_fields, first_coverage = split_source_seed_spec(seed_spec)
    second_fields, second_coverage = split_source_seed_spec(seed_spec)

    assert first_fields == second_fields
    assert first_coverage == second_coverage == original["coverage"]
    assert seed_spec == original


def test_preserve_existing_fills_blanks_without_changing_reviewed_values() -> None:
    source = SimpleNamespace(
        license_status="restricted",
        allows_derivative_analytics=False,
        trust_level=None,
        trust_reason="Reviewed by operator.",
    )

    fill_missing_fields(
        source,
        {
            "license_status": "approved",
            "allows_derivative_analytics": True,
            "trust_level": "high",
            "trust_reason": "Seed default.",
        },
    )

    assert source.license_status == "restricted"
    assert source.allows_derivative_analytics is False
    assert source.trust_level == "high"
    assert source.trust_reason == "Reviewed by operator."