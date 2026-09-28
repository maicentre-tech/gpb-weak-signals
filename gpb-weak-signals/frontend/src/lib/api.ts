/**
 * Клиент API ETI.
 *
 * Типы намеренно повторяют контракты backend, включая поля, которые проще
 * было бы скрыть: passes_filters, warnings, versions, metric_status.
 * Интерфейс, показывающий рейтинг без пометки о том, что тот не прошёл
 * пороги §24.20, вводит аналитика в заблуждение сильнее, чем пустой экран.
 */

export interface TrendSummary {
  rank: number;
  technology_id: string;
  canonical_name: string;
  canonical_name_ru: string | null;
  emerging_score: number;
  strategic_relevance: number | null;
  strategic_priority: number | null;
  evidence_confidence: number;
  classifier_confidence: number | null;
  signal_status: string | null;
  exclusion_reason: string | null;
  maturity: string | null;
  passes_filters: boolean;
}

export interface QueryResponse {
  query_id: string;
  generated_at: string;
  as_of_date: string;
  normalized_query: string;
  scoring_version: string;
  dataset_version: string;
  strategic_relevance_configured: boolean;
  reference_population_size: number | null;
  total_results: number;
  offset: number;
  limit: number;
  has_more: boolean;
  results: TrendSummary[];
  warnings: string[];
}

export interface JobResponse {
  job_id: string;
  status: string;
  query_text: string;
  coverage_confidence: number | null;
  requested_at: string;
  message: string;
  result: DiscoveryJobResult | null;
}

export interface DiscoveryEvidence {
  document_id: string;
  source_code: string;
  source_family: string;
  title: string;
  url: string | null;
  document_type: string | null;
  language: string | null;
  matched_terms: string[];
  published_at?: string | null;
  original_title?: string | null;
  original_abstract?: string | null;
  original_abstract_truncated?: boolean;
  summary_ru?: string | null;
  summary_model_version?: string | null;
  is_generated_summary?: boolean | null;
  summary_source_id?: string | null;
  summary_evidence_quotes?: string[];
  summary_numbers_verified?: boolean | null;
  summary_review_status?: string | null;
  original_metadata?: Record<string, unknown>;
  trust_level?: string | null;
  trust_reason?: string | null;
  evidence_weight?: number | null;
  license_status?: string | null;
  allows_derivative_analytics?: boolean | null;
}

export interface DiscoveryCandidate {
  candidate_id: string;
  suggested_name: string;
  evidence: DiscoveryEvidence[];
  document_count: number;
  source_family_counts: Record<string, number>;
  source_code_counts: Record<string, number>;
  independent_source_family_count: number;
  discovery_score: number;
  score_components: Record<string, number>;
  status: string;
  eligibility_reason: string;
  query: string;
  discovery_version: string;
  early_warning_document_count?: number;
  confirmed_emerging_document_count?: number;
  document_delta?: number;
  review_only?: boolean;
  classifier_confidence?: number | null;
  classifier_status?: string;
  report_claims?: Partial<
    Record<"problem" | "advantage" | "case", DiscoveryReportExcerpt>
  >;
}

export interface DiscoveryReportExcerpt {
  text: string | null;
  source_doc_ids: string[];
}

export interface DiscoverySourceCoverage {
  p0_required: string[];
  p0_registered: string[];
  p0_searched: string[];
  p0_missing_adapters: string[];
  p0_not_approved: string[];
  news_source: {
    code: string | null;
    priority: string;
    searched: boolean;
  };
}

export interface DiscoverySourceStatus {
  code: string;
  status: "adapter_missing" | "blocked" | "ready" | "searched" | "partial" | "failed";
  message: string;
}

export interface DiscoveryTechnologyMatch {
  technology_id: string;
  canonical_name: string;
  canonical_name_ru: string | null;
  confidence: "high" | "medium";
  reason: string;
}

export interface CandidateMappingReview {
  id: string;
  candidate_id: string;
  job_id: string | null;
  candidate_name: string;
  suggested_technology_id: string;
  suggested_technology_name: string;
  decision: "confirm" | "reject" | "reassign";
  replacement_technology_id: string | null;
  evidence: Array<Record<string, unknown>>;
  provenance: Record<string, unknown>;
  reviewer_id: string;
  reason: string | null;
  reviewed_at: string;
}

export interface DiscoveryJobResult {
  query: string;
  candidates: DiscoveryCandidate[];
  discovery_version: string;
  searched_sources: string[];
  warnings: string[];
  fetched_document_count: number;
  search_scope?: "approved_project_sources_metadata_only";
  query_plan?: {
    normalized_topic: string;
    search_queries: string[];
    technology_matches: DiscoveryTechnologyMatch[];
  } | null;
  candidate_matches?: Array<
    DiscoveryTechnologyMatch & { candidate_id: string }
  >;
  candidate_mapping_status?: "not_run" | "not_needed" | "matched" | "no_confident_matches" | "unavailable";
  source_statuses?: DiscoverySourceStatus[];
  ranking?: {
    method: string;
    is_probability: boolean;
    classifier_confidence: number | null;
    classifier_status: string;
  };
  top_n?: number;
  ontology_updated?: boolean;
  source_coverage?: DiscoverySourceCoverage;
}

export interface SignalStats {
  snapshot_available: boolean;
  candidates: number;
  eligible: number;
  confidence_over_75: number;
  mature_excluded: number;
  hype_suspected: number;
  noise_excluded: number;
}

export interface SignalProfile {
  novelty: number | null;
  growth: number | null;
  acceleration: number | null;
  research: number | null;
  patent: number | null;
  citation: number | null;
  market: number | null;
  adoption: number | null;
  cross_domain: number | null;
}

export interface Claim {
  text: string;
  claim_type: string;
  source_doc_ids: string[];
  metric_provenance: string | null;
}

export interface TrendCard {
  technology_id: string;
  canonical_name: string;
  as_of_date: string;
  maturity: string | null;
  scores: SignalProfile;
  emerging_score: number;
  evidence_confidence: number;
  classifier_confidence: number | null;
  signal_status: string | null;
  exclusion_reason: string | null;
  key_predictors: Array<{ feature: string; contribution: number }>;
  strategic_relevance: number | null;
  effective_weights: Record<string, number>;
  metric_status: Record<string, string>;
  problem: Claim;
  advantage: Claim;
  case: Claim;
  evidence: Claim[];
  caveats: Claim[];
  evidence_set_hash: string;
  verification_passed: boolean;
  summary_language: string;
  is_generated_summary: boolean;
  claim_source_coverage: number;
  versions: Record<string, string>;
}

export interface TimelinePoint {
  period_start: string;
  papers: number;
  preprints: number;
  patent_families: number;
  rd_projects: number;
  github_repos: number;
  news_mentions: number;
  citations: number;
}

export interface SourceReference {
  document_id: string;
  title: string | null;
  url: string | null;
  source_code: string;
  source_name: string;
  source_type: string;
  source_family: string;
  language_original: string | null;
  trust_level: string;
  trust_score: number;
  trust_reason: string;
  published_at: string | null;
  retrieved_at: string | null;
  original_title: string | null;
  summary_ru: string | null;
  summary_model_version: string | null;
  is_generated_summary: boolean;
  summary_source_id?: string | null;
  summary_evidence_quotes?: string[];
  summary_numbers_verified?: boolean | null;
  summary_review_status?: string | null;
  mapping_score: number;
  mapping_status: string;
}

export interface SourceStatus {
  code: string;
  name: string;
  family: string;
  adapter_implemented: boolean;
  live_search_ready: boolean;
  license_status: string;
  enabled: boolean;
  documents: number;
  coverage_start: string | null;
  coverage_end: string | null;
  lag_days: number | null;
  last_run_status: string | null;
  last_run_at: string | null;
  blocked_reason: string | null;
}

export interface QueueItem {
  mapping_id: string;
  document_id: string;
  document_title: string | null;
  document_abstract: string | null;
  document_url: string | null;
  source_code: string;
  published_at: string | null;
  technology_id: string;
  technology_name: string;
  mapping_score: number;
  mapping_method: string;
  mapping_status: string;
  score_components: {
    components?: Record<string, number>;
    effective_weights?: Record<string, number>;
    evidence_coverage?: number;
    reason?: string;
  };
  evidence_coverage: number | null;
  days_in_queue: number;
}

export interface QueueResponse {
  total: number;
  items: QueueItem[];
  stats: Record<string, number>;
}

export interface TechnologyOption {
  technology_id: string;
  canonical_name: string;
  canonical_name_ru: string | null;
  status: string;
}

export interface ReviewStats {
  mappings_by_status: Record<string, number>;
  feedback_by_decision: Record<string, number>;
  reviewers: number;
  oldest_pending_at: string | null;
  note: string;
}

export interface HealthResponse {
  status: string;
  database: string;
  documents: number;
  technologies: number;
  latest_scoring: string | null;
  public_read_only: boolean;
}

export function isJob(value: QueryResponse | JobResponse): value is JobResponse {
  return "job_id" in value;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`${response.status}: ${detail.slice(0, 200)}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  health: () => request<HealthResponse>("/health"),
  query: (domain: string, limit = 50, offset = 0, asOfDate?: string) =>
    request<QueryResponse | JobResponse>("/query", {
      method: "POST",
      body: JSON.stringify({ domain, limit, offset, as_of_date: asOfDate }),
    }),
  getJob: (jobId: string) => request<JobResponse>(`/jobs/${jobId}`),
  trend: (id: string) => request<TrendCard>(`/trends/${id}`),
  timeline: (id: string) => request<TimelinePoint[]>(`/trends/${id}/timeline`),
  sources: (id: string) => request<SourceReference[]>(`/trends/${id}/sources`),
  sourceStatus: () => request<SourceStatus[]>("/sources/status"),
  signalStats: () => request<SignalStats>("/signals/stats"),

  reviewQueue: (limit = 25, offset = 0) =>
    request<QueueResponse>(`/review/queue?limit=${limit}&offset=${offset}`),
  reviewTechnologies: () => request<TechnologyOption[]>("/review/technologies"),
  reviewStats: () => request<ReviewStats>("/review/stats"),
  reviewDecide: (
    mappingId: string,
    decision: "confirm" | "reject" | "reassign",
    newTechnologyId?: string,
    reason?: string,
  ) =>
    request<{ ok: boolean; message: string }>(`/review/mappings/${mappingId}/decision`, {
      method: "POST",
      body: JSON.stringify({
        decision,
        new_technology_id: newTechnologyId ?? null,
        reason: reason ?? null,
      }),
    }),
  reviewCandidateMappings: (candidateId?: string) =>
    request<CandidateMappingReview[]>(
      `/review/candidate-mappings${candidateId ? `?candidate_id=${encodeURIComponent(candidateId)}` : ""}`,
    ),
  decideCandidateMapping: (body: {
    candidate_id: string;
    job_id?: string | null;
    candidate_name: string;
    suggested_technology_id: string;
    suggested_technology_name: string;
    decision: "confirm" | "reject" | "reassign";
    replacement_technology_id?: string | null;
    evidence: Array<Record<string, unknown>>;
    provenance: Record<string, unknown>;
    reason?: string | null;
  }) =>
    request<CandidateMappingReview>("/review/candidate-mappings/decision", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  reviewLabel: (technologyId: string, label: string, reason?: string) =>
    request<{ ok: boolean; message: string }>(
      `/review/technologies/${technologyId}/label`,
      { method: "POST", body: JSON.stringify({ label, reason: reason ?? null }) },
    ),
};
