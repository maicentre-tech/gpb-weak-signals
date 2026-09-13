"""CLI загрузки: python scripts/ingest.py <source> [--query ...] [--limit N].

Пример пилота:
    python scripts/ingest.py openalex --query "agentic AI" --mode backfill \
        --cursor 2015-01-01 --limit 500
"""

from __future__ import annotations

import argparse
import asyncio

import httpx
import structlog

from eti.config import get_settings
from eti.db.session import session_scope
from eti.ingestion.ratelimit import RateLimiter
from eti.ingestion.runner import IngestionRunner
from eti.sources.arxiv import ArxivConnector
from eti.sources.github import GitHubConnector
from eti.sources.openalex import OpenAlexConnector

structlog.configure(
    processors=[
        structlog.processors.add_log_level,
        structlog.processors.TimeStamper(fmt="%H:%M:%S"),
        structlog.dev.ConsoleRenderer(),
    ]
)

CONNECTORS = {
    "openalex": OpenAlexConnector,
    "arxiv": ArxivConnector,
    "github": GitHubConnector,
}


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", choices=sorted(CONNECTORS))
    parser.add_argument("--query")
    parser.add_argument("--mode", default="incremental", choices=["incremental", "backfill"])
    parser.add_argument("--cursor")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--stream", default="default")
    parser.add_argument(
        "--allow-unclear-license",
        action="store_true",
        help="Обойти Legal Gate (§23.3). Только для локальной разработки.",
    )
    args = parser.parse_args()

    settings = get_settings()
    connector_cls = CONNECTORS[args.source]

    async with httpx.AsyncClient(
        timeout=60, follow_redirects=True, headers={"User-Agent": settings.user_agent}
    ) as client:
        limiter = RateLimiter(
            connector_cls.code,
            requests_per_hour=connector_cls.rate_limit_per_hour,
            weekly_volume_cap_bytes=connector_cls.weekly_volume_cap_bytes,
            min_interval_seconds=connector_cls.min_interval_seconds,
        )
        kwargs = {}
        if connector_cls is OpenAlexConnector:
            kwargs["contact_email"] = settings.contact_email
        if connector_cls is GitHubConnector:
            kwargs["token"] = settings.github_token
        connector = connector_cls(client, limiter, **kwargs)

        async with session_scope() as session:
            runner = IngestionRunner(
                session,
                connector,
                dataset_version="pilot-0.1",
                allow_unclear_license=args.allow_unclear_license,
            )
            if args.cursor:
                checkpoint = await runner._get_checkpoint(  # noqa: SLF001
                    await runner._get_source(), args.stream  # noqa: SLF001
                )
                checkpoint.cursor = args.cursor
                await session.flush()

            run = await runner.run(
                mode=args.mode, stream=args.stream, query=args.query, limit=args.limit
            )
            print(
                f"\nrun={run.id} status={run.status} "
                f"fetched={run.records_fetched} created={run.records_created} "
                f"updated={run.records_updated} skipped={run.records_skipped} "
                f"failed={run.records_failed}"
            )


if __name__ == "__main__":
    asyncio.run(main())
