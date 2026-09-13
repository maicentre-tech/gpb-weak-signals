"""Отбор evidence для карточки тренда (§9, DAG 4, шаг «top evidence»).

LLM получает только отобранные документы и метрики — не корпус и не
поисковую выдачу (§12). Отбор детерминированный и версионируемый: набор
документов хешируется и сохраняется вместе с карточкой, иначе объяснение
невоспроизводимо.

Ранжирование evidence опирается на уверенность маппинга, вес источника и
свежесть. Цитируемость намеренно не используется как основной критерий:
для зарождающихся технологий самые важные работы ещё не набрали цитирований
— ровно поэтому §24.8 и требует нормировать цитирования на возраст.
"""

from __future__ import annotations

import hashlib
import uuid
from dataclasses import dataclass
from datetime import date

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.db.models import Document, Source, TechnologyMapping
from eti.rag.verifier import EvidenceDocument


@dataclass
class EvidenceSet:
    technology_id: str
    documents: list[EvidenceDocument]
    as_of: date

    def hash(self) -> str:
        """Отпечаток набора — для воспроизводимости объяснения (§12)."""
        payload = "|".join(sorted(str(d.document_id) for d in self.documents))
        return hashlib.sha256(f"{self.technology_id}:{self.as_of}:{payload}".encode()).hexdigest()


async def retrieve_evidence(
    session: AsyncSession,
    technology_id: str | uuid.UUID,
    *,
    as_of: date,
    top_k: int = 5,
) -> EvidenceSet:
    rows = (
        await session.execute(
            select(
                Document.id,
                Document.title,
                Document.abstract,
                Document.url,
                Document.published_at,
                TechnologyMapping.mapping_score,
                Source.evidence_weight,
            )
            .join(TechnologyMapping, TechnologyMapping.document_id == Document.id)
            .join(Source, Source.id == Document.source_id)
            .where(
                TechnologyMapping.technology_id == technology_id,
                Document.is_deleted.is_(False),
                Document.available_from.isnot(None),
                # Point-in-time: карточка на дату T не может ссылаться на
                # документ, которого на T ещё не существовало (ADR-008).
                Document.available_from <= date_to_timestamp(as_of),
            )
        )
    ).all()

    scored = []
    for doc_id, title, abstract, url, published_at, mapping_score, evidence_weight in rows:
        year = published_at.year if published_at else None
        recency = 1.0
        if year:
            age = max(0, as_of.year - year)
            recency = 1.0 / (1.0 + 0.25 * age)
        rank = (mapping_score or 0.0) * (evidence_weight or 1.0) * recency
        scored.append(
            (
                rank,
                EvidenceDocument(
                    document_id=doc_id,
                    title=title,
                    abstract=abstract,
                    url=url,
                    published_year=year,
                ),
            )
        )

    scored.sort(key=lambda item: item[0], reverse=True)
    return EvidenceSet(
        technology_id=str(technology_id),
        documents=[doc for _rank, doc in scored[:top_k]],
        as_of=as_of,
    )


def date_to_timestamp(value: date):
    """date → datetime для сравнения с колонкой timestamptz."""
    from datetime import UTC, datetime, time

    return datetime.combine(value, time.max, tzinfo=UTC)
