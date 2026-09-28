from __future__ import annotations

import uuid

import pytest
from fastapi import HTTPException

from eti.api.review import CandidateMappingDecision, decide_candidate_mapping


def _decision(
    decision: str, replacement_technology_id: uuid.UUID | None = None
) -> CandidateMappingDecision:
    return CandidateMappingDecision(
        candidate_id="candidate-test",
        candidate_name="candidate",
        suggested_technology_id=uuid.UUID("10000000-0000-0000-0000-000000000001"),
        suggested_technology_name="Suggested technology",
        decision=decision,
        replacement_technology_id=replacement_technology_id,
        evidence=[],
        provenance={},
    )


@pytest.mark.asyncio
async def test_candidate_reassignment_requires_a_target() -> None:
    with pytest.raises(HTTPException) as error:
        await decide_candidate_mapping(
            _decision("reassign"),
            session=object(),  # rejected before any database access
            reviewer=uuid.uuid4(),
        )

    assert error.value.status_code == 400


@pytest.mark.asyncio
async def test_candidate_confirmation_cannot_include_a_replacement() -> None:
    with pytest.raises(HTTPException) as error:
        await decide_candidate_mapping(
            _decision(
                "confirm",
                uuid.UUID("20000000-0000-0000-0000-000000000002"),
            ),
            session=object(),  # rejected before any database access
            reviewer=uuid.uuid4(),
        )

    assert error.value.status_code == 400