"""Versioned corpus-negative candidates and review-gated training loader."""

from __future__ import annotations

from collections import Counter, defaultdict
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import random
from typing import Any

from eti.ml.signal_classifier import SignalRecord, normalize_technology_name


DATASET_SCHEMA_VERSION = "eti.corpus-negative-candidates.v1"
NEGATIVE_CANDIDATE_STATUSES = frozenset(
    {"mature_excluded", "hype_suspected", "noise_excluded"}
)


def make_corpus_negative_candidate(
    *,
    technology_id: str,
    technology: str,
    domain: str,
    status: str,
    as_of: str,
    maturity_stage: str | None,
    scores: dict[str, float | None],
    evidence: list[dict[str, Any]],
) -> dict[str, Any]:
    """Serialize one rule-derived candidate without presenting it as a reviewed label."""
    if status not in NEGATIVE_CANDIDATE_STATUSES:
        raise ValueError(f"Неизвестная причина исключения: {status}")

    urls = sorted({str(item["url"]).strip() for item in evidence if item.get("url")})
    documents = sorted({str(item["document_id"]) for item in evidence if item.get("document_id")})
    source_codes = sorted({str(item["source_code"]) for item in evidence if item.get("source_code")})
    source_families = sorted(
        {str(item["source_family"]) for item in evidence if item.get("source_family")}
    )
    document_types = sorted(
        {str(item["document_type"]) for item in evidence if item.get("document_type")}
    )
    numeric_rationale = " ".join(
        f"{name}={float(value):.1f}" for name, value in sorted(scores.items()) if value is not None
    )
    acceleration = scores.get("acceleration")
    mention_trend = (
        "Растёт быстро" if acceleration is not None and acceleration >= 60 else "Стабильный"
    )
    stable_key = f"{technology_id}|{as_of}|{status}".encode("utf-8")
    example_id = f"corpus-negative-{hashlib.sha256(stable_key).hexdigest()[:16]}"

    return {
        "example_id": example_id,
        "group_id": technology_id,
        "technology": technology,
        "domain": domain,
        "rationale": numeric_rationale,
        "stage": maturity_stage or "",
        "mention_trend": mention_trend,
        "sources": " ".join(urls),
        "label": 0,
        "label_source": "scoring_rule_candidate",
        "review_status": "pending",
        "review": None,
        "provenance": {
            "as_of": as_of,
            "technology_id": technology_id,
            "status": status,
            "evidence_document_count": len(documents),
            "document_ids": documents,
            "source_codes": source_codes,
            "source_families": source_families,
            "document_types": document_types,
            "urls": urls,
            "scores": {name: value for name, value in sorted(scores.items())},
            "point_in_time_rule": "Only accepted mappings with available_from before the snapshot's next day.",
        },
    }


def candidate_dataset(
    records: list[dict[str, Any]], *, snapshot_as_of: str, source: str
) -> dict[str, Any]:
    """Build a top-level envelope that makes schema and label status explicit."""
    by_status = Counter(str(record["provenance"]["status"]) for record in records)
    return {
        "schema_version": DATASET_SCHEMA_VERSION,
        "snapshot_as_of": snapshot_as_of,
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source": source,
        "label_semantics": (
            "All rows are heuristic negative candidates. They are pending review and "
            "must not be used as training labels until an expert approves them."
        ),
        "summary": {
            "candidate_count": len(records),
            "pending_review_count": sum(
                record.get("review_status") == "pending" for record in records
            ),
            "by_exclusion_status": dict(sorted(by_status.items())),
        },
        "records": records,
    }


def load_approved_corpus_negatives(
    path: Path, *, positive_records: list[SignalRecord] | None = None
) -> list[SignalRecord]:
    """Load only explicit expert approvals; pending candidates remain audit-only."""
    try:
        dataset = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise ValueError(f"Не удалось прочитать набор негативов {path}: {exc}") from exc
    if not isinstance(dataset, dict) or dataset.get("schema_version") != DATASET_SCHEMA_VERSION:
        raise ValueError(
            f"Ожидалась схема {DATASET_SCHEMA_VERSION}; пересоберите файл скриптом экспорта"
        )
    raw_records = dataset.get("records")
    if not isinstance(raw_records, list):
        raise ValueError("В наборе отсутствует список records")

    positive_names = {
        normalize_technology_name(record.technology) for record in (positive_records or [])
    }
    selected: list[SignalRecord] = []
    seen_ids: set[str] = set()
    seen_names: set[str] = set()
    for raw in raw_records:
        if not isinstance(raw, dict):
            raise ValueError("Каждая запись candidate dataset должна быть объектом")
        review_status = raw.get("review_status", "pending")
        if review_status != "approved":
            continue
        review = raw.get("review")
        if not isinstance(review, dict) or not all(
            str(review.get(field, "")).strip()
            for field in ("reviewed_by", "reviewed_at", "reason")
        ):
            raise ValueError(
                f"У одобренной записи {raw.get('example_id', '(без id)')} "
                "обязательны reviewed_by, reviewed_at и reason"
            )
        if raw.get("label") != 0:
            raise ValueError("Одобренный отрицательный пример должен иметь label=0")

        provenance = raw.get("provenance")
        if not isinstance(provenance, dict) or not all(
            provenance.get(field) for field in ("technology_id", "as_of", "status")
        ):
            raise ValueError("Для одобренного примера обязательна provenance technology_id/as_of/status")
        if provenance["status"] not in NEGATIVE_CANDIDATE_STATUSES:
            raise ValueError(f"Недопустимый статус в provenance: {provenance['status']}")

        technology = str(raw.get("technology", "")).strip()
        normalized_name = normalize_technology_name(technology)
        if not normalized_name:
            raise ValueError("У одобренного примера отсутствует technology")
        aliases = provenance.get("aliases", [])
        name_keys = {normalized_name}
        if isinstance(aliases, list):
            name_keys.update(
                normalize_technology_name(str(alias)) for alias in aliases if str(alias).strip()
            )
        overlap = name_keys & positive_names
        if overlap:
            raise ValueError(
                f"Негативный кандидат {technology!r} совпадает с экспертным позитивом"
            )
        if normalized_name in seen_names:
            raise ValueError(f"Повтор технологии среди одобренных негативов: {technology}")

        example_id = str(raw.get("example_id", "")).strip()
        if not example_id or example_id in seen_ids:
            raise ValueError(f"Отсутствует или повторяется example_id: {example_id!r}")
        seen_ids.add(example_id)
        seen_names.add(normalized_name)
        selected.append(
            SignalRecord(
                technology=technology,
                domain=str(raw.get("domain") or ""),
                rationale=str(raw.get("rationale") or ""),
                stage=str(raw.get("stage") or ""),
                mention_trend=str(raw.get("mention_trend") or ""),
                sources=str(raw.get("sources") or ""),
                label=0,
                example_id=example_id,
                group_id=str(provenance["technology_id"]),
                label_source="expert_review",
                provenance={**provenance, "review": review, "review_status": "approved"},
            )
        )
    if not selected:
        pending = sum(
            raw.get("review_status", "pending") != "approved"
            for raw in raw_records
            if isinstance(raw, dict)
        )
        raise ValueError(
            f"Нет одобренных экспертом негативов в {path}; "
            f"{pending} кандидатов остаются pending и исключены из обучения"
        )
    return selected


def select_balanced_negatives(
    records: list[SignalRecord], target_count: int, *, random_state: int = 42
) -> list[SignalRecord]:
    """Select approximately equal numbers from each exclusion reason, reproducibly."""
    if target_count < 1:
        raise ValueError("target_count должен быть положительным")
    buckets: dict[str, list[SignalRecord]] = defaultdict(list)
    for record in records:
        status = str(record.provenance.get("status", "uncategorized"))
        buckets[status].append(record)
    rng = random.Random(random_state)
    for bucket in buckets.values():
        bucket.sort(key=lambda record: record.example_id)
        rng.shuffle(bucket)

    selected: list[SignalRecord] = []
    ordered_statuses = sorted(buckets)
    while len(selected) < target_count:
        added = False
        for status in ordered_statuses:
            bucket = buckets[status]
            if bucket and len(selected) < target_count:
                selected.append(bucket.pop())
                added = True
        if not added:
            break
    return selected


def audit_candidate_dataset(dataset: dict[str, Any]) -> dict[str, Any]:
    """Summarize the provenance and review state before any labels are approved."""
    records = dataset.get("records", [])
    statuses = Counter()
    review_states = Counter()
    source_families = Counter()
    evidence_counts: list[int] = []
    for record in records:
        provenance = record.get("provenance", {})
        statuses[str(provenance.get("status", "missing"))] += 1
        review_states[str(record.get("review_status", "missing"))] += 1
        source_families.update(provenance.get("source_families", []))
        evidence_counts.append(int(provenance.get("evidence_document_count", 0)))
    return {
        "schema_version": dataset.get("schema_version"),
        "snapshot_as_of": dataset.get("snapshot_as_of"),
        "candidate_count": len(records),
        "review_status_counts": dict(sorted(review_states.items())),
        "exclusion_status_counts": dict(sorted(statuses.items())),
        "source_family_counts": dict(sorted(source_families.items())),
        "evidence_document_count": {
            "min": min(evidence_counts) if evidence_counts else 0,
            "median": (
                sorted(evidence_counts)[len(evidence_counts) // 2] if evidence_counts else 0
            ),
            "max": max(evidence_counts) if evidence_counts else 0,
        },
    }