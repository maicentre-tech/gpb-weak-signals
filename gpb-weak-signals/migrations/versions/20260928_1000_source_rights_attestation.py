"""Require explicit source-rights evidence and scoped owner approval for live search.

Revision ID: 9a3f5c7d1e20
Revises: 7f8c9d0e1a2b
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "9a3f5c7d1e20"
down_revision: str | None = "7f8c9d0e1a2b"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.add_column("sources", sa.Column("license_evidence_url", sa.Text(), nullable=True))
    op.add_column("sources", sa.Column("license_scope", sa.Text(), nullable=True))
    op.add_column(
        "sources", sa.Column("license_reviewed_by", sa.String(length=255), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("sources", "license_reviewed_by")
    op.drop_column("sources", "license_scope")
    op.drop_column("sources", "license_evidence_url")