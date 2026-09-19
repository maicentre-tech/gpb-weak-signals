"""Обучает и документирует baseline-классификатор для P0 хакатона."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from eti.ml.signal_classifier import NEGATIVE_SEEDS, SignalClassifier, load_positive_signals


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset", type=Path, help="xlsx с 100 экспертными сигналами")
    parser.add_argument("--model-out", type=Path, default=Path("artifacts/signal_classifier.joblib"))
    parser.add_argument("--report-out", type=Path, default=Path("artifacts/signal_classifier_report.json"))
    args = parser.parse_args()

    positives = load_positive_signals(args.dataset)
    records = [*positives, *NEGATIVE_SEEDS]
    classifier = SignalClassifier()
    report = classifier.evaluate(records)
    classifier.fit(records)
    classifier.save(args.model_out)
    args.report_out.parent.mkdir(parents=True, exist_ok=True)
    args.report_out.write_text(
        json.dumps(
            {**report, "positive_examples": len(positives), "negative_examples": len(NEGATIVE_SEEDS)},
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
