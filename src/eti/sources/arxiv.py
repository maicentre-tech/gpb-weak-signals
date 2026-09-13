"""Коннектор arXiv — preprints, ранний научный сигнал (§3, P0).

arXiv важен не объёмом, а опережением: препринт появляется за месяцы до
рецензируемой публикации, поэтому в §24.6 он идёт отдельным компонентом с
весом 0.25, а в §24.17 получает максимальный вес источника (1.00).

API отдаёт Atom XML, не JSON. Требование площадки — пауза между запросами
(порядка 3 секунд), что и задаёт ``rate_limit_per_hour``.
"""

from __future__ import annotations

import xml.etree.ElementTree as ET
from collections.abc import AsyncIterator
from datetime import UTC, datetime

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.sources.base import Connector, NormalizedDocument, RawRecord

API_URL = "https://export.arxiv.org/api/query"
PAGE_SIZE = 100
MAX_OFFSET = 30_000
"""arXiv не отдаёт результаты глубже ~30k на один search_query. Более
глубокая история берётся нарезкой запроса по датам, а не пагинацией."""

NS = {"atom": "http://www.w3.org/2005/Atom", "arxiv": "http://arxiv.org/schemas/atom"}


class ArxivConnector(Connector):
    code = "arxiv"
    name = "arXiv"
    family = SourceFamily.PREPRINTS
    default_document_type = DocumentType.PREPRINT
    requires_credentials = False
    rate_limit_per_hour = 1_200
    min_interval_seconds = 3.0
    """arXiv просит паузу между обращениями; часового лимита мало —
    token bucket иначе выпускает накопленный запас пачкой и получает 429."""
    supports_backfill = True
    supports_change_events = False

    async def _fetch_page(self, query: str, start: int) -> list[ET.Element]:
        response = await self.request(
            API_URL,
            params={
                "search_query": query,
                "start": str(start),
                "max_results": str(PAGE_SIZE),
                "sortBy": "submittedDate",
                "sortOrder": "descending",
            },
        )
        root = ET.fromstring(response.text)
        return root.findall("atom:entry", NS)

    async def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        search_query = f"all:{query}" if query else "cat:cs.AI"
        start = 0
        fetched = 0

        while start < MAX_OFFSET:
            entries = await self._fetch_page(search_query, start)
            if not entries:
                break

            for entry in entries:
                payload = self._entry_to_dict(entry)
                if not payload.get("id"):
                    continue

                # Пагинация идёт от новых к старым; дойдя до чекпоинта,
                # останавливаемся — всё старше уже загружено.
                published = payload.get("published")
                if mode == "incremental" and cursor and published and published <= cursor:
                    return

                yield RawRecord(
                    external_id=payload["id"],
                    payload=payload,
                    source_revision=payload.get("updated"),
                    cursor=published,
                )
                fetched += 1
                if limit and fetched >= limit:
                    return

            start += PAGE_SIZE

    @staticmethod
    def _entry_to_dict(entry: ET.Element) -> dict:
        def text(path: str) -> str | None:
            node = entry.find(path, NS)
            return node.text.strip() if node is not None and node.text else None

        authors = [
            name.text.strip()
            for author in entry.findall("atom:author", NS)
            if (name := author.find("atom:name", NS)) is not None and name.text
        ]
        categories = [
            cat.attrib["term"]
            for cat in entry.findall("atom:category", NS)
            if "term" in cat.attrib
        ]
        links = {
            link.attrib.get("title") or link.attrib.get("rel", "alternate"): link.attrib.get("href")
            for link in entry.findall("atom:link", NS)
        }
        doi_node = entry.find("arxiv:doi", NS)

        return {
            "id": text("atom:id"),
            "title": text("atom:title"),
            "summary": text("atom:summary"),
            "published": text("atom:published"),
            "updated": text("atom:updated"),
            "authors": authors,
            "categories": categories,
            "primary_category": (
                pc.attrib.get("term")
                if (pc := entry.find("arxiv:primary_category", NS)) is not None
                else None
            ),
            "doi": doi_node.text.strip() if doi_node is not None and doi_node.text else None,
            "links": links,
        }

    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        payload = raw.payload

        published_at: datetime | None = None
        if published := payload.get("published"):
            try:
                published_at = datetime.fromisoformat(published.replace("Z", "+00:00"))
            except ValueError:
                published_at = None
        if published_at and published_at.tzinfo is None:
            published_at = published_at.replace(tzinfo=UTC)

        title = payload.get("title")
        if title:
            # arXiv переносит длинные заголовки — в Atom они приходят с \n.
            title = " ".join(title.split())
        summary = payload.get("summary")
        if summary:
            summary = " ".join(summary.split())

        return NormalizedDocument(
            external_id=payload["id"],
            document_type=DocumentType.PREPRINT,
            title=title,
            abstract=summary,
            url=payload.get("links", {}).get("alternate") or payload["id"],
            doi=payload.get("doi"),
            language="en",
            published_at=published_at,
            available_from=published_at,
            external_topics={
                "arxiv_categories": payload.get("categories", []),
                "primary_category": payload.get("primary_category"),
            },
            authors={
                "count": len(payload.get("authors", [])),
                "names": payload.get("authors", [])[:25],
            },
            institutions={},
            metrics={},
            source_revision=payload.get("updated"),
            raw_payload=payload,
            event_type=ChangeEventType.CREATE,
        )
