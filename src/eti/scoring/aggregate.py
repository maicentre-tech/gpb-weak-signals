"""Агрегация документов в помесячные метрики технологий (DAG 3, шаг 1).

Два правила, определяющие устройство модуля:

* **Point-in-time (ADR-008).** Агрегат на дату T собирается только из
  документов с ``available_from <= T`` и значений метрик, снятых не позже T.
  Поэтому ключ таблицы — ``(technology_id, period_start, as_of_date)``:
  один и тот же месяц даёт разные агрегаты при разных датах расчёта, и
  именно это делает возможным честный rolling-origin backtesting (§34).

* **Вес маппинга.** Подтверждённая экспертом связь и непросмотренная связь
  из полосы ревью не равнозначны. Непросмотренная учитывается с понижающим
  коэффициентом (``unreviewed_review_band_weight``) — правила в ТЗ нет,
  см. docs/limitations.md.
"""

from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, field
from datetime import date

import structlog
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.config import ScoringParams
from eti.db.enums import DocumentType, MappingStatus, MetricStatus, SourceFamily
from eti.db.models import (
    Document,
    DocumentMetricSnapshot,
    Source,
    TechnologyMapping,
    TechnologyMetric,
)

log = structlog.get_logger(__name__)

DOCUMENT_TYPE_TO_METRIC: dict[DocumentType, str] = {
    DocumentType.PAPER: "papers",
    DocumentType.PREPRINT: "preprints",
    DocumentType.PATENT: "patent_families",
    DocumentType.RD_PROJECT: "rd_projects",
    DocumentType.REPOSITORY: "github_repos",
    DocumentType.NEWS: "news_mentions",
}


def mapping_weight(status: MappingStatus | str, params: ScoringParams) -> float:
    """Вклад связи в агрегат в зависимости от состояния ревью.

    Статус приводится к enum явно: столбцы объявлены как VARCHAR, поэтому
    SQLAlchemy возвращает обычную строку. Сравнение через ``is`` с членом
    StrEnum на такой строке всегда ложно — тождество не выполняется, хотя
    равенство выполняется. Ошибка тихая: агрегат просто выходит пустым.
    """
    try:
        status = MappingStatus(status)
    except ValueError:
        return 0.0
    if status in (MappingStatus.AUTO_ACCEPTED, MappingStatus.APPROVED):
        return 1.0
    if status is MappingStatus.PENDING_REVIEW:
        return params.unreviewed_review_band_weight
    return 0.0


def month_start(value: date) -> date:
    return value.replace(day=1)


@dataclass
class _Bucket:
    counts: dict[str, float] = field(default_factory=lambda: defaultdict(float))
    authors: set[str] = field(default_factory=set)
    institutions: set[str] = field(default_factory=set)
    families: set[str] = field(default_factory=set)
    citations: float = 0.0


async def aggregate_metrics(
    session: AsyncSession,
    params: ScoringParams,
    *,
    as_of: date,
    dataset_version: str,
) -> dict[str, int]:
    """Пересобирает ``technology_metrics`` по состоянию на ``as_of``."""
    rows = (
        await session.execute(
            select(
                TechnologyMapping.technology_id,
                TechnologyMapping.mapping_status,
                Document.id,
                Document.document_type,
                Document.available_from,
                Document.authors,
                Document.institutions,
                Source.family,
            )
            .join(Document, Document.id == TechnologyMapping.document_id)
            .join(Source, Source.id == Document.source_id)
            .where(
                Document.is_deleted.is_(False),
                Document.available_from.isnot(None),
                func.date(Document.available_from) <= as_of,
            )
        )
    ).all()

    citations_by_document = await _latest_citations(session, as_of)

    buckets: dict[tuple[str, date], _Bucket] = defaultdict(_Bucket)
    for technology_id, status, document_id, doc_type, available_from, authors, institutions, family in rows:
        weight = mapping_weight(status, params)
        if weight <= 0:
            continue

        key = (str(technology_id), month_start(available_from.date()))
        bucket = buckets[key]

        metric_name = DOCUMENT_TYPE_TO_METRIC.get(DocumentType(doc_type))
        if metric_name:
            bucket.counts[metric_name] += weight
        bucket.families.add(str(family))
        bucket.citations += citations_by_document.get(document_id, 0.0) * weight

        for author_id in (authors or {}).get("ids", []) or []:
            bucket.authors.add(str(author_id))
        for institution_id in (institutions or {}).get("ids", []) or []:
            bucket.institutions.add(str(institution_id))

    # Полная пересборка среза: частичное обновление оставило бы метрики от
    # предыдущей версии маппинга и сделало бы результат невоспроизводимым.
    await session.execute(
        TechnologyMetric.__table__.delete().where(TechnologyMetric.as_of_date == as_of)
    )

    coverage_status = await _metric_status_by_coverage(session)

    written = 0
    for (technology_id, period_start), bucket in buckets.items():
        session.add(
            TechnologyMetric(
                technology_id=technology_id,
                period_start=period_start,
                period_end=period_start,
                as_of_date=as_of,
                papers=round(bucket.counts.get("papers", 0)),
                preprints=round(bucket.counts.get("preprints", 0)),
                patent_families=round(bucket.counts.get("patent_families", 0)),
                rd_projects=round(bucket.counts.get("rd_projects", 0)),
                github_repos=round(bucket.counts.get("github_repos", 0)),
                news_mentions=round(bucket.counts.get("news_mentions", 0)),
                citations=round(bucket.citations),
                unique_authors=len(bucket.authors),
                unique_institutions=len(bucket.institutions),
                source_family_count=len(bucket.families),
                metric_status=coverage_status,
                dataset_version=dataset_version,
            )
        )
        written += 1

    await session.flush()
    stats = {"technologies": len({k[0] for k in buckets}), "periods": written}
    log.info("aggregation_finished", as_of=str(as_of), **stats)
    return stats


async def _latest_citations(session: AsyncSession, as_of: date) -> dict[object, float]:
    """Последнее известное на ``as_of`` число цитирований по документам.

    Значение, снятое после ``as_of``, использовать нельзя — это утечка из
    будущего, ровно то, что запрещает point-in-time правило §29.3.
    """
    subquery = (
        select(
            DocumentMetricSnapshot.document_id,
            func.max(DocumentMetricSnapshot.observed_at).label("latest"),
        )
        .where(
            DocumentMetricSnapshot.metric_name == "citations",
            func.date(DocumentMetricSnapshot.observed_at) <= as_of,
        )
        .group_by(DocumentMetricSnapshot.document_id)
        .subquery()
    )
    rows = (
        await session.execute(
            select(DocumentMetricSnapshot.document_id, DocumentMetricSnapshot.metric_value).join(
                subquery,
                (DocumentMetricSnapshot.document_id == subquery.c.document_id)
                & (DocumentMetricSnapshot.observed_at == subquery.c.latest),
            )
        )
    ).all()
    return {document_id: value for document_id, value in rows}


async def _metric_status_by_coverage(session: AsyncSession) -> dict[str, str]:
    """Какие семейства источников вообще подключены (§24.19).

    Метрика неподключённого источника — UNAVAILABLE, а не ноль. Разница
    принципиальная: ноль означает «искали и не нашли», UNAVAILABLE —
    «не искали». Первое занижает score, второе перераспределяет вес.
    """
    # Именно наличие загруженных документов, а не запись в реестре: EPO и
    # CORDIS зарегистрированы со статусом BLOCKED и данных не дали. Считать
    # их «доступными» значило бы подставлять нули вместо перераспределения
    # весов — ровно та ошибка, которую запрещает §24.19.
    connected = {
        str(family)
        for family in (
            await session.execute(
                select(Source.family)
                .join(Document, Document.source_id == Source.id)
                .where(Document.is_deleted.is_(False))
                .distinct()
            )
        ).scalars()
        if family
    }

    family_to_metric = {
        str(SourceFamily.RESEARCH): "papers",
        str(SourceFamily.PREPRINTS): "preprints",
        str(SourceFamily.PATENTS): "patent_families",
        str(SourceFamily.RD): "rd_projects",
        str(SourceFamily.OPEN_SOURCE): "github_repos",
        str(SourceFamily.WEB_NEWS): "news_mentions",
    }
    return {
        metric: (
            str(MetricStatus.AVAILABLE) if family in connected else str(MetricStatus.UNAVAILABLE)
        )
        for family, metric in family_to_metric.items()
    }
