"""Add explicit source field, operation, and review-version scope.

Revision ID: 3b4f6c8d2a10
Revises: 9a3f5c7d1e20
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "3b4f6c8d2a10"
down_revision: str | None = "9a3f5c7d1e20"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column(
        "sources",
        sa.Column(
            "license_approved_fields",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'[]'::jsonb"),
            nullable=False,
        ),
    )
    op.add_column(
        "sources",
        sa.Column(
            "license_approved_operations",
            postgresql.JSONB(astext_type=sa.Text()),
            server_default=sa.text("'[]'::jsonb"),
            nullable=False,
        ),
    )
    op.add_column("sources", sa.Column("license_review_reference", sa.Text(), nullable=True))
    op.add_column(
        "sources", sa.Column("license_review_due_at", sa.Date(), nullable=True)
    )
    op.add_column(
        "sources",
        sa.Column("license_terms_version", sa.String(length=255), nullable=True),
    )
    op.add_column(
        "sources",
        sa.Column("license_reviewed_terms_version", sa.String(length=255), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("sources", "license_reviewed_terms_version")
    op.drop_column("sources", "license_terms_version")
    op.drop_column("sources", "license_review_due_at")
    op.drop_column("sources", "license_review_reference")
    op.drop_column("sources", "license_approved_operations")
    op.drop_column("sources", "license_approved_fields")