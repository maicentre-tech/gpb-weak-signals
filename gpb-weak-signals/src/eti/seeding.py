"""Small, non-destructive helpers shared by repeatable seed scripts."""

from __future__ import annotations

from collections.abc import Mapping
from typing import Any


def split_source_seed_spec(
    spec: Mapping[str, Any],
) -> tuple[dict[str, Any], dict[str, Any] | None]:
    """Separate coverage from source fields without mutating the seed registry."""
    coverage_spec = spec.get("coverage")
    source_spec = {key: value for key, value in spec.items() if key != "coverage"}
    return source_spec, coverage_spec


def fill_missing_fields(entity: Any, fields: Mapping[str, Any]) -> None:
    """Fill blank entity attributes while preserving any operator-set values."""
    for key, value in fields.items():
        if getattr(entity, key) is None:
            setattr(entity, key, value)