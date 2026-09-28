from __future__ import annotations

import json
from datetime import date
from pathlib import Path
from types import SimpleNamespace
from uuid import uuid4

import httpx
import pytest

from eti.api.app import app, settings
from eti.api.deps import get_session
from eti.api.routes import _live_expert_search_enabled
from eti.ontology.resolver import normalize_name
from scripts.seed_ontology import aliases_for_entry

SNAPSHOT_DATE = date(2026, 9, 26)
ONTOLOGY_PATH = Path(__file__).resolve().parents[1] / "data/ontology/ai_pilot.json"


class FakeResult:
    def __init__(self, *, rows=None, count: int | None = None) -> None:
        self.rows = rows or []
        self.count = count

    def scalars(self):
        return self

    def all(self):
        return self.rows

    def scalar_one(self):
        return self.count


class FakeSession:
    def __init__(
        self,
        aliases: list[SimpleNamespace],
        technologies: list[SimpleNamespace],
        scores: list[SimpleNamespace],
        *,
        preflight_count: bool = False,
    ) -> None:
        self.results = []
        if preflight_count:
            self.results.append(FakeResult(count=len(scores)))
        self.results.extend(
            [FakeResult(rows=aliases), FakeResult(rows=technologies), FakeResult(rows=scores)]
        )

    async def execute(self, _statement):
        if not self.results:
            raise AssertionError("Unexpected database query")
        return self.results.pop(0)


def _fixture_data():
    spec = json.loads(ONTOLOGY_PATH.read_text(encoding="utf-8"))
    technologies = []
    aliases = []
    scores = []
    for index, entry in enumerate(spec["technologies"]):
        technology = SimpleNamespace(
            id=uuid4(),
            canonical_name=entry["canonical_name"],
            canonical_name_ru=entry.get("canonical_name_ru"),
        )
        technologies.append(technology)
        aliases.extend(
            SimpleNamespace(
                technology_id=technology.id,
                normalized_alias=normalize_name(alias),
            )
            for alias, _source in aliases_for_entry(spec, entry)
        )
        scores.append(
            SimpleNamespace(
                technology_id=technology.id,
                strategic_relevance=None,
                strategic_priority=None,
                emerging_score=float(len(spec["technologies"]) - index),
                evidence_confidence=80.0,
                maturity_stage=None,
                signal_status=None,
                detector_scores={"weak_signal_probability": 0.99},
                scoring_version="test",
                dataset_version="test",
                reference_population_size=None,
            )
        )
    return aliases, technologies, scores


@pytest.fixture
async def client():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as value:
        yield value


def _install_test_sessions(monkeypatch, sessions: list[FakeSession]) -> None:
    session_iterator = iter(sessions)

    async def fake_session():
        return next(session_iterator)

    monkeypatch.setitem(app.dependency_overrides, get_session, fake_session)


@pytest.mark.asyncio
async def test_domain_and_russian_variants_return_snapshot_cards(
    client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    aliases, technologies, scores = _fixture_data()
    domains = (
        "Технологии в ИИ",
        "Технологии искусственного интеллекта",
        "Искусственный интеллект",
        "ИИ",
        "AI",
    )
    _install_test_sessions(
        monkeypatch,
        [FakeSession(aliases, technologies, scores) for _domain in domains],
    )

    async def latest(_session):
        return SNAPSHOT_DATE

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr(settings, "public_read_only", True)

    for domain in domains:
        response = await client.post(
            "/api/v1/query", json={"domain": domain, "limit": 50}
        )
        assert response.status_code == 200
        body = response.json()
        assert body["total_results"] == len(technologies)
        assert len(body["results"]) == len(technologies)
        assert all(result["classifier_confidence"] is None for result in body["results"])


@pytest.mark.asyncio
async def test_known_russian_alias_returns_its_english_technology(
    client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    aliases, technologies, scores = _fixture_data()
    agentic = next(
        technology
        for technology in technologies
        if technology.canonical_name == "Agentic AI / Autonomous AI Agents"
    )
    agentic_score = next(score for score in scores if score.technology_id == agentic.id)
    _install_test_sessions(
        monkeypatch, [FakeSession(aliases, technologies, [agentic_score])]
    )

    async def latest(_session):
        return SNAPSHOT_DATE

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr(settings, "public_read_only", True)

    response = await client.post(
        "/api/v1/query", json={"domain": "агентные системы", "limit": 5}
    )

    assert response.status_code == 200
    names = [result["canonical_name"] for result in response.json()["results"]]
    assert names == ["Agentic AI / Autonomous AI Agents"]


@pytest.mark.asyncio
async def test_unknown_public_query_is_empty_and_does_not_queue_a_job(
    client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    aliases, technologies, _scores = _fixture_data()
    _install_test_sessions(monkeypatch, [FakeSession(aliases, technologies, [])])
    queued: list[str] = []

    async def latest(_session):
        return SNAPSHOT_DATE

    def unexpected_job(*args, **kwargs):
        queued.append("called")

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr("eti.api.routes.execute_open_search_job", unexpected_job)
    monkeypatch.setattr(settings, "public_read_only", True)

    response = await client.post(
        "/api/v1/query", json={"domain": "неизвестная область без совпадений", "limit": 5}
    )

    assert response.status_code == 200
    assert response.json()["results"] == []
    assert response.json()["total_results"] == 0
    assert queued == []
    assert "live-поиск отключён" in response.json()["warnings"][0]


@pytest.mark.asyncio
async def test_unknown_query_never_queues_live_search_outside_local_expert_mode(
    client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    aliases, technologies, scores = _fixture_data()
    _install_test_sessions(monkeypatch, [FakeSession(aliases, technologies, [])])
    queued: list[str] = []

    async def latest(_session):
        return SNAPSHOT_DATE

    def unexpected_job(*args, **kwargs):
        queued.append("called")

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr("eti.api.routes.execute_open_search_job", unexpected_job)
    monkeypatch.setattr(settings, "environment", "production")
    monkeypatch.setattr(settings, "public_read_only", False)
    monkeypatch.setattr(settings, "expert_live_search_enabled", True)

    response = await client.post(
        "/api/v1/query", json={"domain": "zqzxv flarn", "limit": 5}
    )

    assert response.status_code == 200
    assert response.json()["results"] == []
    assert any("изолированном локальном" in warning for warning in response.json()["warnings"])
    assert queued == []


def test_live_search_requires_explicit_local_expert_opt_in() -> None:
    assert _live_expert_search_enabled(
        SimpleNamespace(
            environment="local",
            expert_live_search_enabled=True,
            public_read_only=False,
        )
    )
    assert not _live_expert_search_enabled(
        SimpleNamespace(
            environment="local",
            expert_live_search_enabled=False,
            public_read_only=False,
        )
    )
    assert not _live_expert_search_enabled(
        SimpleNamespace(
            environment="local",
            expert_live_search_enabled=True,
            public_read_only=True,
        )
    )
    assert not _live_expert_search_enabled(
        SimpleNamespace(
            environment="production",
            expert_live_search_enabled=True,
            public_read_only=False,
        )
    )


@pytest.mark.asyncio
async def test_domain_pagination_keeps_one_snapshot_without_duplicates(
    client: httpx.AsyncClient, monkeypatch: pytest.MonkeyPatch
) -> None:
    aliases, technologies, scores = _fixture_data()
    sessions = iter(
        [
            FakeSession(aliases, technologies, scores),
            FakeSession(aliases, technologies, scores, preflight_count=True),
        ]
    )

    async def fake_session():
        return next(sessions)

    monkeypatch.setitem(app.dependency_overrides, get_session, fake_session)

    async def latest(_session):
        return SNAPSHOT_DATE

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr(settings, "public_read_only", True)

    first = await client.post(
        "/api/v1/query",
        json={"domain": "Технологии в ИИ", "limit": 5},
    )
    second = await client.post(
        "/api/v1/query",
        json={
            "domain": "Технологии в ИИ",
            "limit": 5,
            "offset": 5,
            "as_of_date": SNAPSHOT_DATE.isoformat(),
        },
    )

    assert first.status_code == second.status_code == 200
    first_body, second_body = first.json(), second.json()
    ids = [row["technology_id"] for row in first_body["results"] + second_body["results"]]
    assert len(ids) == 10
    assert len(set(ids)) == 10
    assert first_body["has_more"] is True
    assert first_body["as_of_date"] == second_body["as_of_date"] == SNAPSHOT_DATE.isoformat()


def test_ontology_domain_aliases_are_seeded_for_each_technology() -> None:
    spec = json.loads(ONTOLOGY_PATH.read_text(encoding="utf-8"))
    normalized_domain_aliases = {
        normalize_name(alias) for alias in spec["domain_aliases"]
    }

    assert normalized_domain_aliases
    for entry in spec["technologies"]:
        seeded_aliases = {
            normalize_name(alias)
            for alias, _source in aliases_for_entry(spec, entry)
        }
        assert normalized_domain_aliases <= seeded_aliases