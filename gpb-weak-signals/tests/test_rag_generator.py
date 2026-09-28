from __future__ import annotations

import asyncio
import json
from types import SimpleNamespace

from eti.rag.generator import CardContext, LlmCardGenerator, SYSTEM_PROMPT


def test_llm_card_generator_requires_russian_and_marks_valid_output() -> None:
    payload = {
        "technology": "Тестовая технология",
        "problem": {
            "text": "Недостаточно данных",
            "source_doc_ids": [],
            "claim_type": "problem",
        },
        "advantage": {
            "text": "Недостаточно данных",
            "source_doc_ids": [],
            "claim_type": "advantage",
        },
        "case": {
            "text": "Недостаточно данных",
            "source_doc_ids": [],
            "claim_type": "case",
        },
        "evidence": [],
        "caveats": [],
        "confidence": 0.0,
    }

    async def run() -> tuple[bool, str]:
        generator = LlmCardGenerator(
            object(), base_url="http://unused", model="test", max_repairs=0
        )

        async def complete(_prompt: str) -> str:
            return json.dumps(payload, ensure_ascii=False)

        generator._complete = complete  # type: ignore[method-assign]
        context = CardContext(
            technology_name="Test",
            evidence=SimpleNamespace(documents=[]),
            metrics={},
        )
        card = await generator.build(context)
        return generator.generation_succeeded, card.problem.text

    generated, problem = asyncio.run(run())

    assert "пиши по-русски" in SYSTEM_PROMPT
    assert generated is True
    assert problem == "Недостаточно данных"