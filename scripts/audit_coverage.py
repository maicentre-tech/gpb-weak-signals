"""Аудит фактического охвата источников (критерий приёмки §35).

Заполняет ``source_coverage`` по реально загруженным данным и предупреждает,
когда источник отстал от даты расчёта. Без этого частичная загрузка
незаметна: при хронологическом backfill параметр ``--limit`` обрезает не
начало, а *свежий* конец ряда, и технология выглядит затухшей вместо того,
чтобы выглядеть недозагруженной.
"""

from __future__ import annotations

import asyncio
from datetime import date

import structlog
from sqlalchemy import func, select

from eti.db.models import Document, Source, SourceCoverage
from eti.db.session import session_scope

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)
log = structlog.get_logger(__name__)

STALE_WARNING_DAYS = 120


async def audit(as_of: date | None = None) -> None:
    as_of = as_of or date.today()
    async with session_scope() as session:
        rows = (
            await session.execute(
                select(
                    Source.id,
                    Source.code,
                    func.min(func.date(Document.available_from)),
                    func.max(func.date(Document.available_from)),
                    func.count(Document.id),
                )
                .join(Document, Document.source_id == Source.id)
                .where(Document.is_deleted.is_(False), Document.available_from.isnot(None))
                .group_by(Source.id, Source.code)
            )
        ).all()

        for source_id, code, first_seen, last_seen, count in rows:
            coverage = (
                await session.execute(
                    select(SourceCoverage).where(SourceCoverage.source_id == source_id)
                )
            ).scalar_one_or_none()
            if coverage is None:
                coverage = SourceCoverage(
                    source_id=source_id, coverage_start_date=first_seen
                )
                session.add(coverage)

            coverage.coverage_end_date = last_seen
            lag_days = (as_of - last_seen).days

            if lag_days > STALE_WARNING_DAYS:
                log.warning(
                    "source_coverage_stale",
                    source=code,
                    documents=count,
                    last_document=str(last_seen),
                    lag_days=lag_days,
                    detail=(
                        "периоды после этой даты не содержат данных источника; "
                        "считать их нулевой активностью нельзя"
                    ),
                )
            else:
                log.info(
                    "source_coverage_ok",
                    source=code,
                    documents=count,
                    range=f"{first_seen}..{last_seen}",
                    lag_days=lag_days,
                )


if __name__ == "__main__":
    asyncio.run(audit(date(2026, 9, 13)))
