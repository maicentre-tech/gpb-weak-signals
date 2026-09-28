const assert = require("node:assert/strict");
const path = require("node:path");
const test = require("node:test");

const buildDir = process.env.ETI_REPORT_BUILD_DIR;
const { api } = require(path.join(buildDir, "src/lib/api.js"));
const {
  classifierConfidenceLabel,
  discoveryReportBackHref,
  discoveryReportHref,
  findReportCandidate,
  jobStatusLabel,
  metadataValue,
  resolveReportExcerpt,
  sourceStatusLabel,
} = require(path.join(buildDir, "src/lib/discovery-report.js"));

test("a report link can be opened directly and reloaded from the saved job", async () => {
  const jobId = "b808a0f0-7a7c-4c11-8f53-6534ec6ad010";
  const candidateId = "candidate-42";
  const savedJob = {
    job_id: jobId,
    status: "completed",
    result: {
      candidates: [{ candidate_id: candidateId, suggested_name: "Example" }],
    },
  };
  const originalFetch = globalThis.fetch;
  const requestedUrls = [];
  globalThis.fetch = async (url) => {
    requestedUrls.push(String(url));
    return new Response(JSON.stringify(savedJob), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const href = discoveryReportHref(jobId, candidateId);
    assert.equal(href, `/discovery/${jobId}/candidate-42`);
    assert.equal(discoveryReportBackHref(jobId), `/?job=${jobId}#open-search-results`);

    // A direct page open and a browser reload both re-read the persisted job.
    const firstOpen = await api.getJob(jobId);
    const reloaded = await api.getJob(jobId);
    assert.equal(findReportCandidate(firstOpen, candidateId)?.suggested_name, "Example");
    assert.equal(findReportCandidate(reloaded, candidateId)?.suggested_name, "Example");
    assert.deepEqual(requestedUrls, [
      `/api/v1/jobs/${jobId}`,
      `/api/v1/jobs/${jobId}`,
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("report excerpts require a known source and exact original text", () => {
  const evidence = [
    {
      document_id: "paper-1",
      original_abstract: "The method reduces energy consumption by 20%.",
    },
  ];
  const supported = resolveReportExcerpt(
    {
      text: "The method reduces energy consumption by 20%.",
      source_doc_ids: ["paper-1"],
    },
    evidence,
  );
  assert.equal(supported?.text, "The method reduces energy consumption by 20%.");

  assert.equal(
    resolveReportExcerpt(
      {
        text: "The method reduces energy consumption by 90%.",
        source_doc_ids: ["paper-1"],
      },
      evidence,
    ),
    null,
  );
  assert.equal(
    resolveReportExcerpt(
      {
        text: "The method reduces energy consumption by 20%.",
        source_doc_ids: ["unknown-document"],
      },
      evidence,
    ),
    null,
  );
});

test("missing metadata and workflow states have Russian fallbacks", () => {
  assert.equal(metadataValue(null, "не указана"), "не указана");
  assert.equal(jobStatusLabel("running"), "Выполняется");
  assert.equal(sourceStatusLabel("adapter_missing"), "Адаптер отсутствует");
});

test("unvalidated candidate scores are never shown as percentages", () => {
  assert.equal(
    classifierConfidenceLabel(0.97, "not_run_no_validated_candidate_model"),
    "не показывается: модель кандидатов не прошла валидацию",
  );
  assert.equal(
    classifierConfidenceLabel(0.97, "unknown"),
    "не показывается: модель кандидатов не прошла валидацию",
  );
  assert.equal(classifierConfidenceLabel(0.97, "validated"), "97%");
});