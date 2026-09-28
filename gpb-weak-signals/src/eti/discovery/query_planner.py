"""LLM-assisted query expansion and conservative ontology matching."""

from __future__ import annotations

import json
from typing import Literal

import httpx
from pydantic import BaseModel, ConfigDict, Field, ValidationError

from eti.config import Settings

ConfidenceLabel = Literal["high", "medium", "low"]


class TechnologyContext(BaseModel):
    technology_id: str
    canonical_name: str
    canonical_name_ru: str | None = None
    aliases: list[str] = Field(default_factory=list)


class TechnologyMatch(BaseModel):
    technology_id: str
    confidence: ConfidenceLabel
    reason: str = Field(min_length=1, max_length=500)


class QueryPlanPayload(BaseModel):
    model_config = ConfigDict(extra="ignore")

    normalized_topic: str = Field(min_length=1, max_length=300)
    search_queries: list[str] = Field(min_length=1, max_length=4)
    technology_matches: list[TechnologyMatch] = Field(default_factory=list, max_length=5)


class CandidateMatchPayload(BaseModel):
    model_config = ConfigDict(extra="ignore")

    candidate_id: str
    technology_id: str
    confidence: ConfidenceLabel
    reason: str = Field(min_length=1, max_length=500)


class CandidateMatchesPayload(BaseModel):
    model_config = ConfigDict(extra="ignore")

    matches: list[CandidateMatchPayload] = Field(default_factory=list, max_length=30)


class QueryPlanningError(RuntimeError):
    """The configured language model could not produce a valid search plan."""


async def create_query_plan(
    client: httpx.AsyncClient,
    settings: Settings,
    query: str,
    technologies: list[TechnologyContext],
) -> dict:
    """Expand a user's query and suggest only validated ontology IDs."""
    user_payload = {
        "query": query,
        "technologies": [item.model_dump(mode="json") for item in technologies],
    }
    system_prompt = (
        "Ты помогаешь эксперту искать технологические темы. Верни только JSON с полями "
        "normalized_topic, search_queries, technology_matches. Нормализуй смысл запроса и "
        "предложи до трёх дополнительных коротких поисковых формулировок: сохрани исходный "
        "язык и добавь английский или русский вариант, когда это полезно. Используй только "
        "переданный каталог технологий. Указывай совпадение только для той же конкретной "
        "технологии, не для широкой родительской области. При сомнении не добавляй совпадение. "
        "Для каждого совпадения верни technology_id, confidence (high, medium или low) и "
        "краткий reason. Не придумывай оценки вероятности, факты или идентификаторы. "
        "Пример: {\"normalized_topic\":\"quantum sensing\",\"search_queries\":"
        "[\"quantum sensing\",\"квантовые сенсоры\"],\"technology_matches\":[]}."
    )
    payload = await _complete_json(
        client,
        settings,
        system_prompt,
        json.dumps(user_payload, ensure_ascii=False),
    )
    try:
        plan = QueryPlanPayload.model_validate(payload)
    except ValidationError as exc:
        raise QueryPlanningError("Модель вернула план поиска неверного формата.") from exc

    allowed_ids = {item.technology_id for item in technologies}
    matches = [
        match.model_dump(mode="json")
        for match in plan.technology_matches
        if match.technology_id in allowed_ids and match.confidence != "low"
    ]
    queries = [query.strip()]
    for value in plan.search_queries:
        candidate = value.strip()
        if candidate and candidate.casefold() not in {item.casefold() for item in queries}:
            queries.append(candidate)
        if len(queries) == 4:
            break

    return {
        "normalized_topic": plan.normalized_topic.strip(),
        "search_queries": queries,
        "technology_matches": matches,
    }


async def match_candidates_to_technologies(
    client: httpx.AsyncClient,
    settings: Settings,
    candidates: list[dict],
    technologies: list[TechnologyContext],
) -> list[dict]:
    """Map evidence-backed candidates to existing technology IDs, without guessing."""
    if not candidates or not technologies:
        return []

    system_prompt = (
        "Сопоставь кандидатов с конкретными технологиями только по их названию и "
        "предоставленным заголовкам/фрагментам abstracts. Верни только JSON "
        "{\"matches\":[{\"candidate_id\":\"...\",\"technology_id\":\"...\","
        "\"confidence\":\"high|medium|low\",\"reason\":\"...\"}]}. Используй только "
        "переданные candidate_id и technology_id. Не связывай широкие или лишь смежные "
        "темы; при сомнении пропусти кандидата. Никаких вероятностей и вымышленных фактов."
    )
    payload = await _complete_json(
        client,
        settings,
        system_prompt,
        json.dumps(
            {"candidates": candidates, "technologies": [
                item.model_dump(mode="json") for item in technologies
            ]},
            ensure_ascii=False,
        ),
    )
    try:
        parsed = CandidateMatchesPayload.model_validate(payload)
    except ValidationError as exc:
        raise QueryPlanningError("Модель вернула сопоставление кандидатов неверного формата.") from exc

    allowed_candidates = {item["candidate_id"] for item in candidates}
    allowed_technologies = {item.technology_id for item in technologies}
    unique: dict[str, dict] = {}
    for match in parsed.matches:
        if (
            match.candidate_id not in allowed_candidates
            or match.technology_id not in allowed_technologies
            or match.confidence == "low"
        ):
            continue
        unique.setdefault(match.candidate_id, match.model_dump(mode="json"))
    return list(unique.values())


async def _complete_json(
    client: httpx.AsyncClient,
    settings: Settings,
    system_prompt: str,
    user_prompt: str,
) -> dict:
    headers = {"Content-Type": "application/json"}
    if settings.llm_api_key:
        headers["Authorization"] = f"Bearer {settings.llm_api_key}"
    try:
        response = await client.post(
            f"{str(settings.llm_base_url).rstrip('/')}/chat/completions",
            headers=headers,
            json={
                "model": settings.llm_model,
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.0,
                "response_format": {"type": "json_object"},
            },
            timeout=70.0,
        )
        response.raise_for_status()
        content = response.json()["choices"][0]["message"]["content"]
        value = json.loads(content)
    except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError) as exc:
        raise QueryPlanningError(
            "Не удалось получить корректный ответ от настроенной языковой модели."
        ) from exc
    if not isinstance(value, dict):
        raise QueryPlanningError("Модель вернула ответ не в формате JSON-объекта.")
    return value