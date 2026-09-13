"""CLI: сопоставить документы с технологиями."""

from __future__ import annotations

import asyncio

import structlog

from eti.config import get_settings
from eti.db.session import session_scope
from eti.ontology.mapping_job import run_mapping

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)


async def main() -> None:
    settings = get_settings()
    async with session_scope() as session:
        stats = await run_mapping(session, settings.scoring)
        print(
            f"\nдокументов: {stats['documents']}  связей: {stats['mapped']}  "
            f"auto-accept: {stats['auto']}  на ревью: {stats['review']}  "
            f"без маппинга: {stats['unmapped']}"
        )


if __name__ == "__main__":
    asyncio.run(main())
