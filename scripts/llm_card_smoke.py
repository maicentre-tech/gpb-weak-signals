"""Проверка LLM-ветки: генерация карточки локальной моделью и верификация.

Смысл теста не в качестве текста, а в том, что произойдёт с выдумками
модели. Карточка от LLM проходит тот же верификатор, что и собранная из
метрик, и всё, что не подтверждено источниками, удаляется.
"""

from __future__ import annotations

import asyncio
from datetime import date

import httpx
import structlog
from sqlalchemy import select

from eti.config import get_settings
from eti.db.models import Technology, TrendScore
from eti.db.session import session_scope
from eti.rag.generator import CardContext, LlmCardGenerator, generate_and_verify
from eti.rag.retrieval import retrieve_evidence

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)


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
                    TrendScore.technology_id == technology.id,
                    TrendScore.as_of_date == as_of,
                )
            )
        ).scalar_one_or_none()

        evidence = await retrieve_evidence(session, technology.id, as_of=as_of, top_k=4)
        metrics = {
            "growth": score.growth,
            "acceleration": score.acceleration,
            "novelty": score.novelty,
            "cross_domain": score.cross_domain,
            "evidence_confidence": score.evidence_confidence,
        }
        context = CardContext(
            technology_name=technology.canonical_name,
            evidence=evidence,
            metrics=metrics,
            maturity_stage=str(score.maturity_stage),
            scoring_version=score.scoring_version,
        )

        print(f"модель: {settings.llm_model}")
        print(f"evidence set: {len(evidence.documents)} документов\n")

        async with httpx.AsyncClient(timeout=300) as client:
            generator = LlmCardGenerator(
                client,
                base_url=settings.llm_base_url,
                model=settings.llm_model,
                api_key=settings.llm_api_key,
            )
            card = await generator.build(context)

        print("=== что вернула модель ===")
        for label, claim in (
            ("problem", card.problem),
            ("advantage", card.advantage),
            ("case", card.case),
        ):
            refs = [str(i)[:8] for i in claim.source_doc_ids] or ["нет ссылок"]
            print(f"  {label:10} {claim.text[:90]}")
            print(f"  {'':10} ссылки: {', '.join(refs)}")

        result = generate_and_verify(
            card, evidence, computed_metrics={k: v for k, v in metrics.items() if v is not None}
        )

        print("\n=== вердикт верификатора ===")
        for verdict in result.verdicts:
            mark = "OK " if verdict.passed else "NO "
            print(f"  {mark} {verdict.claim.text[:64]:<66} {verdict.reason}")

        print(f"\nпроверка пройдена: {result.passed}")
        print(f"покрытие утверждений источниками: {result.claim_source_coverage:.0%}")
        print(f"удалено/заменено: {len(result.removed)}")


if __name__ == "__main__":
    asyncio.run(main())
