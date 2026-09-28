"""Контракты API (§10, §10.1).

Отличие от §10: ключом выдачи является ``technology_id``, а не
``cluster_id`` — по ADR-002 стабильной аналитической сущностью признана
каноническая технология, а кластеры версионируются.
"""

from __future__ import annotations

import uuid
from datetime import date, datetime
from typing import Any

from pydantic import BaseModel, Field


class QueryFilters(BaseModel):
    maturity: list[str] | None = None
    min_confidence: float | None = None


class QueryRequest(BaseModel):
    domain: str = Field(..., description="Технологическое направление, RU или EN")
    year_from: int | None = None
    year_to: int | None = None
    limit: int = Field(default=50, ge=1, le=50)
    offset: int = Field(default=0, ge=0)
    as_of_date: date | None = None
    profile: str | None = None
    filters: QueryFilters = Field(default_factory=QueryFilters)


class TrendSummary(BaseModel):
    rank: int
    technology_id: uuid.UUID
    canonical_name: str
    canonical_name_ru: str | None = None
    emerging_score: float
    strategic_relevance: float | None = None
    strategic_priority: float | None = None
    evidence_confidence: float
    classifier_confidence: float | None = None
    signal_status: str | None = None
    exclusion_reason: str | None = None
    maturity: str | None = None
    passes_filters: bool
    """§24.20: технология может попасть в ответ, не пройдя пороги.
    Скрывать её молча хуже, чем показать с пометкой."""


class QueryResponse(BaseModel):
    query_id: uuid.UUID
    generated_at: datetime
    as_of_date: date
    normalized_query: str
    scoring_version: str
    dataset_version: str
    strategic_relevance_configured: bool
    """ADR-005: если матрица не передана, ранжирование идёт по ETS, и
    клиент обязан это показать, а не выдать ETS за стратегический приоритет."""
    reference_population_size: int | None = None
    total_results: int
    offset: int
    limit: int
    has_more: bool
    results: list[TrendSummary]
    warnings: list[str] = Field(default_factory=list)


class SignalStats(BaseModel):
    """Счётчики для главного экрана по последнему snapshot."""

    snapshot_available: bool
    candidates: int
    eligible: int
    confidence_over_75: int
    mature_excluded: int
    hype_suspected: int
    noise_excluded: int


class JobResponse(BaseModel):
    """§31: непокрытое направление уходит в асинхронную задачу."""

    job_id: uuid.UUID
    status: str
    query_text: str
    coverage_confidence: float | None = None
    requested_at: datetime
    message: str
    result: dict[str, Any] | None = None


class SignalProfile(BaseModel):
    novelty: float | None = None
    growth: float | None = None
    acceleration: float | None = None
    research: float | None = None
    patent: float | None = None
    citation: float | None = None
    market: float | None = None
    adoption: float | None = None
    cross_domain: float | None = None


class TimelinePoint(BaseModel):
    period_start: date
    papers: int
    preprints: int
    patent_families: int
    rd_projects: int
    github_repos: int
    news_mentions: int
    citations: int


class SourceReference(BaseModel):
    document_id: uuid.UUID
    title: str | None
    url: str | None
    source_code: str
    source_name: str
    source_type: str
    source_family: str
    language_original: str | None
    trust_level: str
    trust_score: float
    trust_reason: str
    published_at: datetime | None
    retrieved_at: datetime | None
    original_title: str | None
    summary_ru: str | None
    summary_model_version: str | None
    is_generated_summary: bool
    summary_source_id: str | None = None
    summary_evidence_quotes: list[str] = Field(default_factory=list)
    summary_numbers_verified: bool | None = None
    summary_review_status: str | None = None
    mapping_score: float
    mapping_status: str


class ClaimOut(BaseModel):
    text: str
    claim_type: str
    source_doc_ids: list[uuid.UUID]
    metric_provenance: str | None = None


class TrendCardResponse(BaseModel):
    technology_id: uuid.UUID
    canonical_name: str
    as_of_date: date
    maturity: str | None
    scores: SignalProfile
    emerging_score: float
    evidence_confidence: float
    classifier_confidence: float | None = None
    signal_status: str | None = None
    exclusion_reason: str | None = None
    key_predictors: list[dict[str, float | str]] = Field(default_factory=list)
    strategic_relevance: float | None
    effective_weights: dict[str, float]
    metric_status: dict[str, str]
    problem: ClaimOut
    advantage: ClaimOut
    case: ClaimOut
    evidence: list[ClaimOut]
    caveats: list[ClaimOut]
    evidence_set_hash: str
    verification_passed: bool
    summary_language: str
    is_generated_summary: bool
    claim_source_coverage: float
    versions: dict[str, str]


class SourceStatus(BaseModel):
    code: str
    name: str
    family: str
    adapter_implemented: bool
    live_search_ready: bool
    expert_processing_ready: bool = False
    license_status: str
    rights_review_status: str = "not_reviewed"
    license_review_due_at: date | None = None
    requested_fields: tuple[str, ...] = ()
    required_operations: tuple[str, ...] = ()
    expert_operations: tuple[str, ...] = ()
    enabled: bool
    documents: int
    coverage_start: date | None
    coverage_end: date | None
    lag_days: int | None
    last_run_status: str | None
    last_run_at: datetime | None
    blocked_reason: str | None = None


class HealthResponse(BaseModel):
    status: str
    database: str
    documents: int
    technologies: int
    latest_scoring: date | None
    public_read_only: bool
