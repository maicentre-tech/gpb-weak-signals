from __future__ import annotations

from pathlib import Path

import pytest

from eti.ml.signal_classifier import (
    NEGATIVE_SEEDS,
    SignalClassifier,
    SignalRecord,
    normalize_technology_name,
    stage_bucket,
    trend_bucket,
)


def grouped_records(repeats: int = 1) -> list[SignalRecord]:
    records: list[SignalRecord] = []
    for label, prefix in ((1, "Новая исследовательская технология"), (0, "Зрелый стандарт")):
        for group_index in range(4):
            for duplicate_index in range(repeats):
                technology = f"{prefix} {group_index}"
                records.append(
                    SignalRecord(
                        technology=technology,
                        domain="тест",
                        rationale="score=42.0",
                        stage="Прототип" if label else "Массовое внедрение",
                        mention_trend="Растёт быстро" if label else "Стабильный",
                        sources=f"https://example.org/{label}/{group_index}",
                        label=label,
                        example_id=f"{label}-{group_index}-{duplicate_index}",
                        group_id=f"{label}-technology-{group_index}",
                        label_source="test",
                        provenance={"status": "private-review-note"},
                    )
                )
    return records


def test_buckets_keep_maturity_and_hype_signal_explicit() -> None:
    assert stage_bucket("Массовое внедрение") == "mature"
    assert trend_bucket("Растёт быстро — в пресс-релизах") == "accelerating"


def test_classifier_returns_human_readable_predictors() -> None:
    positive = SignalRecord(
        "Новый научный сенсор", "Edge", "Есть независимые публикации и ранние патенты.",
        "Прототип/PoC", "Растёт быстро", "https://example.org/a https://example.org/b", 1,
    )
    classifier = SignalClassifier().fit([positive, *NEGATIVE_SEEDS])
    result = classifier.predict_with_explanation(positive)
    assert 0 <= result["weak_signal_probability"] <= 1
    assert result["key_predictors"]
    assert {"feature", "contribution"} <= result["key_predictors"][0].keys()


def test_classifier_caps_key_predictors_to_six() -> None:
    positive = SignalRecord(
        "Новый научный сенсор",
        "Edge",
        "Есть независимые публикации и ранние патенты.",
        "Прототип/PoC",
        "Растёт быстро",
        "https://example.org/a https://example.org/b",
        1,
    )
    classifier = SignalClassifier().fit([positive, *NEGATIVE_SEEDS])

    result = classifier.predict_with_explanation(positive, top_k=99)

    assert len(result["key_predictors"]) <= 6
    assert len(result["key_predictors"]) >= 3


def test_model_features_exclude_domain_rationale_and_provenance_by_default() -> None:
    record = SignalRecord(
        "Новый сенсор",
        "Служебный домен",
        "экспертная фраза",
        "Прототип",
        "Растёт быстро",
        "https://example.org/source",
        1,
        provenance={"status": "private-review-note"},
    )
    text = record.text()
    assert "domain_" not in text
    assert "экспертная" not in text
    assert "private-review-note" not in text
    assert "stage_prototype" in text


def test_normalized_names_and_metadata_do_not_enter_group_text() -> None:
    assert normalize_technology_name("  ИИ—платформа ") == "ии платформа"
    assert NEGATIVE_SEEDS[0].label_source == "illustrative_seed"


def test_evaluation_uses_disjoint_technology_groups_and_reports_ablation() -> None:
    records = grouped_records(repeats=2)
    report = SignalClassifier().evaluate(records, n_splits=4)
    assert report["protocol"] == "nested_stratified_group_cross_validation"
    assert report["primary"]["calibrated"]["overall"]["examples"] == len(records)
    assert len(report["primary"]["folds"]) == 4
    assert all(fold["group_overlap_count"] == 0 for fold in report["primary"]["folds"])
    assert "sources_only" in report["feature_ablation"]
    assert report["dataset_audit"]["duplicate_technology_names"]


def test_calibrated_model_round_trips_through_joblib(tmp_path: Path) -> None:
    records = grouped_records()
    model = SignalClassifier().fit_calibrated(records, n_splits=4)
    expected = model.predict_with_explanation(records[0])
    path = tmp_path / "classifier.joblib"
    model.save(path)
    restored = SignalClassifier.load(path)
    actual = restored.predict_with_explanation(records[0])
    assert actual["calibrated"] is True
    assert actual["weak_signal_probability"] == expected["weak_signal_probability"]
    assert actual["raw_probability"] == expected["raw_probability"]


def test_conflicting_labels_for_same_technology_are_rejected() -> None:
    records = grouped_records()
    original = records[0]
    records.append(
        SignalRecord(
            technology=original.technology,
            domain="",
            rationale="",
            stage="",
            mention_trend="",
            sources="",
            label=0,
            group_id=original.group_id,
        )
    )
    with pytest.raises(ValueError, match="разными метками"):
        SignalClassifier().evaluate(records, n_splits=3)
