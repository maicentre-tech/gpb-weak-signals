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
  published_at: string | null;
  mapping_score: number;
  mapping_status: string;
}

export interface SourceStatus {
  code: string;
  name: string;
  family: string;
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
  query: (domain: string, limit = 15) =>
    request<QueryResponse | JobResponse>("/query", {
      method: "POST",
      body: JSON.stringify({ domain, limit }),
    }),
  trend: (id: string) => request<TrendCard>(`/trends/${id}`),
  timeline: (id: string) => request<TimelinePoint[]>(`/trends/${id}/timeline`),
  sources: (id: string) => request<SourceReference[]>(`/trends/${id}/sources`),
  sourceStatus: () => request<SourceStatus[]>("/sources/status"),

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
  reviewLabel: (technologyId: string, label: string, reason?: string) =>
    request<{ ok: boolean; message: string }>(
      `/review/technologies/${technologyId}/label`,
      { method: "POST", body: JSON.stringify({ label, reason: reason ?? null }) },
    ),
};
