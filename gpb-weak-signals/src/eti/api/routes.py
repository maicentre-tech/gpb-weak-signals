"""Эндпоинты §10.

Главное архитектурное свойство, заданное ADR-001: запрос пользователя —
это retrieval по предрассчитанному snapshot, а не запуск пайплайна.
Синхронный re-clustering в request path запрещён (§31). В режиме разработки
непокрытое направление возвращает ``job_id``; публичный read-only поиск
остаётся в пределах snapshot и не создаёт фоновые задания.
"""

from __future__ import annotations

import uuid
from collections.abc import Sequence
from datetime import UTC, date, datetime
from typing import TypeVar

import httpx
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.api.deps import get_config, get_session
from eti.api.schemas import (
    ClaimOut,
    HealthResponse,
    JobResponse,
    QueryRequest,
    QueryResponse,
    SignalStats,
    SignalProfile,
    SourceReference,
    SourceStatus,
    TimelinePoint,
    TrendCardResponse,
    TrendSummary,
)
from eti.config import Settings
from eti.db.enums import JobStatus
from eti.db.models import (
    AnalysisJob,
    Document,
    IngestionRun,
    ModelVersion,
    Source,
    SourceCoverage,
    Technology,
    TechnologyAlias,
    TechnologyMapping,
    TechnologyMetric,
    TrendScore,
)
from eti.discovery.search import CONNECTORS, _license_gate, execute_open_search_job
from eti.ontology.resolver import normalize_name
from eti.rag.generator import CardContext, LlmCardGenerator, MetricCardBuilder, generate_and_verify
from eti.rag.retrieval import retrieve_evidence

router = APIRouter(prefix="/api/v1")

COVERAGE_THRESHOLD = 0.3
"""Минимальная доля запроса, покрытая онтологией, при которой ответ
берётся из snapshot. В изменяемом режиме ниже запускается асинхронная задача (§31)."""

_T = TypeVar("_T")


def _paginate(items: Sequence[_T], offset: int, limit: int) -> tuple[list[_T], bool]:
    """Return one page and whether further items remain."""
    page = list(items[offset : offset + limit])
    return page, offset + len(page) < len(items)


async def _latest_scoring_date(session: AsyncSession) -> date | None:
    return (await session.execute(select(func.max(TrendScore.as_of_date)))).scalar_one_or_none()


def _whole_phrase_match(left: str, right: str) -> bool:
    """Match complete words/phrases, not accidental substrings like «без» in «безопасность»."""
    left_padded = f" {left} "
    right_padded = f" {right} "
    return right_padded in left_padded or left_padded in right_padded


@router.get("/signals/stats", response_model=SignalStats)
async def signal_stats(session: AsyncSession = Depends(get_session)):
    """Показывает требуемое ТЗ число кандидатов с confidence выше 75%."""
    as_of = await _latest_scoring_date(session)
    if as_of is None:
        return SignalStats(
            snapshot_available=False,
            candidates=0,
            eligible=0,
            confidence_over_75=0,
            mature_excluded=0,
            hype_suspected=0,
            noise_excluded=0,
        )
    rows = (
        await session.execute(
            select(TrendScore.evidence_confidence, TrendScore.signal_status).where(
                TrendScore.as_of_date == as_of
            )
        )
    ).all()
    statuses = [status or "eligible" for _confidence, status in rows]
    return SignalStats(
        snapshot_available=True,
        candidates=len(rows),
        eligible=statuses.count("eligible"),
        confidence_over_75=sum(
            1
            for confidence, status in rows
            if confidence >= 75 and (status is None or status == "eligible")
        ),
        mature_excluded=statuses.count("mature_excluded"),
        hype_suspected=statuses.count("hype_suspected"),
        noise_excluded=statuses.count("noise_excluded"),
    )


async def _match_technologies(session: AsyncSession, domain: str) -> tuple[list[Technology], float]:
    """Подбор технологий по направлению, RU или EN (§30, требование RU/EN).

    Сопоставление идёт по каноническим названиям и алиасам обоих языков —
    именно поэтому онтология хранит русские синонимы: запрос «агентные
    системы» обязан находить Agentic AI, описанный англоязычными
    источниками (§23.1).
    """
    normalized = normalize_name(domain)
    tokens = [t for t in normalized.split() if len(t) > 2]
    query_tokens = set(tokens)

    alias_rows = (await session.execute(select(TechnologyAlias))).scalars().all()
    technologies = {
        str(t.id): t for t in (await session.execute(select(Technology))).scalars().all()
    }

    matched: set[str] = set()
    for alias in alias_rows:
        if _whole_phrase_match(normalized, alias.normalized_alias):
            matched.add(str(alias.technology_id))
    for technology in technologies.values():
        name_tokens = set(normalize_name(technology.canonical_name).split())
        if query_tokens & name_tokens:
            matched.add(str(technology.id))
        if (
            technology.canonical_name_ru
            and query_tokens & set(normalize_name(technology.canonical_name_ru).split())
        ):
            matched.add(str(technology.id))

    if not matched:
        return [], 0.0

    # Грубая оценка покрытия: направление считается покрытым, если нашлась
    # хотя бы одна технология с рассчитанным score.
    found = [technologies[tid] for tid in matched if tid in technologies]
    return found, min(1.0, len(found) / 3)


def _live_expert_search_enabled(settings: Settings) -> bool:
    return (
        settings.environment.casefold() == "local"
        and settings.expert_live_search_enabled
        and not settings.public_read_only
    )


@router.post("/query", response_model=QueryResponse | JobResponse)
async def query(
    request: QueryRequest,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session),
    settings: Settings = Depends(get_config),
):
    latest_scoring_date = await _latest_scoring_date(session)
    if latest_scoring_date is None:
        raise HTTPException(503, "Расчёт ещё не выполнялся: нет ни одного snapshot")
    as_of = request.as_of_date or latest_scoring_date
    if request.as_of_date is not None:
        snapshot_rows = (
            await session.execute(
                select(func.count(TrendScore.technology_id)).where(
                    TrendScore.as_of_date == request.as_of_date
                )
            )
        ).scalar_one()
        if snapshot_rows == 0:
            raise HTTPException(404, f"Нет snapshot на {request.as_of_date}")

    technologies, coverage = await _match_technologies(session, request.domain)

    live_expert_mode = _live_expert_search_enabled(settings)
    if coverage < COVERAGE_THRESHOLD and live_expert_mode:
        job = AnalysisJob(
            query_text=request.domain,
            normalized_query=normalize_name(request.domain),
            status=JobStatus.QUEUED,
            coverage_confidence=coverage,
            requested_at=datetime.now(UTC),
        )
        session.add(job)
        await session.commit()
        background_tasks.add_task(
            execute_open_search_job, job.id, request.domain, min(request.limit, 15), settings
        )
        return JobResponse(
            job_id=job.id,
            status=str(job.status),
            query_text=job.query_text,
            coverage_confidence=coverage,
            requested_at=job.requested_at,
            message=(
                "Направление не покрыто онтологией. Запущен ограниченный поиск "
                "по разрешённым открытым источникам; кандидаты останутся "
                "предложениями до экспертной проверки."
            ),
        )

    ids = [t.id for t in technologies]
    scores = (
        await session.execute(
            select(TrendScore)
            .where(TrendScore.technology_id.in_(ids), TrendScore.as_of_date == as_of)
            .order_by(TrendScore.emerging_score.desc())
        )
    ).scalars().all()

    by_id = {str(t.id): t for t in technologies}
    strategic_configured = any(s.strategic_relevance is not None for s in scores)

    allowed = request.filters.maturity or settings.scoring.allowed_maturity
    min_confidence = (
        request.filters.min_confidence
        if request.filters.min_confidence is not None
        else settings.scoring.min_evidence_confidence
    )

    ranked = sorted(
        scores,
        key=lambda s: (
            s.strategic_priority if s.strategic_priority is not None else s.emerging_score
        ),
        reverse=True,
    )

    page, has_more = _paginate(ranked, request.offset, request.limit)
    results = []
    for rank, score in enumerate(page, request.offset + 1):
        technology = by_id[str(score.technology_id)]
        passes = (
            score.evidence_confidence >= min_confidence
            and (score.maturity_stage is None or str(score.maturity_stage) in allowed)
            and score.emerging_score > 0
            # Snapshot до добавления фильтра остаётся читаемым; следующий
            # run_scoring заполнит статус для всех новых результатов.
            and score.signal_status in (None, "eligible")
        )
        results.append(
            TrendSummary(
                rank=rank,
                technology_id=score.technology_id,
                canonical_name=technology.canonical_name,
                canonical_name_ru=technology.canonical_name_ru,
                emerging_score=score.emerging_score,
                strategic_relevance=score.strategic_relevance,
                strategic_priority=score.strategic_priority,
                evidence_confidence=score.evidence_confidence,
                # The classifier has no expert-reviewed negative set or
                # corpus-based validation yet; never expose its output as a
                # measured probability.
                classifier_confidence=None,
                signal_status=score.signal_status,
                exclusion_reason=(score.detector_scores or {}).get("exclusion_reason"),
                maturity=str(score.maturity_stage) if score.maturity_stage else None,
                passes_filters=passes,
            )
        )

    warnings: list[str] = []
    if coverage < COVERAGE_THRESHOLD:
        if settings.public_read_only:
            warnings.append(
                "Тема не найдена в готовом snapshot; live-поиск отключён в режиме read-only."
            )
        elif settings.environment.casefold() != "local":
            warnings.append(
                "Live-поиск доступен только в изолированном локальном экспертном режиме."
            )
        elif not settings.expert_live_search_enabled:
            warnings.append(
                "Live-поиск отключён. Для изолированного экспертного режима требуется "
                "явно включить ETI_EXPERT_LIVE_SEARCH_ENABLED."
            )
    if not strategic_configured and ranked:
        warnings.append(
            "Strategic relevance not configured: матрица заказчиком не передана, "
            "ранжирование выполнено по Emerging Score (ADR-005)"
        )
    population = next((s.reference_population_size for s in ranked if s.reference_population_size), None)
    if population and population < 30:
        warnings.append(
            f"Минимальная референсная популяция среди признаков — {population} "
            f"объектов при рекомендуемом минимуме 30: баллы percentile "
            f"статистически неустойчивы (§29.4)"
        )
    if results and not any(r.passes_filters for r in results):
        warnings.append(
            "Ни одна технология не проходит пороги §24.20: результат показан "
            "как есть, с пометкой passes_filters=false"
        )

    return QueryResponse(
        query_id=uuid.uuid4(),
        generated_at=datetime.now(UTC),
        as_of_date=as_of,
        normalized_query=normalize_name(request.domain),
        scoring_version=ranked[0].scoring_version if ranked else "—",
        dataset_version=ranked[0].dataset_version if ranked else "—",
        strategic_relevance_configured=strategic_configured,
        reference_population_size=population,
        total_results=len(ranked),
        offset=request.offset,
        limit=request.limit,
        has_more=has_more,
        results=results,
        warnings=warnings,
    )


@router.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job(job_id: uuid.UUID, session: AsyncSession = Depends(get_session)):
    job = (
        await session.execute(select(AnalysisJob).where(AnalysisJob.id == job_id))
    ).scalar_one_or_none()
    if job is None:
        raise HTTPException(404, "Задача не найдена")
    return JobResponse(
        job_id=job.id,
        status=str(job.status),
        query_text=job.query_text,
        coverage_confidence=job.coverage_confidence,
        requested_at=job.requested_at,
        message=(
            job.error_detail
            or (job.progress or {}).get("message")
            or f"Статус задачи: {job.status}"
        ),
        result=(job.progress or {}).get("discovery_result"),
    )


@router.get("/trends/{technology_id}", response_model=TrendCardResponse)
async def get_trend(
    technology_id: uuid.UUID,
    as_of: date | None = None,
    session: AsyncSession = Depends(get_session),
    settings: Settings = Depends(get_config),
):
    technology = (
        await session.execute(select(Technology).where(Technology.id == technology_id))
    ).scalar_one_or_none()
    if technology is None:
        raise HTTPException(404, "Технология не найдена")

    as_of = as_of or await _latest_scoring_date(session)
    score = (
        await session.execute(
            select(TrendScore).where(
                TrendScore.technology_id == technology_id, TrendScore.as_of_date == as_of
            )
        )
    ).scalar_one_or_none()
    if score is None:
        raise HTTPException(404, f"Нет расчёта на {as_of}")

    evidence = await retrieve_evidence(session, technology_id, as_of=as_of, top_k=5)
    metrics = {
        "growth": score.growth,
        "acceleration": score.acceleration,
        "novelty": score.novelty,
        "cross_domain": score.cross_domain,
        "emerging_score": score.emerging_score,
        "evidence_confidence": score.evidence_confidence,
    }
    context = CardContext(
        technology_name=technology.canonical_name,
        evidence=evidence,
        metrics=metrics,
        maturity_stage=str(score.maturity_stage) if score.maturity_stage else None,
        scoring_version=score.scoring_version,
    )
    metric_card = MetricCardBuilder().build(context)
    computed_metrics = {k: v for k, v in metrics.items() if v is not None}
    verified = generate_and_verify(metric_card, evidence, computed_metrics=computed_metrics)
    generated_summary = False
    if evidence.documents:
        async with httpx.AsyncClient(timeout=httpx.Timeout(70.0)) as client:
            generator = LlmCardGenerator(
                client,
                base_url=settings.llm_base_url,
                model=settings.llm_model,
                api_key=settings.llm_api_key,
                max_repairs=0,
                timeout_seconds=70,
            )
            candidate = await generator.build(context)
        if generator.generation_succeeded:
            candidate_verification = generate_and_verify(
                candidate, evidence, computed_metrics=computed_metrics
            )
            if candidate_verification.passed:
                verified = candidate_verification
                generated_summary = True

    def out(claim) -> ClaimOut:
        return ClaimOut(
            text=claim.text,
            claim_type=claim.claim_type,
            source_doc_ids=claim.source_doc_ids,
            metric_provenance=claim.metric_provenance,
        )

    return TrendCardResponse(
        technology_id=technology.id,
        canonical_name=technology.canonical_name,
        as_of_date=as_of,
        maturity=str(score.maturity_stage) if score.maturity_stage else None,
        scores=SignalProfile(
            novelty=score.novelty,
            growth=score.growth,
            acceleration=score.acceleration,
            research=score.research,
            patent=score.patent,
            citation=score.citation,
            market=score.market,
            adoption=score.adoption,
            cross_domain=score.cross_domain,
        ),
        emerging_score=score.emerging_score,
        evidence_confidence=score.evidence_confidence,
        classifier_confidence=None,
        signal_status=score.signal_status,
        exclusion_reason=(score.detector_scores or {}).get("exclusion_reason"),
        key_predictors=(score.detector_scores or {}).get("key_predictors", [])[:6],
        strategic_relevance=score.strategic_relevance,
        effective_weights=score.effective_weights or {},
        metric_status=score.metric_status or {},
        problem=out(verified.card.problem),
        advantage=out(verified.card.advantage),
        case=out(verified.card.case),
        evidence=[out(c) for c in verified.card.evidence],
        caveats=[out(c) for c in verified.card.caveats],
        evidence_set_hash=evidence.hash(),
        verification_passed=verified.passed,
        summary_language="ru" if generated_summary else "source",
        is_generated_summary=generated_summary,
        claim_source_coverage=verified.claim_source_coverage,
        versions={
            "scoring": score.scoring_version,
            "dataset": score.dataset_version,
            "ontology": score.ontology_version,
            "embedding": score.embedding_model_version or "—",
        },
    )


@router.get("/trends/{technology_id}/timeline", response_model=list[TimelinePoint])
async def get_timeline(
    technology_id: uuid.UUID,
    as_of: date | None = None,
    session: AsyncSession = Depends(get_session),
):
    as_of = as_of or await _latest_scoring_date(session)
    rows = (
        await session.execute(
            select(TechnologyMetric)
            .where(
                TechnologyMetric.technology_id == technology_id,
                TechnologyMetric.as_of_date == as_of,
            )
            .order_by(TechnologyMetric.period_start)
        )
    ).scalars().all()
    return [
        TimelinePoint(
            period_start=row.period_start,
            papers=row.papers,
            preprints=row.preprints,
            patent_families=row.patent_families,
            rd_projects=row.rd_projects,
            github_repos=row.github_repos,
            news_mentions=row.news_mentions,
            citations=row.citations,
        )
        for row in rows
    ]


@router.get("/trends/{technology_id}/signals", response_model=SignalProfile)
async def get_signals(
    technology_id: uuid.UUID,
    as_of: date | None = None,
    session: AsyncSession = Depends(get_session),
):
    as_of = as_of or await _latest_scoring_date(session)
    score = (
        await session.execute(
            select(TrendScore).where(
                TrendScore.technology_id == technology_id, TrendScore.as_of_date == as_of
            )
        )
    ).scalar_one_or_none()
    if score is None:
        raise HTTPException(404, f"Нет расчёта на {as_of}")
    return SignalProfile(
        novelty=score.novelty,
        growth=score.growth,
        acceleration=score.acceleration,
        research=score.research,
        patent=score.patent,
        citation=score.citation,
        market=score.market,
        adoption=score.adoption,
        cross_domain=score.cross_domain,
    )


@router.get("/trends/{technology_id}/sources", response_model=list[SourceReference])
async def get_sources(
    technology_id: uuid.UUID,
    limit: int = Query(50, le=500),
    session: AsyncSession = Depends(get_session),
):
    """Provenance: от технологии к конкретным документам (§11, §15)."""
    rows = (
        await session.execute(
            select(
                Document.id,
                Document.title,
                Document.original_title,
                Document.url,
                Document.document_type,
                Document.language,
                Document.published_at,
                Document.retrieved_at,
                Document.summary_ru,
                Document.summary_model_version,
                Document.is_generated_summary,
                Document.raw_payload,
                Source.code,
                Source.name,
                Source.family,
                Source.evidence_weight,
                Source.trust_level,
                Source.trust_reason,
                TechnologyMapping.mapping_score,
                TechnologyMapping.mapping_status,
            )
            .join(TechnologyMapping, TechnologyMapping.document_id == Document.id)
            .join(Source, Source.id == Document.source_id)
            .where(TechnologyMapping.technology_id == technology_id)
            .order_by(TechnologyMapping.mapping_score.desc())
            .limit(limit)
        )
    ).all()
    return [
        SourceReference(
            document_id=doc_id,
            title=title,
            original_title=original_title,
            url=url,
            source_code=code,
            source_name=name,
            source_type=str(document_type),
            source_family=str(family),
            language_original=language,
            trust_level=(
                trust_level
                or ("высокий" if weight >= 0.9 else "средний" if weight >= 0.6 else "пониженный")
            ),
            trust_score=weight,
            trust_reason=trust_reason or "Уровень доверия не задан явно; используется legacy evidence_weight.",
            published_at=published_at,
            retrieved_at=retrieved_at,
            summary_ru=summary_ru,
            summary_model_version=summary_model_version,
            is_generated_summary=is_generated_summary,
            summary_source_id=(
                raw_payload.get("summary_source_id")
                if isinstance(raw_payload, dict)
                and isinstance(raw_payload.get("summary_source_id"), str)
                else None
            ),
            summary_evidence_quotes=(
                [
                    quote[:500]
                    for quote in raw_payload.get("summary_evidence_quotes", [])
                    if isinstance(quote, str) and quote.strip()
                ][:3]
                if isinstance(raw_payload, dict)
                and isinstance(raw_payload.get("summary_evidence_quotes", []), list)
                else []
            ),
            summary_numbers_verified=(
                raw_payload.get("summary_numbers_verified")
                if isinstance(raw_payload, dict)
                and isinstance(raw_payload.get("summary_numbers_verified"), bool)
                else None
            ),
            summary_review_status=(
                raw_payload.get("summary_review_status")
                if isinstance(raw_payload, dict)
                and isinstance(raw_payload.get("summary_review_status"), str)
                else None
            ),
            mapping_score=score,
            mapping_status=str(status),
        )
        for (
            doc_id,
            title,
            original_title,
            url,
            document_type,
            language,
            published_at,
            retrieved_at,
            summary_ru,
            summary_model_version,
            is_generated_summary,
            raw_payload,
            code,
            name,
            family,
            weight,
            trust_level,
            trust_reason,
            score,
            status,
        ) in rows
    ]


@router.get("/sources/status", response_model=list[SourceStatus])
async def sources_status(session: AsyncSession = Depends(get_session)):
    """Show source registry, search-adapter, and legal-gate status separately."""
    sources = (await session.execute(select(Source).order_by(Source.code))).scalars().all()
    sources_by_code = {source.code: source for source in sources}
    result = []
    for code in sorted(set(sources_by_code) | set(CONNECTORS)):
        source = sources_by_code.get(code)
        adapter_implemented = code in CONNECTORS
        if source is None:
            license_record = None
            license_status = "missing_record"
            enabled = False
            name = getattr(CONNECTORS[code], "name", code)
            family = str(getattr(CONNECTORS[code], "family", "unknown"))
        else:
            license_record = {
                "enabled": source.enabled,
                "license_status": source.license_status,
                "allows_derivative_analytics": source.allows_derivative_analytics,
                "license_type": source.license_type,
                "license_owner": source.license_owner,
                "license_checked_at": source.license_checked_at,
            }
            license_status = str(source.license_status)
            enabled = source.enabled
            name = source.name
            family = str(source.family)

        legal_record_ready, legal_reason = _license_gate(license_record)
        live_search_ready = adapter_implemented and legal_record_ready
        blockers = []
        if not legal_record_ready:
            blockers.append(legal_reason)
        if not adapter_implemented:
            blockers.append("Для live-поиска нет зарегистрированного адаптера.")
        blocked = " ".join(blockers) or None

        documents = 0
        coverage = None
        last_run = None
        if source is not None:
            documents = (
                await session.execute(
                    select(func.count(Document.id)).where(Document.source_id == source.id)
                )
            ).scalar_one()
            coverage = (
                await session.execute(
                    select(SourceCoverage).where(SourceCoverage.source_id == source.id)
                )
            ).scalar_one_or_none()
            last_run = (
                await session.execute(
                    select(IngestionRun)
                    .where(IngestionRun.source_id == source.id)
                    .order_by(IngestionRun.started_at.desc())
                    .limit(1)
                )
            ).scalar_one_or_none()

        lag = None
        if coverage and coverage.coverage_end_date:
            lag = (date.today() - coverage.coverage_end_date).days

        result.append(
            SourceStatus(
                code=code,
                name=name,
                family=family,
                adapter_implemented=adapter_implemented,
                live_search_ready=live_search_ready,
                license_status=license_status,
                enabled=enabled,
                documents=documents,
                coverage_start=coverage.coverage_start_date if coverage else None,
                coverage_end=coverage.coverage_end_date if coverage else None,
                lag_days=lag,
                last_run_status=str(last_run.status) if last_run else None,
                last_run_at=last_run.started_at if last_run else None,
                blocked_reason=blocked,
            )
        )
    return result


@router.get("/models")
async def models(session: AsyncSession = Depends(get_session)):
    """§21.5: какие версии моделей активны."""
    rows = (await session.execute(select(ModelVersion))).scalars().all()
    return [
        {
            "kind": row.kind,
            "version": row.version,
            "name": row.name,
            "is_active": row.is_active,
            "benchmark_results": row.benchmark_results,
        }
        for row in rows
    ]


@router.get("/health", response_model=HealthResponse)
async def health(
    session: AsyncSession = Depends(get_session),
    settings: Settings = Depends(get_config),
):
    if settings.environment == "production" and not settings.public_data_enabled:
        return HealthResponse(
            status="restricted",
            database="restricted",
            documents=0,
            technologies=0,
            latest_scoring=None,
            public_read_only=settings.public_read_only,
        )

    documents = (await session.execute(select(func.count(Document.id)))).scalar_one()
    technologies = (await session.execute(select(func.count(Technology.id)))).scalar_one()
    return HealthResponse(
        status="ok",
        database="ok",
        documents=documents,
        technologies=technologies,
        latest_scoring=await _latest_scoring_date(session),
        public_read_only=settings.public_read_only,
    )
