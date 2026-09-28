"""Bounded, source-grounded Russian summaries for foreign source abstracts."""

from __future__ import annotations

from dataclasses import dataclass, replace
import json
import re
from typing import Any

import httpx
from pydantic import BaseModel, Field, ValidationError

from eti.config import Settings
from eti.discovery.extractor import DiscoveryDocument

SUMMARY_PROMPT_VERSION = "eti-ru-summary-grounded-v1"
_NUMBER_RE = re.compile(r"\b\d+(?:[.,]\d+)?(?:\s?[%‰])?\b")
_CYRILLIC_RE = re.compile(r"[А-Яа-яЁё]")
_LETTER_RE = re.compile(r"[^\W\d_]", flags=re.UNICODE)


class SummaryGenerationError(RuntimeError):
    """The local/approved model could not produce a verifiable summary."""


class _SummaryResponse(BaseModel):
    summary_ru: str = Field(min_length=40, max_length=700)
    evidence_quotes: list[str] = Field(min_length=1, max_length=3)


@dataclass(frozen=True, slots=True)
class GeneratedSummary:
    text: str
    evidence_quotes: tuple[str, ...]
    numbers_verified: bool
    source_id: str
    model_version: str


def is_foreign_language(language: str | None, text: str | None) -> bool:
    """Use declared language when available; otherwise a conservative script test."""
    declared = (language or "").strip().casefold().replace("_", "-")
    if declared:
        return not (
            declared == "ru"
            or declared.startswith("ru-")
            or declared in {"rus", "russian"}
        )
    letters = _LETTER_RE.findall(text or "")
    if not letters:
        return False
    cyrillic = len(_CYRILLIC_RE.findall(text or ""))
    return cyrillic / len(letters) < 0.4


async def generate_russian_summary(
    client: httpx.AsyncClient,
    settings: Settings,
    *,
    source_id: str,
    title: str,
    abstract: str,
) -> GeneratedSummary:
    """Generate only a short summary with checkable quotes and source numbers."""
    if not source_id.strip() or not title.strip() or len(abstract.strip()) < 40:
        raise SummaryGenerationError("Недостаточно данных источника для резюме.")

    system_prompt = (
        "Переведи содержание в краткое русское резюме, не добавляя знаний извне. "
        "Используй только название и аннотацию пользователя. Не делай выводов, "
        "которых нет в источнике. Все числа в резюме должны дословно присутствовать "
        "в названии или аннотации. Верни JSON: summary_ru и evidence_quotes. "
        "evidence_quotes — от 1 до 3 дословных фрагментов исходной аннотации, "
        "которые подтверждают резюме. Не включай цитаты, которых нет в тексте."
    )
    user_prompt = json.dumps(
        {
            "source_id": source_id,
            "title": title[:1000],
            "abstract": abstract[:12000],
        },
        ensure_ascii=False,
    )
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
        content: Any = response.json()["choices"][0]["message"]["content"]
        parsed = _SummaryResponse.model_validate(json.loads(content))
    except (httpx.HTTPError, KeyError, IndexError, TypeError, ValueError, ValidationError) as exc:
        raise SummaryGenerationError("Не удалось получить проверяемое резюме.") from exc

    text = " ".join(parsed.summary_ru.split())
    letters = _LETTER_RE.findall(text)
    if not letters or len(_CYRILLIC_RE.findall(text)) / len(letters) < 0.4:
        raise SummaryGenerationError("Резюме не прошло проверку русского языка.")

    normalized_abstract = _normalize_quote(abstract)
    quotes = tuple(" ".join(quote.split()) for quote in parsed.evidence_quotes)
    if any(
        len(quote) < 12 or _normalize_quote(quote) not in normalized_abstract
        for quote in quotes
    ):
        raise SummaryGenerationError("Цитата-подтверждение отсутствует в источнике.")

    source_numbers = set(_NUMBER_RE.findall(f"{title}\n{abstract}"))
    summary_numbers = set(_NUMBER_RE.findall(text))
    if not summary_numbers.issubset(source_numbers):
        raise SummaryGenerationError("В резюме обнаружены числа, которых нет в источнике.")

    return GeneratedSummary(
        text=text,
        evidence_quotes=quotes,
        numbers_verified=True,
        source_id=source_id,
        model_version=f"{settings.llm_model}:{SUMMARY_PROMPT_VERSION}",
    )


async def summarize_eligible_documents(
    client: httpx.AsyncClient,
    settings: Settings,
    documents: list[DiscoveryDocument],
    *,
    allowed_source_codes: set[str],
    max_summaries: int = 15,
) -> tuple[list[DiscoveryDocument], list[str]]:
    """Summarize a small bounded set, only for legally enabled sources."""
    output = list(documents)
    warnings: list[str] = []
    generated = 0
    for index, document in enumerate(output):
        if generated >= max_summaries:
            break
        abstract = document.original_abstract or (
            document.normalized.abstract if document.normalized else None
        )
        if (
            document.source_code not in allowed_source_codes
            or document.summary_ru
            or not abstract
            or not is_foreign_language(document.language, abstract)
        ):
            continue
        try:
            summary = await generate_russian_summary(
                client,
                settings,
                source_id=document.document_id,
                title=document.original_title or document.title,
                abstract=abstract,
            )
        except SummaryGenerationError:
            warnings.append(
                f"{document.source_code}: резюме не создано или не прошло проверку."
            )
            continue
        generated += 1
        output[index] = replace(
            document,
            summary_ru=summary.text,
            summary_model_version=summary.model_version,
            is_generated_summary=True,
            summary_source_id=summary.source_id,
            summary_evidence_quotes=summary.evidence_quotes,
            summary_numbers_verified=summary.numbers_verified,
            summary_review_status="awaiting_human",
        )
    return output, warnings


def _normalize_quote(value: str) -> str:
    return " ".join(value.split()).casefold()