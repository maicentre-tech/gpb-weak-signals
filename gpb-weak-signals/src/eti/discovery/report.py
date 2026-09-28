"""Conservative, source-verbatim excerpts for open-search candidate reports.

The report does not ask a language model to invent explanations. It selects
short original-abstract sentences with category cues, cites the exact document,
and leaves a field empty when no matching source sentence exists.
"""

from __future__ import annotations

from collections.abc import Iterable
from dataclasses import dataclass
import re
from typing import Protocol

MAX_EXCERPT_CHARS = 480


class EvidenceLike(Protocol):
    document_id: str
    original_abstract: str | None


@dataclass(frozen=True, slots=True)
class DiscoveryReportExcerpt:
    text: str | None
    source_doc_ids: tuple[str, ...] = ()


_CLAIM_CUES = {
    "problem": re.compile(
        r"\b(?:challenge|problem|limitation|barrier|bottleneck|risk|gap|constraint|"
        r"shortcoming|difficulty|lack|need)\b|"
        r"проблем|вызов|ограничен|барьер|узк\w*\s+мест|дефицит|сложност|недостат|риск|"
        r"необходимост",
        re.IGNORECASE,
    ),
    "advantage": re.compile(
        r"\b(?:improv\w*|enhanc\w*|increas\w*|reduc\w*|lower\w*|accelerat\w*|"
        r"efficien\w*|accurac\w*|outperform\w*|enabl\w*|benefit\w*|sav\w*)\b|"
        r"улучш|повыш|увелич|сниж|сокращ|ускор|эффектив|точност|преимущ|позволя|"
        r"обеспеч|эконом|производительност",
        re.IGNORECASE,
    ),
    "case": re.compile(
        r"\b(?:deploy\w*|pilot\w*|implement\w*|appl(?:y|ied|ication|icable)\w*|"
        r"use case|case study|test\w*|integrat\w*|production|real-world|"
        r"demonstrat\w*)\b|"
        r"внедр|пилот|примен|использу|эксплуатац|интеграц|тестир|апробац|развернул|"
        r"демонстрац|реальном мире",
        re.IGNORECASE,
    ),
}


def _normalize_whitespace(value: str) -> str:
    return " ".join(value.split())


def _sentences(text: str) -> Iterable[str]:
    for part in re.split(r"(?<=[.!?])\s+|\s*\n+\s*", text.strip()):
        sentence = _normalize_whitespace(part)
        if sentence and len(sentence) <= MAX_EXCERPT_CHARS:
            yield sentence


def validate_report_excerpt(
    excerpt: DiscoveryReportExcerpt,
    evidence: Iterable[EvidenceLike],
) -> bool:
    """Accept only exact, short excerpts from every document they cite."""
    if not excerpt.text or not excerpt.source_doc_ids:
        return False

    quote = _normalize_whitespace(excerpt.text)
    if not quote or len(quote) > MAX_EXCERPT_CHARS:
        return False
    if len(set(excerpt.source_doc_ids)) != len(excerpt.source_doc_ids):
        return False

    documents = {item.document_id: item for item in evidence}
    cited = [documents.get(document_id) for document_id in excerpt.source_doc_ids]
    if any(document is None for document in cited):
        return False

    return all(
        quote in _normalize_whitespace(document.original_abstract or "")
        for document in cited
        if document is not None
    )


def build_report_excerpts(
    evidence: Iterable[EvidenceLike],
) -> dict[str, DiscoveryReportExcerpt]:
    """Pick at most one exact source sentence for each report section."""
    documents = tuple(evidence)
    excerpts: dict[str, DiscoveryReportExcerpt] = {}
    used: set[tuple[str, str]] = set()

    for claim_type, cue in _CLAIM_CUES.items():
        selected = DiscoveryReportExcerpt(text=None)
        for document in documents:
            abstract = document.original_abstract or ""
            for sentence in _sentences(abstract):
                key = (document.document_id, sentence)
                if key in used or not cue.search(sentence):
                    continue
                candidate = DiscoveryReportExcerpt(
                    text=sentence,
                    source_doc_ids=(document.document_id,),
                )
                if validate_report_excerpt(candidate, documents):
                    selected = candidate
                    used.add(key)
                    break
            if selected.text:
                break
        excerpts[claim_type] = selected

    return excerpts