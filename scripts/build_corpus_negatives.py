"""Собирает проверяемые негативные примеры из собственного корпуса.

Ничего не придумывает: основания берутся из последнего `trend_scores` и
сохранённых документных evidence. Результат пригоден для ручной проверки
перед добавлением в обучающую выборку.
"""

from __future__ import annotations

import argparse
import asyncio
import json
from pathlib import Path

from sqlalchemy import select

from eti.db.models import Technology, TrendScore
from eti.db.session import session_scope


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("artifacts/corpus_negatives.json"))
    args = parser.parse_args()

    async with session_scope() as session:
        latest = (await session.execute(select(TrendScore.as_of_date).order_by(TrendScore.as_of_date.desc()).limit(1))).scalar_one_or_none()
        if latest is None:
            raise SystemExit("Нет snapshot: сначала запустите scripts/run_scoring.py")
        rows = (
            await session.execute(
                select(TrendScore, Technology).join(Technology, Technology.id == TrendScore.technology_id).where(TrendScore.as_of_date == latest)
            )
        ).all()

    records = []
    for score, technology in rows:
        status = score.signal_status
        if status not in {"mature_excluded", "hype_suspected", "noise_excluded"}:
            continue
        records.append(
            {
                "technology": technology.canonical_name,
                "domain": "corpus",
                "rationale": (score.detector_scores or {}).get("exclusion_reason", ""),
                "stage": str(score.maturity_stage or ""),
                "mention_trend": status,
                "sources": "corpus_snapshot",
                "label": 0,
                "provenance": {"as_of": latest.isoformat(), "technology_id": str(technology.id), "status": status},
            }
        )
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Сохранено {len(records)} негативных примеров: {args.out}")


if __name__ == "__main__":
    asyncio.run(main())
