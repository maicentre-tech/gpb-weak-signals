from __future__ import annotations

from datetime import date

import httpx
import pytest

from eti.discovery import DiscoveryDocument
from eti.discovery.search import CONNECTORS
from eti.ingestion.ratelimit import RateLimiter
from scripts.seed_sources import SOURCES as SOURCE_SEEDS
from eti.sources.p0 import (
    CrossrefConnector,
    GhArchiveConnector,
    HuggingFaceConnector,
    NpmConnector,
    PyPIConnector,
    SemanticScholarConnector,
)


def _doc(connector, normalized) -> DiscoveryDocument:
    return DiscoveryDocument.from_normalized(
        normalized, source_code=connector.code, source_family=str(connector.family)
    )


@pytest.mark.asyncio
@pytest.mark.parametrize(
    ("connector_type", "payload", "path", "expected_id", "expected_title"),
    [
        (
            CrossrefConnector,
            {"message": {"items": [{"DOI": "10.1000/demo", "title": ["Cross-source paper"], "URL": "https://doi.org/10.1000/demo", "published": {"date-parts": [[2025, 4, 1]]}}]}},
            "/works",
            "10.1000/demo",
            "Cross-source paper",
        ),
        (
            SemanticScholarConnector,
            {"data": [{"paperId": "S1", "title": "Semantic paper", "url": "https://example.org/s1", "publicationDate": "2025-04-01"}]},
            "/graph/v1/paper/search",
            "S1",
            "Semantic paper",
        ),
        (
            HuggingFaceConnector,
            [{"id": "org/demo-model", "downloads": 12, "likes": 3, "lastModified": "2025-04-01T00:00:00Z"}],
            "/api/models",
            "org/demo-model",
            "org/demo-model",
        ),
        (
            NpmConnector,
            {"objects": [{"package": {"name": "demo-package", "version": "1.0.0", "links": {"npm": "https://npmjs.com/package/demo-package"}}}]},
            "/-/v1/search",
            "demo-package",
            "demo-package",
        ),
    ],
)
async def test_json_p0_connectors_request_metadata_and_preserve_provenance(
    connector_type, payload, path, expected_id, expected_title
) -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == path
        assert request.url.params.get("limit") or request.url.params.get("rows") or request.url.params.get("size")
        return httpx.Response(200, json=payload)

    connector = connector_type(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter(connector_type.code),
    )
    try:
        records = [
            record
            async for record in connector.fetch(
                cursor=None, mode="incremental", query="agentic", limit=1
            )
        ]
    finally:
        await connector.client.aclose()

    normalized = connector.normalize(records[0])
    document = _doc(connector, normalized)
    assert document.document_id == expected_id
    assert document.title == expected_title
    assert document.source_code == connector_type.code
    assert document.source_family == str(connector_type.family)
    assert document.url
    assert document.normalized is not None
    if connector_type is not NpmConnector:
        assert document.normalized.published_at is not None
        assert document.normalized.published_at.date() == date(2025, 4, 1)


@pytest.mark.asyncio
async def test_pypi_uses_package_metadata_endpoint_and_normalizes() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/pypi/demo-package/json"
        return httpx.Response(
            200,
            json={
                "info": {
                    "name": "demo-package",
                    "summary": "Metadata-only package description",
                    "home_page": "https://example.org/demo-package",
                    "version": "1.2.0",
                    "author": "Example",
                }
            },
        )

    connector = PyPIConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("pypi"),
    )
    try:
        records = [
            record
            async for record in connector.fetch(
                cursor=None, mode="incremental", query="demo-package", limit=1
            )
        ]
    finally:
        await connector.client.aclose()
    document = _doc(connector, connector.normalize(records[0]))
    assert document.document_id == "demo-package"
    assert document.title == "demo-package"
    assert document.original_abstract == "Metadata-only package description"
    assert document.source_code == "pypi"


@pytest.mark.asyncio
async def test_gharchive_normalizes_event_without_event_payload_provenance() -> None:
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.host == "data.gharchive.org"
        assert request.url.path.endswith(".json.gz")
        return httpx.Response(
            200,
            json=[
                {
                    "id": "evt-1",
                    "type": "PushEvent",
                    "created_at": "2025-04-01T12:00:00Z",
                    "repo": {"name": "example/demo"},
                    "payload": {"commits": [{"sha": "secret-content-not-retained"}]},
                }
            ],
        )

    connector = GhArchiveConnector(
        httpx.AsyncClient(transport=httpx.MockTransport(handler)),
        RateLimiter("gharchive"),
    )
    try:
        records = [
            record
            async for record in connector.fetch(
                cursor=None, mode="incremental", query="example", limit=1
            )
        ]
    finally:
        await connector.client.aclose()
    normalized = connector.normalize(records[0])
    assert normalized is not None
    assert normalized.external_id == "evt-1"
    assert normalized.title == "example/demo"
    assert normalized.url == "https://github.com/example/demo"
    assert normalized.published_at is not None
    assert normalized.published_at.date() == date(2025, 4, 1)


def test_all_required_p0_sources_are_registered_without_legal_approval() -> None:
    required = {
        "openalex", "crossref", "semantic_scholar", "github",
        "gharchive", "huggingface", "pypi", "npm",
    }
    assert required <= set(CONNECTORS)


def test_new_p0_source_records_are_disabled_and_fail_closed() -> None:
    expected = {"semantic_scholar", "huggingface", "pypi", "npm"}
    specs = {spec["code"]: spec for spec in SOURCE_SEEDS}

    assert expected <= specs.keys()
    for code in expected:
        spec = specs[code]
        assert str(spec["license_status"]) == "unclear"
        assert spec["enabled"] is False
        assert spec.get("allows_derivative_analytics", False) is False
        assert not spec.get("license_owner")
        assert not spec.get("license_checked_at")