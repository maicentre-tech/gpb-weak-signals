from __future__ import annotations

import json
from pathlib import Path

import pytest

from eti.ml.corpus_dataset import (
    audit_candidate_dataset,
    candidate_dataset,
    load_approved_corpus_negatives,
    make_corpus_negative_candidate,
    select_balanced_negatives,
)
from eti.ml.signal_classifier import SignalRecord


def candidate(
    *,
    technology: str = "Кандидат Alpha",
    technology_id: str = "tech-alpha",
    status: str = "hype_suspected",
) -> dict:
    return make_corpus_negative_candidate(
        technology_id=technology_id,
        technology=technology,
        domain="Технологическая область",
        status=status,
        as_of="2026-09-24",
        maturity_stage="Emerging",
        scores={"acceleration": 71.2, "growth": 48.0, "research": None},
        evidence=[
            {
                "document_id": "document-1",
                "url": "https://example.org/paper",
                "document_type": "paper",
                "source_code": "openalex",
                "source_family": "research",
            },
            {
                "document_id": "document-2",
                "url": "https://example.org/report",
                "document_type": "report",
                "source_code": "news",
                "source_family": "web_news",
            },
        ],
    )


def test_candidate_contains_provenance_but_not_reviewed_label() -> None:
    raw = candidate()
    assert raw["review_status"] == "pending"
    assert raw["label_source"] == "scoring_rule_candidate"
    assert raw["provenance"]["document_ids"] == ["document-1", "document-2"]
    assert raw["provenance"]["source_families"] == ["research", "web_news"]
    assert raw["provenance"]["evidence_document_count"] == 2
    assert raw["mention_trend"] == "Растёт быстро"
    assert "hype_suspected" not in raw["mention_trend"]
    assert "corpus" not in raw["sources"]


def test_dataset_audit_exposes_pending_state_and_source_mix() -> None:
    envelope = candidate_dataset(
        [candidate()], snapshot_as_of="2026-09-24", source="test fixture"
    )
    audit = audit_candidate_dataset(envelope)
    assert audit["candidate_count"] == 1
    assert audit["review_status_counts"] == {"pending": 1}
    assert audit["exclusion_status_counts"] == {"hype_suspected": 1}
    assert audit["source_family_counts"] == {"research": 1, "web_news": 1}


def test_training_loader_ignores_pending_and_requires_review_metadata(tmp_path: Path) -> None:
    approved = candidate(technology="Кандидат Beta", technology_id="tech-beta")
    approved["review_status"] = "approved"
    approved["review"] = {
        "reviewed_by": "expert-1",
        "reviewed_at": "2026-09-25T10:00:00+00:00",
        "reason": "Проверены независимые источники и зрелость рынка.",
    }
    envelope = candidate_dataset(
        [candidate(), approved], snapshot_as_of="2026-09-24", source="fixture"
    )
    path = tmp_path / "candidates.json"
    path.write_text(json.dumps(envelope, ensure_ascii=False), encoding="utf-8")

    positives = [
        SignalRecord(
            "Сенсор Gamma", "", "", "", "", "", 1,
        )
    ]
    loaded = load_approved_corpus_negatives(path, positive_records=positives)
    assert len(loaded) == 1
    assert loaded[0].technology == "Кандидат Beta"
    assert loaded[0].label_source == "expert_review"
    assert loaded[0].provenance["review_status"] == "approved"


def test_training_loader_rejects_missing_review_fields_and_positive_overlap(
    tmp_path: Path,
) -> None:
    approved = candidate(technology="Сенсор Gamma", technology_id="tech-gamma")
    approved["review_status"] = "approved"
    approved["review"] = {
        "reviewed_by": "expert-1",
        "reviewed_at": "2026-09-25",
        "reason": "Технология зрелая.",
    }
    envelope = candidate_dataset(
        [approved], snapshot_as_of="2026-09-24", source="fixture"
    )
    path = tmp_path / "candidates.json"
    path.write_text(json.dumps(envelope, ensure_ascii=False), encoding="utf-8")
    positive = SignalRecord("Сенсор Gamma", "", "", "", "", "", 1)
    with pytest.raises(ValueError, match="совпадает с экспертным позитивом"):
        load_approved_corpus_negatives(path, positive_records=[positive])

    approved["review"] = {"reviewed_by": "expert-1"}
    path.write_text(json.dumps(envelope, ensure_ascii=False), encoding="utf-8")
    with pytest.raises(ValueError, match="обязательны reviewed_by"):
        load_approved_corpus_negatives(path)


def test_select_balanced_negatives_is_deterministic_and_round_robin() -> None:
    records = []
    for status, count in (("hype_suspected", 8), ("mature_excluded", 2)):
        for index in range(count):
            raw = candidate(
                technology=f"{status} {index}",
                technology_id=f"{status}-{index}",
                status=status,
            )
            records.append(
                SignalRecord(
                    technology=raw["technology"],
                    domain=raw["domain"],
                    rationale=raw["rationale"],
                    stage=raw["stage"],
                    mention_trend=raw["mention_trend"],
                    sources=raw["sources"],
                    label=0,
                    example_id=raw["example_id"],
                    group_id=raw["group_id"],
                    label_source="expert_review",
                    provenance=raw["provenance"],
                )
            )
    first = select_balanced_negatives(records, 6, random_state=9)
    second = select_balanced_negatives(records, 6, random_state=9)
    assert [record.example_id for record in first] == [
        record.example_id for record in second
    ]
    selected_statuses = [record.provenance["status"] for record in first]
    assert selected_statuses.count("mature_excluded") == 2
    assert selected_statuses.count("hype_suspected") == 4