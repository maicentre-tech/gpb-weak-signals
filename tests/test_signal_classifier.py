from __future__ import annotations

from eti.ml.signal_classifier import NEGATIVE_SEEDS, SignalClassifier, SignalRecord, stage_bucket, trend_bucket


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
