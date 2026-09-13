"""Оркестрация: четыре потока §9 плюс связывающий их регламент.

ТЗ описывает DAG 1–4 как независимые расписания. На практике между ними
есть жёсткие зависимости, которые в §9 не выражены, а нарушение которых
даёт тихо неверный результат:

* Scoring, запущенный до пересчёта маппингов, посчитает метрики по
  устаревшей онтологии — и не сообщит об этом.
* Аудит охвата обязан идти **до** агрегации: без заполненного
  ``coverage_end_date`` месяцы после конца загрузки превращаются в нули и
  читаются как спад (см. docs/limitations.md, п. 11).
* Peer groups строятся по документам, поэтому пересобираются после
  ingestion, но до scoring.

Поэтому здесь не четыре расписания, а три потока с явным порядком внутри
и один сквозной, который их связывает.

Расписания §9:
    ingestion   — ежедневно (OpenAlex/arXiv/GitHub), еженедельно (патенты, CORDIS)
    NLP/entity  — еженедельно или по накоплении значимого объёма
    metrics     — ежемесячно, плюс внеплановый запуск администратором
"""

from __future__ import annotations

from datetime import UTC, date, datetime

import httpx
from prefect import flow, get_run_logger, task
from prefect.task_runners import ThreadPoolTaskRunner

from eti.config import get_settings
from eti.db.session import session_scope
from eti.ingestion.ratelimit import RateLimiter
from eti.ingestion.runner import IngestionRunner
from eti.sources.arxiv import ArxivConnector
from eti.sources.gdelt import GdeltConnector
from eti.sources.github import GitHubConnector
from eti.sources.openalex import OpenAlexConnector

CONNECTORS = {
    "openalex": OpenAlexConnector,
    "arxiv": ArxivConnector,
    "github": GitHubConnector,
    "gdelt": GdeltConnector,
}

DAILY_SOURCES = ["openalex", "arxiv", "github"]
WEEKLY_SOURCES = ["gdelt"]


# ---------------------------------------------------------------------------
# DAG 1 — Ingestion
# ---------------------------------------------------------------------------


@task(retries=2, retry_delay_seconds=60, task_run_name="ingest-{source}")
async def ingest_source(
    source: str,
    query: str,
    mode: str = "incremental",
    cursor: str | None = None,
    limit: int | None = None,
    dataset_version: str = "pilot-0.1",
) -> dict:
    """Загрузка одного источника.

    Повторы задаются на уровне задачи, а не коннектора: коннектор уже
    переживает rate limit собственным backoff, а сюда попадают отказы
    другого рода — недоступность сети, ошибка БД. Исчерпание лимита
    возвращает статус PARTIAL и не считается провалом: чекпоинт сохранён,
    загрузка продолжится со следующего запуска (§35).
    """
    logger = get_run_logger()
    settings = get_settings()
    connector_cls = CONNECTORS[source]

    async with httpx.AsyncClient(
        timeout=60, follow_redirects=True, headers={"User-Agent": settings.user_agent}
    ) as client:
        limiter = RateLimiter(
            connector_cls.code,
            requests_per_hour=connector_cls.rate_limit_per_hour,
            weekly_volume_cap_bytes=connector_cls.weekly_volume_cap_bytes,
            min_interval_seconds=connector_cls.min_interval_seconds,
        )
        kwargs: dict = {}
        if connector_cls is OpenAlexConnector:
            kwargs["contact_email"] = settings.contact_email
        if connector_cls is GitHubConnector:
            kwargs["token"] = settings.github_token
        connector = connector_cls(client, limiter, **kwargs)

        async with session_scope() as session:
            runner = IngestionRunner(
                session, connector, dataset_version=dataset_version,
                allow_unclear_license=False,
            )
            run = await runner.run(mode=mode, query=query, limit=limit)
            result = {
                "source": source,
                "status": str(run.status),
                "fetched": run.records_fetched,
                "created": run.records_created,
                "updated": run.records_updated,
                "skipped": run.records_skipped,
                "failed": run.records_failed,
            }

    logger.info("ingestion завершена: %s", result)
    return result


@flow(name="eti-ingestion", task_runner=ThreadPoolTaskRunner(max_workers=3))
async def ingestion_flow(
    query: str,
    sources: list[str] | None = None,
    mode: str = "incremental",
    cursor: str | None = None,
    limit: int | None = None,
) -> list[dict]:
    """DAG 1 §9. Источники грузятся параллельно: они независимы, и общий
    лимит у них разный, поэтому последовательный обход тратит время впустую."""
    logger = get_run_logger()
    targets = sources or DAILY_SOURCES
    results = []
    for source in targets:
        if source not in CONNECTORS:
            logger.warning("неизвестный источник, пропущен: %s", source)
            continue
        results.append(
            await ingest_source(source, query, mode=mode, cursor=cursor, limit=limit)
        )

    partial = [r for r in results if r["status"] != "success"]
    if partial:
        logger.warning(
            "источники завершились не полностью: %s",
            ", ".join(f"{r['source']}={r['status']}" for r in partial),
        )
    return results


# ---------------------------------------------------------------------------
# DAG 2 — Entity resolution
# ---------------------------------------------------------------------------


@task(retries=1, retry_delay_seconds=30)
async def resolve_entities(mapping_version: str = "0.1.0") -> dict:
    from eti.ontology.mapping_job import run_mapping

    settings = get_settings()
    async with session_scope() as session:
        return await run_mapping(session, settings.scoring, mapping_version=mapping_version)


@task(retries=1)
async def rebuild_peer_groups() -> None:
    """§29.4: peer groups зависят от состава документов, поэтому
    пересобираются после ingestion и до scoring."""
    from scripts.build_peer_groups import build

    await build()


@flow(name="eti-entity-resolution")
async def entity_flow(mapping_version: str = "0.1.0") -> dict:
    """DAG 2 §9."""
    logger = get_run_logger()
    stats = await resolve_entities(mapping_version)
    await rebuild_peer_groups()

    if stats["mapped"]:
        review_share = stats["review"] / stats["mapped"]
        if review_share > 0.5:
            # Очередь, растущая быстрее, чем разбирается, превращает
            # human-in-the-loop в видимость контроля (§21.1).
            logger.warning(
                "в очередь ручного ревью попало %.0f%% связей (%d из %d): "
                "проверьте пороги §24.21 и доступность сигналов маппинга",
                review_share * 100,
                stats["review"],
                stats["mapped"],
            )
    return stats


# ---------------------------------------------------------------------------
# DAG 3 — Метрики и scoring
# ---------------------------------------------------------------------------


@task(retries=1)
async def audit_coverage(as_of: date) -> None:
    """Обязательно до агрегации: без coverage_end_date месяцы после конца
    загрузки станут нулями и будут прочитаны как спад активности."""
    from scripts.audit_coverage import audit

    await audit(as_of)


@task(retries=1)
async def aggregate(as_of: date, dataset_version: str) -> dict:
    from eti.scoring.aggregate import aggregate_metrics

    settings = get_settings()
    async with session_scope() as session:
        return await aggregate_metrics(
            session, settings.scoring, as_of=as_of, dataset_version=dataset_version
        )


@task(retries=1)
async def score(as_of: date, dataset_version: str) -> dict:
    from eti.scoring.pipeline import compute_scores, select_top

    settings = get_settings()
    async with session_scope() as session:
        results = await compute_scores(
            session, settings.scoring, as_of=as_of, dataset_version=dataset_version
        )
        top = select_top(results, settings.scoring)
        return {
            "scored": len(results),
            "passed_filters": len(top),
            "population": results[0].reference_population_size if results else 0,
        }


@flow(name="eti-scoring")
async def scoring_flow(
    as_of: date | None = None, dataset_version: str = "pilot-0.1"
) -> dict:
    """DAG 3 §9. Порядок шагов внутри потока не переставляется."""
    logger = get_run_logger()
    as_of = as_of or datetime.now(UTC).date()

    await audit_coverage(as_of)
    aggregated = await aggregate(as_of, dataset_version)
    scored = await score(as_of, dataset_version)

    if scored["passed_filters"] == 0 and scored["scored"] > 0:
        logger.warning(
            "ни одна из %d технологий не прошла пороги §24.20: "
            "TOP-N не сформирован. Проверьте число подключённых семейств "
            "источников и порог evidence_confidence",
            scored["scored"],
        )
    if scored["population"] and scored["population"] < 30:
        logger.warning(
            "референсная популяция нормализации — %d объектов при минимуме 30: "
            "баллы percentile статистически неустойчивы (§29.4)",
            scored["population"],
        )
    return {**aggregated, **scored, "as_of": as_of.isoformat()}


# ---------------------------------------------------------------------------
# Сквозной поток
# ---------------------------------------------------------------------------


@flow(name="eti-full-refresh")
async def full_refresh_flow(
    query: str = "artificial intelligence",
    sources: list[str] | None = None,
    as_of: date | None = None,
    mode: str = "incremental",
    limit: int | None = None,
    dataset_version: str = "pilot-0.1",
) -> dict:
    """Полный цикл обновления в правильном порядке.

    Порядок здесь — не удобство, а корректность: scoring по устаревшим
    маппингам или без аудита охвата даёт правдоподобные, но неверные числа
    и ничем себя не выдаёт.
    """
    ingestion = await ingestion_flow(query, sources=sources, mode=mode, limit=limit)
    entities = await entity_flow()
    scoring = await scoring_flow(as_of=as_of, dataset_version=dataset_version)
    return {"ingestion": ingestion, "entities": entities, "scoring": scoring}
