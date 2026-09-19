"""Загрузка обученного P0-классификатора для scoring-контура."""

from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from eti.ml.signal_classifier import SignalClassifier


@lru_cache(maxsize=1)
def load_runtime_classifier(path: str = "artifacts/signal_classifier.joblib") -> SignalClassifier | None:
    model_path = Path(path)
    return SignalClassifier.load(model_path) if model_path.is_file() else None
