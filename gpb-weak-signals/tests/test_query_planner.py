from __future__ import annotations

import json

import httpx
import pytest

from eti.config import Settings
from eti.discovery.query_planner import (
    QueryPlanningError,
    TechnologyContext,
    create_query_plan,
    match_candidates_to_technologies,
)


def _settings() -> Settings:
    return Settings(llm_base_url="https://llm.example/v1", llm_model="test-model")


def _completion_response(payload: dict) -> httpx.Response:
    return httpx.Response(
        200,
        json={
            "choices": [
                {"message": {"content": json.dumps(payload, ensure_ascii=False)}}
            ]
        },
    )


@pytest.mark.asyncio
async def test_query_plan_keeps_original_query_and_validates_ontology_matches() -> None:
    technology = TechnologyContext(
        technology_id="tech-1",
        canonical_name="Quantum sensing",
        canonical_name_ru="Квантовые сенсоры",
        aliases=["quantum sensor"],
    )

    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/v1/chat/completions"
        payload = json.loads(request.content)
        assert payload["model"] == "test-model"
        assert payload["response_format"] == {"type": "json_object"}
        return _completion_response(
            {
                "normalized_topic": "quantum sensing",
                "search_queries": ["quantum sensing", "квантовые сенсоры"],
                "technology_matches": [
                    {
                        "technology_id": "tech-1",
                        "confidence": "medium",
                        "reason": "The Russian phrase names the same concept.",
                    },
                    {
                        "technology_id": "invented-id",
                        "confidence": "high",
                        "reason": "Unknown IDs must be ignored.",
                    },
                    {
                        "technology_id": "tech-1",
                        "confidence": "low",
                        "reason": "Low-confidence matches must be withheld.",
                    },
                ],
            }
        )

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        plan = await create_query_plan(
            client, _settings(), "квантовые сенсоры", [technology]
        )

    assert plan["normalized_topic"] == "quantum sensing"
    assert plan["search_queries"] == ["квантовые сенсоры", "quantum sensing"]
    assert plan["technology_matches"] == [
        {
            "technology_id": "tech-1",
            "confidence": "medium",
            "reason": "The Russian phrase names the same concept.",
        }
    ]


@pytest.mark.asyncio
async def test_candidate_matching_ignores_unknown_ids_and_low_confidence() -> None:
    technology = TechnologyContext(
        technology_id="tech-1",
        canonical_name="Quantum sensing",
    )
    candidates = [
        {
            "candidate_id": "candidate-1",
            "name": "Quantum sensing",
            "evidence": [{"title": "Quantum sensor arrays", "abstract": "Abstract excerpt"}],
        }
    ]

    def handler(_request: httpx.Request) -> httpx.Response:
        return _completion_response(
            {
                "matches": [
                    {
                        "candidate_id": "candidate-1",
                        "technology_id": "tech-1",
                        "confidence": "high",
                        "reason": "The title and abstract describe the same technology.",
                    },
                    {
                        "candidate_id": "candidate-1",
                        "technology_id": "tech-1",
                        "confidence": "low",
                        "reason": "Withheld.",
                    },
                    {
                        "candidate_id": "invented-candidate",
                        "technology_id": "tech-1",
                        "confidence": "high",
                        "reason": "Unknown candidate IDs must be ignored.",
                    },
                ]
            }
        )

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        matches = await match_candidates_to_technologies(
            client, _settings(), candidates, [technology]
        )

    assert matches == [
        {
            "candidate_id": "candidate-1",
            "technology_id": "tech-1",
            "confidence": "high",
            "reason": "The title and abstract describe the same technology.",
        }
    ]


@pytest.mark.asyncio
async def test_query_planning_fails_explicitly_when_model_is_unavailable() -> None:
    def handler(_request: httpx.Request) -> httpx.Response:
        return httpx.Response(503)

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        with pytest.raises(QueryPlanningError, match="настроенной языковой модели"):
            await create_query_plan(client, _settings(), "quantum sensing", [])