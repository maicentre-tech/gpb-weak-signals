# ML candidate labels and evaluation

## Label rules

The benchmark workbook contains 100 positive expert examples. It does not label
non-signals. The 18 examples in `NEGATIVE_SEEDS` are illustrative counterexamples,
not organizer labels and not evidence of production accuracy.

`scripts/build_corpus_negatives.py` exports candidates from the latest
`trend_scores` snapshot. It:

- keeps `mature_excluded`, `hype_suspected`, and `noise_excluded` as separate
  candidate categories;
- excludes technology names and aliases already present in the positive workbook;
- carries snapshot date, technology ID, exclusion reason, scores, accepted mapping
  provenance, source families, document types, URLs, and document IDs;
- includes only non-deleted documents with `available_from` before the day after
  the score snapshot, so later evidence cannot leak into earlier snapshots;
- exports no document text.

Every exported record starts as `review_status: "pending"`. These statuses are
rule-generated candidates, not confirmed negative labels. Before training, an
expert must set `review_status` to `"approved"` and supply `review.reviewed_by`,
`review.reviewed_at`, and `review.reason`. Rejected and pending candidates are
excluded from training. The loader also rejects missing provenance and exact
technology-name overlap with the positive workbook.

## Target decision and workbook audit

For the current v1.5 acceptance experiment, the target is fixed as binary
`weak_signal` vs `non_signal`: the 100 expert-labeled workbook examples are positive;
only expert-approved negatives from the same or a comparable corpus may be
labelled `non_signal`. The workbook score is not thresholded to manufacture
negative labels. This is a protocol decision, not a model-quality claim. If the
organizers confirm that the hidden evaluation instead targets the 3–7 score, a
separate ordinal/regression protocol must be agreed before training against it.

The supplied workbook audit found 100 rows, 100 distinct normalized technology
names, and no duplicate names. The score distribution is 3: 7, 4: 22, 5: 28,
6: 28, 7: 15. Its column is explicitly named `Балл (стадия+тренд)`: the score is
composite, so predicting that score while using stage or trend as inputs would
leak the target. The current target is binary instead; the score stays audit
metadata, and any use of stage/trend still requires the same-corpus negative
review and shortcut audit described above.

As a descriptive check using the classifier's existing coarse buckets, the 100
positives comprise 35 early-adoption, 1 mature, 23 pilot, 32 prototype, and 9
research records. Mean workbook scores by those buckets are 6.40, 7.00, 5.30,
4.34, and 3.33 respectively. Trend buckets contain 37 accelerating and 63
growing records, with mean scores 5.89 and 4.83. These associations are expected
to be strong because the source workbook defines its score from stage and trend;
they are not evidence that a binary classifier generalizes.

Explanation requests are bounded to 3–6 predictors, and existing API/card
results are truncated to six. Only non-zero contributions are returned; the
display does not pad an explanation with fabricated zero-contribution factors.

## Commands

From `gpb-weak-signals/`, with the project database configured:

```bash
PYTHONPATH=src python scripts/build_corpus_negatives.py \
  --out artifacts/corpus_negatives.json
```

After expert review:

```bash
PYTHONPATH=src python scripts/train_signal_classifier.py \
  docs/original/100_слабых_сигналов_2026-09.xlsx \
  --corpus-negatives artifacts/corpus_negatives.json
```

For a clearly labeled smoke test only, the existing hand-authored seeds can be
selected explicitly:

```bash
PYTHONPATH=src python scripts/train_signal_classifier.py \
  docs/original/100_слабых_сигналов_2026-09.xlsx \
  --use-seed-negatives
```

The trainer refuses to start without an explicit negative-source option. It does
not fall back from missing reviewed corpus examples to the seeds.

## Evaluation protocol

- Outer validation uses stratified group cross-validation, capped at five folds
  and at the number of independent groups in the smaller class.
- A technology and its repeated rows remain in one fold. Group IDs are preferred;
  normalized technology names are the fallback.
- Vectorization and logistic regression are fitted inside each fold.
- Probability calibration uses a sigmoid fitted on grouped out-of-fold scores
  from the outer training portion only. The decision threshold remains 0.5; it is
  not selected on the held-out fold.
- Reports include accuracy, balanced accuracy, precision, recall, F1, average
  precision (PR-AUC summary), confusion matrix, Brier score, and expected
  calibration error.
- Feature ablations include name-free, source-only, domain-only, and
  rationale-only checks. Provenance, source status, and review fields are never
  model features.

The default model uses only technology name, maturity bucket, and trend bucket.
It excludes free-text rationale because the benchmark contains prose while
production scoring supplies numeric score text; it excludes domain because the
current production value is a constant; and it excludes source count because
production currently supplies a synthetic evidence placeholder. These fields
remain visible to the audit.

## Current result and limitation

A smoke test on the 100 positives plus 18 illustrative seeds produced 0.9915
accuracy and 0.9999 average precision under the grouped nested protocol. This
does **not** establish useful model quality: a source-only ablation reached
0.9985 average precision and a rationale-only ablation reached 0.9984. The seeds
and workbook encode different source and writing patterns. The report therefore
flags both shortcuts, and the result must not be presented as the hackathon
accuracy claim.

The current workspace does not include a connection to the project's PostgreSQL
corpus or an export of the reported 835 documents. No corpus candidate count,
expert-reviewed negative set, or corpus-based performance result has been
produced here. The export command was retried with a temporary output path; the
connection to `127.0.0.1:5432` was refused, so no candidate export was written.
To unblock AC-01, provide access to an approved PostgreSQL snapshot with scoring,
mapping, document, and source evidence, expert review decisions for the exported
candidates, and confirmation that the organizer's evaluation target is binary.

Until those conditions are met, API responses omit classifier probability for
snapshot cards as well as discovery candidates. Discovery scores remain
transparent heuristic indices, and all newly discovered candidates remain
review-only.
