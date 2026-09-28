"""Benchmark JSON compliance — часть POC по §21.2.

§21.2 требует не менее 99 % валидного structured output после repair.
Здесь измеряется доля с первой попытки и после repair-контура отдельно:
это разные величины, и смешивать их нельзя — модель, вытягивающая 99 %
только за счёт трёх повторов, втрое дороже по задержке и токенам.

ВАЖНО: результат этого прогона не является выбором модели. 3B-модель
взята потому, что помещается в доступную память; §21.2 требует сравнения
кандидатов на целевом оборудовании.
"""

from __future__ import annotations

import asyncio
import time
from datetime import date

import httpx
from sqlalchemy import select

from eti.config import get_settings
from eti.db.models import Technology, TrendScore
from eti.db.session import session_scope
from eti.rag.generator import CardContext, LlmCardGenerator
from eti.rag.retrieval import retrieve_evidence
from eti.rag.schema import TrendCard

RUNS = 5


async def main() -> None:
    settings = get_settings()
    as_of = date(2026, 9, 13)

    async with session_scope() as session:
        technology = (
            await session.execute(
                select(Technology).where(Technology.canonical_name.ilike("%Agentic%"))
            )
        ).scalars().first()
        score = (
            await session.execute(
                select(TrendScore).where(
                    TrendScore.technology_id == technology.id, TrendScore.as_of_date == as_of
                )
            )
        ).scalar_one_or_none()
        evidence = await retrieve_evidence(session, technology.id, as_of=as_of, top_k=4)
        context = CardContext(
            technology_name=technology.canonical_name,
            evidence=evidence,
            metrics={"growth": score.growth, "acceleration": score.acceleration},
            maturity_stage=str(score.maturity_stage),
            scoring_version=score.scoring_version,
        )

    first_try = repaired = failed = 0
    latencies: list[float] = []

    async with httpx.AsyncClient(timeout=300) as client:
        generator = LlmCardGenerator(
            client, base_url=settings.llm_base_url, model=settings.llm_model
        )
        for run in range(1, RUNS + 1):
            started = time.monotonic()
            raw = await generator._complete(context.as_prompt())  # noqa: SLF001
            try:
                TrendCard.model_validate_json(raw)
                first_try += 1
                verdict = "валиден с первой попытки"
            except Exception as exc:
                card = await generator.build(context)
                if card.technology and card.problem.text:
                    repaired += 1
                    verdict = f"исправлен repair-контуром ({str(exc)[:40]})"
                else:
                    failed += 1
                    verdict = "не удалось"
            elapsed = time.monotonic() - started
            latencies.append(elapsed)
            print(f"  прогон {run}: {verdict}  ({elapsed:.1f} с)")

    total = RUNS
    print(f"\nмодель: {settings.llm_model}")
    print(f"валидный JSON с первой попытки: {first_try}/{total} ({first_try / total:.0%})")
    print(f"исправлено repair-контуром:     {repaired}/{total}")
    print(f"не удалось:                     {failed}/{total}")
    latencies.sort()
    print(f"задержка p50: {latencies[len(latencies) // 2]:.1f} с, max: {latencies[-1]:.1f} с")
    print(f"\nпорог §21.2 — 99% после repair. Достигнуто: "
          f"{(first_try + repaired) / total:.0%} на выборке из {total} прогонов "
          f"(выборка мала для утверждения о соответствии).")


if __name__ == "__main__":
    asyncio.run(main())
