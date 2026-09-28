from __future__ import annotations

import hashlib
import json

import pytest

from eti.ml import runtime


@pytest.fixture(autouse=True)
def clear_runtime_cache() -> None:
    runtime.load_runtime_classifier.cache_clear()
    yield
    runtime.load_runtime_classifier.cache_clear()


def _approved_manifest(artifact: bytes) -> dict[str, object]:
    report = b'{"evaluation":"approved"}'
    return {
        "manifest_version": 1,
        "approved_for_runtime": True,
        "validation_status": "approved",
        "calibration_status": "calibrated",
        "model_format": "joblib",
        "model_version": "test-model-v1",
        "evaluation_version": "test-eval-v1",
        "validation_protocol": "grouped-oof-v1",
        "negative_label_source": "expert-approved-corpus-v1",
        "reviewed_by": "review-board",
        "reviewed_at": "2026-09-26",
        "artifact_sha256": hashlib.sha256(artifact).hexdigest(),
        "evaluation_report_path": "evaluation-report.json",
        "evaluation_report_sha256": hashlib.sha256(report).hexdigest(),
    }


def _write_approved_manifest(model, artifact: bytes) -> None:
    report = b'{"evaluation":"approved"}'
    model.parent.joinpath("evaluation-report.json").write_bytes(report)
    model.with_name(model.name + ".manifest.json").write_text(
        json.dumps(_approved_manifest(artifact)), encoding="utf-8"
    )


def test_unapproved_model_artifact_is_not_loaded(tmp_path, monkeypatch) -> None:
    model = tmp_path / "classifier.joblib"
    model.write_bytes(b"placeholder-model")
    monkeypatch.setenv("ETI_ENABLE_VALIDATED_CLASSIFIER", "true")
    monkeypatch.setattr(
        runtime.SignalClassifier,
        "load",
        staticmethod(lambda _path: pytest.fail("loaded")),
    )

    assert runtime.load_runtime_classifier(str(model)) is None


def test_runtime_opt_in_is_required_even_with_approved_manifest(tmp_path, monkeypatch) -> None:
    model = tmp_path / "classifier.joblib"
    artifact = b"placeholder-model"
    model.write_bytes(artifact)
    _write_approved_manifest(model, artifact)
    monkeypatch.delenv("ETI_ENABLE_VALIDATED_CLASSIFIER", raising=False)
    monkeypatch.setattr(
        runtime.SignalClassifier,
        "load",
        staticmethod(lambda _path: pytest.fail("loaded")),
    )

    assert runtime.load_runtime_classifier(str(model)) is None


def test_validated_manifest_must_match_exact_artifact(tmp_path, monkeypatch) -> None:
    model = tmp_path / "classifier.joblib"
    artifact = b"placeholder-model"
    model.write_bytes(artifact)
    manifest = _approved_manifest(artifact)
    manifest["artifact_sha256"] = "0" * 64
    model.parent.joinpath("evaluation-report.json").write_bytes(
        b'{"evaluation":"approved"}'
    )
    (tmp_path / "classifier.joblib.manifest.json").write_text(
        json.dumps(manifest), encoding="utf-8"
    )
    monkeypatch.setenv("ETI_ENABLE_VALIDATED_CLASSIFIER", "true")
    monkeypatch.setattr(
        runtime.SignalClassifier,
        "load",
        staticmethod(lambda _path: pytest.fail("loaded")),
    )

    assert runtime.load_runtime_classifier(str(model)) is None


def test_only_fully_approved_calibrated_artifact_is_loaded(tmp_path, monkeypatch) -> None:
    model = tmp_path / "classifier.joblib"
    artifact = b"placeholder-model"
    model.write_bytes(artifact)
    _write_approved_manifest(model, artifact)
    sentinel = object()
    monkeypatch.setenv("ETI_ENABLE_VALIDATED_CLASSIFIER", "true")
    monkeypatch.setattr(
        runtime.SignalClassifier, "load", staticmethod(lambda _path: sentinel)
    )

    assert runtime.load_runtime_classifier(str(model)) is sentinel


def test_uncalibrated_artifact_is_not_loaded(tmp_path, monkeypatch) -> None:
    model = tmp_path / "classifier.joblib"
    artifact = b"placeholder-model"
    model.write_bytes(artifact)
    manifest = _approved_manifest(artifact)
    manifest["calibration_status"] = "not_calibrated"
    model.parent.joinpath("evaluation-report.json").write_bytes(
        b'{"evaluation":"approved"}'
    )
    (tmp_path / "classifier.joblib.manifest.json").write_text(
        json.dumps(manifest), encoding="utf-8"
    )
    monkeypatch.setenv("ETI_ENABLE_VALIDATED_CLASSIFIER", "true")
    monkeypatch.setattr(
        runtime.SignalClassifier,
        "load",
        staticmethod(lambda _path: pytest.fail("loaded")),
    )

    assert runtime.load_runtime_classifier(str(model)) is None