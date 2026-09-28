"""Запуск потоков оркестрации вручную.

    python scripts/run_flow.py scoring --as-of 2026-09-13
    python scripts/run_flow.py full --query "agentic AI" --sources openalex,github
"""

from __future__ import annotations

import argparse
import asyncio
from datetime import date

from eti.flows.dags import entity_flow, full_refresh_flow, ingestion_flow, scoring_flow


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("flow", choices=["ingestion", "entities", "scoring", "full"])
    parser.add_argument("--query", default="artificial intelligence")
    parser.add_argument("--sources", help="через запятую")
    parser.add_argument("--mode", default="incremental")
    parser.add_argument("--limit", type=int)
    parser.add_argument("--as-of")
    args = parser.parse_args()

    sources = args.sources.split(",") if args.sources else None
    as_of = date.fromisoformat(args.as_of) if args.as_of else None

    if args.flow == "ingestion":
        result = await ingestion_flow(args.query, sources=sources, mode=args.mode, limit=args.limit)
    elif args.flow == "entities":
        result = await entity_flow()
    elif args.flow == "scoring":
        result = await scoring_flow(as_of=as_of)
    else:
        result = await full_refresh_flow(
            query=args.query, sources=sources, as_of=as_of, mode=args.mode, limit=args.limit
        )
    print(f"\nрезультат: {result}")


if __name__ == "__main__":
    asyncio.run(main())
