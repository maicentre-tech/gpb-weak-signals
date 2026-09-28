"""Загрузка обученного P0-классификатора для scoring-контура."""

from __future__ import annotations

import hashlib
import json
from functools import lru_cache
import os
from datetime import date
from pathlib import Path
from typing import Any

from eti.ml.signal_classifier import SignalClassifier


@lru_cache(maxsize=1)
def load_runtime_classifier(path: str = "artifacts/signal_classifier.joblib") -> SignalClassifier | None:
    model_path = Path(path)
    if not model_path.is_file() or not _runtime_approval_is_valid(model_path):
        return None
    try:
        return SignalClassifier.load(model_path)
    except Exception:
        # A bad or incompatible artifact must not break scoring or become a
        # silent source of candidate rejections.
        return None


def _runtime_approval_is_valid(model_path: Path) -> bool:
    """Require an explicit, hash-bound expert approval before any prediction."""
    if os.getenv("ETI_ENABLE_VALIDATED_CLASSIFIER", "").casefold() not in {
        "1",
        "true",
        "yes",
    }:
        return False

    manifest_path = Path(f"{model_path}.manifest.json")
    try:
        manifest: Any = json.loads(manifest_path.read_text(encoding="utf-8"))
        if not isinstance(manifest, dict):
            return False
        if manifest.get("manifest_version") != 1:
            return False
        if manifest.get("approved_for_runtime") is not True:
            return False
        if manifest.get("validation_status") != "approved":
            return False
        if manifest.get("calibration_status") != "calibrated":
            return False
        if manifest.get("model_format") != "joblib":
            return False

        required_text = (
            "model_version",
            "evaluation_version",
            "validation_protocol",
            "negative_label_source",
            "reviewed_by",
            "reviewed_at",
            "evaluation_report_path",
        )
        if any(
            not isinstance(manifest.get(key), str)
            or not manifest[key].strip()
            or manifest[key].strip().casefold() in {"unknown", "pending", "none"}
            for key in required_text
        ):
            return False
        if any(
            marker in manifest["negative_label_source"].casefold()
            for marker in ("illustrative", "seed")
        ):
            return False
        try:
            date.fromisoformat(manifest["reviewed_at"])
        except ValueError:
            return False

        expected_hash = manifest.get("artifact_sha256")
        if not isinstance(expected_hash, str) or len(expected_hash) != 64:
            return False
        if _sha256_file(model_path) != expected_hash.casefold():
            return False

        report_hash = manifest.get("evaluation_report_sha256")
        if not isinstance(report_hash, str) or len(report_hash) != 64:
            return False
        report_path = (model_path.parent / manifest["evaluation_report_path"]).resolve()
        if model_path.parent.resolve() not in report_path.parents or not report_path.is_file():
            return False
        return _sha256_file(report_path) == report_hash.casefold()
    except (OSError, ValueError, TypeError):
        return False


def _sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as artifact:
        for chunk in iter(lambda: artifact.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()
