"""CLI: агрегация метрик и расчёт TOP-N."""

from __future__ import annotations

import argparse
import asyncio
from datetime import date

import structlog

from eti.config import get_settings
from eti.db.session import session_scope
from eti.scoring.aggregate import aggregate_metrics
from eti.scoring.pipeline import compute_scores, select_top

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--as-of", default=date.today().isoformat())
    parser.add_argument("--dataset-version", default="pilot-0.1")
    args = parser.parse_args()

    settings = get_settings()
    as_of = date.fromisoformat(args.as_of)

    async with session_scope() as session:
        stats = await aggregate_metrics(
            session, settings.scoring, as_of=as_of, dataset_version=args.dataset_version
        )
        print(f"\nагрегировано: технологий {stats['technologies']}, периодов {stats['periods']}")

        results = await compute_scores(
            session, settings.scoring, as_of=as_of, dataset_version=args.dataset_version
        )
        top = select_top(results, settings.scoring)

        # Показываем полное ранжирование, а не только прошедших порог:
        # пустая выдача не объясняет, почему она пуста.
        ranked = sorted(
            results,
            key=lambda r: (
                r.strategic_priority if r.strategic_priority is not None else r.emerging_score
            ),
            reverse=True,
        )
        passing = {r.technology_id for r in top}

        strategic_configured = any(r.strategic_relevance is not None for r in results)
        header = "Strategic Priority" if strategic_configured else "ETS"
        print(f"\nРанжирование по {header}   (as_of={as_of}, популяция={len(results)})")
        print(f"  прошли фильтры §24.20: {len(top)} из {len(results)}"
              f"  (порог confidence ≥ {settings.scoring.min_evidence_confidence:.0f})")
        if not strategic_configured:
            print("  Strategic relevance not configured — матрица заказчиком не передана (ADR-005)")
        print()
        print(f"  {'#':<3}{'':<2}{'технология':<40}{'ETS':>6}{'нов':>6}{'рост':>6}{'уск':>6}{'иссл':>6}{'кросс':>7}{'conf':>7}  зрелость")
        print("  " + "-" * 106)
        for i, r in enumerate(ranked, 1):
            def fmt(key: str) -> str:
                value = r.scores.get(key)
                return f"{value:>6.1f}" if value is not None else f"{'—':>6}"
            gate = "✓ " if r.technology_id in passing else "· "
            print(
                f"  {i:<3}{gate}{r.canonical_name[:38]:<40}{r.emerging_score:>6.1f}"
                f"{fmt('novelty')}{fmt('growth')}{fmt('acceleration')}{fmt('research')}"
                f"{(str(round(r.scores['cross_domain'],1)) if r.scores.get('cross_domain') is not None else '—'):>7}"
                f"{r.evidence_confidence:>7.1f}  {r.maturity_stage or '—'}"
            )

        unavailable = {
            k for r in results for k, v in r.metric_status.items() if v != "available"
        }
        if unavailable:
            print(f"\n  недоступные признаки (вес перераспределён по §24.19): {', '.join(sorted(unavailable))}")


if __name__ == "__main__":
    asyncio.run(main())
