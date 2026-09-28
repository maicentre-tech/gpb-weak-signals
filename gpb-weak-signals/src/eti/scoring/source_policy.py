"""Auditable evidence-family policy for weak single-source candidates."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class SourceEvidence:
    family: str | None
    trust_level: str | None
    trust_reason: str | None = None


@dataclass(frozen=True, slots=True)
class EvidencePolicyDecision:
    allowed: bool
    reason: str | None
    independent_family_count: int
    weak_source_count: int


def assess_source_evidence(
    evidence: list[SourceEvidence] | tuple[SourceEvidence, ...],
) -> EvidencePolicyDecision:
    """Reject unsupported weak evidence without guessing company-source quality.

    ``companies`` is not inherently weak: only an explicit ``low`` trust value
    (or missing trust metadata) makes it weak. Missing family/trust is treated
    conservatively as unknown and therefore weak.
    """
    families = {item.family for item in evidence if item.family}
    weak = [
        item
        for item in evidence
        if not item.family
        or not item.trust_level
        or item.trust_level.casefold() in {"low", "weak", "unknown"}
    ]
    family_count = len(families)
    if not evidence:
        return EvidencePolicyDecision(
            False, "Исключено: отсутствуют проверяемые source metadata.", 0, 0
        )
    if family_count < 2:
        detail = (
            "Источники имеют низкий или неизвестный уровень доверия."
            if weak and len(weak) == len(evidence)
            else "Независимое подтверждение не установлено."
        )
        return EvidencePolicyDecision(
            False,
            f"Исключено: только одно семейство источников; {detail} (single_source).",
            family_count,
            len(weak),
        )
    if weak and len(weak) == len(evidence):
        return EvidencePolicyDecision(
            False,
            "Исключено: доказательная база состоит только из источников с низким "
            "или неизвестным уровнем доверия.",
            family_count,
            len(weak),
        )
    return EvidencePolicyDecision(
        True,
        None if not weak else "Допущено с оговоркой: часть источников имеет низкое доверие.",
        family_count,
        len(weak),
    )