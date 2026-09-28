"""Metadata-only adapters for the remaining v1.5 P0 sources.

These connectors deliberately contain no licensing decisions.  The discovery
and ingestion layers apply the existing Source License Record gate before a
connector is called.  Responses are normalized to bibliographic/package/event
metadata only; no source content or model files are downloaded.
"""

from __future__ import annotations

from collections.abc import AsyncIterator
from datetime import UTC, datetime
from typing import Any

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.sources.base import Connector, NormalizedDocument, RawRecord


def _date(value: Any) -> datetime | None:
    if not value:
        return None
    if isinstance(value, int):
        try:
            return datetime(value, 1, 1, tzinfo=UTC)
        except ValueError:
            return None
    text = str(value).replace("Z", "+00:00")
    try:
        parsed = datetime.fromisoformat(text)
    except ValueError:
        try:
            parsed = datetime.strptime(str(value)[:10], "%Y-%m-%d")
        except ValueError:
            return None
    return parsed.replace(tzinfo=UTC) if parsed.tzinfo is None else parsed.astimezone(UTC)


class _JsonSearchConnector(Connector):
    """Small common implementation for cursorless JSON search endpoints."""

    endpoint: str
    params: dict[str, str]
    item_key = "items"

    def _request_params(self, query: str | None, limit: int) -> dict[str, str]:
        params = dict(self.params)
        if query:
            params.update(self.query_params(query))
        params[self.limit_param] = str(min(limit, self.max_page_size))
        return params

    query_param = "query"
    limit_param = "limit"
    max_page_size = 100

    def query_params(self, query: str) -> dict[str, str]:
        return {self.query_param: query}

    def _items(self, payload: Any) -> list[dict[str, Any]]:
        items = payload.get(self.item_key, [])
        return [item for item in items if isinstance(item, dict)]

    async def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        del mode
        requested = max(1, limit or self.max_page_size)
        payload = await self.request_json(
            self.endpoint, params=self._request_params(query, requested)
        )
        for item in self._items(payload):
            external_id = self.external_id(item)
            if not external_id:
                continue
            yield RawRecord(
                external_id=external_id,
                payload=item,
                source_revision=str(item.get("updated_at") or item.get("updated") or "") or None,
                cursor=external_id,
            )

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("id") or item.get("name") or item.get("full_name") or "")

    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        item = raw.payload
        title = self.title(item)
        if not title:
            return None
        published = _date(self.published_value(item))
        return NormalizedDocument(
            external_id=raw.external_id,
            document_type=self.default_document_type,
            title=title,
            abstract=self.abstract(item),
            url=self.url(item),
            doi=self.doi(item),
            language=self.language(item),
            published_at=published,
            available_from=published,
            external_topics=self.topics(item),
            authors=self.authors(item),
            metrics=self.metrics(item),
            source_revision=raw.source_revision,
            raw_payload=item,
            event_type=ChangeEventType.CREATE,
        )

    def title(self, item: dict[str, Any]) -> str | None:
        return str(item.get("title") or item.get("name") or item.get("display_name") or "") or None

    def abstract(self, item: dict[str, Any]) -> str | None:
        value = item.get("abstract") or item.get("description") or item.get("summary")
        return str(value) if value else None

    def url(self, item: dict[str, Any]) -> str | None:
        value = item.get("url") or item.get("html_url") or item.get("webpage")
        return str(value) if value else None

    def doi(self, item: dict[str, Any]) -> str | None:
        value = item.get("DOI") or item.get("doi")
        return str(value).removeprefix("https://doi.org/") if value else None

    def language(self, item: dict[str, Any]) -> str | None:
        value = item.get("language")
        return str(value) if value else None

    def published_value(self, item: dict[str, Any]) -> Any:
        return item.get("published_at") or item.get("published") or item.get("created_at")

    def topics(self, item: dict[str, Any]) -> dict[str, Any]:
        return {"topics": item.get("topics", [])} if item.get("topics") else {}

    def authors(self, item: dict[str, Any]) -> dict[str, Any]:
        authors = item.get("authors") or []
        return {"names": [a.get("name") for a in authors if isinstance(a, dict) and a.get("name")]}

    def metrics(self, item: dict[str, Any]) -> dict[str, float]:
        return {}


class CrossrefConnector(_JsonSearchConnector):
    code = "crossref"
    name = "Crossref"
    family = SourceFamily.RESEARCH
    default_document_type = DocumentType.PAPER
    endpoint = "https://api.crossref.org/works"
    params = {"select": "DOI,title,abstract,published,URL,author,created,type"}
    query_param = "query.bibliographic"
    limit_param = "rows"
    max_page_size = 1000
    rate_limit_per_hour = 3600

    def _items(self, payload: dict[str, Any]) -> list[dict[str, Any]]:
        message = payload.get("message", {})
        return [item for item in message.get("items", []) if isinstance(item, dict)]

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("DOI") or item.get("URL") or "")

    def title(self, item: dict[str, Any]) -> str | None:
        titles = item.get("title") or []
        return str(titles[0]) if titles else None

    def abstract(self, item: dict[str, Any]) -> str | None:
        value = item.get("abstract")
        return str(value) if value else None

    def url(self, item: dict[str, Any]) -> str | None:
        return str(item.get("URL") or "") or None

    def published_value(self, item: dict[str, Any]) -> Any:
        published = (
            item.get("published-print")
            or item.get("published-online")
            or item.get("published")
            or {}
        )
        parts = (published.get("date-parts") or [[None]])[0]
        if not parts or parts[0] is None:
            return None
        return "-".join(str(part).zfill(2) for part in (parts + [1, 1])[:3])

    def authors(self, item: dict[str, Any]) -> dict[str, Any]:
        authors = item.get("author") or []
        return {"names": [a.get("given", "") + " " + a.get("family", "") for a in authors if a.get("family")]}


class SemanticScholarConnector(_JsonSearchConnector):
    code = "semantic_scholar"
    name = "Semantic Scholar"
    family = SourceFamily.RESEARCH
    default_document_type = DocumentType.PAPER
    endpoint = "https://api.semanticscholar.org/graph/v1/paper/search"
    params = {"fields": "paperId,title,abstract,url,externalIds,authors,year,publicationDate,openAccessPdf"}
    query_param = "query"
    rate_limit_per_hour = 1000

    def _items(self, payload: dict[str, Any]) -> list[dict[str, Any]]:
        return [item for item in payload.get("data", []) if isinstance(item, dict)]

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("paperId") or "")

    def doi(self, item: dict[str, Any]) -> str | None:
        return (item.get("externalIds") or {}).get("DOI")

    def published_value(self, item: dict[str, Any]) -> Any:
        return item.get("publicationDate") or item.get("year")


class GhArchiveConnector(_JsonSearchConnector):
    """GH Archive hourly event metadata endpoint.

    The archive response is an event list.  Only repository/event metadata is
    retained, never the event payload's patch or file contents.
    """

    code = "gharchive"
    name = "GH Archive"
    family = SourceFamily.OPEN_SOURCE
    default_document_type = DocumentType.REPOSITORY
    endpoint = "https://data.gharchive.org/2026-01-01-0.json.gz"
    params: dict[str, str] = {}
    item_key = "__events__"
    max_page_size = 100
    rate_limit_per_hour = 24

    def _items(self, payload: dict[str, Any]) -> list[dict[str, Any]]:
        return [item for item in payload.get("__events__", []) if isinstance(item, dict)]

    async def fetch(self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None) -> AsyncIterator[RawRecord]:
        del mode
        # A cursor is an archive URL supplied by the scheduler; the default is
        # intentionally deterministic for tests and must not imply live access.
        url = cursor if cursor and cursor.startswith("https://data.gharchive.org/") else self.endpoint
        response = await self.request(url)
        events = response.json()
        for event in events[: max(1, limit or self.max_page_size)]:
            repo = event.get("repo") or {}
            name = str(repo.get("name") or "")
            if query and query.casefold() not in name.casefold():
                continue
            external_id = str(event.get("id") or "")
            if external_id:
                # Keep repository/event metadata, but never persist push
                # payloads (commits, patches, file names, or message bodies).
                metadata = {
                    key: value
                    for key, value in event.items()
                    if key in {"id", "type", "created_at", "repo", "actor", "org", "public"}
                }
                yield RawRecord(external_id=external_id, payload=metadata, cursor=external_id)

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("id") or "")

    def title(self, item: dict[str, Any]) -> str | None:
        return (item.get("repo") or {}).get("name")

    def url(self, item: dict[str, Any]) -> str | None:
        name = self.title(item)
        return f"https://github.com/{name}" if name else None

    def published_value(self, item: dict[str, Any]) -> Any:
        return item.get("created_at")

    def metrics(self, item: dict[str, Any]) -> dict[str, float]:
        return {"events": 1.0}


class HuggingFaceConnector(_JsonSearchConnector):
    code = "huggingface"
    name = "Hugging Face"
    family = SourceFamily.OPEN_SOURCE
    default_document_type = DocumentType.MODEL
    endpoint = "https://huggingface.co/api/models"
    params: dict[str, str] = {}
    query_param = "search"
    rate_limit_per_hour = 3600

    def _items(self, payload: dict[str, Any]) -> list[dict[str, Any]]:
        # The HF endpoint returns a top-level JSON array rather than an object.
        return [item for item in payload if isinstance(item, dict)] if isinstance(payload, list) else []

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("id") or "")

    def title(self, item: dict[str, Any]) -> str | None:
        return str(item.get("id") or "") or None

    def url(self, item: dict[str, Any]) -> str | None:
        return f"https://huggingface.co/{item['id']}" if item.get("id") else None

    def metrics(self, item: dict[str, Any]) -> dict[str, float]:
        return {"downloads": float(item.get("downloads") or 0), "likes": float(item.get("likes") or 0)}

    def published_value(self, item: dict[str, Any]) -> Any:
        return item.get("lastModified") or item.get("createdAt")


class PyPIConnector(_JsonSearchConnector):
    code = "pypi"
    name = "PyPI"
    family = SourceFamily.OPEN_SOURCE
    default_document_type = DocumentType.REPOSITORY
    endpoint = "https://pypi.org/pypi/{query}/json"
    params: dict[str, str] = {}
    max_page_size = 1
    rate_limit_per_hour = 3600

    async def fetch(self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None) -> AsyncIterator[RawRecord]:
        del cursor, mode, limit
        if not query:
            return
        payload = await self.request_json(self.endpoint.format(query=query))
        info = payload.get("info") or {}
        if info.get("name"):
            yield RawRecord(external_id=str(info["name"]), payload=info, cursor=str(info["name"]))

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("name") or "")

    def url(self, item: dict[str, Any]) -> str | None:
        return str(item.get("home_page") or f"https://pypi.org/project/{item['name']}/") if item.get("name") else None


class NpmConnector(_JsonSearchConnector):
    code = "npm"
    name = "npm"
    family = SourceFamily.OPEN_SOURCE
    default_document_type = DocumentType.REPOSITORY
    endpoint = "https://registry.npmjs.org/-/v1/search"
    params = {"quality": "0.0", "popularity": "0.0", "maintenance": "0.0"}
    query_param = "text"
    limit_param = "size"
    rate_limit_per_hour = 3600

    def _items(self, payload: dict[str, Any]) -> list[dict[str, Any]]:
        return [item.get("package", {}) for item in payload.get("objects", []) if item.get("package")]

    def external_id(self, item: dict[str, Any]) -> str:
        return str(item.get("name") or "")

    def url(self, item: dict[str, Any]) -> str | None:
        return str(item.get("links", {}).get("npm") or "") or None

    def metrics(self, item: dict[str, Any]) -> dict[str, float]:
        return {}