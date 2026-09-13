"""Перечисления предметной области."""

from __future__ import annotations

from enum import StrEnum


class SourceFamily(StrEnum):
    """Семейства источников. §24.11 — база для CrossDomainScore.

    Патенты намеренно разделены: priority — ранний IP-сигнал (вес 0.90),
    publication — сигнал видимости (0.60), §24.17.
    """

    RESEARCH = "research"
    PREPRINTS = "preprints"
    PATENTS = "patents"
    RD = "rd"
    OPEN_SOURCE = "open_source"
    COMPANIES = "companies"
    WEB_NEWS = "web_news"


class DocumentType(StrEnum):
    PAPER = "paper"
    PREPRINT = "preprint"
    PATENT = "patent"
    RD_PROJECT = "rd_project"
    REPOSITORY = "repository"
    NEWS = "news"
    MODEL = "model"
    DATASET = "dataset"
    REPORT = "report"


class MappingStatus(StrEnum):
    """§24.21. Полоса 0.65–0.85 уходит в PENDING_REVIEW."""

    AUTO_ACCEPTED = "auto_accepted"
    PENDING_REVIEW = "pending_review"
    APPROVED = "approved"
    REJECTED = "rejected"
    UNRESOLVED = "unresolved"


class MappingMethod(StrEnum):
    ALIAS_EXACT = "alias_exact"
    TAXONOMY = "taxonomy"
    SEMANTIC = "semantic"
    HYBRID = "hybrid"
    EXPERT = "expert"


class RelationType(StrEnum):
    """§29.2 — lineage кластеров между запусками."""

    SAME = "same"
    MERGE = "merge"
    SPLIT = "split"
    NEW = "new"
    RETIRED = "retired"


class MaturityStage(StrEnum):
    """§8. Границы шкалы — HYPOTHESIS (§24.12), калибруются."""

    NASCENT = "Nascent"
    EMERGING = "Emerging"
    GROWTH = "Growth"
    MAINSTREAM = "Mainstream"
    MATURE = "Mature"
    DECLINING = "Declining"


class JobStatus(StrEnum):
    QUEUED = "queued"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class RunStatus(StrEnum):
    RUNNING = "running"
    SUCCESS = "success"
    PARTIAL = "partial"
    FAILED = "failed"


class ChangeEventType(StrEnum):
    """§23.5 — changefiles обрабатываются как типизированные события,
    а не как blind upsert."""

    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"
    CORRECTION = "correction"


class MetricStatus(StrEnum):
    """§24.19 — missing ≠ zero."""

    AVAILABLE = "available"
    UNAVAILABLE = "unavailable"
    INSUFFICIENT = "insufficient"


class LicenseStatus(StrEnum):
    """§23.3 Legal Gate. Источник со статусом UNCLEAR не допускается
    к production ingestion."""

    APPROVED = "approved"
    RESTRICTED = "restricted"
    UNCLEAR = "unclear"
    PROHIBITED = "prohibited"
