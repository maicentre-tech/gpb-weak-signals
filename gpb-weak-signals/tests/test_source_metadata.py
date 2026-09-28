from __future__ import annotations

from pathlib import Path

from sqlalchemy import inspect

from eti.db.models import Document, Source


def test_source_and_document_metadata_contract() -> None:
    source_columns = {column.name for column in inspect(Source).columns}
    document_columns = {column.name for column in inspect(Document).columns}
    assert {"trust_level", "trust_reason"} <= source_columns
    assert {
        "original_title",
        "summary_ru",
        "summary_model_version",
        "is_generated_summary",
        "retrieved_at",
    } <= document_columns


def test_forward_migration_backfills_original_title_and_retrieved_at() -> None:
    migration = Path(__file__).parents[1] / "migrations/versions/20260914_0001_source_provenance_metadata.py"
    text = migration.read_text(encoding="utf-8")
    assert 'down_revision: str | None = "9af270dd6ca8"' in text
    assert "UPDATE documents SET original_title = title" in text
    assert "UPDATE documents SET retrieved_at = first_seen_at" in text
    assert "summary_ru" in text and "summary_model_version" in text