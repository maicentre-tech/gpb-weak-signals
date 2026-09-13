"""Сопоставление загруженных документов с каноническими технологиями.

DAG 2 из §9, шаги 4–8. Работает пакетно, результат — строки
``technology_mappings`` с сохранённым разложением score по компонентам:
эксперт в UI ревью должен видеть, *чем* обоснован балл, а не только сам
балл (§21.1).
"""

from __future__ import annotations

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.config import ScoringParams
from eti.db.enums import MappingStatus
from eti.db.models import Document, Technology, TechnologyAlias, TechnologyMapping
from eti.ontology.resolver import EntityResolver, TechnologyCandidate

log = structlog.get_logger(__name__)


async def load_candidates(session: AsyncSession) -> list[TechnologyCandidate]:
    technologies = (await session.execute(select(Technology))).scalars().all()
    aliases = (await session.execute(select(TechnologyAlias))).scalars().all()

    by_technology: dict[str, set[str]] = {}
    for alias in aliases:
        by_technology.setdefault(str(alias.technology_id), set()).add(alias.alias)

    return [
        TechnologyCandidate(
            technology_id=str(tech.id),
            canonical_name=tech.canonical_name,
            aliases=by_technology.get(str(tech.id), set()),
            openalex_topics=set((tech.openalex_topics or {}).get("ids", [])),
            arxiv_categories=set((tech.arxiv_categories or {}).get("codes", [])),
            github_topics=set((tech.github_keywords or {}).get("topics", [])),
            cpc_codes=set((tech.cpc_codes or {}).get("codes", [])),
        )
        for tech in technologies
    ]


async def run_mapping(
    session: AsyncSession,
    params: ScoringParams,
    *,
    mapping_version: str = "0.1.0",
    batch_size: int = 500,
) -> dict[str, int]:
    candidates = await load_candidates(session)
    if not candidates:
        raise LookupError("онтология пуста — выполните scripts/seed_ontology.py")

    resolver = EntityResolver(candidates, params)
    stats = {"documents": 0, "mapped": 0, "auto": 0, "review": 0, "unmapped": 0}

    offset = 0
    while True:
        documents = (
            (
                await session.execute(
                    select(Document)
                    .where(Document.is_deleted.is_(False))
                    .order_by(Document.id)
                    .offset(offset)
                    .limit(batch_size)
                )
            )
            .scalars()
            .all()
        )
        if not documents:
            break

        for document in documents:
            stats["documents"] += 1
            decisions = resolver.resolve(
                document.title, document.abstract, document.external_topics or {}
            )
            if not decisions:
                stats["unmapped"] += 1
                continue

            for decision in decisions:
                existing = await session.execute(
                    select(TechnologyMapping).where(
                        TechnologyMapping.technology_id == decision.technology_id,
                        TechnologyMapping.document_id == document.id,
                        TechnologyMapping.mapping_version == mapping_version,
                    )
                )
                if existing.scalar_one_or_none() is not None:
                    continue

                session.add(
                    TechnologyMapping(
                        technology_id=decision.technology_id,
                        document_id=document.id,
                        source_id=document.source_id,
                        external_id=document.external_id,
                        external_name=document.title,
                        mapping_method=decision.method,
                        mapping_score=decision.score,
                        mapping_status=decision.status,
                        score_components={
                            "components": decision.components,
                            "effective_weights": decision.effective_weights,
                            "evidence_coverage": decision.evidence_coverage,
                            "reason": decision.reason,
                        },
                        mapping_version=mapping_version,
                    )
                )
                stats["mapped"] += 1
                if decision.status is MappingStatus.AUTO_ACCEPTED:
                    stats["auto"] += 1
                elif decision.status is MappingStatus.PENDING_REVIEW:
                    stats["review"] += 1

        await session.flush()
        offset += batch_size

    log.info("mapping_finished", **stats)
    return stats
