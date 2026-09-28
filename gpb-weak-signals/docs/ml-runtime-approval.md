# Runtime approval gate for classifier confidence

The classifier is disabled by default. A trained artifact is not production
validation, and the 100 positive examples in the pilot workbook do not provide
the expert-approved negative labels required for a meaningful evaluation.

Runtime loading requires both:

1. `ETI_ENABLE_VALIDATED_CLASSIFIER=true` in the isolated runtime environment.
2. A hash-bound sidecar named `<model-path>.manifest.json` with all of the
   following fields:

```json
{
  "manifest_version": 1,
  "approved_for_runtime": true,
  "validation_status": "approved",
  "calibration_status": "calibrated",
  "model_format": "joblib",
  "model_version": "documented model version",
  "evaluation_version": "documented evaluation version",
  "validation_protocol": "documented independent protocol",
  "negative_label_source": "expert-approved negative dataset identifier",
  "reviewed_by": "named approver or review body",
  "reviewed_at": "YYYY-MM-DD",
  "artifact_sha256": "64-character SHA-256 of the exact model file",
  "evaluation_report_path": "evaluation-report.json",
  "evaluation_report_sha256": "64-character SHA-256 of the validation report"
}
```

Do not create an approved manifest until the organizer confirms the binary
target, experts approve representative negative labels, and an independent
grouped evaluation and calibration review are complete. Training scripts and
illustrative seed negatives do not satisfy this approval. Until then the
scoring pipeline receives no classifier, so model probabilities cannot
influence eligibility or be persisted as confidence.

The report path must remain next to the model artifact and both hashes must
match. Restart the scoring process after changing the manifest, report, or
runtime opt-in setting; the loader intentionally caches its decision.