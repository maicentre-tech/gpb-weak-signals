"""Обучает и документирует baseline-классификатор для P0 хакатона."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from eti.ml.corpus_dataset import (
    audit_candidate_dataset,
    load_approved_corpus_negatives,
    select_balanced_negatives,
)
from eti.ml.signal_classifier import NEGATIVE_SEEDS, SignalClassifier, load_positive_signals


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("dataset", type=Path, help="xlsx с 100 экспертными сигналами")
    negative_source = parser.add_mutually_exclusive_group(required=True)
    negative_source.add_argument(
        "--corpus-negatives",
        type=Path,
        help="версионированный JSON; в обучение попадут только записи со статусом approved",
    )
    negative_source.add_argument(
        "--use-seed-negatives",
        action="store_true",
        help="явно включить только illustrative seeds для воспроизводимого тестового baseline",
    )
    parser.add_argument("--model-out", type=Path, default=Path("artifacts/signal_classifier.joblib"))
    parser.add_argument("--report-out", type=Path, default=Path("artifacts/signal_classifier_report.json"))
    parser.add_argument("--folds", type=int, default=5)
    args = parser.parse_args()

    positives = load_positive_signals(args.dataset)
    corpus_audit = None
    if args.corpus_negatives:
        raw_dataset = json.loads(args.corpus_negatives.read_text(encoding="utf-8"))
        corpus_audit = audit_candidate_dataset(raw_dataset)
        negatives = load_approved_corpus_negatives(
            args.corpus_negatives, positive_records=positives
        )
        negatives = select_balanced_negatives(
            negatives, target_count=len(positives), random_state=42
        )
        negative_source_name = "expert_reviewed_corpus"
    else:
        negatives = list(NEGATIVE_SEEDS)
        negative_source_name = "illustrative_seed_only"

    records = [*positives, *negatives]
    classifier = SignalClassifier()
    report = classifier.evaluate(records, n_splits=args.folds)
    classifier.fit_calibrated(records, n_splits=args.folds)
    classifier.save(args.model_out)
    report["dataset"] = {
        "positive_examples": len(positives),
        "negative_examples": len(negatives),
        "negative_source": negative_source_name,
        "positive_label_source": "expert_benchmark",
        "negative_label_sources": sorted({record.label_source for record in negatives}),
        "candidate_audit": corpus_audit,
    }
    if args.use_seed_negatives:
        report["training_warning"] = (
            "Модель обучена на illustrative seeds, а не на подтверждённых экспертами "
            "корпусных негативах. Метрики нельзя трактовать как качество production."
        )
    args.report_out.parent.mkdir(parents=True, exist_ok=True)
    args.report_out.write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
