from __future__ import annotations

from contextlib import asynccontextmanager
from datetime import date
from types import SimpleNamespace
from uuid import uuid4

import httpx
import pytest

from eti.config import Settings
from eti.discovery import DiscoveryDocument
from eti.discovery.extractor import discover_candidates
from eti.discovery.search import (
    _LIMITERS,
    _attach_source_metadata,
    _allowed_source_codes,
    _license_gate,
    _limiter_for,
    _run_source_search,
    execute_open_search_job,
)
from eti.ingestion.ratelimit import RateLimiter
from eti.sources.arxiv import ArxivConnector
from eti.sources.gdelt import GdeltConnector
from eti.sources.github import GitHubConnector
from eti.sources.openalex import OpenAlexConnector


def test_each_source_reuses_one_rate_limiter() -> None:
    _LIMITERS.pop(ArxivConnector.code, None)

    first = _limiter_for(ArxivConnector)
    second = _limiter_for(ArxivConnector)

    assert first is second


def test_legal_gate_allows_only_registered_connectors_with_complete_license_record() -> None:
    assert _allowed_source_codes({"openalex", "github", "unknown"}) == {"openalex", "github"}

    approved_record = {
        "enabled": True,
        "license_status": "approved",
        "license_type": "CC0",
        "license_owner": "Rights office",
        "license_checked_at": date(2026, 9, 26),
        "allows_derivative_analytics": True,
    }
    assert _license_gate(approved_record) == (
        True,
        "Source License Record заполнен; derivative analytics разрешена.",
    )

    incomplete_record = {**approved_record, "license_checked_at": None}
    allowed, reason = _license_gate(incomplete_record)
    assert allowed is False
    assert "не заполнен полностью" in reason


@pytest.mark.asyncio
async def test_open_search_uses_only_approved_source_allowlist_and_keeps_partial_results(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    calls: list[str] = []

    async def fake_search(source_code, _connector_type, queries, _settings, _limit):
        calls.append(source_code)
        assert queries == ["retrieval", "retrieval systems"]
        if source_code == "arxiv":
            raise RuntimeError("upstream unavailable")
        return (
            source_code,
            [
                DiscoveryDocument(
                    document_id=f"{source_code}:1",
                    source_code=source_code,
                    source_family="research",
                    title="Graph retrieval systems",
                )
            ],
            [],
            2,
        )

    monkeypatch.setattr("eti.discovery.search._search_source", fake_search)
    documents, searched, warnings = await _run_source_search(
        ["retrieval", "retrieval systems"],
        Settings(),
        {"openalex", "arxiv"},
        10,
    )

    assert calls == ["arxiv", "openalex"]
    assert searched == ["openalex"]
    assert [document.document_id for document in documents] == ["openalex:1"]
    assert len(warnings) == 1
    assert warnings[0].startswith("arxiv:")


@pytest.mark.asyncio
async def test_open_search_fails_closed_when_no_source_is_allowed() -> None:
    documents, searched, warnings = await _run_source_search(
        ["retrieval"], Settings(), set(), 10
    )

    assert documents == []
    assert searched == []
    assert warnings
    assert "derivative analytics" in warnings[0]


def test_source_registry_metadata_is_attached_to_discovery_documents() -> None:
    document = DiscoveryDocument(
        document_id="openalex:1",
        source_code="openalex",
        source_family="connector-family",
        title="Evidence title",
    )

    enriched = _attach_source_metadata(
        [document],
        {
            "openalex": {
                "source_family": "research",
                "trust_level": "high",
                "trust_reason": "Reviewed source metadata.",
                "evidence_weight": 0.9,
                "license_status": "approved",
                "allows_derivative_analytics": True,
            }
        },
    )

    assert enriched[0].source_family == "research"
    assert enriched[0].trust_level == "high"
    assert enriched[0].trust_reason == "Reviewed source metadata."
    assert enriched[0].evidence_weight == 0.9
    assert enriched[0].license_status == "approved"
    assert enriched[0].allows_derivative_analytics is True


@pytest.mark.asyncio
async def test_open_search_plans_queries_maps_candidates_and_keeps_source_provenance(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    technology_id = uuid4()
    job = SimpleNamespace(id=uuid4())

    class FakeResult:
        def __init__(self, *, scalar=None, rows=None):
            self.scalar = scalar
            self.rows = rows or []

        def scalar_one_or_none(self):
            return self.scalar

        def all(self):
            return self.rows

    source_rows = [
        (
            "openalex",
            "OpenAlex",
            "research",
            True,
            "high",
            "Public bibliographic metadata.",
            1.0,
            "approved",
            "CC0",
            "Rights office",
            date(2026, 9, 26),
            True,
        ),
        (
            "arxiv",
            "arXiv",
            "preprints",
            True,
            "medium",
            "Public preprint metadata.",
            1.0,
            "approved",
            "API terms",
            None,
            None,
            True,
        ),
    ]
    technology_rows = [
        (technology_id, "Quantum sensing", "Квантовые сенсоры", "quantum sensors")
    ]
    results = [
        FakeResult(scalar=job),
        FakeResult(rows=source_rows),
        FakeResult(rows=technology_rows),
        FakeResult(scalar=job),
    ]

    class FakeSession:
        async def execute(self, _statement):
            return results.pop(0)

    session = FakeSession()

    @asynccontextmanager
    async def fake_session_scope():
        yield session

    monkeypatch.setattr("eti.discovery.search.session_scope", fake_session_scope)

    async def fake_plan(_client, _settings, query, catalog):
        assert query == "квантовые сенсоры"
        assert catalog[0].technology_id == str(technology_id)
        return {
            "normalized_topic": "quantum sensing",
            "search_queries": ["квантовые сенсоры", "quantum sensing"],
            "technology_matches": [
                {
                    "technology_id": str(technology_id),
                    "confidence": "high",
                    "reason": "Same technology in English and Russian.",
                }
            ],
        }

    async def fake_source_search(queries, _settings, allowed_sources, _limit):
        assert queries == ["квантовые сенсоры", "quantum sensing"]
        assert allowed_sources == {"openalex"}
        return (
            [
                DiscoveryDocument(
                    document_id="openalex:1",
                    source_code="openalex",
                    source_family="research",
                    title="Quantum sensing platform",
                    url="https://example.org/paper-1",
                    published_at="2026-01-01",
                    original_abstract="Metadata abstract.",
                ),
                DiscoveryDocument(
                    document_id="openalex:2",
                    source_code="openalex",
                    source_family="research",
                    title="Quantum sensing arrays",
                    url="https://example.org/paper-2",
                    published_at="2026-02-01",
                    original_abstract="Second metadata abstract.",
                ),
            ],
            ["openalex"],
            [],
        )

    async def fake_candidate_match(_client, _settings, candidates, catalog):
        assert candidates[0]["evidence"][0]["abstract"] == "Metadata abstract."
        return [
            {
                "candidate_id": candidates[0]["candidate_id"],
                "technology_id": catalog[0].technology_id,
                "confidence": "medium",
                "reason": "The retrieved titles support the same concept.",
            }
        ]

    monkeypatch.setattr("eti.discovery.search.create_query_plan", fake_plan)
    monkeypatch.setattr("eti.discovery.search._run_source_search", fake_source_search)
    monkeypatch.setattr(
        "eti.discovery.search.match_candidates_to_technologies", fake_candidate_match
    )

    await execute_open_search_job(
        job.id,
        "квантовые сенсоры",
        10,
        Settings(expert_live_search_enabled=True),
    )

    result = job.progress["discovery_result"]
    assert job.status == "completed"
    assert result["query_plan"]["normalized_topic"] == "quantum sensing"
    assert result["searched_sources"] == ["openalex"]
    assert result["candidate_matches"][0]["technology_id"] == str(technology_id)
    assert result["candidate_mapping_status"] == "matched"
    assert result["ontology_updated"] is False
    candidate = result["candidates"][0]
    evidence = candidate["evidence"][0]
    assert candidate["review_only"] is True
    assert evidence["source_code"] == "openalex"
    assert evidence["url"] == "https://example.org/paper-1"
    assert evidence["published_at"] == "2026-01-01"
    assert evidence["original_abstract"] == "Metadata abstract."
    assert result["source_statuses"][0]["status"] == "blocked"
    assert "Source License Record" in result["source_statuses"][0]["message"]


@pytest.fixture
def openalex_response() -> dict:
    return {
        "meta": {"next_cursor": None},
        "results": [
            {
                "id": "https://openalex.org/W123",
                "display_name": "Agentic retrieval systems",
                "publication_date": "2025-04-01",
                "language": "en",
                "primary_location": {"landing_page_url": "https://example.org/paper"},
                "authorships": [],
                "topics": [],
                "updated_date": "2025-04-02T12:00:00",
            }
        ],
    }


@pytest.fixture
def arxiv_response() -> str:
    return """<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"
      xmlns:arxiv="http://arxiv.org/schemas/atom">
  <entry>
    <id>http://arxiv.org/abs/2504.01234</id>
    <title>Agentic retrieval systems</title>
    <published>2025-04-01T00:00:00Z</published>
    <updated>2025-04-02T00:00:00Z</updated>
    <link rel="alternate" href="https://arxiv.org/abs/2504.01234"/>
    <category term="cs.AI"/>
    <arxiv:primary_category term="cs.AI"/>
  </entry>
</feed>"""


@pytest.fixture
def github_response() -> dict:
    return {
        "total_count": 1,
        "items": [
            {
                "id": 123456,
                "full_name": "example/agentic-retrieval",
                "html_url": "https://github.com/example/agentic-retrieval",
                "description": "Agentic retrieval systems",
                "created_at": "2025-04-01T12:00:00Z",
                "updated_at": "2025-04-02T12:00:00Z",
                "topics": ["agentic-retrieval"],
                "language": "Python",
                "owner": {"login": "example", "type": "User"},
            }
        ],
    }


@pytest.fixture
def gdelt_response() -> dict:
    return {
        "articles": [
            {
                "url": "https://news.example.org/agentic-retrieval",
                "title": "Agentic retrieval systems gain attention",
                "language": "English",
                "seendate": "20250401T120000Z",
                "domain": "news.example.org",
            }
        ]
    }


def _discovery_document(normalized, connector) -> DiscoveryDocument:
    return DiscoveryDocument.from_normalized(
        normalized,
        source_code=connector.code,
        source_family=str(connector.family),
    )


@pytest.mark.asyncio
async def test_openalex_fetch_and_normalize_from_fixture(openalex_response: dict) -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/works"
        return httpx.Response(200, json=openalex_response)

    connector = OpenAlexConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("openalex"),
        contact_email="tests@example.org",
    )
    try:
        raw = [
            item
            async for item in connector.fetch(
                cursor=None, mode="incremental", query="agentic", limit=1
            )
        ]
    finally:
        await connector.client.aclose()

    document = _discovery_document(connector.normalize(raw[0]), connector)
    assert document.document_id == "https://openalex.org/W123"
    assert document.title == "Agentic retrieval systems"
    assert document.url == "https://example.org/paper"
    assert document.language == "en"
    assert document.normalized is not None
    assert document.normalized.published_at.date() == date(2025, 4, 1)
    assert document.source_code == "openalex"
    assert document.source_family == "research"


@pytest.mark.asyncio
async def test_arxiv_fetch_and_normalize_from_fixture(arxiv_response: str) -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/api/query"
        return httpx.Response(200, text=arxiv_response)

    connector = ArxivConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("arxiv"),
    )
    try:
        raw = [
            item
            async for item in connector.fetch(
                cursor=None, mode="incremental", query="agentic", limit=1
            )
        ]
    finally:
        await connector.client.aclose()

    document = _discovery_document(connector.normalize(raw[0]), connector)
    assert document.document_id == "http://arxiv.org/abs/2504.01234"
    assert document.title == "Agentic retrieval systems"
    assert document.url == "https://arxiv.org/abs/2504.01234"
    assert document.language == "en"
    assert document.normalized is not None
    assert document.normalized.published_at.date() == date(2025, 4, 1)
    assert document.source_code == "arxiv"
    assert document.source_family == "preprints"


@pytest.mark.asyncio
async def test_github_fetch_and_normalize_from_fixture(github_response: dict) -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/search/repositories"
        return httpx.Response(200, json=github_response)

    connector = GitHubConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("github"),
    )
    try:
        raw = [
            item
            async for item in connector.fetch(
                cursor="2025-01-01", mode="incremental", query="agentic", limit=1
            )
        ]
    finally:
        await connector.client.aclose()

    document = _discovery_document(connector.normalize(raw[0]), connector)
    assert document.document_id == "123456"
    assert document.title == "example/agentic-retrieval"
    assert document.url == "https://github.com/example/agentic-retrieval"
    # GitHub's programming language is retained in external_topics; the
    # normalized language field is intentionally unavailable in this contract.
    assert document.language is None
    assert document.normalized is not None
    assert document.normalized.published_at.date() == date(2025, 4, 1)
    assert document.source_code == "github"
    assert document.source_family == "open_source"


@pytest.mark.asyncio
async def test_gdelt_fetch_and_normalize_from_fixture(gdelt_response: dict) -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/api/v2/doc/doc"
        return httpx.Response(200, json=gdelt_response)

    connector = GdeltConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("gdelt"),
    )
    try:
        raw = [
            item
            async for item in connector.fetch(
                cursor="2025-04-01", mode="incremental", query="agentic retrieval", limit=1
            )
        ]
    finally:
        await connector.client.aclose()

    document = _discovery_document(connector.normalize(raw[0]), connector)
    assert document.document_id == "https://news.example.org/agentic-retrieval"
    assert document.title == "Agentic retrieval systems gain attention"
    assert document.url == "https://news.example.org/agentic-retrieval"
    assert document.language == "english"
    assert document.normalized is not None
    assert document.normalized.published_at.date() == date(2025, 4, 1)
    assert document.source_code == "gdelt"
    assert document.source_family == "web_news"


def test_candidate_evidence_preserves_openalex_provenance() -> None:
    document = DiscoveryDocument(
        document_id="https://openalex.org/W123",
        source_code="openalex",
        source_family="research",
        title="Agentic retrieval systems",
        original_title="Agentic retrieval systems",
        url="https://example.org/paper",
        published_at="2025-04-01",
        original_abstract="Bibliographic abstract only.",
    )

    result = discover_candidates(
        "agentic",
        [document],
        min_term_documents=1,
        min_candidate_documents=1,
    )

    assert result.candidates
    evidence = result.candidates[0].evidence[0]
    assert evidence.original_title == "Agentic retrieval systems"
    assert evidence.source_code == "openalex"
    assert evidence.url == "https://example.org/paper"
    assert evidence.published_at == "2025-04-01"
    assert result.candidates[0].review_only is True
    assert result.candidates[0].classifier_confidence is None