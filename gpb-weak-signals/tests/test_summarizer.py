from __future__ import annotations

import json

import httpx
import pytest

from eti.config import Settings
from eti.discovery.extractor import DiscoveryDocument
from eti.discovery.summarizer import (
    SummaryGenerationError,
    generate_russian_summary,
    is_foreign_language,
    summarize_eligible_documents,
)


def _settings() -> Settings:
    return Settings(
        _env_file=None,
        llm_base_url="http://llm.test/v1",
        llm_model="test-model",
    )


def _response(summary: str, quotes: list[str]) -> dict:
    return {
        "choices": [
            {
                "message": {
                    "content": json.dumps(
                        {"summary_ru": summary, "evidence_quotes": quotes},
                        ensure_ascii=False,
                    )
                }
            }
        ]
    }


@pytest.mark.asyncio
async def test_summary_requires_exact_source_quote_and_checks_numbers() -> None:
    abstract = "The study reports a 12% accuracy improvement for a new method."

    def handler(request: httpx.Request) -> httpx.Response:
        assert request.url.path == "/v1/chat/completions"
        assert request.read().find(b"source_id") >= 0
        return httpx.Response(
            200,
            json=_response(
                "Исследование сообщает об улучшении точности на 12% при проверке нового метода.",
                ["The study reports a 12% accuracy improvement for a new method."],
            ),
        )

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        summary = await generate_russian_summary(
            client,
            _settings(),
            source_id="crossref:10.1000/example",
            title="New method",
            abstract=abstract,
        )

    assert summary.text.endswith("метода.")
    assert summary.numbers_verified is True
    assert summary.source_id == "crossref:10.1000/example"
    assert summary.evidence_quotes == (abstract,)


@pytest.mark.asyncio
async def test_summary_rejects_invented_numbers() -> None:
    def handler(_request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            json=_response(
                "Исследование подтверждает улучшение точности на 12% в новом методе.",
                ["The study reports an accuracy improvement for a new method."],
            ),
        )

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        with pytest.raises(SummaryGenerationError, match="числа"):
            await generate_russian_summary(
                client,
                _settings(),
                source_id="crossref:10.1000/example",
                title="New method",
                abstract="The study reports an accuracy improvement for a new method.",
            )


@pytest.mark.asyncio
async def test_summary_rejects_quotes_not_found_in_source() -> None:
    def handler(_request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            200,
            json=_response(
                "Исследование описывает новый метод анализа данных для научных задач.",
                ["This exact quote is not in the provided abstract."],
            ),
        )

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        with pytest.raises(SummaryGenerationError, match="Цитата"):
            await generate_russian_summary(
                client,
                _settings(),
                source_id="s2:paper-1",
                title="A new method",
                abstract="The paper describes a new method for scientific data analysis.",
            )


@pytest.mark.asyncio
async def test_summarizer_never_calls_model_for_unapproved_source() -> None:
    document = DiscoveryDocument(
        document_id="doi:10.1000/example",
        source_code="crossref",
        source_family="research",
        title="A new method",
        language="en",
        original_abstract="The paper describes a new method for scientific data analysis.",
    )

    def handler(_request: httpx.Request) -> httpx.Response:
        pytest.fail("Model must not be called for a source outside the approved allow-list.")

    async with httpx.AsyncClient(transport=httpx.MockTransport(handler)) as client:
        documents, warnings = await summarize_eligible_documents(
            client,
            _settings(),
            [document],
            allowed_source_codes=set(),
        )

    assert documents == [document]
    assert warnings == []


def test_language_detection_keeps_russian_abstracts_out_of_translation() -> None:
    assert not is_foreign_language("ru", "Русский текст аннотации.")
    assert not is_foreign_language(None, "Это русская аннотация о технологии.")
    assert is_foreign_language("en", "A foreign abstract.")