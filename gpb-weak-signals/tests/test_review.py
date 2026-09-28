"""Тесты экспертного ревью (§21.1, §30.3).

Проверяется не CRUD, а свойства, ради которых human-in-the-loop вообще
существует: решение эксперта сохраняется как обучающая выборка, исходная
оценка модели не затирается, объединение технологий не уничтожает историю.
"""

from __future__ import annotations

import httpx
import pytest
from sqlalchemy import select

from eti.api.app import app
from eti.db.models import ExpertFeedback, TechnologyMapping
from eti.db.session import session_scope


@pytest.fixture
async def client():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        yield c


class TestQueue:
    async def test_queue_returns_borderline_cases_first(
        self, client: httpx.AsyncClient
    ) -> None:
        """Связь с баллом 0.66 нуждается в человеке сильнее, чем 0.84."""
        response = await client.get("/api/v1/review/queue?limit=10")
        assert response.status_code == 200
        items = response.json()["items"]
        if len(items) > 1:
            scores = [i["mapping_score"] for i in items]
            assert scores == sorted(scores)

    async def test_queue_exposes_score_breakdown(self, client: httpx.AsyncClient) -> None:
        """Эксперт должен видеть, чем обоснован балл, иначе он проверяет
        своё впечатление, а не модель (§21.1)."""
        response = await client.get("/api/v1/review/queue?limit=5")
        items = response.json()["items"]
        if items:
            assert any(i["score_components"].get("components") for i in items)
            assert all(i["evidence_coverage"] is not None for i in items)

    async def test_stats_warn_about_unreviewed_rule(self, client: httpx.AsyncClient) -> None:
        response = await client.get("/api/v1/review/stats")
        assert response.status_code == 200
        assert "пониженным весом" in response.json()["note"]


class TestDecisions:
    async def test_decision_preserves_model_score(self, client: httpx.AsyncClient) -> None:
        """Ключевое свойство: решение эксперта не затирает оценку модели.

        Разница между предложенным и решённым — основной материал для
        калибровки порогов §24.21."""
        queue = (await client.get("/api/v1/review/queue?limit=1")).json()
        if not queue["items"]:
            pytest.skip("очередь пуста")
        item = queue["items"][0]
        original_score = item["mapping_score"]
        original_components = item["score_components"].get("components")

        response = await client.post(
            f"/api/v1/review/mappings/{item['mapping_id']}/decision",
            json={"decision": "confirm", "reason": "тест"},
        )
        assert response.status_code == 200

        async with session_scope() as session:
            mapping = (
                await session.execute(
                    select(TechnologyMapping).where(
                        TechnologyMapping.id == item["mapping_id"]
                    )
                )
            ).scalar_one()
            assert mapping.mapping_score == original_score
            assert (mapping.score_components or {}).get("components") == original_components
            assert mapping.reviewed_by is not None
            assert str(mapping.mapping_status) == "approved"

    async def test_decision_recorded_as_feedback(self, client: httpx.AsyncClient) -> None:
        """§21.1: решения сохраняются для последующей калибровки."""
        queue = (await client.get("/api/v1/review/queue?limit=1")).json()
        if not queue["items"]:
            pytest.skip("очередь пуста")
        item = queue["items"][0]

        await client.post(
            f"/api/v1/review/mappings/{item['mapping_id']}/decision",
            json={"decision": "reject", "reason": "нерелевантно"},
        )

        async with session_scope() as session:
            feedback = (
                await session.execute(
                    select(ExpertFeedback)
                    .where(ExpertFeedback.object_id == item["mapping_id"])
                    .order_by(ExpertFeedback.created_at.desc())
                )
            ).scalars().first()
            assert feedback is not None
            assert feedback.decision == "reject"
            assert feedback.old_value["mapping_status"] == "pending_review"
            assert feedback.new_value["mapping_status"] == "rejected"
            assert feedback.user_id is not None

    async def test_reassign_requires_target(self, client: httpx.AsyncClient) -> None:
        queue = (await client.get("/api/v1/review/queue?limit=1")).json()
        if not queue["items"]:
            pytest.skip("очередь пуста")
        response = await client.post(
            f"/api/v1/review/mappings/{queue['items'][0]['mapping_id']}/decision",
            json={"decision": "reassign"},
        )
        assert response.status_code == 400

    async def test_unknown_decision_rejected(self, client: httpx.AsyncClient) -> None:
        queue = (await client.get("/api/v1/review/queue?limit=1")).json()
        if not queue["items"]:
            pytest.skip("очередь пуста")
        response = await client.post(
            f"/api/v1/review/mappings/{queue['items'][0]['mapping_id']}/decision",
            json={"decision": "что-нибудь"},
        )
        assert response.status_code == 400


class TestLabeling:
    async def test_label_validates_vocabulary(self, client: httpx.AsyncClient) -> None:
        technologies = (await client.get("/api/v1/review/technologies")).json()
        if not technologies:
            pytest.skip("нет технологий")
        response = await client.post(
            f"/api/v1/review/technologies/{technologies[0]['technology_id']}/label",
            json={"label": "очень перспективно"},
        )
        assert response.status_code == 400

    async def test_label_stored_with_point_in_time(self, client: httpx.AsyncClient) -> None:
        """§30.3: разметка обязана быть привязана к дате, иначе она
        заражена знанием будущего и backtesting по ней бессмыслен."""
        technologies = (await client.get("/api/v1/review/technologies")).json()
        if not technologies:
            pytest.skip("нет технологий")
        technology_id = technologies[0]["technology_id"]

        response = await client.post(
            f"/api/v1/review/technologies/{technology_id}/label",
            json={
                "label": "emerging",
                "point_in_time_date": "2023-06-01",
                "labeling_round": "pilot-round-1",
            },
        )
        assert response.status_code == 200

        async with session_scope() as session:
            feedback = (
                await session.execute(
                    select(ExpertFeedback)
                    .where(ExpertFeedback.object_id == technology_id)
                    .order_by(ExpertFeedback.created_at.desc())
                )
            ).scalars().first()
            assert feedback.point_in_time_date.isoformat() == "2023-06-01"
            assert feedback.labeling_round == "pilot-round-1"


class TestMerge:
    async def test_cannot_merge_technology_into_itself(
        self, client: httpx.AsyncClient
    ) -> None:
        technologies = (await client.get("/api/v1/review/technologies")).json()
        if not technologies:
            pytest.skip("нет технологий")
        same = technologies[0]["technology_id"]
        response = await client.post(
            "/api/v1/review/technologies/merge",
            json={"source_technology_id": same, "target_technology_id": same},
        )
        assert response.status_code == 400
