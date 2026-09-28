"""Persist expert decisions for discovery ontology recommendations.

Revision ID: 7f8c9d0e1a2b
Revises: 4c2d8a1f7b90
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "7f8c9d0e1a2b"
down_revision: str | None = "4c2d8a1f7b90"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "candidate_mapping_reviews",
        sa.Column("id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("candidate_id", sa.String(length=255), nullable=False),
        sa.Column("job_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("candidate_name", sa.Text(), nullable=False),
        sa.Column("suggested_technology_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("suggested_technology_name", sa.Text(), nullable=False),
        sa.Column("decision", sa.String(length=32), nullable=False),
        sa.Column("replacement_technology_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("evidence", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("provenance", postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column("reviewer_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.CheckConstraint(
            "decision IN ('confirm', 'reject', 'reassign')",
            name="candidate_review_decision",
        ),
        sa.CheckConstraint(
            "(decision = 'reassign' AND replacement_technology_id IS NOT NULL) "
            "OR (decision <> 'reassign' AND replacement_technology_id IS NULL)",
            name="candidate_review_replacement",
        ),
        sa.ForeignKeyConstraint(
            ["job_id"], ["analysis_jobs.id"], ondelete="SET NULL"
        ),
        sa.ForeignKeyConstraint(
            ["suggested_technology_id"], ["technologies.id"]
        ),
        sa.ForeignKeyConstraint(
            ["replacement_technology_id"], ["technologies.id"]
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_candidate_mapping_review_candidate",
        "candidate_mapping_reviews",
        ["candidate_id", "reviewed_at"],
    )
    op.create_index(
        "ix_candidate_mapping_review_job",
        "candidate_mapping_reviews",
        ["job_id", "reviewed_at"],
    )


def downgrade() -> None:
    op.drop_index("ix_candidate_mapping_review_job", table_name="candidate_mapping_reviews")
    op.drop_index("ix_candidate_mapping_review_candidate", table_name="candidate_mapping_reviews")
    op.drop_table("candidate_mapping_reviews")