"""Перестроение external_topics из сохранённого raw_payload.

Коннектор OpenAlex изначально не сохранял имена уровней иерархии
(field_name/subfield_name), из-за чего peer groups получали подписи от
случайных тем. Повторно ходить в API не нужно: полные объекты тем лежат в
``documents.raw_payload`` — ровно для таких случаев §21.4 и требует
хранить сырой ответ.
"""

from __future__ import annotations

import asyncio

import structlog
from sqlalchemy import select

from eti.db.models import Document
from eti.db.session import session_scope

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)
log = structlog.get_logger(__name__)


async def backfill() -> None:
    repaired = skipped = 0
    async with session_scope() as session:
        documents = (
            await session.execute(select(Document).where(Document.document_type == "paper"))
        ).scalars().all()

        for document in documents:
            topics = (document.raw_payload or {}).get("topics") or []
            if not topics:
                skipped += 1
                continue
            document.external_topics = {
                "openalex_topics": [
                    {
                        "id": t.get("id"),
                        "name": t.get("display_name"),
                        "score": t.get("score"),
                        "subfield": (t.get("subfield") or {}).get("id"),
                        "subfield_name": (t.get("subfield") or {}).get("display_name"),
                        "field": (t.get("field") or {}).get("id"),
                        "field_name": (t.get("field") or {}).get("display_name"),
                        "domain": (t.get("domain") or {}).get("id"),
                        "domain_name": (t.get("domain") or {}).get("display_name"),
                    }
                    for t in topics[:10]
                ]
            }
            repaired += 1

    log.info("topics_backfilled", repaired=repaired, skipped=skipped)


if __name__ == "__main__":
    asyncio.run(backfill())
