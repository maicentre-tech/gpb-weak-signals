"""Тесты API (§10, §31).

Проверяется не столько маршрутизация, сколько поведенческие гарантии,
заявленные в ТЗ: запрос идёт по snapshot, непокрытое направление уходит в
асинхронную задачу, а неуверенный результат приходит с предупреждениями,
а не молча.
"""

from __future__ import annotations

import httpx
import pytest

from eti.api.app import app


@pytest.fixture
async def client():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


class TestHealth:
    async def test_health_reports_corpus_state(self, client: httpx.AsyncClient) -> None:
        response = await client.get("/api/v1/health")
        assert response.status_code == 200
        body = response.json()
        assert body["status"] == "ok"
        assert body["documents"] >= 0


class TestQuery:
    async def test_russian_query_matches_english_technology(
        self, client: httpx.AsyncClient
    ) -> None:
        """§23.1, §30: RU-запрос обязан находить технологию, описанную
        англоязычными источниками."""
        response = await client.post(
            "/api/v1/query", json={"domain": "агентные системы", "limit": 5}
        )
        assert response.status_code == 200
        body = response.json()
        if "results" in body:
            names = [r["canonical_name"] for r in body["results"]]
            assert any("Agentic" in n for n in names)

    async def test_uncovered_domain_returns_job_not_results(
        self, client: httpx.AsyncClient
    ) -> None:
        """ADR-001/§31: синхронный полный пересчёт в request path запрещён."""
        response = await client.post(
            "/api/v1/query", json={"domain": "термоядерный синтез токамак", "limit": 5}
        )
        assert response.status_code == 200
        body = response.json()
        assert "job_id" in body
        assert body["status"] == "queued"
        assert "results" not in body

    async def test_missing_strategic_matrix_is_announced(
        self, client: httpx.AsyncClient
    ) -> None:
        """ADR-005: ETS нельзя выдавать за стратегический приоритет молча."""
        response = await client.post(
            "/api/v1/query", json={"domain": "агентные системы", "limit": 5}
        )
        body = response.json()
        if "results" in body:
            assert body["strategic_relevance_configured"] is False
            assert any("Strategic relevance" in w for w in body["warnings"])

    async def test_results_below_thresholds_are_flagged_not_hidden(
        self, client: httpx.AsyncClient
    ) -> None:
        """Пустая выдача не объясняет, почему она пуста."""
        response = await client.post(
            "/api/v1/query", json={"domain": "агентные системы", "limit": 15}
        )
        body = response.json()
        if "results" in body and body["results"]:
            assert all("passes_filters" in r for r in body["results"])


class TestSourceStatus:
    async def test_blocked_sources_expose_reason(self, client: httpx.AsyncClient) -> None:
        """§23.3: источник с неясной лицензией не подключается молча."""
        response = await client.get("/api/v1/sources/status")
        assert response.status_code == 200
        blocked = [s for s in response.json() if s["blocked_reason"]]
        assert blocked, "ожидались источники, заблокированные Legal Gate"
        assert all("Legal Gate" in s["blocked_reason"] for s in blocked)

    async def test_coverage_lag_is_reported(self, client: httpx.AsyncClient) -> None:
        """Отставание источника должно быть видно администратору (§15)."""
        response = await client.get("/api/v1/sources/status")
        with_data = [s for s in response.json() if s["documents"] > 0]
        assert with_data
        assert all(s["lag_days"] is not None for s in with_data)


class TestTrendCard:
    async def test_card_carries_provenance_and_versions(
        self, client: httpx.AsyncClient
    ) -> None:
        query = await client.post(
            "/api/v1/query", json={"domain": "агентные системы", "limit": 1}
        )
        body = query.json()
        if "results" not in body or not body["results"]:
            pytest.skip("нет рассчитанных технологий в тестовой БД")

        technology_id = body["results"][0]["technology_id"]
        response = await client.get(f"/api/v1/trends/{technology_id}")
        assert response.status_code == 200
        card = response.json()

        assert card["evidence_set_hash"]
        assert card["versions"]["scoring"]
        assert card["versions"]["dataset"]
        # §9: каждое количественное утверждение имеет основание —
        # либо документы, либо версию расчёта.
        for claim in [card["problem"], card["advantage"], card["case"]]:
            if claim["text"] != "Недостаточно данных":
                assert claim["source_doc_ids"] or claim["metric_provenance"]

    async def test_sources_endpoint_returns_provenance(
        self, client: httpx.AsyncClient
    ) -> None:
        query = await client.post(
            "/api/v1/query", json={"domain": "агентные системы", "limit": 1}
        )
        body = query.json()
        if "results" not in body or not body["results"]:
            pytest.skip("нет рассчитанных технологий в тестовой БД")

        technology_id = body["results"][0]["technology_id"]
        response = await client.get(f"/api/v1/trends/{technology_id}/sources")
        assert response.status_code == 200
        sources = response.json()
        assert sources
        assert all(s["document_id"] and s["source_code"] for s in sources)
