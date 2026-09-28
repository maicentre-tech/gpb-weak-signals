from __future__ import annotations

from datetime import date
from types import SimpleNamespace

import pytest

from eti.discovery.search import (
    BASE_LIVE_OPERATIONS,
    EXPERT_LIVE_OPERATIONS,
    LIVE_CONNECTOR_CONTRACTS,
    _license_gate,
    _sanitize_live_normalized_document,
)
from eti.ingestion.runner import IngestionRunner
from eti.source_policy import evaluate_source_policy, source_review_status
from eti.sources.base import NormalizedDocument


def _approved_record(
    *,
    fields: set[str] | None = None,
    operations: set[str] | None = None,
) -> dict[str, object]:
    return {
        "enabled": True,
        "license_status": "approved",
        "allows_derivative_analytics": True,
        "license_type": "terms-v1",
        "license_owner": "Rights office",
        "license_checked_at": date(2026, 9, 26),
        "license_evidence_url": "https://example.org/terms",
        "license_scope": "Approved fields and operations for this test only",
        "license_reviewed_by": "Authorized reviewer",
        "license_approved_fields": sorted(
            fields if fields is not None else LIVE_CONNECTOR_CONTRACTS["openalex"]["fields"]
        ),
        "license_approved_operations": sorted(
            operations
            if operations is not None
            else BASE_LIVE_OPERATIONS | EXPERT_LIVE_OPERATIONS
        ),
        "license_review_reference": "review-2026-09",
        "license_review_due_at": date(2027, 9, 26),
        "license_terms_version": "terms-v1",
        "license_reviewed_terms_version": "terms-v1",
    }


def test_live_gate_requires_every_declared_field_and_operation() -> None:
    contract_fields = set(LIVE_CONNECTOR_CONTRACTS["openalex"]["fields"])
    record = _approved_record()

    assert _license_gate(record, "openalex")[0] is True

    partial_fields = contract_fields - {"abstract"}
    allowed, reason = _license_gate(
        {**record, "license_approved_fields": sorted(partial_fields)}, "openalex"
    )
    assert allowed is False
    assert "abstract" in reason

    partial_operations = set(BASE_LIVE_OPERATIONS | EXPERT_LIVE_OPERATIONS) - {
        "persist_job_result"
    }
    allowed, reason = _license_gate(
        {**record, "license_approved_operations": sorted(partial_operations)},
        "openalex",
    )
    assert allowed is False
    assert "persist_job_result" in reason


def test_public_and_expert_operations_are_checked_separately() -> None:
    record = _approved_record(operations=set(BASE_LIVE_OPERATIONS))

    assert _license_gate(record, "openalex")[0] is True
    allowed, reason = _license_gate(record, "openalex", expert_mode=True)
    assert allowed is False
    assert "external_llm_processing" in reason


@pytest.mark.parametrize(
    ("updates", "expected_status"),
    [
        ({"license_review_due_at": date(2026, 9, 27)}, "expired"),
        ({"license_terms_version": "terms-v2"}, "terms_changed"),
        ({"license_review_reference": None}, "incomplete"),
    ],
)
def test_stale_or_changed_review_fails_closed(
    updates: dict[str, object], expected_status: str
) -> None:
    record = {**_approved_record(), **updates}

    review_status, _reason = source_review_status(record, today=date(2026, 9, 28))
    decision = evaluate_source_policy(
        record,
        requested_fields=LIVE_CONNECTOR_CONTRACTS["openalex"]["fields"],
        required_operations=BASE_LIVE_OPERATIONS,
        today=date(2026, 9, 28),
    )

    assert review_status == expected_status
    assert decision.allowed is False
    assert decision.review_status == expected_status


def test_live_normalizer_rejects_unapproved_fields_and_drops_raw_payload() -> None:
    contract_fields = set(LIVE_CONNECTOR_CONTRACTS["openalex"]["fields"])
    document = NormalizedDocument(
        external_id="openalex:work",
        document_type="paper",
        title="Example",
        abstract="Approved test abstract",
        raw_payload={"unscoped_source_data": "must not continue downstream"},
    )

    clean = _sanitize_live_normalized_document(
        document, "openalex", contract_fields
    )
    assert clean.raw_payload == {}

    with pytest.raises(PermissionError, match="вне утверждённого scope"):
        _sanitize_live_normalized_document(
            document, "openalex", contract_fields - {"abstract"}
        )

    patent_date_document = document.model_copy(
        update={"priority_date": date(2026, 1, 1)}
    )
    with pytest.raises(PermissionError, match="вне контракта"):
        _sanitize_live_normalized_document(
            patent_date_document, "openalex", contract_fields
        )


@pytest.mark.parametrize(
    "updates",
    [
        {"license_review_due_at": date(2026, 9, 27)},
        {"license_terms_version": "terms-v2"},
    ],
)
def test_ingestion_runner_blocks_expired_or_changed_terms(
    updates: dict[str, object],
) -> None:
    source_data = {**_approved_record(), **updates, "code": "openalex"}
    runner_context = SimpleNamespace(allow_unclear_license=False)

    with pytest.raises(PermissionError):
        IngestionRunner._check_license_gate(
            runner_context, SimpleNamespace(**source_data)
        )