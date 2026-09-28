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
from datetime import datetime, time, timedelta, timezone

from sqlalchemy import select

from eti.db.enums import MappingStatus
from eti.db.models import (
    Document,
    PeerGroup,
    Source,
    Technology,
    TechnologyAlias,
    TechnologyMapping,
    TrendScore,
)
from eti.db.session import session_scope
from eti.ml.corpus_dataset import (
    audit_candidate_dataset,
    candidate_dataset,
    make_corpus_negative_candidate,
)
from eti.ml.signal_classifier import load_positive_signals, normalize_technology_name


async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", type=Path, default=Path("artifacts/corpus_negatives.json"))
    parser.add_argument(
        "--positive-data",
        type=Path,
        default=Path("docs/original/100_слабых_сигналов_2026-09.xlsx"),
        help="Исключить технологии и алиасы, уже размеченные как позитивные",
    )
    args = parser.parse_args()
    positive_names = {
        normalize_technology_name(record.technology)
        for record in load_positive_signals(args.positive_data)
    }

    async with session_scope() as session:
        latest = (await session.execute(select(TrendScore.as_of_date).order_by(TrendScore.as_of_date.desc()).limit(1))).scalar_one_or_none()
        if latest is None:
            raise SystemExit("Нет snapshot: сначала запустите scripts/run_scoring.py")

        technology_names = (
            await session.execute(
                select(Technology.id, Technology.canonical_name, TechnologyAlias.alias)
                .select_from(Technology)
                .outerjoin(TechnologyAlias, TechnologyAlias.technology_id == Technology.id)
            )
        ).all()
        excluded_technology_ids = {
            technology_id
            for technology_id, canonical_name, alias in technology_names
            if normalize_technology_name(canonical_name) in positive_names
            or (alias and normalize_technology_name(alias) in positive_names)
        }

        rows = (
            await session.execute(
                select(
                    TrendScore,
                    Technology,
                    PeerGroup.label,
                    PeerGroup.taxonomy_type,
                )
                .join(Technology, Technology.id == TrendScore.technology_id)
                .outerjoin(PeerGroup, PeerGroup.id == Technology.peer_group_id)
                .where(TrendScore.as_of_date == latest)
                .order_by(Technology.canonical_name, Technology.id)
            )
        ).all()
        eligible_rows = [
            row for row in rows
            if row[0].signal_status
            in {"mature_excluded", "hype_suspected", "noise_excluded"}
            and row[1].id not in excluded_technology_ids
        ]

        technology_ids = [row[1].id for row in eligible_rows]
        evidence_by_technology: dict[str, list[dict[str, str | None]]] = {}
        if technology_ids:
            cutoff = datetime.combine(latest + timedelta(days=1), time.min, tzinfo=timezone.utc)
            evidence_rows = (
                await session.execute(
                    select(
                        TechnologyMapping.technology_id,
                        Document.id,
                        Document.url,
                        Document.document_type,
                        Source.code,
                        Source.family,
                    )
                    .join(Document, Document.id == TechnologyMapping.document_id)
                    .join(Source, Source.id == Document.source_id)
                    .where(
                        TechnologyMapping.technology_id.in_(technology_ids),
                        TechnologyMapping.mapping_status.in_(
                            [MappingStatus.AUTO_ACCEPTED.value, MappingStatus.APPROVED.value]
                        ),
                        Document.is_deleted.is_(False),
                        Document.available_from.is_not(None),
                        Document.available_from < cutoff,
                    )
                    .order_by(TechnologyMapping.technology_id, Document.id)
                )
            ).all()
            for technology_id, document_id, url, document_type, source_code, source_family in evidence_rows:
                evidence_by_technology.setdefault(str(technology_id), []).append(
                    {
                        "document_id": str(document_id),
                        "url": url,
                        "document_type": str(document_type),
                        "source_code": source_code,
                        "source_family": str(source_family),
                    }
                )

    records = []
    for score, technology, peer_group_label, taxonomy_type in eligible_rows:
        status = score.signal_status
        scores = {
            name: getattr(score, name)
            for name in (
                "novelty", "growth", "acceleration", "research", "patent",
                "citation", "market", "adoption", "cross_domain", "maturity",
            )
        }
        record = make_corpus_negative_candidate(
            technology_id=str(technology.id),
            technology=technology.canonical_name,
            domain=peer_group_label or taxonomy_type or "",
            status=status,
            as_of=latest.isoformat(),
            maturity_stage=str(score.maturity_stage or ""),
            scores=scores,
            evidence=evidence_by_technology.get(str(technology.id), []),
        )
        record["provenance"]["peer_group_id"] = (
            str(technology.peer_group_id) if technology.peer_group_id else None
        )
        record["provenance"]["peer_group_taxonomy"] = taxonomy_type
        record["provenance"]["exclusion_reason"] = (score.detector_scores or {}).get(
            "exclusion_reason", ""
        )
        records.append(record)

    dataset = candidate_dataset(
        records,
        snapshot_as_of=latest.isoformat(),
        source=(
            "trend_scores plus expert-approved/auto-accepted technology mappings; "
            "documents are restricted to available_from before the snapshot's next day"
        ),
    )
    dataset["audit"] = audit_candidate_dataset(dataset)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(dataset, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(dataset["audit"], ensure_ascii=False, indent=2))
    print(
        f"Сохранено {len(records)} кандидатов на проверку: {args.out}. "
        "Ни один кандидат не включается в обучение до экспертного одобрения."
    )


if __name__ == "__main__":
    asyncio.run(main())
