"""Экспертный интерфейс ревью (§21.1, §30.3).

Восемь операций, перечисленных в §21.1, плюс три правила, без которых
human-in-the-loop превращается в видимость контроля:

1. **Решение не переписывает исходные данные.** Меняется статус связи и
   ставится отметка о проверке, но ``mapping_score`` и разложение по
   компонентам сохраняются. Иначе невозможно оценить, насколько модель
   ошибалась, — а именно это нужно для калибровки (§21.1).

2. **Каждое решение попадает в ``expert_feedback``** со старым и новым
   значением. Это обучающая выборка, а не журнал действий.

3. **Разметка привязана к дате.** §30.3 требует point-in-time: эксперт,
   размечающий «было ли это emerging в 2023», должен видеть данные 2023
   года, иначе разметка заражена знанием будущего и backtesting по ней
   бессмыслен.

Аутентификация здесь заглушена заголовком ``X-Reviewer-Id``. §13 требует
RBAC и SSO — это отдельная production-задача, но идентичность рецензента
нужна уже сейчас: без неё невозможно измерить межэкспертное согласие
(§30.3).
"""

from __future__ import annotations

import uuid
from datetime import UTC, date, datetime

from fastapi import APIRouter, Depends, Header, HTTPException, Query
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.api.deps import get_session
from eti.db.enums import MappingStatus
from eti.db.models import (
    Document,
    CandidateMappingReview,
    ExpertFeedback,
    Source,
    Technology,
    TechnologyAlias,
    TechnologyLineage,
    TechnologyMapping,
)

router = APIRouter(prefix="/api/v1/review", tags=["review"])

STUB_REVIEWER = uuid.UUID("00000000-0000-0000-0000-000000000001")


def reviewer_id(x_reviewer_id: str | None = Header(default=None)) -> uuid.UUID:
    """Идентичность рецензента.

    Заглушка до внедрения SSO (§13). Возвращать один и тот же
    идентификатор для всех — плохо, но лучше, чем не записывать автора
    вовсе: без авторства не считается inter-rater agreement (§30.3).
    """
    if x_reviewer_id:
        try:
            return uuid.UUID(x_reviewer_id)
        except ValueError as exc:
            raise HTTPException(400, "X-Reviewer-Id должен быть UUID") from exc
    return STUB_REVIEWER


# --------------------------------------------------------------------------
# Схемы
# --------------------------------------------------------------------------


class QueueItem(BaseModel):
    mapping_id: uuid.UUID
    document_id: uuid.UUID
    document_title: str | None
    document_abstract: str | None
    document_url: str | None
    source_code: str
    published_at: datetime | None
    technology_id: uuid.UUID
    technology_name: str
    mapping_score: float
    mapping_method: str
    mapping_status: str
    score_components: dict
    """Разложение балла по §24.21. Эксперт должен видеть, *чем* обоснован
    балл, иначе он проверяет не модель, а своё впечатление."""
    evidence_coverage: float | None
    days_in_queue: int


class QueueResponse(BaseModel):
    total: int
    items: list[QueueItem]
    stats: dict[str, int]


class Decision(BaseModel):
    decision: str = Field(..., description="confirm | reject | reassign")
    new_technology_id: uuid.UUID | None = None
    reason: str | None = None
    point_in_time_date: date | None = None


class LabelRequest(BaseModel):
    label: str = Field(..., description="emerging | not_emerging | mature")
    reason: str | None = None
    point_in_time_date: date | None = None
    labeling_round: str | None = None


class EvidenceRating(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    reason: str | None = None


class MergeRequest(BaseModel):
    source_technology_id: uuid.UUID
    target_technology_id: uuid.UUID
    reason: str | None = None


class SplitRequest(BaseModel):
    new_canonical_name: str
    new_canonical_name_ru: str | None = None
    document_ids: list[uuid.UUID] = Field(
        ..., min_length=1, description="Документы, уходящие в новую технологию"
    )
    move_aliases: list[str] = Field(default_factory=list)
    reason: str | None = None


class RenameRequest(BaseModel):
    canonical_name: str | None = None
    canonical_name_ru: str | None = None
    add_aliases: list[str] = Field(default_factory=list)
    remove_aliases: list[str] = Field(default_factory=list)
    reason: str | None = None


class DecisionResult(BaseModel):
    ok: bool
    feedback_id: uuid.UUID
    message: str


class CandidateMappingDecision(BaseModel):
    candidate_id: str = Field(..., min_length=1, max_length=255)
    job_id: uuid.UUID | None = None
    candidate_name: str = Field(..., min_length=1)
    suggested_technology_id: uuid.UUID
    suggested_technology_name: str = Field(..., min_length=1)
    decision: str = Field(..., description="confirm | reject | reassign")
    replacement_technology_id: uuid.UUID | None = None
    evidence: list[dict] = Field(default_factory=list)
    provenance: dict = Field(default_factory=dict)
    reason: str | None = Field(None, max_length=2000)


class CandidateMappingReviewOut(BaseModel):
    model_config = {"from_attributes": True}

    id: uuid.UUID
    candidate_id: str
    job_id: uuid.UUID | None
    candidate_name: str
    suggested_technology_id: uuid.UUID
    suggested_technology_name: str
    decision: str
    replacement_technology_id: uuid.UUID | None
    evidence: list[dict]
    provenance: dict
    reviewer_id: uuid.UUID
    reason: str | None
    reviewed_at: datetime


# --------------------------------------------------------------------------
# Очередь
# --------------------------------------------------------------------------


@router.get("/queue", response_model=QueueResponse)
async def get_queue(
    status: str = Query("pending_review"),
    limit: int = Query(25, le=200),
    offset: int = 0,
    technology_id: uuid.UUID | None = None,
    session: AsyncSession = Depends(get_session),
):
    conditions = [TechnologyMapping.mapping_status == status]
    if technology_id:
        conditions.append(TechnologyMapping.technology_id == technology_id)

    total = (
        await session.execute(
            select(func.count(TechnologyMapping.id)).where(*conditions)
        )
    ).scalar_one()

    rows = (
        await session.execute(
            select(TechnologyMapping, Document, Technology, Source)
            .join(Document, Document.id == TechnologyMapping.document_id)
            .join(Technology, Technology.id == TechnologyMapping.technology_id)
            .join(Source, Source.id == Document.source_id)
            .where(*conditions)
            # Сначала пограничные случаи: связь с баллом 0.66 нуждается в
            # человеке сильнее, чем связь с баллом 0.84.
            .order_by(TechnologyMapping.mapping_score.asc())
            .offset(offset)
            .limit(limit)
        )
    ).all()

    stats_rows = (
        await session.execute(
            select(TechnologyMapping.mapping_status, func.count(TechnologyMapping.id))
            .group_by(TechnologyMapping.mapping_status)
        )
    ).all()

    now = datetime.now(UTC)
    items = [
        QueueItem(
            mapping_id=mapping.id,
            document_id=document.id,
            document_title=document.title,
            document_abstract=(document.abstract or "")[:700] or None,
            document_url=document.url,
            source_code=source.code,
            published_at=document.published_at,
            technology_id=technology.id,
            technology_name=technology.canonical_name,
            mapping_score=mapping.mapping_score,
            mapping_method=str(mapping.mapping_method),
            mapping_status=str(mapping.mapping_status),
            score_components=mapping.score_components or {},
            evidence_coverage=(mapping.score_components or {}).get("evidence_coverage"),
            days_in_queue=(now - mapping.created_at).days,
        )
        for mapping, document, technology, source in rows
    ]

    return QueueResponse(
        total=total,
        items=items,
        stats={str(key): count for key, count in stats_rows},
    )


@router.get("/candidate-mappings", response_model=list[CandidateMappingReviewOut])
async def list_candidate_mapping_reviews(
    candidate_id: str | None = Query(None, max_length=255),
    limit: int = Query(50, ge=1, le=200),
    session: AsyncSession = Depends(get_session),
):
    """Return the append-only decisions for discovery recommendations."""
    statement = select(CandidateMappingReview).order_by(
        CandidateMappingReview.reviewed_at.desc()
    )
    if candidate_id:
        statement = statement.where(CandidateMappingReview.candidate_id == candidate_id)
    rows = (await session.execute(statement.limit(limit))).scalars().all()
    return [CandidateMappingReviewOut.model_validate(row, from_attributes=True) for row in rows]


@router.post("/candidate-mappings/decision", response_model=CandidateMappingReviewOut)
async def decide_candidate_mapping(
    body: CandidateMappingDecision,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Persist a recommendation decision without changing canonical ontology."""
    if body.decision not in {"confirm", "reject", "reassign"}:
        raise HTTPException(400, "decision: confirm | reject | reassign")
    if body.decision == "reassign" and body.replacement_technology_id is None:
        raise HTTPException(400, "Для переназначения нужна replacement_technology_id")
    if body.decision != "reassign" and body.replacement_technology_id is not None:
        raise HTTPException(400, "replacement_technology_id допустим только для reassign")
    suggested = (
        await session.execute(
            select(Technology).where(Technology.id == body.suggested_technology_id)
        )
    ).scalar_one_or_none()
    if suggested is None:
        raise HTTPException(404, "Предложенная технология не найдена")
    replacement = None
    if body.replacement_technology_id is not None:
        replacement = (
            await session.execute(
                select(Technology).where(Technology.id == body.replacement_technology_id)
            )
        ).scalar_one_or_none()
        if replacement is None:
            raise HTTPException(404, "Целевая технология не найдена")
        if replacement.id == suggested.id:
            raise HTTPException(400, "Целевая технология совпадает с предложенной")
        if replacement.status == "merged":
            raise HTTPException(400, "Нельзя выбрать объединённую технологию")

    now = datetime.now(UTC)
    review = CandidateMappingReview(
        candidate_id=body.candidate_id,
        job_id=body.job_id,
        candidate_name=body.candidate_name,
        suggested_technology_id=body.suggested_technology_id,
        suggested_technology_name=suggested.canonical_name,
        decision=body.decision,
        replacement_technology_id=body.replacement_technology_id,
        evidence=body.evidence,
        provenance=body.provenance,
        reviewer_id=reviewer,
        reason=body.reason,
        reviewed_at=now,
        created_at=now,
    )
    session.add(review)
    await session.commit()
    await session.refresh(review)
    return CandidateMappingReviewOut.model_validate(review, from_attributes=True)


@router.get("/technologies")
async def list_technologies(session: AsyncSession = Depends(get_session)):
    """Список для переназначения связи."""
    rows = (
        await session.execute(select(Technology).order_by(Technology.canonical_name))
    ).scalars().all()
    return [
        {
            "technology_id": str(t.id),
            "canonical_name": t.canonical_name,
            "canonical_name_ru": t.canonical_name_ru,
            "status": t.status,
        }
        for t in rows
    ]


# --------------------------------------------------------------------------
# Решения
# --------------------------------------------------------------------------


async def _record(
    session: AsyncSession,
    *,
    reviewer: uuid.UUID,
    object_type: str,
    object_id: uuid.UUID,
    decision: str,
    old_value: dict | None,
    new_value: dict | None,
    reason: str | None,
    point_in_time: date | None = None,
    labeling_round: str | None = None,
    model_version: str | None = None,
) -> ExpertFeedback:
    feedback = ExpertFeedback(
        user_id=reviewer,
        object_type=object_type,
        object_id=object_id,
        decision=decision,
        old_value=old_value,
        new_value=new_value,
        reason=reason,
        point_in_time_date=point_in_time,
        labeling_round=labeling_round,
        model_version=model_version,
        created_at=datetime.now(UTC),
    )
    session.add(feedback)
    await session.flush()
    return feedback


@router.post("/mappings/{mapping_id}/decision", response_model=DecisionResult)
async def decide_mapping(
    mapping_id: uuid.UUID,
    body: Decision,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    mapping = (
        await session.execute(
            select(TechnologyMapping).where(TechnologyMapping.id == mapping_id)
        )
    ).scalar_one_or_none()
    if mapping is None:
        raise HTTPException(404, "Связь не найдена")

    old = {
        "technology_id": str(mapping.technology_id),
        "mapping_status": str(mapping.mapping_status),
        "mapping_score": mapping.mapping_score,
    }

    if body.decision == "confirm":
        mapping.mapping_status = MappingStatus.APPROVED
        message = "Связь подтверждена"
    elif body.decision == "reject":
        mapping.mapping_status = MappingStatus.REJECTED
        message = "Связь отклонена"
    elif body.decision == "reassign":
        if body.new_technology_id is None:
            raise HTTPException(400, "Для переназначения нужна new_technology_id")
        target = (
            await session.execute(
                select(Technology).where(Technology.id == body.new_technology_id)
            )
        ).scalar_one_or_none()
        if target is None:
            raise HTTPException(404, "Целевая технология не найдена")
        mapping.technology_id = body.new_technology_id
        mapping.mapping_status = MappingStatus.APPROVED
        message = f"Связь переназначена на «{target.canonical_name}»"
    else:
        raise HTTPException(400, "decision: confirm | reject | reassign")

    # Балл и разложение не трогаем: разница между тем, что предложила
    # модель, и тем, что решил эксперт, — основной материал для калибровки.
    mapping.reviewed_by = reviewer
    mapping.reviewed_at = datetime.now(UTC)

    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="mapping",
        object_id=mapping_id,
        decision=body.decision,
        old_value=old,
        new_value={
            "technology_id": str(mapping.technology_id),
            "mapping_status": str(mapping.mapping_status),
        },
        reason=body.reason,
        point_in_time=body.point_in_time_date,
        model_version=mapping.mapping_version,
    )
    await session.commit()
    return DecisionResult(ok=True, feedback_id=feedback.id, message=message)


@router.post("/technologies/{technology_id}/label", response_model=DecisionResult)
async def label_technology(
    technology_id: uuid.UUID,
    body: LabelRequest,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Разметка emerging / not emerging / mature (§21.1, §14.1).

    Это и есть та выборка из 100–300 объектов, без которой §34 не имеет
    материала для калибровки весов ETS.
    """
    if body.label not in {"emerging", "not_emerging", "mature"}:
        raise HTTPException(400, "label: emerging | not_emerging | mature")

    technology = (
        await session.execute(select(Technology).where(Technology.id == technology_id))
    ).scalar_one_or_none()
    if technology is None:
        raise HTTPException(404, "Технология не найдена")

    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="technology",
        object_id=technology_id,
        decision=f"label_{body.label}",
        old_value={"canonical_name": technology.canonical_name},
        new_value={"label": body.label},
        reason=body.reason,
        point_in_time=body.point_in_time_date,
        labeling_round=body.labeling_round,
    )
    await session.commit()
    return DecisionResult(
        ok=True, feedback_id=feedback.id, message=f"Метка «{body.label}» сохранена"
    )


@router.post("/technologies/{technology_id}/evidence-rating", response_model=DecisionResult)
async def rate_evidence(
    technology_id: uuid.UUID,
    body: EvidenceRating,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Оценка качества доказательной базы (§21.1)."""
    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="technology",
        object_id=technology_id,
        decision="rate_evidence",
        old_value=None,
        new_value={"rating": body.rating},
        reason=body.reason,
    )
    await session.commit()
    return DecisionResult(ok=True, feedback_id=feedback.id, message="Оценка сохранена")


@router.post("/technologies/merge", response_model=DecisionResult)
async def merge_technologies(
    body: MergeRequest,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Объединение ошибочно разделённых технологий (§21.1).

    Исходная технология не удаляется: она помечается объединённой и
    получает запись в ``technology_lineage`` с типом MERGE. §21.5 требует
    воспроизводимости — удаление сущности сделало бы старые score
    неинтерпретируемыми.
    """
    if body.source_technology_id == body.target_technology_id:
        raise HTTPException(400, "Нельзя объединить технологию саму с собой")

    source = (
        await session.execute(
            select(Technology).where(Technology.id == body.source_technology_id)
        )
    ).scalar_one_or_none()
    target = (
        await session.execute(
            select(Technology).where(Technology.id == body.target_technology_id)
        )
    ).scalar_one_or_none()
    if source is None or target is None:
        raise HTTPException(404, "Технология не найдена")

    mappings = (
        await session.execute(
            select(TechnologyMapping).where(
                TechnologyMapping.technology_id == body.source_technology_id
            )
        )
    ).scalars().all()
    for mapping in mappings:
        mapping.technology_id = body.target_technology_id

    aliases = (
        await session.execute(
            select(TechnologyAlias).where(
                TechnologyAlias.technology_id == body.source_technology_id
            )
        )
    ).scalars().all()
    existing = {
        a.normalized_alias
        for a in (
            await session.execute(
                select(TechnologyAlias).where(
                    TechnologyAlias.technology_id == body.target_technology_id
                )
            )
        ).scalars()
    }
    moved_aliases = 0
    for alias in aliases:
        if alias.normalized_alias in existing:
            continue
        alias.technology_id = body.target_technology_id
        moved_aliases += 1

    source.status = "merged"
    session.add(
        TechnologyLineage(
            technology_id=body.target_technology_id,
            cluster_run_id=None,
            relation_type="merge",
            parent_technology_id=body.source_technology_id,
            confidence=1.0,
            valid_from=datetime.now(UTC),
            decided_by="expert",
        )
    )

    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="technology",
        object_id=body.target_technology_id,
        decision="merge",
        old_value={"source": source.canonical_name, "target": target.canonical_name},
        new_value={
            "moved_mappings": len(mappings),
            "moved_aliases": moved_aliases,
        },
        reason=body.reason,
    )
    await session.commit()
    return DecisionResult(
        ok=True,
        feedback_id=feedback.id,
        message=(
            f"«{source.canonical_name}» объединена с «{target.canonical_name}»: "
            f"перенесено связей {len(mappings)}, алиасов {moved_aliases}"
        ),
    )


@router.post("/technologies/{technology_id}/split", response_model=DecisionResult)
async def split_technology(
    technology_id: uuid.UUID,
    body: SplitRequest,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Разделение ошибочно объединённой технологии (§21.1).

    Разделение не симметрично объединению: при слиянии достаточно указать
    две сущности, а при разделении нужно решить судьбу каждого документа.
    Автоматически это сделать нельзя — если бы алгоритм умел различать эти
    документы, он бы их и не объединил. Поэтому состав новой технологии
    задаётся эксперт явно.

    Исходная технология сохраняется: её история score остаётся
    интерпретируемой, а связь фиксируется в lineage с типом SPLIT (§21.5).
    """
    origin = (
        await session.execute(select(Technology).where(Technology.id == technology_id))
    ).scalar_one_or_none()
    if origin is None:
        raise HTTPException(404, "Технология не найдена")

    moved = (
        await session.execute(
            select(TechnologyMapping).where(
                TechnologyMapping.technology_id == technology_id,
                TechnologyMapping.document_id.in_(body.document_ids),
            )
        )
    ).scalars().all()
    if not moved:
        raise HTTPException(
            400,
            "Ни один из указанных документов не связан с этой технологией — "
            "разделять нечего",
        )

    remaining = (
        await session.execute(
            select(func.count(TechnologyMapping.id)).where(
                TechnologyMapping.technology_id == technology_id,
                TechnologyMapping.document_id.notin_(body.document_ids),
            )
        )
    ).scalar_one()
    if remaining == 0:
        raise HTTPException(
            400,
            "Указаны все документы технологии: это переименование, а не "
            "разделение — используйте /rename",
        )

    from eti.ontology.resolver import normalize_name

    new_technology = Technology(
        canonical_name=body.new_canonical_name,
        canonical_name_ru=body.new_canonical_name_ru,
        parent_id=origin.parent_id,
        peer_group_id=origin.peer_group_id,
        ontology_version=origin.ontology_version,
        status="active",
    )
    session.add(new_technology)
    await session.flush()

    for mapping in moved:
        mapping.technology_id = new_technology.id
        # Связь переносится решением человека, поэтому считается
        # подтверждённой: она больше не предположение модели.
        mapping.mapping_status = MappingStatus.APPROVED
        mapping.reviewed_by = reviewer
        mapping.reviewed_at = datetime.now(UTC)

    aliases_moved = 0
    if body.move_aliases:
        wanted = {normalize_name(a) for a in body.move_aliases}
        for alias in (
            await session.execute(
                select(TechnologyAlias).where(
                    TechnologyAlias.technology_id == technology_id
                )
            )
        ).scalars():
            if alias.normalized_alias in wanted:
                alias.technology_id = new_technology.id
                aliases_moved += 1

    session.add(
        TechnologyLineage(
            technology_id=new_technology.id,
            cluster_run_id=None,
            relation_type="split",
            parent_technology_id=technology_id,
            confidence=1.0,
            valid_from=datetime.now(UTC),
            decided_by="expert",
        )
    )

    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="technology",
        object_id=technology_id,
        decision="split",
        old_value={"canonical_name": origin.canonical_name},
        new_value={
            "new_technology_id": str(new_technology.id),
            "new_canonical_name": body.new_canonical_name,
            "moved_documents": len(moved),
            "moved_aliases": aliases_moved,
            "remaining_documents": remaining,
        },
        reason=body.reason,
    )
    await session.commit()
    return DecisionResult(
        ok=True,
        feedback_id=feedback.id,
        message=(
            f"Выделена технология «{body.new_canonical_name}»: перенесено "
            f"документов {len(moved)}, алиасов {aliases_moved}; в исходной "
            f"осталось {remaining}"
        ),
    )


@router.post("/technologies/{technology_id}/rename", response_model=DecisionResult)
async def rename_technology(
    technology_id: uuid.UUID,
    body: RenameRequest,
    session: AsyncSession = Depends(get_session),
    reviewer: uuid.UUID = Depends(reviewer_id),
):
    """Исправление канонического названия и алиасов (§21.1)."""
    from eti.ontology.resolver import normalize_name

    technology = (
        await session.execute(select(Technology).where(Technology.id == technology_id))
    ).scalar_one_or_none()
    if technology is None:
        raise HTTPException(404, "Технология не найдена")

    old = {
        "canonical_name": technology.canonical_name,
        "canonical_name_ru": technology.canonical_name_ru,
    }
    if body.canonical_name:
        technology.canonical_name = body.canonical_name
    if body.canonical_name_ru:
        technology.canonical_name_ru = body.canonical_name_ru

    known = {
        a.normalized_alias: a
        for a in (
            await session.execute(
                select(TechnologyAlias).where(TechnologyAlias.technology_id == technology_id)
            )
        ).scalars()
    }
    added = removed = 0
    for alias in body.add_aliases:
        normalized = normalize_name(alias)
        if not normalized or normalized in known:
            continue
        session.add(
            TechnologyAlias(
                technology_id=technology_id,
                alias=alias,
                normalized_alias=normalized,
                language="ru" if any("а" <= ch <= "я" for ch in normalized) else "en",
                source_of_alias="expert",
            )
        )
        added += 1
    for alias in body.remove_aliases:
        found = known.get(normalize_name(alias))
        if found is not None:
            await session.delete(found)
            removed += 1

    feedback = await _record(
        session,
        reviewer=reviewer,
        object_type="technology",
        object_id=technology_id,
        decision="rename",
        old_value=old,
        new_value={
            "canonical_name": technology.canonical_name,
            "canonical_name_ru": technology.canonical_name_ru,
            "aliases_added": added,
            "aliases_removed": removed,
        },
        reason=body.reason,
    )
    await session.commit()
    return DecisionResult(
        ok=True,
        feedback_id=feedback.id,
        message=f"Название обновлено, алиасов добавлено {added}, удалено {removed}",
    )


@router.get("/stats")
async def review_stats(session: AsyncSession = Depends(get_session)):
    """Сводка по очереди и накопленной обратной связи.

    ``pending`` — не просто счётчик: §24.21 отправляет в эту полосу все
    пограничные связи, и если она растёт быстрее, чем разбирается,
    human-in-the-loop перестаёт быть контролем.
    """
    by_status = dict(
        (
            await session.execute(
                select(TechnologyMapping.mapping_status, func.count(TechnologyMapping.id))
                .group_by(TechnologyMapping.mapping_status)
            )
        ).all()
    )
    by_decision = dict(
        (
            await session.execute(
                select(ExpertFeedback.decision, func.count(ExpertFeedback.id))
                .group_by(ExpertFeedback.decision)
            )
        ).all()
    )
    reviewers = (
        await session.execute(select(func.count(func.distinct(ExpertFeedback.user_id))))
    ).scalar_one()
    oldest = (
        await session.execute(
            select(func.min(TechnologyMapping.created_at)).where(
                TechnologyMapping.mapping_status == MappingStatus.PENDING_REVIEW
            )
        )
    ).scalar_one_or_none()

    return {
        "mappings_by_status": {str(k): v for k, v in by_status.items()},
        "feedback_by_decision": {str(k): v for k, v in by_decision.items()},
        "reviewers": reviewers,
        "oldest_pending_at": oldest.isoformat() if oldest else None,
        "note": (
            "Непросмотренные связи из полосы ревью учитываются в метриках с "
            "пониженным весом и снижают evidence_confidence: правила по "
            "умолчанию в ТЗ нет, см. docs/limitations.md"
        ),
    }
