"""Opt-in backfill of source-grounded Russian summaries for eligible records."""

from __future__ import annotations

import argparse
import asyncio

import httpx
from sqlalchemy import select

from eti.config import get_settings
from eti.db.enums import LicenseStatus
from eti.db.models import Document, Source
from eti.db.session import session_scope
from eti.discovery.summarizer import (
    SummaryGenerationError,
    generate_russian_summary,
    is_foreign_language,
)


async def run(limit: int, apply: bool) -> int:
    settings = get_settings()
    if apply and (
        settings.environment.casefold() != "local" or settings.public_read_only
    ):
        raise RuntimeError(
            "Запись разрешена только в локальной среде с выключенным public_read_only."
        )

    async with session_scope() as session:
        rows = (
            await session.execute(
                select(Document, Source)
                .join(Source, Source.id == Document.source_id)
                .where(
                    Document.summary_ru.is_(None),
                    Document.abstract.is_not(None),
                    Document.title.is_not(None),
                    Document.is_deleted.is_(False),
                    Source.enabled.is_(True),
                    Source.license_status == LicenseStatus.APPROVED,
                    Source.allows_derivative_analytics.is_(True),
                    Source.license_type.is_not(None),
                    Source.license_owner.is_not(None),
                    Source.license_checked_at.is_not(None),
                )
                .order_by(Document.first_seen_at.asc())
                .limit(limit)
            )
        ).all()
        eligible = [
            (document, source)
            for document, source in rows
            if is_foreign_language(document.language, document.abstract)
            and len((document.abstract or "").strip()) >= 40
        ]
        if not apply:
            print(
                f"{len(eligible)} eligible records in the first {limit} legal-gated rows; "
                "no LLM calls or database writes. Re-run with --apply in isolated local mode."
            )
            return 0

        generated = 0
        failed = 0
        async with httpx.AsyncClient(timeout=httpx.Timeout(70.0)) as client:
            for document, source in eligible:
                try:
                    result = await generate_russian_summary(
                        client,
                        settings,
                        source_id=document.external_id,
                        title=document.original_title or document.title or "",
                        abstract=document.abstract or "",
                    )
                except SummaryGenerationError:
                    failed += 1
                    continue

                document.summary_ru = result.text
                document.summary_model_version = result.model_version
                document.is_generated_summary = True
                payload = dict(document.raw_payload or {})
                payload.update(
                    {
                        "summary_source_id": result.source_id,
                        "summary_evidence_quotes": list(result.evidence_quotes),
                        "summary_numbers_verified": result.numbers_verified,
                        "summary_review_status": "awaiting_human",
                        "summary_source_code": source.code,
                    }
                )
                document.raw_payload = payload
                generated += 1

        await session.commit()
        print(f"Generated {generated} summaries; {failed} skipped after validation.")
        return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=10, choices=range(1, 51))
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Call the configured model and persist checked summaries.",
    )
    args = parser.parse_args()
    return asyncio.run(run(args.limit, args.apply))


if __name__ == "__main__":
    raise SystemExit(main())