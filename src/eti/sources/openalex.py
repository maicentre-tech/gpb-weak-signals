"""Коннектор OpenAlex — научные публикации, topics, цитирования (§3, P0).

Доступ открытый, ключ не требуется; идентификация через polite pool
(параметр ``mailto``). Инкрементальная загрузка — по ``from_updated_date``
с курсорной пагинацией, а не повторным скачиванием корпуса (§3.1, §21.4).

Про changefiles/snapshot: для полного локального зеркала §21.4 предписывает
changefile-стратегию. На пилоте объём меньше, поэтому используется API с
курсором; переход на снапшоты делается заменой ``fetch`` без изменений в
остальном пайплайне.
"""

from __future__ import annotations

from collections.abc import AsyncIterator
from datetime import UTC, datetime

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.sources.base import Connector, NormalizedDocument, RawRecord

API_BASE = "https://api.openalex.org"
PER_PAGE = 200


def reconstruct_abstract(inverted_index: dict[str, list[int]] | None) -> str | None:
    """OpenAlex отдаёт абстракт инвертированным индексом {слово: [позиции]}.

    Восстановление по позициям. Пропуски в нумерации не считаются ошибкой —
    собирается то, что есть.
    """
    if not inverted_index:
        return None
    positions: list[tuple[int, str]] = [
        (pos, word) for word, idx in inverted_index.items() for pos in idx
    ]
    if not positions:
        return None
    positions.sort(key=lambda item: item[0])
    return " ".join(word for _, word in positions)


class OpenAlexConnector(Connector):
    code = "openalex"
    name = "OpenAlex"
    family = SourceFamily.RESEARCH
    default_document_type = DocumentType.PAPER
    requires_credentials = False
    rate_limit_per_hour = 100_000
    """Дневной лимит polite pool — 100k запросов; переведён в часовой темп
    консервативно. Перепроверить перед production (§3.1)."""
    supports_backfill = True
    supports_change_events = False

    def __init__(self, *args: object, contact_email: str, **kwargs: object) -> None:
        super().__init__(*args, **kwargs)  # type: ignore[arg-type]
        self.contact_email = contact_email

    def _params(self, cursor: str | None, filters: list[str]) -> dict[str, str]:
        return {
            "filter": ",".join(filters),
            "per-page": str(PER_PAGE),
            "cursor": cursor or "*",
            "mailto": self.contact_email,
            "select": (
                "id,doi,display_name,publication_date,publication_year,language,"
                "type,cited_by_count,authorships,topics,primary_location,"
                "abstract_inverted_index,updated_date,referenced_works_count"
            ),
        }

    async def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        filters: list[str] = []
        if query:
            filters.append(f"title_and_abstract.search:{query}")
        if mode == "incremental" and cursor:
            filters.append(f"from_updated_date:{cursor}")
        elif mode == "backfill" and cursor:
            filters.append(f"from_publication_date:{cursor}")
        if not filters:
            filters.append("from_publication_date:2010-01-01")

        page_cursor: str | None = "*"
        fetched = 0
        while page_cursor:
            payload = await self.request_json(
                f"{API_BASE}/works", params=self._params(page_cursor, filters)
            )
            results = payload.get("results", [])
            if not results:
                break
            for work in results:
                yield RawRecord(
                    external_id=work["id"],
                    payload=work,
                    source_revision=work.get("updated_date"),
                    cursor=work.get("updated_date"),
                )
                fetched += 1
                if limit and fetched >= limit:
                    return
            page_cursor = payload.get("meta", {}).get("next_cursor")

    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        work = raw.payload

        published_at: datetime | None = None
        if pub_date := work.get("publication_date"):
            try:
                published_at = datetime.fromisoformat(pub_date).replace(tzinfo=UTC)
            except ValueError:
                published_at = None

        authors = {
            "count": len(work.get("authorships") or []),
            "names": [
                a.get("author", {}).get("display_name")
                for a in (work.get("authorships") or [])[:25]
                if a.get("author")
            ],
            "ids": [
                a.get("author", {}).get("id")
                for a in (work.get("authorships") or [])[:25]
                if a.get("author")
            ],
        }

        institution_entries = [
            inst
            for a in (work.get("authorships") or [])
            for inst in (a.get("institutions") or [])
            if inst.get("id")
        ]
        institutions = {
            "count": len({i["id"] for i in institution_entries}),
            "ids": list({i["id"] for i in institution_entries})[:25],
            "names": list({i.get("display_name") for i in institution_entries if i.get("display_name")})[:25],
        }

        topics = work.get("topics") or []
        # Имена уровней иерархии сохраняются вместе с идентификаторами:
        # без них подписью peer group становится имя произвольной темы,
        # и «Privacy-Preserving ML» оказывается в поле «Multi-Agent Systems».
        external_topics = {
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

        doi = work.get("doi")
        if doi and doi.startswith("https://doi.org/"):
            doi = doi.removeprefix("https://doi.org/")

        return NormalizedDocument(
            external_id=work["id"],
            document_type=DocumentType.PAPER,
            title=work.get("display_name"),
            abstract=reconstruct_abstract(work.get("abstract_inverted_index")),
            url=(work.get("primary_location") or {}).get("landing_page_url") or work["id"],
            doi=doi,
            language=work.get("language"),
            published_at=published_at,
            available_from=published_at,
            external_topics=external_topics,
            authors=authors,
            institutions=institutions,
            metrics={
                "citations": float(work.get("cited_by_count") or 0),
                "references": float(work.get("referenced_works_count") or 0),
            },
            source_revision=work.get("updated_date"),
            raw_payload=work,
            event_type=ChangeEventType.CREATE,
        )
