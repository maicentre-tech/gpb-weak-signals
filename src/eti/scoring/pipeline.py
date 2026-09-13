"""Пайплайн scoring: фаза B — нормализация, свёртка, ETS, отбор TOP-N.

Фаза A (``features.py``) даёт сырые признаки каждой технологии по её
собственному ряду. Здесь они превращаются в баллы 0–100 через percentile
внутри peer group, сворачиваются в композиты по весам §24.6–24.10 и в ETS
по §24.13, после чего применяются фильтры §24.20.

Всё, что влияет на результат, пишется в ``trend_scores``: фактические веса
после перераспределения, размер референсной популяции, версии модели,
онтологии и датасета. Без этого §21.5 (воспроизводимость) невыполним —
через полгода нельзя будет объяснить, почему технология была на шестом
месте.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import UTC, date, datetime

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.config import ScoringParams
from eti.db.enums import MetricStatus
from eti.db.models import (
    PeerGroup,
    StrategicMatrixEntry,
    Technology,
    TechnologyMetric,
    TrendScore,
)
from eti.scoring import features as F
from eti.scoring.normalize import (
    MIN_REFERENCE_POPULATION,
    missingness_penalty,
    score_0_100,
    weighted_score,
)
from eti.scoring.series import PeriodMetrics, TechnologySeries

log = structlog.get_logger(__name__)

COMPOSITE_SPECS = {
    "research": F.RESEARCH_COMPONENTS,
    "patent": F.PATENT_COMPONENTS,
    "market": F.MARKET_COMPONENTS,
    "adoption": F.ADOPTION_COMPONENTS,
}


@dataclass
class ScoredTechnology:
    technology_id: str
    canonical_name: str
    scores: dict[str, float | None]
    emerging_score: float
    maturity: float | None
    maturity_stage: str | None
    evidence_confidence: float
    strategic_relevance: float | None
    strategic_priority: float | None
    effective_weights: dict[str, float]
    metric_status: dict[str, str]
    reference_population_size: int
    detail: dict


async def load_series(
    session: AsyncSession, as_of: date, params: ScoringParams
) -> dict[str, TechnologySeries]:
    rows = (
        await session.execute(
            select(TechnologyMetric)
            .where(TechnologyMetric.as_of_date == as_of)
            .order_by(TechnologyMetric.technology_id, TechnologyMetric.period_start)
        )
    ).scalars().all()

    grouped: dict[str, list[PeriodMetrics]] = {}
    status_by_technology: dict[str, dict[str, MetricStatus]] = {}

    for row in rows:
        technology_id = str(row.technology_id)
        statuses = {
            name: MetricStatus(value) for name, value in (row.metric_status or {}).items()
        }
        status_by_technology[technology_id] = statuses
        values = {
            "papers": float(row.papers),
            "preprints": float(row.preprints),
            "patent_families": float(row.patent_families),
            "rd_projects": float(row.rd_projects),
            "github_repos": float(row.github_repos),
            "news_mentions": float(row.news_mentions),
            "companies": float(row.companies),
            "citations": float(row.citations),
            "unique_authors": float(row.unique_authors),
            "unique_institutions": float(row.unique_institutions),
        }
        grouped.setdefault(technology_id, []).append(
            PeriodMetrics(
                period_start=row.period_start,
                period_end=row.period_end,
                values=values,
                status={name: statuses.get(name, MetricStatus.AVAILABLE) for name in values},
            )
        )

    return {
        technology_id: TechnologySeries(
            technology_id=technology_id,
            as_of_date=as_of,
            periods=_densify(periods, as_of, status_by_technology.get(technology_id, {})),
            indexing_lag_months=params.indexing_lag_months,
        )
        for technology_id, periods in grouped.items()
    }


def _densify(
    periods: list[PeriodMetrics], as_of: date, statuses: dict[str, MetricStatus]
) -> list[PeriodMetrics]:
    """Достраивает пропущенные месяцы нулями до сплошной сетки.

    В ``technology_metrics`` есть строки только для месяцев с документами.
    Окна в §24.4/24.5 отсчитываются в периодах, поэтому на разреженном ряде
    «последние 12 периодов» могут растянуться на пять лет, а сдвинутое окно
    уехать за начало данных и дать пустоту — growth и acceleration тогда
    не считаются вообще.

    Месяц без документов — это настоящий ноль активности (искали и не
    нашли), а не отсутствие данных, поэтому статусы метрик наследуются от
    источников, а не помечаются UNAVAILABLE.
    """
    if not periods:
        return []

    by_month = {p.period_start: p for p in periods}
    template = periods[0].values
    cursor = min(by_month)
    end = as_of.replace(day=1)
    dense: list[PeriodMetrics] = []

    while cursor <= end:
        existing = by_month.get(cursor)
        if existing is not None:
            dense.append(existing)
        else:
            dense.append(
                PeriodMetrics(
                    period_start=cursor,
                    period_end=cursor,
                    values=dict.fromkeys(template, 0.0),
                    status={
                        name: statuses.get(name, MetricStatus.AVAILABLE) for name in template
                    },
                )
            )
        cursor = (
            cursor.replace(year=cursor.year + 1, month=1)
            if cursor.month == 12
            else cursor.replace(month=cursor.month + 1)
        )
    return dense


def _composite_raw(
    components: dict[str, float], spec: dict[str, tuple[str, float]], population: dict[str, list[float]]
) -> tuple[float | None, dict[str, float], dict[str, str]]:
    """Свёртка подкомпонентов композитного признака (§24.6–24.10).

    Каждый подкомпонент нормируется перцентилем внутри популяции, затем
    берётся взвешенная сумма. Отсутствующий подкомпонент помечается
    UNAVAILABLE, и его вес перераспределяется, а не обнуляется (§24.19).
    """
    weights = {name: weight for name, (_metric, weight) in spec.items()}
    statuses = {
        name: (MetricStatus.AVAILABLE if name in components else MetricStatus.UNAVAILABLE)
        for name in spec
    }
    normalized = {
        name: score_0_100(value, population.get(name, []))
        for name, value in components.items()
    }
    raw, effective = weighted_score(normalized, weights, statuses)
    return raw, effective, {name: str(status) for name, status in statuses.items()}


async def compute_scores(
    session: AsyncSession,
    params: ScoringParams,
    *,
    as_of: date,
    dataset_version: str,
    ontology_version: str = "0.1.0-pilot",
) -> list[ScoredTechnology]:
    series_by_id = await load_series(session, as_of, params)
    if not series_by_id:
        return []

    names = {
        str(tech.id): tech.canonical_name
        for tech in (await session.execute(select(Technology))).scalars().all()
    }

    # --- Фаза A: сырые признаки ------------------------------------------
    raw_by_id = {
        technology_id: F.compute_raw_features(series, params)
        for technology_id, series in series_by_id.items()
    }

    population_size = len(raw_by_id)
    if population_size < MIN_REFERENCE_POPULATION:
        # §29.4: percentile по малой выборке неустойчив — перестановка двух
        # объектов двигает балл на единицы пунктов. На пилоте это неизбежно,
        # но результат обязан нести пометку, а не выглядеть точным.
        log.warning(
            "small_reference_population",
            size=population_size,
            minimum=MIN_REFERENCE_POPULATION,
            detail="баллы percentile статистически неустойчивы",
        )

    # --- Популяции для нормализации --------------------------------------
    simple_features = ["novelty", "growth", "acceleration", "citation"]
    populations: dict[str, list[float]] = {
        name: [
            raw[name].raw
            for raw in raw_by_id.values()
            if isinstance(raw[name], F.FeatureValue) and raw[name].raw is not None
        ]
        for name in simple_features
    }
    for composite, spec in COMPOSITE_SPECS.items():
        for component in spec:
            populations[component] = [
                raw[f"{composite}_components"].get(component)
                for raw in raw_by_id.values()
                if component in raw[f"{composite}_components"]
            ]
    for component in ("age", "saturation", "commercialization", "adoption", "inverse_acceleration"):
        populations[component] = [
            raw["maturity_components"].get(component)
            for raw in raw_by_id.values()
            if component in raw["maturity_components"]
        ]

    strategic_matrix = await _load_strategic_matrix(session)

    results: list[ScoredTechnology] = []
    for technology_id, raw in raw_by_id.items():
        scores: dict[str, float | None] = {}
        statuses: dict[str, str] = {}

        for name in simple_features:
            value: F.FeatureValue = raw[name]  # type: ignore[assignment]
            if value.raw is None:
                scores[name] = None
                statuses[name] = str(value.status)
            else:
                scores[name] = score_0_100(value.raw, populations[name])
                statuses[name] = str(MetricStatus.AVAILABLE)

        cross = raw["cross_domain"]
        scores["cross_domain"] = (cross.raw * 100) if cross.raw is not None else None
        statuses["cross_domain"] = str(cross.status)

        for composite, spec in COMPOSITE_SPECS.items():
            components = raw[f"{composite}_components"]
            composite_raw, _effective, _sub = _composite_raw(components, spec, populations)
            scores[composite] = composite_raw
            statuses[composite] = str(
                MetricStatus.AVAILABLE if composite_raw is not None else MetricStatus.UNAVAILABLE
            )

        maturity_components = raw["maturity_components"]
        maturity_normalized = {
            name: score_0_100(value, populations.get(name, []))
            for name, value in maturity_components.items()
        }
        maturity_statuses = {
            name: (
                MetricStatus.AVAILABLE
                if name in maturity_components
                else MetricStatus.UNAVAILABLE
            )
            for name in params.maturity_weights
        }
        maturity_value, _ = weighted_score(
            maturity_normalized, params.maturity_weights, maturity_statuses
        )

        ets, effective_weights = weighted_score(
            {k: v for k, v in scores.items() if v is not None},
            params.ets_weights,
            {k: MetricStatus(v) for k, v in statuses.items()},
        )
        if ets is None:
            log.warning("no_available_features", technology_id=technology_id)
            continue

        confidence = _evidence_confidence(
            params, statuses, series_by_id[technology_id], raw
        )

        relevance = strategic_matrix.get(technology_id)
        priority = (ets * relevance / 100) if relevance is not None else None

        results.append(
            ScoredTechnology(
                technology_id=technology_id,
                canonical_name=names.get(technology_id, "—"),
                scores=scores,
                emerging_score=ets,
                maturity=maturity_value,
                maturity_stage=(
                    F.maturity_stage(maturity_value) if maturity_value is not None else None
                ),
                evidence_confidence=confidence,
                strategic_relevance=relevance,
                strategic_priority=priority,
                effective_weights=effective_weights,
                metric_status=statuses,
                reference_population_size=population_size,
                detail={
                    "novelty": raw["novelty"].detail,
                    "cross_domain": raw["cross_domain"].detail,
                },
            )
        )

    await _persist(
        session,
        results,
        as_of=as_of,
        params=params,
        dataset_version=dataset_version,
        ontology_version=ontology_version,
    )
    return results


def _evidence_confidence(
    params: ScoringParams,
    statuses: dict[str, str],
    series: TechnologySeries,
    raw: dict,
) -> float:
    """§24.14 + штраф за недостающие сигналы (§24.19)."""
    families = raw["cross_domain"].raw or 0.0
    periods = series.window(params.dynamics_window_months)
    volume = sum(
        p.get(m) for p in periods for m in ("papers", "preprints", "github_repos")
    )

    components = {
        "source_diversity": families * 100,
        "claim_source_coverage": min(100.0, volume * 2),
        "entity_mapping_confidence": 60.0,
        "data_freshness": 100.0 if periods else 0.0,
        "source_quality": 70.0,
    }
    base, _ = weighted_score(components, params.confidence_weights, {})
    penalty = missingness_penalty(
        params.ets_weights, {k: MetricStatus(v) for k, v in statuses.items()}
    )
    return max(0.0, (base or 0.0) * (1 - penalty))


async def _load_strategic_matrix(session: AsyncSession) -> dict[str, float]:
    """ADR-005: без утверждённой матрицы Strategic Priority не считается.

    Пустой словарь — не ошибка, а штатное состояние до передачи матрицы
    заказчиком. UI покажет ETS и статус «Strategic relevance not configured».
    """
    rows = (
        await session.execute(
            select(StrategicMatrixEntry).where(StrategicMatrixEntry.is_active.is_(True))
        )
    ).scalars().all()
    if not rows:
        return {}

    by_technology: dict[str, list[float]] = {}
    for row in rows:
        if row.technology_id:
            by_technology.setdefault(str(row.technology_id), []).append(row.score)
    return {k: sum(v) / len(v) for k, v in by_technology.items()}


async def _persist(
    session: AsyncSession,
    results: list[ScoredTechnology],
    *,
    as_of: date,
    params: ScoringParams,
    dataset_version: str,
    ontology_version: str,
) -> None:
    await session.execute(
        TrendScore.__table__.delete().where(
            TrendScore.as_of_date == as_of,
            TrendScore.scoring_version == params.scoring_version,
        )
    )
    peer_group_id = (
        await session.execute(select(PeerGroup.id).limit(1))
    ).scalar_one_or_none()

    for result in results:
        session.add(
            TrendScore(
                technology_id=result.technology_id,
                as_of_date=as_of,
                novelty=result.scores.get("novelty"),
                growth=result.scores.get("growth"),
                acceleration=result.scores.get("acceleration"),
                research=result.scores.get("research"),
                patent=result.scores.get("patent"),
                citation=result.scores.get("citation"),
                market=result.scores.get("market"),
                adoption=result.scores.get("adoption"),
                cross_domain=result.scores.get("cross_domain"),
                maturity=result.maturity,
                maturity_stage=result.maturity_stage,
                emerging_score=result.emerging_score,
                strategic_relevance=result.strategic_relevance,
                strategic_priority=result.strategic_priority,
                evidence_confidence=result.evidence_confidence,
                effective_weights=result.effective_weights,
                metric_status=result.metric_status,
                peer_group_id=peer_group_id,
                reference_population_size=result.reference_population_size,
                scoring_version=params.scoring_version,
                dataset_version=dataset_version,
                ontology_version=ontology_version,
                created_at=datetime.now(UTC),
            )
        )
    await session.flush()


def select_top(results: list[ScoredTechnology], params: ScoringParams) -> list[ScoredTechnology]:
    """Фильтры и ранжирование §24.20.

    RankKey — Strategic Priority, когда матрица есть; иначе ETS с явной
    пометкой, что стратегический балл недоступен (§33). Подстановки нуля
    не происходит: ноль означал бы «стратегически нерелевантно», что не то
    же самое, что «не настроено».
    """
    candidates = [
        result
        for result in results
        if result.evidence_confidence >= params.min_evidence_confidence
        and (result.maturity_stage is None or result.maturity_stage in params.allowed_maturity)
    ]
    candidates.sort(
        key=lambda r: (r.strategic_priority if r.strategic_priority is not None else r.emerging_score),
        reverse=True,
    )
    return candidates[: params.top_n]
