"""Эндпоинты §10.

Главное архитектурное свойство, заданное ADR-001: запрос пользователя —
это retrieval по предрассчитанному snapshot, а не запуск пайплайна.
Синхронный re-clustering в request path запрещён (§31), поэтому
непокрытое направление возвращает ``job_id``, а не ждёт часами.
"""

from __future__ import annotations

import uuid
from datetime import UTC, date, datetime

from fastapi import APIRouter, Depends, HTTPException, Query
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
from eti.db.enums import JobStatus, LicenseStatus
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
from eti.ontology.resolver import normalize_name
from eti.rag.generator import CardContext, MetricCardBuilder, generate_and_verify
from eti.rag.retrieval import retrieve_evidence

router = APIRouter(prefix="/api/v1")

COVERAGE_THRESHOLD = 0.3
"""Минимальная доля запроса, покрытая онтологией, при которой ответ
берётся из snapshot. Ниже — асинхронная задача (§31)."""


async def _latest_scoring_date(session: AsyncSession) -> date | None:
    return (await session.execute(select(func.max(TrendScore.as_of_date)))).scalar_one_or_none()


@router.get("/signals/stats", response_model=SignalStats)
async def signal_stats(session: AsyncSession = Depends(get_session)):
    """Показывает требуемое ТЗ число кандидатов с confidence выше 75%."""
    as_of = await _latest_scoring_date(session)
    if as_of is None:
        return SignalStats(
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

    alias_rows = (await session.execute(select(TechnologyAlias))).scalars().all()
    technologies = {
        str(t.id): t for t in (await session.execute(select(Technology))).scalars().all()
    }

    matched: set[str] = set()
    for alias in alias_rows:
        if alias.normalized_alias in normalized or normalized in alias.normalized_alias:
            matched.add(str(alias.technology_id))
    for technology in technologies.values():
        name = normalize_name(technology.canonical_name)
        if any(token in name for token in tokens):
            matched.add(str(technology.id))
        if technology.canonical_name_ru and any(
            token in normalize_name(technology.canonical_name_ru) for token in tokens
        ):
            matched.add(str(technology.id))

    if not matched:
        return [], 0.0

    # Грубая оценка покрытия: направление считается покрытым, если нашлась
    # хотя бы одна технология с рассчитанным score.
    found = [technologies[tid] for tid in matched if tid in technologies]
    return found, min(1.0, len(found) / 3)


@router.post("/query", response_model=QueryResponse | JobResponse)
async def query(
    request: QueryRequest,
    session: AsyncSession = Depends(get_session),
    settings: Settings = Depends(get_config),
):
    as_of = await _latest_scoring_date(session)
    if as_of is None:
        raise HTTPException(503, "Расчёт ещё не выполнялся: нет ни одного snapshot")

    technologies, coverage = await _match_technologies(session, request.domain)

    if coverage < COVERAGE_THRESHOLD:
        job = AnalysisJob(
            query_text=request.domain,
            normalized_query=normalize_name(request.domain),
            status=JobStatus.QUEUED,
            coverage_confidence=coverage,
            requested_at=datetime.now(UTC),
        )
        session.add(job)
        await session.commit()
        return JobResponse(
            job_id=job.id,
            status=str(job.status),
            query_text=job.query_text,
            coverage_confidence=coverage,
            requested_at=job.requested_at,
            message=(
                "Направление не покрыто текущим корпусом. Создана асинхронная "
                "задача анализа; синхронный полный пересчёт в запросе запрещён (§31)."
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

    results = []
    for rank, score in enumerate(ranked[: request.limit], 1):
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
                classifier_confidence=(score.detector_scores or {}).get("weak_signal_probability"),
                signal_status=score.signal_status,
                exclusion_reason=(score.detector_scores or {}).get("exclusion_reason"),
                maturity=str(score.maturity_stage) if score.maturity_stage else None,
                passes_filters=passes,
            )
        )

    warnings: list[str] = []
    if not strategic_configured:
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
        message=job.error_detail or "",
    )


@router.get("/trends/{technology_id}", response_model=TrendCardResponse)
async def get_trend(
    technology_id: uuid.UUID,
    as_of: date | None = None,
    session: AsyncSession = Depends(get_session),
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
    card = MetricCardBuilder().build(context)
    verified = generate_and_verify(
        card, evidence, computed_metrics={k: v for k, v in metrics.items() if v is not None}
    )

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
        classifier_confidence=(score.detector_scores or {}).get("weak_signal_probability"),
        signal_status=score.signal_status,
        exclusion_reason=(score.detector_scores or {}).get("exclusion_reason"),
        key_predictors=(score.detector_scores or {}).get("key_predictors", []),
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
                Document.url,
                Document.language,
                Document.published_at,
                Source.code,
                Source.name,
                Source.family,
                Source.evidence_weight,
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
            url=url,
            source_code=code,
            source_name=name,
            source_type=str(family),
            language_original=language,
            trust_level=(
                "высокий" if weight >= 0.9 else "средний" if weight >= 0.6 else "пониженный"
            ),
            trust_score=weight,
            published_at=published_at,
            mapping_score=score,
            mapping_status=str(status),
        )
        for (
            doc_id,
            title,
            url,
            language,
            published_at,
            code,
            name,
            family,
            weight,
            score,
            status,
        ) in rows
    ]


@router.get("/sources/status", response_model=list[SourceStatus])
async def sources_status(session: AsyncSession = Depends(get_session)):
    """§15: сбои ingestion видны администратору."""
    sources = (await session.execute(select(Source).order_by(Source.code))).scalars().all()
    result = []
    for source in sources:
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

        blocked = None
        if str(source.license_status) in (LicenseStatus.UNCLEAR, LicenseStatus.PROHIBITED):
            blocked = f"Legal Gate §23.3: license_status={source.license_status}"

        result.append(
            SourceStatus(
                code=source.code,
                name=source.name,
                family=str(source.family),
                license_status=str(source.license_status),
                enabled=source.enabled,
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
async def health(session: AsyncSession = Depends(get_session)):
    documents = (await session.execute(select(func.count(Document.id)))).scalar_one()
    technologies = (await session.execute(select(func.count(Technology.id)))).scalar_one()
    return HealthResponse(
        status="ok",
        database="ok",
        documents=documents,
        technologies=technologies,
        latest_scoring=await _latest_scoring_date(session),
    )
