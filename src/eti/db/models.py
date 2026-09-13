"""Модель данных ETI.

Реализует SQL-контракт §32.1 ТЗ v1.4 с тремя исправлениями, зафиксированными
при разборе документа:

1. **Битемпоральность.** §29.3 (ADR-008) требует point-in-time correctness, но
   §32.1 не даёт под неё полей. Добавлены ``available_from`` / ``first_seen_at``
   на документах и отдельная таблица ``document_metric_snapshots`` для
   изменяемых величин (цитирования, звёзды, контрибьюторы). Сегодняшнее число
   цитирований нельзя задним числом пересчитать на 2021 год — его можно только
   снимать вперёд, поэтому снапшоты пишутся с первого дня.

2. **PK в cluster_memberships.** В §32.1 объявлен
   ``PRIMARY KEY(cluster_run_id, cluster_id, COALESCE(technology_id, document_id))``
   — PostgreSQL не поддерживает первичный ключ по выражению. Заменено на
   суррогатный ключ + два частичных уникальных индекса.

3. **Полоса human review.** §24.21 отправляет маппинги 0.65–0.85 на ревью, но
   не задаёт поведение для непросмотренных. Поле ``review_deadline_at`` и
   статус PENDING_REVIEW позволяют реализовать правило пониженного веса
   (``ScoringParams.unreviewed_review_band_weight``).
"""

from __future__ import annotations

import uuid
from datetime import date, datetime

from pgvector.sqlalchemy import Vector
from sqlalchemy import (
    ARRAY,
    BigInteger,
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from eti.db.base import Base, TimestampMixin
from eti.db.enums import (
    ChangeEventType,
    DocumentType,
    JobStatus,
    LicenseStatus,
    MappingMethod,
    MappingStatus,
    MaturityStage,
    RelationType,
    RunStatus,
    SourceFamily,
)

# ---------------------------------------------------------------------------
# Реестр источников и лицензий
# ---------------------------------------------------------------------------


class Source(Base, TimestampMixin):
    """Реестр источников. Включает Source License Record из §23.3.

    Источник со статусом лицензии UNCLEAR не подключается к production
    ingestion — это проверяется в ingestion-фреймворке, а не на словах.
    """

    __tablename__ = "sources"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(64), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    family: Mapped[SourceFamily] = mapped_column(String(32), nullable=False)
    base_url: Mapped[str | None] = mapped_column(Text)

    # --- Legal gate (§23.3) ---
    license_status: Mapped[LicenseStatus] = mapped_column(
        String(32), nullable=False, default=LicenseStatus.UNCLEAR
    )
    license_type: Mapped[str | None] = mapped_column(String(128))
    license_checked_at: Mapped[date | None] = mapped_column(Date)
    license_owner: Mapped[str | None] = mapped_column(String(255))
    allows_fulltext_storage: Mapped[bool] = mapped_column(Boolean, default=False)
    allows_embedding_storage: Mapped[bool] = mapped_column(Boolean, default=False)
    allows_rag_use: Mapped[bool] = mapped_column(Boolean, default=False)
    allows_derivative_analytics: Mapped[bool] = mapped_column(Boolean, default=False)
    attribution_required: Mapped[bool] = mapped_column(Boolean, default=True)

    # --- Операционные параметры ---
    requires_credentials: Mapped[bool] = mapped_column(Boolean, default=False)
    rate_limit_per_hour: Mapped[int | None] = mapped_column(Integer)
    weekly_volume_cap_bytes: Mapped[int | None] = mapped_column(BigInteger)
    """EPO OPS: 4 ГБ/неделя (§3.1). Контролируется rate-limit controller."""

    evidence_weight: Mapped[float] = mapped_column(Float, default=1.0)
    """source_quality в §24.14 / source weight в §24.17. Версионируется."""

    enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    config: Mapped[dict] = mapped_column(JSONB, default=dict)

    coverage: Mapped[SourceCoverage | None] = relationship(back_populates="source", uselist=False)


class SourceCoverage(Base, TimestampMixin):
    """§29.3: отсутствие записей до даты покрытия ≠ отсутствие технологии.

    Без этой таблицы Novelty систематически ошибается на границе покрытия:
    технология, существовавшая до ``coverage_start_date``, выглядела бы
    новой. Учитывается в ``eti.scoring.novelty``.
    """

    __tablename__ = "source_coverage"

    source_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("sources.id", ondelete="CASCADE"), primary_key=True
    )
    coverage_start_date: Mapped[date] = mapped_column(Date, nullable=False)
    coverage_end_date: Mapped[date | None] = mapped_column(Date)
    coverage_confidence: Mapped[float] = mapped_column(Float, default=1.0)
    publication_lag_days: Mapped[int] = mapped_column(Integer, default=0)
    """Задержка между событием и его появлением в источнике.

    §29.3 point-in-time rule: score на дату T использует только то, что было
    *доступно* на T. Патент публикуется через 18 месяцев после priority —
    без учёта лага бэктестинг получает утечку из будущего.
    """

    source: Mapped[Source] = relationship(back_populates="coverage")


# ---------------------------------------------------------------------------
# Документы
# ---------------------------------------------------------------------------


class Document(Base, TimestampMixin):
    """Унифицированный документ любого источника.

    Битемпоральность: ``published_at`` — время события, ``available_from`` —
    когда факт стал доступен в источнике, ``first_seen_at`` — когда его
    увидели мы. Point-in-time запрос фильтрует по ``available_from``.
    """

    __tablename__ = "documents"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("sources.id"), nullable=False)
    external_id: Mapped[str] = mapped_column(String(512), nullable=False)
    document_type: Mapped[DocumentType] = mapped_column(String(32), nullable=False)

    language: Mapped[str | None] = mapped_column(String(8))
    title: Mapped[str | None] = mapped_column(Text)
    abstract: Mapped[str | None] = mapped_column(Text)
    url: Mapped[str | None] = mapped_column(Text)
    doi: Mapped[str | None] = mapped_column(String(255))

    # --- Временные метки (битемпоральность) ---
    published_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    """Время события: дата публикации/подачи/создания репозитория."""

    available_from: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    """Когда факт стал публично доступен = published_at + publication_lag."""

    first_seen_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    """Когда мы его загрузили. Для аудита ingestion, не для scoring."""

    source_updated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    # --- Патентные даты (§29.3): четыре разных сигнала ---
    priority_date: Mapped[date | None] = mapped_column(Date)
    """Ранний IP-сигнал. Именно он используется для Novelty (§24.3)."""
    filing_date: Mapped[date | None] = mapped_column(Date)
    publication_date: Mapped[date | None] = mapped_column(Date)
    grant_date: Mapped[date | None] = mapped_column(Date)

    # --- Идемпотентность (§23.5) ---
    content_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    source_revision: Mapped[str | None] = mapped_column(String(255))
    raw_payload: Mapped[dict] = mapped_column(JSONB, default=dict)
    raw_storage_key: Mapped[str | None] = mapped_column(Text)

    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False)
    """§23.5: delete из источника не удаляет строку физически."""

    # --- Семантика ---
    embedding: Mapped[list[float] | None] = mapped_column(Vector(1024))
    embedding_model_version: Mapped[str | None] = mapped_column(String(128))

    # --- Классификаторы источника ---
    external_topics: Mapped[dict] = mapped_column(JSONB, default=dict)
    """OpenAlex topics, arXiv categories, CPC/IPC, GitHub topics."""
    authors: Mapped[dict] = mapped_column(JSONB, default=dict)
    institutions: Mapped[dict] = mapped_column(JSONB, default=dict)

    __table_args__ = (
        UniqueConstraint("source_id", "external_id", name="uq_documents_source_external"),
        Index("ix_documents_available_from", "available_from"),
        Index("ix_documents_published_at", "published_at"),
        Index("ix_documents_priority_date", "priority_date"),
        Index("ix_documents_type", "document_type"),
        Index("ix_documents_content_hash", "content_hash"),
    )


class DocumentMetricSnapshot(Base):
    """Снапшоты изменяемых метрик документа.

    Citations, stars, forks, contributors, downloads меняются во времени, и
    внешние API отдают только текущее значение. Чтобы §34 (rolling-origin
    backtesting) был выполним для Citation и Adoption Momentum, значения
    снимаются периодически и хранятся с ``observed_at``.

    Историческую часть по GitHub можно восстановить из GH Archive (события
    датированы); по цитированиям — только накапливать вперёд. Это
    ограничение зафиксировано в docs/limitations.md.
    """

    __tablename__ = "document_metric_snapshots"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE"), nullable=False
    )
    observed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    metric_name: Mapped[str] = mapped_column(String(64), nullable=False)
    metric_value: Mapped[float] = mapped_column(Float, nullable=False)
    is_reconstructed: Mapped[bool] = mapped_column(Boolean, default=False)
    """True, если значение восстановлено из событийного дампа (GH Archive),
    а не снято с живого API. Влияет на evidence_confidence."""

    __table_args__ = (
        UniqueConstraint(
            "document_id", "metric_name", "observed_at", name="uq_doc_metric_observation"
        ),
        Index("ix_doc_metric_lookup", "document_id", "metric_name", "observed_at"),
    )


class DocumentChangeEvent(Base):
    """§23.5: update/delete/correction — типизированные события, не upsert."""

    __tablename__ = "document_change_events"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    document_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE"), nullable=False
    )
    ingestion_run_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("ingestion_runs.id"))
    event_type: Mapped[ChangeEventType] = mapped_column(String(32), nullable=False)
    source_revision: Mapped[str | None] = mapped_column(String(255))
    previous_content_hash: Mapped[str | None] = mapped_column(String(64))
    new_content_hash: Mapped[str | None] = mapped_column(String(64))
    previous_payload: Mapped[dict | None] = mapped_column(JSONB)
    reason: Mapped[str | None] = mapped_column(Text)
    occurred_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (Index("ix_change_events_document", "document_id", "occurred_at"),)


# ---------------------------------------------------------------------------
# Таксономия и канонические технологии
# ---------------------------------------------------------------------------


class PeerGroup(Base, TimestampMixin):
    """§29.4 (ADR-004): peer group берётся из внешней versioned taxonomy,
    а не из результата HDBSCAN — иначе нормализация циклически зависит от
    кластеризации, которую она же должна нормировать.

    ``reference_population_definition`` фиксирует, по какой совокупности
    считался percentile_rank, чтобы расчёт был воспроизводим (§29.4).
    """

    __tablename__ = "peer_groups"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    version: Mapped[str] = mapped_column(String(64), nullable=False)
    taxonomy_type: Mapped[str] = mapped_column(String(64), nullable=False)
    """openalex_field | openalex_subfield | cpc_section | cpc_class | eti_ontology"""
    external_code: Mapped[str] = mapped_column(String(128), nullable=False)
    label: Mapped[str | None] = mapped_column(Text)
    parent_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("peer_groups.id"))
    level: Mapped[int] = mapped_column(Integer, default=0)
    reference_population_definition: Mapped[dict] = mapped_column(JSONB, default=dict)
    min_population_size: Mapped[int] = mapped_column(Integer, default=30)
    """Ниже порога — fallback на родительский уровень (§29.4)."""

    __table_args__ = (
        UniqueConstraint("version", "taxonomy_type", "external_code", name="uq_peer_group_code"),
    )


class Technology(Base, TimestampMixin):
    """Каноническая технология — стабильная аналитическая сущность (ADR-002).

    Именно ``technology_id``, а не ``cluster_id``, является ключом истории
    score, timeline и evidence. Кластеры версионируются и могут меняться
    между запусками, технология — нет.
    """

    __tablename__ = "technologies"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    canonical_name: Mapped[str] = mapped_column(String(512), nullable=False)
    canonical_name_ru: Mapped[str | None] = mapped_column(String(512))
    description: Mapped[str | None] = mapped_column(Text)
    parent_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("technologies.id"))

    embedding: Mapped[list[float] | None] = mapped_column(Vector(1024))
    embedding_model_version: Mapped[str | None] = mapped_column(String(128))

    peer_group_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("peer_groups.id"))

    # Якоря во внешних таксономиях (§6.2: OpenAlex — один из якорей,
    # а не master taxonomy)
    openalex_topics: Mapped[dict] = mapped_column(JSONB, default=dict)
    cpc_codes: Mapped[dict] = mapped_column(JSONB, default=dict)
    ipc_codes: Mapped[dict] = mapped_column(JSONB, default=dict)
    arxiv_categories: Mapped[dict] = mapped_column(JSONB, default=dict)
    github_keywords: Mapped[dict] = mapped_column(JSONB, default=dict)

    status: Mapped[str] = mapped_column(String(32), default="active")
    ontology_version: Mapped[str] = mapped_column(String(64), nullable=False, default="0.1.0")

    first_observed_date: Mapped[date | None] = mapped_column(Date)
    """first sustained observation (§24.3), не первая случайная публикация."""

    aliases: Mapped[list[TechnologyAlias]] = relationship(
        back_populates="technology", cascade="all, delete-orphan"
    )

    __table_args__ = (
        Index("ix_technologies_status", "status"),
        Index("ix_technologies_peer_group", "peer_group_id"),
    )


class TechnologyAlias(Base, TimestampMixin):
    """Синонимы, включая русскоязычные (§23.1 cross-language)."""

    __tablename__ = "technology_aliases"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    alias: Mapped[str] = mapped_column(String(512), nullable=False)
    normalized_alias: Mapped[str] = mapped_column(String(512), nullable=False)
    language: Mapped[str | None] = mapped_column(String(8))
    is_abbreviation: Mapped[bool] = mapped_column(Boolean, default=False)
    source_of_alias: Mapped[str | None] = mapped_column(String(64))

    technology: Mapped[Technology] = relationship(back_populates="aliases")

    __table_args__ = (
        UniqueConstraint("technology_id", "normalized_alias", name="uq_alias_per_technology"),
        Index("ix_alias_normalized", "normalized_alias"),
    )


class TechnologyMapping(Base, TimestampMixin):
    """Связь документ/внешняя сущность → каноническая технология (§24.21).

    Решение по порогам: ≥0.85 auto-accept, 0.65–0.85 human review, <0.65
    reject. Пороги — HYPOTHESIS, калибруются на размеченных данных.
    """

    __tablename__ = "technology_mappings"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    document_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("documents.id", ondelete="CASCADE")
    )
    source_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("sources.id"))
    external_id: Mapped[str | None] = mapped_column(String(512))
    external_name: Mapped[str | None] = mapped_column(Text)

    mapping_method: Mapped[MappingMethod] = mapped_column(String(32), nullable=False)
    mapping_score: Mapped[float] = mapped_column(Float, nullable=False)
    mapping_status: Mapped[MappingStatus] = mapped_column(String(32), nullable=False)
    score_components: Mapped[dict] = mapped_column(JSONB, default=dict)
    """Разложение MappingScore по слагаемым §24.21 — для объяснимости
    в экспертном UI: эксперт должен видеть, чем обоснован балл."""

    mapping_version: Mapped[str] = mapped_column(String(64), nullable=False, default="0.1.0")
    evidence_document_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("documents.id"))

    reviewed_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    review_deadline_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    """Непросмотренный маппинг из полосы review учитывается с пониженным
    весом (ScoringParams.unreviewed_review_band_weight) и снижает
    evidence_confidence. В ТЗ правило отсутствует — открытый вопрос."""

    __table_args__ = (
        UniqueConstraint(
            "technology_id", "document_id", "mapping_version", name="uq_mapping_per_version"
        ),
        CheckConstraint("mapping_score >= 0 AND mapping_score <= 1", name="score_range"),
        Index("ix_mapping_status", "mapping_status"),
        Index("ix_mapping_technology", "technology_id"),
        Index("ix_mapping_document", "document_id"),
    )


# ---------------------------------------------------------------------------
# Discovery clustering — версионируемые артефакты (§29.2)
# ---------------------------------------------------------------------------


class ClusterRun(Base):
    """Один запуск кластеризации. cluster_id осмыслен только внутри run."""

    __tablename__ = "cluster_runs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    run_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    algorithm: Mapped[str] = mapped_column(String(64), nullable=False)
    model_version: Mapped[str] = mapped_column(String(128), nullable=False)
    embedding_model_version: Mapped[str] = mapped_column(String(128), nullable=False)
    config: Mapped[dict] = mapped_column(JSONB, default=dict)
    dataset_version: Mapped[str] = mapped_column(String(64), nullable=False)
    status: Mapped[RunStatus] = mapped_column(String(32), nullable=False)
    documents_count: Mapped[int | None] = mapped_column(Integer)
    clusters_count: Mapped[int | None] = mapped_column(Integer)


class ClusterMembership(Base):
    """Принадлежность документа/технологии кластеру внутри запуска.

    §32.1 объявляет PK как ``(cluster_run_id, cluster_id,
    COALESCE(technology_id, document_id))``. PostgreSQL не умеет PK по
    выражению, поэтому — суррогатный ключ и два частичных уникальных
    индекса, дающих ту же гарантию.
    """

    __tablename__ = "cluster_memberships"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cluster_run_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("cluster_runs.id", ondelete="CASCADE"), nullable=False
    )
    cluster_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    cluster_label: Mapped[str | None] = mapped_column(Text)
    technology_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("technologies.id"))
    document_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("documents.id"))
    membership_score: Mapped[float] = mapped_column(Float, nullable=False)

    __table_args__ = (
        CheckConstraint(
            "(technology_id IS NOT NULL) <> (document_id IS NOT NULL)",
            name="exactly_one_member_ref",
        ),
        Index(
            "uq_membership_technology",
            "cluster_run_id",
            "cluster_id",
            "technology_id",
            unique=True,
            postgresql_where=technology_id.isnot(None),
        ),
        Index(
            "uq_membership_document",
            "cluster_run_id",
            "cluster_id",
            "document_id",
            unique=True,
            postgresql_where=document_id.isnot(None),
        ),
    )


class TechnologyLineage(Base):
    """§29.2: как кластер очередного запуска соотносится с историей технологии.

    HDBSCAN/BERTopic не имеют права ломать историческую идентичность
    технологии из-за изменения состава документов.
    """

    __tablename__ = "technology_lineage"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    cluster_run_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("cluster_runs.id"))
    """Пусто для решений эксперта: объединение или разделение технологий
    принимается человеком и не привязано к запуску кластеризации (§21.1)."""
    cluster_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    relation_type: Mapped[RelationType] = mapped_column(String(32), nullable=False)
    parent_technology_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("technologies.id"))
    confidence: Mapped[float] = mapped_column(Float, default=1.0)
    valid_from: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    valid_to: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    decided_by: Mapped[str] = mapped_column(String(32), default="automatic")

    __table_args__ = (Index("ix_lineage_technology", "technology_id", "valid_from"),)


# ---------------------------------------------------------------------------
# Метрики и score
# ---------------------------------------------------------------------------


class TechnologyMetric(Base):
    """Агрегаты по технологии за период (§32.1 cluster_metrics, переведённые
    на technology_id согласно ADR-002).

    ``*_status`` реализует правило §24.19 «missing ≠ zero»: недоступная
    метрика помечается, её вес перераспределяется, а confidence снижается.
    """

    __tablename__ = "technology_metrics"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    period_start: Mapped[date] = mapped_column(Date, nullable=False)
    period_end: Mapped[date] = mapped_column(Date, nullable=False)

    as_of_date: Mapped[date] = mapped_column(Date, nullable=False)
    """Point-in-time (ADR-008): агрегат посчитан по данным, доступным на эту
    дату. Один и тот же период даёт разные агрегаты при разных as_of_date —
    именно это позволяет честный rolling-origin backtesting (§34)."""

    papers: Mapped[int] = mapped_column(Integer, default=0)
    preprints: Mapped[int] = mapped_column(Integer, default=0)
    patent_families: Mapped[int] = mapped_column(Integer, default=0)
    patent_applicants: Mapped[int] = mapped_column(Integer, default=0)
    rd_projects: Mapped[int] = mapped_column(Integer, default=0)
    companies: Mapped[int] = mapped_column(Integer, default=0)
    github_repos: Mapped[int] = mapped_column(Integer, default=0)
    github_activity: Mapped[float] = mapped_column(Float, default=0.0)
    github_contributors: Mapped[int] = mapped_column(Integer, default=0)
    citations: Mapped[int] = mapped_column(Integer, default=0)
    news_mentions: Mapped[int] = mapped_column(Integer, default=0)
    unique_authors: Mapped[int] = mapped_column(Integer, default=0)
    unique_institutions: Mapped[int] = mapped_column(Integer, default=0)
    cpc_diversity: Mapped[int] = mapped_column(Integer, default=0)

    source_family_count: Mapped[int] = mapped_column(Integer, default=0)
    metric_status: Mapped[dict] = mapped_column(JSONB, default=dict)
    """{"citations": "available", "market": "unavailable", ...} (§24.19)"""
    data_quality_score: Mapped[float] = mapped_column(Float, default=1.0)
    dataset_version: Mapped[str] = mapped_column(String(64), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "technology_id", "period_start", "as_of_date", name="uq_metric_period_asof"
        ),
        Index("ix_metrics_technology_period", "technology_id", "period_start"),
    )


class TrendScore(Base):
    """Итоговые score технологии на дату (§32.1).

    ``strategic_relevance`` и ``strategic_priority`` nullable по ADR-005:
    без утверждённой заказчиком матрицы система считает ETS и честно
    показывает «Strategic relevance not configured» вместо подстановки нуля.
    """

    __tablename__ = "trend_scores"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    as_of_date: Mapped[date] = mapped_column(Date, nullable=False)

    novelty: Mapped[float | None] = mapped_column(Float)
    growth: Mapped[float | None] = mapped_column(Float)
    acceleration: Mapped[float | None] = mapped_column(Float)
    research: Mapped[float | None] = mapped_column(Float)
    patent: Mapped[float | None] = mapped_column(Float)
    citation: Mapped[float | None] = mapped_column(Float)
    market: Mapped[float | None] = mapped_column(Float)
    adoption: Mapped[float | None] = mapped_column(Float)
    cross_domain: Mapped[float | None] = mapped_column(Float)
    maturity: Mapped[float | None] = mapped_column(Float)
    maturity_stage: Mapped[MaturityStage | None] = mapped_column(String(32))

    emerging_score: Mapped[float] = mapped_column(Float, nullable=False)
    strategic_relevance: Mapped[float | None] = mapped_column(Float)
    strategic_priority: Mapped[float | None] = mapped_column(Float)
    evidence_confidence: Mapped[float] = mapped_column(Float, nullable=False)

    effective_weights: Mapped[dict] = mapped_column(JSONB, default=dict)
    """Фактические веса после перераспределения по §24.19 — без них
    воспроизвести score невозможно."""
    metric_status: Mapped[dict] = mapped_column(JSONB, default=dict)

    peer_group_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("peer_groups.id"))
    reference_population_size: Mapped[int | None] = mapped_column(Integer)

    # --- Версионирование (§21.5): без него score невоспроизводим ---
    scoring_version: Mapped[str] = mapped_column(String(64), nullable=False)
    dataset_version: Mapped[str] = mapped_column(String(64), nullable=False)
    ontology_version: Mapped[str] = mapped_column(String(64), nullable=False)
    embedding_model_version: Mapped[str | None] = mapped_column(String(128))
    cluster_run_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("cluster_runs.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "technology_id", "as_of_date", "scoring_version", name="uq_score_per_version"
        ),
        Index("ix_scores_asof_ets", "as_of_date", "emerging_score"),
        Index("ix_scores_technology", "technology_id", "as_of_date"),
    )


class TrendEvidence(Base):
    """Структурированное объяснение с provenance (§12, §32.1).

    Жёсткое правило §9 (DAG 4): каждое количественное утверждение обязано
    указывать на source_doc_ids. Проверяется claim verifier'ом до записи.
    """

    __tablename__ = "trend_evidence"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    technology_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("technologies.id", ondelete="CASCADE"), nullable=False
    )
    as_of_date: Mapped[date] = mapped_column(Date, nullable=False)
    claim_type: Mapped[str] = mapped_column(String(64), nullable=False)
    """problem | advantage | case | caveat | metric"""
    claim: Mapped[str] = mapped_column(Text, nullable=False)
    evidence_text: Mapped[str | None] = mapped_column(Text)
    source_doc_ids: Mapped[list[uuid.UUID]] = mapped_column(
        ARRAY(UUID(as_uuid=True)), nullable=False
    )
    is_quantitative: Mapped[bool] = mapped_column(Boolean, default=False)
    verifier_passed: Mapped[bool] = mapped_column(Boolean, nullable=False)
    verifier_notes: Mapped[str | None] = mapped_column(Text)
    evidence_confidence: Mapped[float] = mapped_column(Float, nullable=False)

    llm_model_version: Mapped[str] = mapped_column(String(128), nullable=False)
    prompt_version: Mapped[str] = mapped_column(String(64), nullable=False)
    evidence_set_hash: Mapped[str] = mapped_column(String(64), nullable=False)
    """Хеш набора документов, поданных в LLM — для воспроизводимости (§12)."""
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (Index("ix_evidence_technology", "technology_id", "as_of_date"),)


class StrategicMatrixEntry(Base, TimestampMixin):
    """§21.3: матрица Technology × Banking Use Case × Strategic Dimension.

    Версионируется и имеет владельца. Изменение матрицы не переписывает
    исторические результаты — старые score остаются воспроизводимыми.
    """

    __tablename__ = "strategic_matrix"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    matrix_version: Mapped[str] = mapped_column(String(64), nullable=False)
    technology_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("technologies.id"))
    technology_pattern: Mapped[str | None] = mapped_column(String(512))
    dimension: Mapped[str] = mapped_column(String(64), nullable=False)
    """information_security | payments | risk_management | fraud_aml |
    customer_experience | operations | data_ai_infrastructure |
    regulatory_compliance | investment_strategy"""
    score: Mapped[float] = mapped_column(Float, nullable=False)
    rationale: Mapped[str | None] = mapped_column(Text)
    owner: Mapped[str] = mapped_column(String(255), nullable=False)
    approved_at: Mapped[date] = mapped_column(Date, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    __table_args__ = (
        CheckConstraint("score >= 0 AND score <= 100", name="matrix_score_range"),
        Index("ix_matrix_version", "matrix_version", "is_active"),
    )


# ---------------------------------------------------------------------------
# Human-in-the-loop (§21.1)
# ---------------------------------------------------------------------------


class ExpertFeedback(Base):
    """Решения экспертов. Не перезаписывают исходные данные — только
    накапливаются как versioned feedback с audit trail (§30.3)."""

    __tablename__ = "expert_feedback"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    object_type: Mapped[str] = mapped_column(String(64), nullable=False)
    """mapping | technology | cluster | score | evidence"""
    object_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), nullable=False)
    decision: Mapped[str] = mapped_column(String(64), nullable=False)
    """confirm | reject | reassign | merge | split | rename | rate_evidence |
    label_maturity | label_emerging"""
    old_value: Mapped[dict | None] = mapped_column(JSONB)
    new_value: Mapped[dict | None] = mapped_column(JSONB)
    reason: Mapped[str | None] = mapped_column(Text)

    labeling_round: Mapped[str | None] = mapped_column(String(64))
    point_in_time_date: Mapped[date | None] = mapped_column(Date)
    """§30.3: эксперт видит только evidence, доступное на эту дату."""

    model_version: Mapped[str | None] = mapped_column(String(128))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (
        Index("ix_feedback_object", "object_type", "object_id"),
        Index("ix_feedback_round", "labeling_round"),
    )


# ---------------------------------------------------------------------------
# Ingestion: аудит, чекпоинты, DLQ (§21.4)
# ---------------------------------------------------------------------------


class IngestionRun(Base):
    __tablename__ = "ingestion_runs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("sources.id"), nullable=False)
    mode: Mapped[str] = mapped_column(String(32), nullable=False)
    """incremental | backfill | snapshot | reconciliation"""
    status: Mapped[RunStatus] = mapped_column(String(32), nullable=False)
    started_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    finished_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    cursor_from: Mapped[str | None] = mapped_column(String(255))
    cursor_to: Mapped[str | None] = mapped_column(String(255))
    records_fetched: Mapped[int] = mapped_column(Integer, default=0)
    records_created: Mapped[int] = mapped_column(Integer, default=0)
    records_updated: Mapped[int] = mapped_column(Integer, default=0)
    records_skipped: Mapped[int] = mapped_column(Integer, default=0)
    records_failed: Mapped[int] = mapped_column(Integer, default=0)
    bytes_transferred: Mapped[int] = mapped_column(BigInteger, default=0)
    """Для контроля недельного порога EPO OPS (§3.1, §21.4)."""

    dataset_version: Mapped[str | None] = mapped_column(String(64))
    error_code: Mapped[str | None] = mapped_column(String(64))
    error_detail: Mapped[str | None] = mapped_column(Text)
    metrics: Mapped[dict] = mapped_column(JSONB, default=dict)

    __table_args__ = (Index("ix_runs_source_started", "source_id", "started_at"),)


class IngestionCheckpoint(Base, TimestampMixin):
    """Точка возобновления. §35: ingestion продолжается после rate limit
    или сетевой ошибки, а не начинается заново."""

    __tablename__ = "ingestion_checkpoints"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("sources.id"), nullable=False)
    stream: Mapped[str] = mapped_column(String(128), nullable=False)
    cursor: Mapped[str | None] = mapped_column(String(512))
    cursor_type: Mapped[str] = mapped_column(String(32), default="timestamp")
    last_successful_run_id: Mapped[uuid.UUID | None] = mapped_column(
        ForeignKey("ingestion_runs.id")
    )
    state: Mapped[dict] = mapped_column(JSONB, default=dict)

    __table_args__ = (UniqueConstraint("source_id", "stream", name="uq_checkpoint_stream"),)


class DeadLetterRecord(Base):
    """§21.4: запись, которую не удалось обработать, не теряется молча."""

    __tablename__ = "dead_letter_queue"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    source_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("sources.id"), nullable=False)
    ingestion_run_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("ingestion_runs.id"))
    external_id: Mapped[str | None] = mapped_column(String(512))
    stage: Mapped[str] = mapped_column(String(64), nullable=False)
    error_code: Mapped[str] = mapped_column(String(64), nullable=False)
    error_detail: Mapped[str | None] = mapped_column(Text)
    payload: Mapped[dict | None] = mapped_column(JSONB)
    retry_count: Mapped[int] = mapped_column(Integer, default=0)
    resolved: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    __table_args__ = (Index("ix_dlq_unresolved", "source_id", "resolved"),)


class ModelVersion(Base, TimestampMixin):
    """Реестр версий моделей (§21.5)."""

    __tablename__ = "model_versions"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    kind: Mapped[str] = mapped_column(String(32), nullable=False)
    """embedding | clustering | scoring | llm | ontology | prompt"""
    version: Mapped[str] = mapped_column(String(128), nullable=False)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    config: Mapped[dict] = mapped_column(JSONB, default=dict)
    benchmark_results: Mapped[dict | None] = mapped_column(JSONB)
    is_active: Mapped[bool] = mapped_column(Boolean, default=False)
    activated_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    __table_args__ = (UniqueConstraint("kind", "version", name="uq_model_kind_version"),)


class AnalysisJob(Base):
    """§31: непокрытое направление уходит в асинхронную задачу.

    Синхронный полный re-clustering в request path запрещён (ADR-001).
    """

    __tablename__ = "analysis_jobs"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    query_text: Mapped[str] = mapped_column(Text, nullable=False)
    normalized_query: Mapped[str | None] = mapped_column(Text)
    query_language: Mapped[str | None] = mapped_column(String(8))
    status: Mapped[JobStatus] = mapped_column(String(32), nullable=False)
    coverage_confidence: Mapped[float | None] = mapped_column(Float)
    """Почему запрос ушёл в job: покрытие ниже порога."""
    requested_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    requested_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    progress: Mapped[dict] = mapped_column(JSONB, default=dict)
    dataset_version: Mapped[str | None] = mapped_column(String(64))
    result_snapshot_id: Mapped[str | None] = mapped_column(String(128))
    error_code: Mapped[str | None] = mapped_column(String(64))
    error_detail: Mapped[str | None] = mapped_column(Text)

    __table_args__ = (Index("ix_jobs_status", "status", "requested_at"),)
