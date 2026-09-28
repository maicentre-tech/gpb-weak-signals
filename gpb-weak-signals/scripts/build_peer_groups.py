"""Построение peer groups из внешней таксономии OpenAlex (§29.4, ADR-004).

§29.4 запрещает брать peer group из результата собственной кластеризации:
нормализация тогда циклически зависит от того, что она нормирует. Здесь
группы берутся из иерархии OpenAlex domain → field → subfield, которая уже
приходит в метаданных документов, и версионируются.

Технологии группа назначается голосованием её документов: к какому field
относится большинство работ, к тому field и относится технология.
"""

from __future__ import annotations

import asyncio
from collections import Counter

import structlog
from sqlalchemy import select

from eti.db.models import Document, PeerGroup, Technology, TechnologyMapping
from eti.db.session import session_scope

structlog.configure(
    processors=[structlog.processors.add_log_level, structlog.dev.ConsoleRenderer()]
)
log = structlog.get_logger(__name__)

TAXONOMY_VERSION = "openalex-2026.1"

MIN_VOTES_FOR_ASSIGNMENT = 3
"""Минимум документов, по которым определяется peer group технологии.

Голосование по одному-двум документам не определяет область: технология с
единственной размеченной работой уезжает в поле этой работы, каким бы
случайным оно ни было. Лучше оставить технологию без группы — тогда
нормализация честно откатится к глобальной популяции — чем нормировать её
по чужой."""

MIN_VOTE_SHARE = 0.4
"""Доля голосов за победившее поле. Разброс по десятку полей поровну
означает, что доминирующей области нет."""


async def build() -> None:
    async with session_scope() as session:
        documents = (
            await session.execute(
                select(Document.id, Document.external_topics).where(
                    Document.is_deleted.is_(False)
                )
            )
        ).all()

        # --- Справочник групп из иерархии OpenAlex ------------------------
        fields: dict[str, str] = {}
        subfield_to_field: dict[str, str] = {}
        subfields: dict[str, str] = {}
        field_by_document: dict[object, list[str]] = {}

        for document_id, topics in documents:
            for topic in (topics or {}).get("openalex_topics", []):
                if not isinstance(topic, dict):
                    continue
                field_id, subfield_id = topic.get("field"), topic.get("subfield")
                if field_id:
                    # Имя уровня, а не имя темы: иначе подпись группы
                    # берётся от случайной темы внутри поля.
                    fields.setdefault(field_id, topic.get("field_name") or field_id)
                    field_by_document.setdefault(document_id, []).append(field_id)
                if subfield_id:
                    subfields.setdefault(
                        subfield_id, topic.get("subfield_name") or subfield_id
                    )
                    if field_id:
                        subfield_to_field[subfield_id] = field_id

        existing = {
            (row.taxonomy_type, row.external_code): row
            for row in (
                await session.execute(
                    select(PeerGroup).where(PeerGroup.version == TAXONOMY_VERSION)
                )
            ).scalars()
        }

        created = 0
        group_by_code: dict[str, PeerGroup] = {}
        for code, label in fields.items():
            group = existing.get(("openalex_field", code))
            if group is None:
                group = PeerGroup(
                    version=TAXONOMY_VERSION,
                    taxonomy_type="openalex_field",
                    external_code=code,
                    label=label,
                    level=1,
                    reference_population_definition={
                        "source": "openalex",
                        "level": "field",
                        "rule": "все технологии, чьи документы преимущественно относятся к этому field",
                    },
                )
                session.add(group)
                created += 1
            group_by_code[code] = group
        await session.flush()

        for code, label in subfields.items():
            key = ("openalex_subfield", code)
            if key in existing:
                group_by_code[code] = existing[key]
                continue
            parent = group_by_code.get(subfield_to_field.get(code, ""))
            group = PeerGroup(
                version=TAXONOMY_VERSION,
                taxonomy_type="openalex_subfield",
                external_code=code,
                label=label,
                level=2,
                parent_id=parent.id if parent is not None else None,
                reference_population_definition={
                    "source": "openalex",
                    "level": "subfield",
                    "parent": subfield_to_field.get(code),
                },
            )
            session.add(group)
            group_by_code[code] = group
            created += 1
        await session.flush()

        # --- Назначение групп технологиям ---------------------------------
        mappings = (
            await session.execute(
                select(TechnologyMapping.technology_id, TechnologyMapping.document_id)
            )
        ).all()
        votes: dict[object, Counter] = {}
        for technology_id, document_id in mappings:
            for field_id in field_by_document.get(document_id, []):
                votes.setdefault(technology_id, Counter())[field_id] += 1

        assigned = unassigned = 0
        for technology in (await session.execute(select(Technology))).scalars():
            counter = votes.get(technology.id)
            if not counter:
                # Технология без научных документов остаётся без группы:
                # приписать ей произвольный field значило бы нормировать её
                # по чужой популяции.
                unassigned += 1
                continue
            total_votes = sum(counter.values())
            winner, votes_for_winner = counter.most_common(1)[0]

            if (
                votes_for_winner < MIN_VOTES_FOR_ASSIGNMENT
                or votes_for_winner / total_votes < MIN_VOTE_SHARE
            ):
                log.info(
                    "peer_group_not_assigned",
                    technology=technology.canonical_name,
                    votes=votes_for_winner,
                    total=total_votes,
                    reason="недостаточно голосов для определения области",
                )
                unassigned += 1
                continue

            group = group_by_code.get(winner)
            if group is not None:
                technology.peer_group_id = group.id
                assigned += 1

        log.info(
            "peer_groups_built",
            groups_created=created,
            fields=len(fields),
            subfields=len(subfields),
            technologies_assigned=assigned,
            technologies_unassigned=unassigned,
        )


if __name__ == "__main__":
    asyncio.run(build())
