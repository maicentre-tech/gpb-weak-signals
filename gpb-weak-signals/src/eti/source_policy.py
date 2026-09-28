"""Fail-closed evaluation of source rights records."""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from dataclasses import dataclass
from datetime import date, datetime
from typing import Any

_REQUIRED_RECORD_FIELDS = (
    "license_type",
    "license_owner",
    "license_checked_at",
    "license_evidence_url",
    "license_scope",
    "license_reviewed_by",
    "license_review_reference",
    "license_review_due_at",
    "license_terms_version",
    "license_reviewed_terms_version",
)


@dataclass(frozen=True)
class SourcePolicyDecision:
    allowed: bool
    reason: str
    review_status: str


def _get(source: Mapping[str, Any] | object, field: str) -> Any:
    if isinstance(source, Mapping):
        return source.get(field)
    return getattr(source, field, None)


def _as_date(value: Any) -> date | None:
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    if isinstance(value, str):
        try:
            return date.fromisoformat(value[:10])
        except ValueError:
            return None
    return None


def _as_string_set(values: Any) -> set[str]:
    if not isinstance(values, (list, tuple, set, frozenset)):
        return set()
    return {value.strip() for value in values if isinstance(value, str) and value.strip()}


def source_review_status(
    source: Mapping[str, Any] | object | None, *, today: date | None = None
) -> tuple[str, str]:
    """Return a non-sensitive review status and a public-safe explanation."""
    if source is None:
        return "not_reviewed", "Запись проверки прав отсутствует."

    due_at = _as_date(_get(source, "license_review_due_at"))
    checked_at = _as_date(_get(source, "license_checked_at"))
    reference = str(_get(source, "license_review_reference") or "").strip()
    current_version = str(_get(source, "license_terms_version") or "").strip()
    reviewed_version = str(_get(source, "license_reviewed_terms_version") or "").strip()
    if not all((due_at, checked_at, reference, current_version, reviewed_version)):
        return "incomplete", "Сведения о сроке или версии проверки прав не заполнены."
    if current_version != reviewed_version:
        return "terms_changed", "Версия условий изменилась после проверки; источник заблокирован."
    if due_at < (today or date.today()):
        return "expired", "Срок повторной проверки прав истёк; источник заблокирован."
    return "current", "Проверка прав актуальна."


def evaluate_source_policy(
    source: Mapping[str, Any] | object | None,
    *,
    requested_fields: Iterable[str] = (),
    required_operations: Iterable[str] = (),
    today: date | None = None,
) -> SourcePolicyDecision:
    """Check a complete, current rights record and exact field/operation scope."""
    review_status, review_reason = source_review_status(source, today=today)
    if source is None:
        return SourcePolicyDecision(False, review_reason, review_status)
    if not bool(_get(source, "enabled")):
        return SourcePolicyDecision(False, "Источник отключён.", review_status)
    if str(_get(source, "license_status") or "").casefold() != "approved":
        return SourcePolicyDecision(False, "Лицензия источника не одобрена.", review_status)
    if not bool(_get(source, "allows_derivative_analytics")):
        return SourcePolicyDecision(
            False, "Производная аналитика не разрешена.", review_status
        )

    missing = [
        field
        for field in _REQUIRED_RECORD_FIELDS
        if not str(_get(source, field) or "").strip()
    ]
    if missing:
        return SourcePolicyDecision(
            False,
            "Source License Record не заполнен полностью: отсутствуют подтверждённые "
            "сведения о правах, сроке или версии проверки.",
            "incomplete",
        )
    if review_status != "current":
        return SourcePolicyDecision(False, review_reason, review_status)

    approved_fields = _as_string_set(_get(source, "license_approved_fields"))
    missing_fields = sorted(set(requested_fields) - approved_fields)
    if missing_fields:
        return SourcePolicyDecision(
            False,
            "Не подтверждены поля источника: " + ", ".join(missing_fields) + ".",
            review_status,
        )

    approved_operations = _as_string_set(_get(source, "license_approved_operations"))
    missing_operations = sorted(set(required_operations) - approved_operations)
    if missing_operations:
        return SourcePolicyDecision(
            False,
            "Не подтверждены операции с данными источника: "
            + ", ".join(missing_operations)
            + ".",
            review_status,
        )

    return SourcePolicyDecision(
        True, "Source License Record и запрошенный scope подтверждены.", review_status
    )