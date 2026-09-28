"""Add auditable source trust and presentation metadata.

Revision ID: 4c2d8a1f7b90
Revises: 9af270dd6ca8
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "4c2d8a1f7b90"
down_revision: str | None = "9af270dd6ca8"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("sources", sa.Column("trust_level", sa.String(length=32), nullable=True))
    op.add_column("sources", sa.Column("trust_reason", sa.Text(), nullable=True))

    op.add_column("documents", sa.Column("original_title", sa.Text(), nullable=True))
    op.add_column("documents", sa.Column("summary_ru", sa.Text(), nullable=True))
    op.add_column(
        "documents", sa.Column("summary_model_version", sa.String(length=128), nullable=True)
    )
    op.add_column(
        "documents",
        sa.Column(
            "is_generated_summary",
            sa.Boolean(),
            server_default=sa.false(),
            nullable=False,
        ),
    )
    op.add_column("documents", sa.Column("retrieved_at", sa.DateTime(timezone=True), nullable=True))
    op.execute("UPDATE documents SET original_title = title WHERE original_title IS NULL")
    op.execute("UPDATE documents SET retrieved_at = first_seen_at WHERE retrieved_at IS NULL")


def downgrade() -> None:
    op.drop_column("documents", "retrieved_at")
    op.drop_column("documents", "is_generated_summary")
    op.drop_column("documents", "summary_model_version")
    op.drop_column("documents", "summary_ru")
    op.drop_column("documents", "original_title")
    op.drop_column("sources", "trust_reason")
    op.drop_column("sources", "trust_level")