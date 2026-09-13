"""CLI: собрать и проверить аналитическую карточку тренда."""

from __future__ import annotations

import argparse
import asyncio
from datetime import date

import structlog
from sqlalchemy import select

from eti.db.models import Technology, TrendScore
from eti.db.session import session_scope
from eti.rag.generator import CardContext, MetricCardBuilder, generate_and_verify
from eti.rag.retrieval import retrieve_evidence

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("technology", help="часть названия технологии")
    parser.add_argument("--as-of", default="2026-09-13")
    parser.add_argument("--top-k", type=int, default=5)
    args = parser.parse_args()
    as_of = date.fromisoformat(args.as_of)

    async with session_scope() as session:
        technology = (
            await session.execute(
                select(Technology).where(Technology.canonical_name.ilike(f"%{args.technology}%"))
            )
        ).scalars().first()
        if technology is None:
            print(f"технология по запросу {args.technology!r} не найдена")
            return

        score = (
            await session.execute(
                select(TrendScore)
                .where(TrendScore.technology_id == technology.id, TrendScore.as_of_date == as_of)
                .limit(1)
            )
        ).scalar_one_or_none()

        evidence = await retrieve_evidence(
            session, technology.id, as_of=as_of, top_k=args.top_k
        )

        metrics = {
            "growth": score.growth if score else None,
            "acceleration": score.acceleration if score else None,
            "novelty": score.novelty if score else None,
            "cross_domain": score.cross_domain if score else None,
            "emerging_score": score.emerging_score if score else None,
            "evidence_confidence": score.evidence_confidence if score else None,
        }

        context = CardContext(
            technology_name=technology.canonical_name,
            evidence=evidence,
            metrics=metrics,
            maturity_stage=score.maturity_stage if score else None,
            scoring_version=score.scoring_version if score else "unknown",
        )
        card = MetricCardBuilder().build(context)
        result = generate_and_verify(
            card,
            evidence,
            computed_metrics={k: v for k, v in metrics.items() if v is not None},
        )

        print(f"\n{'═' * 78}")
        print(f"  {technology.canonical_name}")
        print(f"{'═' * 78}")
        print(f"  стадия: {context.maturity_stage or '—'}   "
              f"ETS: {metrics['emerging_score']:.1f}   "
              f"confidence: {metrics['evidence_confidence']:.1f}"
              if metrics["emerging_score"] is not None else "  score не рассчитан")
        print(f"  evidence set: {len(evidence.documents)} документов, "
              f"hash {evidence.hash()[:16]}")
        print()
        for label, claim in (
            ("Проблема", result.card.problem),
            ("Преимущество", result.card.advantage),
            ("Кейс", result.card.case),
        ):
            refs = ", ".join(str(i)[:8] for i in claim.source_doc_ids) or "—"
            print(f"  {label}:")
            print(f"    {claim.text[:150]}")
            print(f"    источники: {refs}")
        if result.card.caveats:
            print("\n  Оговорки:")
            for claim in result.card.caveats:
                print(f"    · {claim.text}")
        print(f"\n  Доказательная база ({len(result.card.evidence)}):")
        for claim in result.card.evidence:
            print(f"    · {claim.text[:100]}")

        print(f"\n{'─' * 78}")
        print(f"  верификация: {'пройдена' if result.passed else 'с замечаниями'}   "
              f"покрытие утверждений источниками: {result.claim_source_coverage:.0%}")
        if result.removed:
            print(f"  удалено утверждений: {len(result.removed)}")
            for verdict in result.removed:
                print(f"    · {verdict.claim.text[:60]} — {verdict.reason}")


if __name__ == "__main__":
    asyncio.run(main())
