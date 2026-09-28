"""Bounded open-source search for reviewable discovery candidates."""

from __future__ import annotations

import asyncio
from dataclasses import replace
from datetime import UTC, date, datetime
from typing import Any
import uuid

import httpx
from sqlalchemy import select

from eti.config import Settings
from eti.db.models import AnalysisJob, Source, Technology, TechnologyAlias
from eti.db.session import session_scope
from eti.discovery.extractor import DiscoveryDocument, discover_candidates
from eti.discovery.query_planner import (
    QueryPlanningError,
    TechnologyContext,
    create_query_plan,
    match_candidates_to_technologies,
)
from eti.discovery.summarizer import is_foreign_language, summarize_eligible_documents
from eti.ingestion.ratelimit import RateLimiter
from eti.sources.arxiv import ArxivConnector
from eti.sources.base import Connector
from eti.sources.gdelt import GdeltConnector
from eti.sources.github import GitHubConnector
from eti.sources.openalex import OpenAlexConnector
from eti.sources.p0 import (
    CrossrefConnector,
    GhArchiveConnector,
    HuggingFaceConnector,
    NpmConnector,
    PyPIConnector,
    SemanticScholarConnector,
)
from eti.source_policy import evaluate_source_policy, source_review_status

CONNECTORS: dict[str, type[Connector]] = {
    connector.code: connector
    for connector in (
        OpenAlexConnector,
        ArxivConnector,
        GitHubConnector,
        GdeltConnector,
        CrossrefConnector,
        SemanticScholarConnector,
        GhArchiveConnector,
        HuggingFaceConnector,
        PyPIConnector,
        NpmConnector,
    )
}
LIVE_SEARCH_SOURCE_CODES = frozenset({"openalex", "arxiv", "github", "gdelt"})
BASE_LIVE_OPERATIONS = frozenset(
    {
        "live_query",
        "fetch",
        "normalize",
        "derive_candidates",
        "persist_job_result",
        "public_display",
    }
)
EXPERT_LIVE_OPERATIONS = frozenset(
    {"external_llm_processing", "generate_summary", "ontology_matching"}
)
LIVE_CONNECTOR_CONTRACTS: dict[str, dict[str, frozenset[str]]] = {
    "openalex": {
        "fields": frozenset(
            {
                "external_id",
                "document_type",
                "title",
                "abstract",
                "url",
                "doi",
                "language",
                "published_at",
                "available_from",
                "external_topics",
                "authors",
                "institutions",
                "metrics",
                "source_revision",
            }
        ),
        "operations": BASE_LIVE_OPERATIONS,
    },
    "arxiv": {
        "fields": frozenset(
            {
                "external_id",
                "document_type",
                "title",
                "abstract",
                "url",
                "doi",
                "language",
                "published_at",
                "available_from",
                "external_topics",
                "authors",
                "source_revision",
            }
        ),
        "operations": BASE_LIVE_OPERATIONS,
    },
    "github": {
        "fields": frozenset(
            {
                "external_id",
                "document_type",
                "title",
                "abstract",
                "url",
                "published_at",
                "available_from",
                "external_topics",
                "authors",
                "institutions",
                "metrics",
                "source_revision",
            }
        ),
        "operations": BASE_LIVE_OPERATIONS,
    },
    "gdelt": {
        "fields": frozenset(
            {
                "external_id",
                "document_type",
                "title",
                "url",
                "language",
                "published_at",
                "available_from",
                "external_topics",
                "source_revision",
            }
        ),
        "operations": BASE_LIVE_OPERATIONS,
    },
}
P0_REQUIRED_SOURCE_CODES = frozenset(
    {
        "openalex",
        "crossref",
        "semantic_scholar",
        "github",
        "gharchive",
        "huggingface",
        "pypi",
        "npm",
    }
)
_LIMITERS: dict[str, RateLimiter] = {}


def _limiter_for(connector_type: type[Connector]) -> RateLimiter:
    """Reuse one limiter per source so concurrent query jobs share rate limits."""
    if connector_type.code not in _LIMITERS:
        _LIMITERS[connector_type.code] = RateLimiter(
            connector_type.code,
            requests_per_hour=connector_type.rate_limit_per_hour,
            weekly_volume_cap_bytes=connector_type.weekly_volume_cap_bytes,
            min_interval_seconds=connector_type.min_interval_seconds,
        )
    return _LIMITERS[connector_type.code]


def _allowed_source_codes(registered_codes: set[str]) -> set[str]:
    """Limit live retrieval to the four requested, registered adapters."""
    return registered_codes & set(CONNECTORS) & LIVE_SEARCH_SOURCE_CODES


def _source_requirements(
    source_code: str, *, expert_mode: bool = False
) -> tuple[frozenset[str], frozenset[str]]:
    contract = LIVE_CONNECTOR_CONTRACTS.get(source_code)
    if contract is None:
        return frozenset(), frozenset()
    operations = contract["operations"]
    if expert_mode:
        operations = operations | EXPERT_LIVE_OPERATIONS
    return contract["fields"], operations


def _license_gate(
    source: dict[str, Any] | None,
    source_code: str | None = None,
    *,
    expert_mode: bool = False,
    today: date | None = None,
) -> tuple[bool, str]:
    """Require current rights approval for the connector's exact request contract."""
    fields, operations = _source_requirements(
        source_code or "", expert_mode=expert_mode
    )
    decision = evaluate_source_policy(
        source,
        requested_fields=fields,
        required_operations=operations,
        today=today,
    )
    return decision.allowed, decision.reason


def _source_statuses(
    source_registry: dict[str, dict[str, Any]],
    allowed_sources: set[str],
    searched_sources: set[str] | None = None,
    failed_sources: set[str] | None = None,
    partial_sources: set[str] | None = None,
    expert_mode: bool = False,
) -> list[dict[str, Any]]:
    """Describe adapter availability and legal-gate outcome without exposing license data."""
    searched_sources = searched_sources or set()
    failed_sources = failed_sources or set()
    partial_sources = partial_sources or set()
    statuses: list[dict[str, Any]] = []
    for code in sorted(LIVE_SEARCH_SOURCE_CODES | P0_REQUIRED_SOURCE_CODES):
        source = source_registry.get(code)
        adapter_implemented = code in CONNECTORS
        legal_gate_passed, legal_reason = _license_gate(
            source, code, expert_mode=expert_mode
        )
        expert_ready = code in LIVE_CONNECTOR_CONTRACTS and _license_gate(
            source, code, expert_mode=True
        )[0]
        review_status, _review_reason = source_review_status(source)
        requested_fields, required_operations = _source_requirements(code)
        _expert_fields, expert_operations = _source_requirements(
            code, expert_mode=True
        )
        if not adapter_implemented:
            status = "unsupported"
            reason = "Источник не поддерживается: поисковый адаптер отсутствует."
        elif not legal_gate_passed:
            status = "blocked"
            reason = legal_reason
        elif code in partial_sources:
            status, reason = (
                "partial",
                "Часть вариантов запроса не выполнена; см. предупреждения.",
            )
        elif code in searched_sources:
            status, reason = "searched", "Поиск выполнен через зарегистрированный адаптер."
        elif code in failed_sources:
            status, reason = "failed", "Адаптер не выполнил поиск; см. предупреждения."
        elif code in allowed_sources:
            status, reason = "ready", "Источник допущен текущей конфигурацией поиска."
        elif code in P0_REQUIRED_SOURCE_CODES and code not in LIVE_SEARCH_SOURCE_CODES:
            status, reason = (
                "blocked",
                "Адаптер реализован, но источник не включён в ограниченный live-набор.",
            )
        else:
            status = "blocked"
            reason = "Источник не допущен текущей конфигурацией live-поиска."
        statuses.append(
            {
                "code": code,
                "status": status,
                "message": reason,
                "adapter_implemented": adapter_implemented,
                "legal_gate_passed": legal_gate_passed,
                "live_search_enabled": code in allowed_sources,
                "query_executed": code in searched_sources,
                "rights_review_status": review_status,
                "license_review_due_at": (
                    source.get("license_review_due_at").isoformat()
                    if source and hasattr(source.get("license_review_due_at"), "isoformat")
                    else source.get("license_review_due_at") if source else None
                ),
                "requested_fields": sorted(requested_fields),
                "required_operations": sorted(required_operations),
                "expert_operations": sorted(expert_operations - required_operations),
                "expert_processing_ready": expert_ready,
            }
        )
    return statuses


def _p0_coverage_report(
    legally_approved_codes: set[str], searched_sources: set[str]
) -> tuple[dict[str, Any], list[str]]:
    """Report all required P0 sources separately from the bounded live-search scope."""
    registered = P0_REQUIRED_SOURCE_CODES & set(CONNECTORS)
    legal_approved = registered & legally_approved_codes
    live_enabled = legal_approved & LIVE_SEARCH_SOURCE_CODES
    missing_adapters = sorted(P0_REQUIRED_SOURCE_CODES - set(CONNECTORS))
    not_approved = sorted(registered - legally_approved_codes)
    outside_live_scope = sorted(registered - LIVE_SEARCH_SOURCE_CODES)
    coverage = {
        "p0_required": sorted(P0_REQUIRED_SOURCE_CODES),
        "p0_registered": sorted(registered),
        "p0_legal_approved": sorted(legal_approved),
        "p0_live_enabled": sorted(live_enabled),
        "p0_searched": sorted(P0_REQUIRED_SOURCE_CODES & searched_sources),
        "p0_missing_adapters": missing_adapters,
        "p0_not_approved": not_approved,
        "p0_outside_live_scope": outside_live_scope,
        "news_source": {
            "code": "gdelt" if "gdelt" in CONNECTORS else None,
            "priority": "P1",
            "searched": "gdelt" in searched_sources,
        },
    }
    warnings: list[str] = []
    if missing_adapters:
        warnings.append(
            "Покрытие P0 неполное: нет адаптеров для "
            + ", ".join(missing_adapters)
            + "."
        )
    if not_approved:
        warnings.append(
            "Источники P0 заблокированы legal gate; права не подтверждены для: "
            + ", ".join(not_approved)
            + "."
        )
    if outside_live_scope:
        warnings.append(
            "Адаптеры P0 вне текущего ограниченного live-набора: "
            + ", ".join(outside_live_scope)
            + "."
        )
    return coverage, warnings


async def _search_source(
    source_code: str,
    connector_type: type[Connector],
    queries: list[str],
    settings: Settings,
    limit: int,
    *,
    approved_fields: set[str],
) -> tuple[str, list[DiscoveryDocument], list[str], int]:
    kwargs: dict[str, Any] = {}
    if connector_type is OpenAlexConnector:
        kwargs["contact_email"] = settings.contact_email
    if connector_type is GitHubConnector:
        kwargs["token"] = settings.github_token

    async with httpx.AsyncClient(
        timeout=httpx.Timeout(30.0),
        follow_redirects=True,
        headers={"User-Agent": settings.user_agent},
    ) as client:
        limiter = _limiter_for(connector_type)
        connector = connector_type(client, limiter, **kwargs)
        documents: dict[str, DiscoveryDocument] = {}
        warnings: list[str] = []
        successful_queries = 0
        per_query_limit = max(1, (limit + len(queries) - 1) // len(queries))
        for query in queries:
            try:
                async for raw in connector.fetch(
                    cursor=None, mode="incremental", query=query, limit=per_query_limit
                ):
                    normalized = connector.normalize(raw)
                    if normalized is None or not normalized.title:
                        continue
                    normalized = _sanitize_live_normalized_document(
                        normalized, source_code, approved_fields
                    )
                    document = DiscoveryDocument.from_normalized(
                        normalized,
                        source_code=source_code,
                        source_family=str(connector.family),
                    )
                    documents.setdefault(document.document_id, document)
                    if len(documents) >= limit:
                        break
                successful_queries += 1
            except Exception as exc:
                warnings.append(
                    f"{source_code}: вариант запроса не выполнен ({type(exc).__name__})."
                )
            if len(documents) >= limit:
                break
        return source_code, list(documents.values()), warnings, successful_queries


_NORMALIZED_SCOPE_FIELDS = frozenset(
    {
        "external_id",
        "document_type",
        "title",
        "abstract",
        "url",
        "doi",
        "language",
        "published_at",
        "available_from",
        "priority_date",
        "filing_date",
        "publication_date",
        "grant_date",
        "external_topics",
        "authors",
        "institutions",
        "metrics",
        "source_revision",
    }
)


def _sanitize_live_normalized_document(
    normalized: Any, source_code: str, approved_fields: set[str]
) -> Any:
    """Reject undeclared normalized fields and drop the unapproved raw payload."""
    contract = LIVE_CONNECTOR_CONTRACTS.get(source_code)
    if contract is None:
        raise PermissionError(f"{source_code}: отсутствует контракт полей live-поиска.")
    present_fields = {
        field
        for field in _NORMALIZED_SCOPE_FIELDS
        if (value := getattr(normalized, field, None)) not in (None, "", {}, [])
    }
    undeclared = sorted(present_fields - contract["fields"])
    unapproved = sorted(present_fields - approved_fields)
    if undeclared:
        raise PermissionError(
            f"{source_code}: адаптер вернул поля вне контракта: {', '.join(undeclared)}."
        )
    if unapproved:
        raise PermissionError(
            f"{source_code}: адаптер вернул поля вне утверждённого scope: "
            + ", ".join(unapproved)
            + "."
        )
    return normalized.model_copy(update={"raw_payload": {}})


async def _run_source_search(
    queries: list[str],
    settings: Settings,
    allowed_sources: set[str],
    limit: int,
    approved_fields_by_source: dict[str, set[str]] | None = None,
) -> tuple[list[DiscoveryDocument], list[str], list[str]]:
    selected = [
        (source_code, connector_type)
        for source_code, connector_type in sorted(CONNECTORS.items())
        if source_code in allowed_sources
    ]
    if not selected:
        return [], [], ["Нет доступных источников с разрешённой derivative analytics."]

    semaphore = asyncio.Semaphore(min(4, len(selected)))

    async def bounded_search(
        source_code: str, connector_type: type[Connector]
    ) -> tuple[str, list[DiscoveryDocument], list[str], int]:
        async with semaphore:
            return await _search_source(
                source_code,
                connector_type,
                queries,
                settings,
                limit,
                approved_fields=(approved_fields_by_source or {}).get(source_code, set()),
            )

    results = await asyncio.gather(
        *(bounded_search(source_code, connector_type) for source_code, connector_type in selected),
        return_exceptions=True,
    )
    documents: list[DiscoveryDocument] = []
    succeeded: list[str] = []
    warnings: list[str] = []
    for (source_code, _), result in zip(selected, results, strict=True):
        if isinstance(result, BaseException):
            if isinstance(result, asyncio.CancelledError):
                raise result
            warnings.append(f"{source_code}: поиск не выполнен ({type(result).__name__}).")
            continue
        _result_code, source_documents, source_warnings, successful_queries = result
        warnings.extend(source_warnings)
        if successful_queries:
            succeeded.append(source_code)
        documents.extend(source_documents)
    return documents, succeeded, warnings


def _bounded_query_variants(query_plan: dict[str, Any], original_query: str) -> list[str]:
    raw_queries = query_plan.get("search_queries")
    variants = (
        [value.strip()[:200] for value in raw_queries if isinstance(value, str) and value.strip()]
        if isinstance(raw_queries, list)
        else []
    )
    unique: list[str] = []
    seen: set[str] = set()
    for variant in variants:
        key = variant.casefold()
        if key not in seen:
            unique.append(variant)
            seen.add(key)
        if len(unique) == 2:
            break
    if not unique:
        fallback = original_query.strip()[:200]
        if fallback:
            unique.append(fallback)
    query_plan["search_queries"] = unique
    return unique


def _sanitize_public_result(result: dict[str, Any], top_limit: int) -> None:
    """Keep public job output bounded to reviewable metadata, not source text."""
    candidates = result.get("candidates")
    if not isinstance(candidates, list):
        result["candidates"] = []
        return
    result["candidates"] = candidates[:top_limit]
    private_evidence_fields = {
        "original_abstract",
        "original_abstract_truncated",
        "original_metadata",
        "summary_ru",
        "summary_model_version",
        "is_generated_summary",
        "summary_source_id",
        "summary_evidence_quotes",
        "summary_numbers_verified",
        "summary_review_status",
    }
    for candidate in result["candidates"]:
        if isinstance(candidate, dict):
            candidate.pop("report_claims", None)
        evidence = candidate.get("evidence") if isinstance(candidate, dict) else None
        if not isinstance(evidence, list):
            continue
        candidate["evidence"] = evidence[:5]
        for item in candidate["evidence"]:
            if isinstance(item, dict):
                summary = item.get("summary_ru")
                summary_status = item.get("summary_status")
                if isinstance(summary, str) and summary.strip():
                    if summary_status == "human_verified":
                        item["summary_status"] = "withheld_human_reviewed"
                    elif item.get("is_generated_summary") is True:
                        item["summary_status"] = "withheld_generated"
                    elif item.get("is_generated_summary") is False:
                        item["summary_status"] = "withheld_source_provided"
                    else:
                        item["summary_status"] = "withheld_unknown_origin"
                elif summary_status not in {
                    "invalid_source_summary",
                    "generation_failed",
                    "generation_deferred",
                    "unavailable",
                }:
                    abstract = item.get("original_abstract")
                    language = item.get("language")
                    item["summary_status"] = (
                        "not_generated_public_mode"
                        if is_foreign_language(
                            language if isinstance(language, str) else None,
                            abstract if isinstance(abstract, str) else item.get("title"),
                        )
                        else "not_required"
                    )
                for field in private_evidence_fields:
                    item.pop(field, None)


def _attach_source_metadata(
    documents: list[DiscoveryDocument], source_registry: dict[str, dict[str, Any]]
) -> list[DiscoveryDocument]:
    enriched: list[DiscoveryDocument] = []
    for document in documents:
        metadata = source_registry.get(document.source_code, {})
        enriched.append(
            replace(
                document,
                source_family=metadata.get("source_family") or document.source_family,
                trust_level=metadata.get("trust_level"),
                trust_reason=metadata.get("trust_reason"),
                evidence_weight=metadata.get("evidence_weight"),
                license_status=metadata.get("license_status"),
                allows_derivative_analytics=metadata.get("allows_derivative_analytics"),
            )
        )
    return enriched


def _technology_catalog(rows: list[tuple[Any, ...]]) -> list[TechnologyContext]:
    catalog: dict[str, dict[str, Any]] = {}
    for technology_id, canonical_name, canonical_name_ru, alias in rows:
        key = str(technology_id)
        entry = catalog.setdefault(
            key,
            {
                "technology_id": key,
                "canonical_name": canonical_name,
                "canonical_name_ru": canonical_name_ru,
                "aliases": [],
            },
        )
        if alias and alias not in entry["aliases"]:
            entry["aliases"].append(alias)
    return [
        TechnologyContext.model_validate(value)
        for _key, value in sorted(catalog.items())
    ]


def _decorate_matches(matches: list[dict], catalog: list[TechnologyContext]) -> list[dict]:
    technologies = {item.technology_id: item for item in catalog}
    decorated: list[dict] = []
    for match in matches:
        technology = technologies.get(match["technology_id"])
        if technology is None:
            continue
        decorated.append(
            {
                **match,
                "canonical_name": technology.canonical_name,
                "canonical_name_ru": technology.canonical_name_ru,
            }
        )
    return decorated


async def execute_open_search_job(
    job_id: uuid.UUID, query: str, limit: int, settings: Settings
) -> None:
    """Run a bounded source search and persist its review-only result on the job."""
    public_mode = settings.public_read_only
    expert_mode = (
        settings.environment.casefold() == "local"
        and settings.expert_live_search_enabled
        and not public_mode
    )
    if not public_mode and not expert_mode:
        detail = (
            "Live-поиск доступен только для публичного bounded-режима или при явном "
            "opt-in в изолированном локальном экспертном режиме."
        )
        await _save_failed_job(
            job_id,
            error_code="live_search_not_allowed",
            error_detail=detail,
            result={
                "query": query,
                "candidates": [],
                "searched_sources": [],
                "warnings": [detail],
                "fetched_document_count": 0,
                "search_scope": "approved_project_sources_metadata_only",
                "query_plan": None,
                "candidate_matches": [],
                "candidate_mapping_status": "not_run",
                "source_statuses": [],
            },
        )
        return

    source_registry: dict[str, dict[str, Any]] = {}
    allowed_sources: set[str] = set()
    technologies: list[TechnologyContext] = []
    source_statuses: list[dict[str, Any]] = []
    searched_sources: list[str] = []
    warnings: list[str] = []
    query_plan: dict[str, Any] | None = None
    documents: list[DiscoveryDocument] = []
    top_limit = max(1, min(15, int(limit)))

    async with session_scope() as session:
        job = (
            await session.execute(select(AnalysisJob).where(AnalysisJob.id == job_id))
        ).scalar_one_or_none()
        if job is None:
            return
        job.status = "running"
        job.started_at = datetime.now(UTC)
        job.progress = {
            "phase": "query_planning",
            "message": "Проверка разрешений и подготовка запроса.",
        }
        source_rows = (
            await session.execute(
                select(
                    Source.code,
                    Source.name,
                    Source.family,
                    Source.enabled,
                    Source.trust_level,
                    Source.trust_reason,
                    Source.evidence_weight,
                    Source.license_status,
                    Source.license_type,
                    Source.license_owner,
                    Source.license_checked_at,
                    Source.license_evidence_url,
                    Source.license_scope,
                    Source.license_reviewed_by,
                    Source.license_approved_fields,
                    Source.license_approved_operations,
                    Source.license_review_reference,
                    Source.license_review_due_at,
                    Source.license_terms_version,
                    Source.license_reviewed_terms_version,
                    Source.allows_derivative_analytics,
                )
            )
        ).all()
        source_registry = {
            str(code): {
                "name": name,
                "source_family": str(family) if family else None,
                "enabled": bool(enabled),
                "trust_level": trust_level,
                "trust_reason": trust_reason,
                "evidence_weight": float(evidence_weight) if evidence_weight is not None else None,
                "license_status": str(license_status) if license_status else None,
                "license_type": license_type,
                "license_owner": license_owner,
                "license_checked_at": license_checked_at,
                "license_evidence_url": license_evidence_url,
                "license_scope": license_scope,
                "license_reviewed_by": license_reviewed_by,
                "license_approved_fields": list(license_approved_fields or []),
                "license_approved_operations": list(license_approved_operations or []),
                "license_review_reference": license_review_reference,
                "license_review_due_at": license_review_due_at,
                "license_terms_version": license_terms_version,
                "license_reviewed_terms_version": license_reviewed_terms_version,
                "allows_derivative_analytics": bool(allows_derivative_analytics),
            }
            for (
                code,
                name,
                family,
                enabled,
                trust_level,
                trust_reason,
                evidence_weight,
                license_status,
                license_type,
                license_owner,
                license_checked_at,
                license_evidence_url,
                license_scope,
                license_reviewed_by,
                license_approved_fields,
                license_approved_operations,
                license_review_reference,
                license_review_due_at,
                license_terms_version,
                license_reviewed_terms_version,
                allows_derivative_analytics,
            ) in source_rows
        }
        technology_rows = (
            await session.execute(
                select(
                    Technology.id,
                    Technology.canonical_name,
                    Technology.canonical_name_ru,
                    TechnologyAlias.alias,
                )
                .outerjoin(TechnologyAlias, TechnologyAlias.technology_id == Technology.id)
                .where(Technology.status == "active")
                .order_by(Technology.canonical_name, TechnologyAlias.alias)
            )
        ).all()
        technologies = _technology_catalog(technology_rows)
        legally_approved_codes = {
            code
            for code, source in source_registry.items()
            if _license_gate(source, code, expert_mode=expert_mode)[0]
        }
        allowed_sources = _allowed_source_codes(legally_approved_codes)
        source_statuses = _source_statuses(
            source_registry, allowed_sources, expert_mode=expert_mode
        )

    per_source_limit = max(10, min(30, top_limit * 2))
    try:
        if not allowed_sources:
            p0_coverage, p0_warnings = _p0_coverage_report(
                legally_approved_codes, set()
            )
            warnings.append(
                "Live-поиск не запускался: нет адаптеров с полным Source License Record, "
                "одобренной лицензией и разрешением на derivative analytics."
            )
            warnings.extend(p0_warnings)
            discovery = discover_candidates(query, [])
            result = discovery.as_dict()
            result.update(
                {
                    "searched_sources": [],
                    "warnings": warnings,
                    "fetched_document_count": 0,
                    "search_scope": "approved_project_sources_metadata_only",
                    "query_plan": None,
                    "candidate_matches": [],
                    "candidate_mapping_status": "not_run",
                    "source_statuses": source_statuses,
                    "source_coverage": p0_coverage,
                    "ranking": {
                        "method": "discovery_index",
                        "is_probability": False,
                        "classifier_confidence": None,
                        "classifier_status": "not_run_no_validated_candidate_model",
                    },
                    "top_n": top_limit,
                    "ontology_updated": False,
                }
            )
            await _save_completed_job(job_id, result, 0)
            return

        if public_mode:
            query_plan = {
                "normalized_topic": normalize_name(query),
                "search_queries": [query],
                "technology_matches": [],
            }
        else:
            async with httpx.AsyncClient(timeout=httpx.Timeout(70.0)) as llm_client:
                try:
                    query_plan = await create_query_plan(
                        llm_client, settings, query, technologies
                    )
                except QueryPlanningError:
                    raise
                except Exception as exc:
                    raise QueryPlanningError(
                        "Не удалось обработать запрос языковой моделью; live-поиск не запускался."
                    ) from exc

        query_variants = _bounded_query_variants(query_plan, query)
        approved_fields_by_source = {
            code: set(source_registry[code].get("license_approved_fields", []))
            for code in allowed_sources
        }
        search_call = _run_source_search(
            query_variants,
            settings,
            allowed_sources,
            per_source_limit,
            approved_fields_by_source,
        )
        if public_mode:
            documents, searched_sources, warnings = await asyncio.wait_for(
                search_call, timeout=60.0
            )
        else:
            documents, searched_sources, warnings = await search_call
        if not searched_sources:
            raise RuntimeError(
                "Ни один разрешённый источник не выполнил поиск. " + " ".join(warnings)
            )

        documents = _attach_source_metadata(documents, source_registry)
        candidate_mapping_status = "not_run"
        candidate_matches: list[dict[str, Any]] = []
        if public_mode:
            discovery = discover_candidates(query, documents)
            warnings.append(
                "Публичный поиск использует исходный запрос; тексты источников не "
                "передаются внешней языковой модели и не включаются в ответ."
            )
        else:
            candidate_mapping_status = "not_needed"
            async with httpx.AsyncClient(timeout=httpx.Timeout(70.0)) as llm_client:
                documents, summary_warnings = await summarize_eligible_documents(
                    llm_client,
                    settings,
                    documents,
                    allowed_source_codes=allowed_sources,
                    max_summaries=min(15, top_limit),
                )
                warnings.extend(summary_warnings)
                discovery = discover_candidates(query, documents)
                candidate_payload = [
                    {
                        "candidate_id": candidate.candidate_id,
                        "name": candidate.suggested_name,
                        "evidence": [
                            {
                                "source": evidence.source_code,
                                "title": evidence.original_title or evidence.title,
                                "abstract": (evidence.original_abstract or "")[:500],
                            }
                            for evidence in candidate.evidence[:2]
                        ],
                    }
                    for candidate in discovery.candidates[:top_limit]
                ]
                if candidate_payload:
                    try:
                        candidate_matches = await match_candidates_to_technologies(
                            llm_client, settings, candidate_payload, technologies
                        )
                        candidate_mapping_status = (
                            "matched" if candidate_matches else "no_confident_matches"
                        )
                    except Exception as exc:
                        candidate_mapping_status = "unavailable"
                        warnings.append(
                            "ИИ-сопоставление кандидатов с онтологией недоступно; "
                            "детерминированные кандидаты не считаются результатом ИИ. "
                            f"Причина: {type(exc).__name__}."
                        )

        result: dict[str, Any] = discovery.as_dict()
        result["candidates"] = result["candidates"][:top_limit]
        if public_mode:
            _sanitize_public_result(result, top_limit)
        result["searched_sources"] = searched_sources
        result["warnings"] = list(warnings)
        result["fetched_document_count"] = len(documents)
        result["search_scope"] = "approved_project_sources_metadata_only"
        result["query_plan"] = {
            "normalized_topic": query_plan["normalized_topic"],
            "search_queries": query_plan["search_queries"],
            "technology_matches": _decorate_matches(
                query_plan["technology_matches"], technologies
            ),
        }
        result["candidate_matches"] = _decorate_matches(candidate_matches, technologies)
        result["candidate_mapping_status"] = candidate_mapping_status
        failed_sources = allowed_sources - set(searched_sources)
        source_statuses = _source_statuses(
            source_registry,
            allowed_sources,
            searched_sources=set(searched_sources),
            failed_sources=failed_sources,
            expert_mode=expert_mode,
            partial_sources={
                warning.partition(":")[0]
                for warning in warnings
                if warning.partition(":")[0] in searched_sources
            },
        )
        result["source_statuses"] = source_statuses
        p0_coverage, p0_warnings = _p0_coverage_report(
            legally_approved_codes, set(searched_sources)
        )
        result["warnings"].extend(p0_warnings)
        if "gdelt" in CONNECTORS:
            result["warnings"].append(
                "Новости представлены GDELT (P1); этот источник не заменяет P0-покрытие "
                "профессиональных медиа."
            )
        result["ranking"] = {
            "method": "discovery_index",
            "is_probability": False,
            "classifier_confidence": None,
            "classifier_status": "not_run_no_validated_candidate_model",
        }
        result["top_n"] = top_limit
        result["ontology_updated"] = False
        result["source_coverage"] = p0_coverage

        await _save_completed_job(job_id, result, len(documents))
    except QueryPlanningError as exc:
        await _save_failed_job(
            job_id,
            error_code="query_planning_failed",
            error_detail=str(exc),
            result={
                "query": query,
                "candidates": [],
                "searched_sources": [],
                "warnings": [str(exc)],
                "fetched_document_count": 0,
                "search_scope": "approved_project_sources_metadata_only",
                "query_plan": None,
                "candidate_matches": [],
                "candidate_mapping_status": "not_run",
                "source_statuses": source_statuses,
            },
        )
    except Exception as exc:
        failed_sources = allowed_sources - set(searched_sources)
        source_statuses = _source_statuses(
            source_registry,
            allowed_sources,
            searched_sources=set(searched_sources),
            failed_sources=failed_sources,
        )
        detail = str(exc)[:1000] or "Поиск не завершился."
        await _save_failed_job(
            job_id,
            error_code="open_search_failed",
            error_detail=detail,
            result={
                "query": query,
                "candidates": [],
                "searched_sources": searched_sources,
                "warnings": [*warnings, detail],
                "fetched_document_count": len(documents),
                "search_scope": "approved_project_sources_metadata_only",
                "query_plan": query_plan,
                "candidate_matches": [],
                "candidate_mapping_status": "not_run",
                "source_statuses": source_statuses,
            },
        )


async def _save_completed_job(
    job_id: uuid.UUID, result: dict[str, Any], document_count: int
) -> None:
    async with session_scope() as session:
        job = (
            await session.execute(select(AnalysisJob).where(AnalysisJob.id == job_id))
        ).scalar_one_or_none()
        if job is None:
            return
        job.status = "completed"
        job.completed_at = datetime.now(UTC)
        job.progress = {
            "phase": "complete",
            "discovery_result": result,
            "message": (
                f"Поиск завершён: {document_count} документов, "
                f"{len(result.get('candidates', []))} кандидатов."
            ),
        }


async def _save_failed_job(
    job_id: uuid.UUID,
    *,
    error_code: str,
    error_detail: str,
    result: dict[str, Any],
) -> None:
    async with session_scope() as session:
        job = (
            await session.execute(select(AnalysisJob).where(AnalysisJob.id == job_id))
        ).scalar_one_or_none()
        if job is None:
            return
        job.status = "failed"
        job.completed_at = datetime.now(UTC)
        job.error_code = error_code
        job.error_detail = error_detail[:1000]
        job.progress = {
            "phase": "failed",
            "discovery_result": result,
            "message": error_detail[:1000],
        }