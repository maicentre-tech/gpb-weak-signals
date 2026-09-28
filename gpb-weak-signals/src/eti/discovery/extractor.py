"""Conservative, deterministic candidate extraction for open search.

This module deliberately stops before the ontology/scoring boundary.  It
produces reviewable evidence groups; it never creates or promotes a Technology.
The score is a transparent heuristic index, not a probability or confidence.
"""

from __future__ import annotations

from collections import Counter, defaultdict
from dataclasses import asdict, dataclass, field
import hashlib
import math
import re
from typing import Any, Iterable, Mapping
import unicodedata

from eti.discovery.report import DiscoveryReportExcerpt, build_report_excerpts
from eti.sources.base import NormalizedDocument

DISCOVERY_VERSION = "eti-discovery-exact-char-tfidf-v1"

_STOPWORDS = frozenset(
    """
    a an and are as at be by for from in into is it of on or that the this to with
    и в во не что он на я с со как а то все она так его но да ты к у же вы за бы по
    о об от до из для про над под при между без это был была быть
    technology technologies technology-based study studies system systems approach
    analysis method methods using based new novel research
    """.split()
)
_TOKEN_RE = re.compile(r"[^\W_]+(?:[-'][^\W_]+)*", flags=re.UNICODE)


@dataclass(frozen=True, slots=True)
class DiscoveryDocument:
    """The source metadata required for discovery, plus an optional normalized doc."""

    document_id: str
    source_code: str
    source_family: str
    title: str
    topics: tuple[str, ...] = ()
    url: str | None = None
    document_type: str | None = None
    language: str | None = None
    normalized: NormalizedDocument | None = None
    published_at: str | None = None
    original_title: str | None = None
    original_abstract: str | None = None
    original_abstract_truncated: bool = False
    summary_ru: str | None = None
    summary_model_version: str | None = None
    is_generated_summary: bool | None = None
    summary_source_id: str | None = None
    summary_evidence_quotes: tuple[str, ...] = ()
    summary_numbers_verified: bool | None = None
    summary_review_status: str | None = None
    original_metadata: dict[str, Any] = field(default_factory=dict)
    trust_level: str | None = None
    trust_reason: str | None = None
    evidence_weight: float | None = None
    license_status: str | None = None
    allows_derivative_analytics: bool | None = None

    @classmethod
    def from_normalized(
        cls,
        document: NormalizedDocument,
        *,
        document_id: str | None = None,
        source_code: str,
        source_family: str,
    ) -> DiscoveryDocument:
        topics = _topics_from_mapping(document.external_topics)
        abstract = (document.abstract or "").strip()
        raw_payload = document.raw_payload if isinstance(document.raw_payload, dict) else {}
        summary_ru = next(
            (
                value.strip()
                for key in ("summary_ru", "abstract_ru", "translated_abstract")
                if isinstance((value := raw_payload.get(key)), str) and value.strip()
            ),
            None,
        )
        summary_model_version = raw_payload.get("summary_model_version")
        if not isinstance(summary_model_version, str) or not summary_model_version.strip():
            summary_model_version = None
        is_generated_summary = raw_payload.get("is_generated_summary")
        if not isinstance(is_generated_summary, bool):
            is_generated_summary = None
        summary_source_id = raw_payload.get("summary_source_id")
        if not isinstance(summary_source_id, str) or not summary_source_id.strip():
            summary_source_id = document.external_id if is_generated_summary else None
        summary_evidence_quotes = raw_payload.get("summary_evidence_quotes")
        if not isinstance(summary_evidence_quotes, list):
            summary_evidence_quotes = []
        summary_evidence_quotes = tuple(
            value.strip()
            for value in summary_evidence_quotes
            if isinstance(value, str) and value.strip()
        )
        summary_numbers_verified = raw_payload.get("summary_numbers_verified")
        if not isinstance(summary_numbers_verified, bool):
            summary_numbers_verified = None
        summary_review_status = raw_payload.get("summary_review_status")
        if not isinstance(summary_review_status, str) or not summary_review_status.strip():
            summary_review_status = None
        original_metadata = document.model_dump(
            mode="json",
            include={
                "doi",
                "available_from",
                "priority_date",
                "filing_date",
                "publication_date",
                "grant_date",
                "external_topics",
                "authors",
                "institutions",
                "metrics",
                "source_revision",
            },
            exclude_none=True,
        )
        return cls(
            document_id=document_id or document.external_id,
            source_code=source_code,
            source_family=source_family,
            title=document.title or "",
            topics=tuple(topics),
            url=document.url,
            document_type=str(document.document_type),
            language=document.language,
            normalized=document,
            published_at=document.published_at.isoformat() if document.published_at else None,
            original_title=document.title or "",
            original_abstract=abstract[:2000] or None,
            original_abstract_truncated=len(abstract) > 2000,
            summary_ru=summary_ru,
            summary_model_version=summary_model_version,
            is_generated_summary=is_generated_summary,
            summary_source_id=summary_source_id,
            summary_evidence_quotes=summary_evidence_quotes,
            summary_numbers_verified=summary_numbers_verified,
            summary_review_status=summary_review_status,
            original_metadata=original_metadata,
        )


@dataclass(frozen=True, slots=True)
class CandidateEvidence:
    document_id: str
    source_code: str
    source_family: str
    title: str
    url: str | None
    document_type: str | None
    language: str | None
    matched_terms: tuple[str, ...]
    published_at: str | None = None
    original_title: str | None = None
    original_abstract: str | None = None
    original_abstract_truncated: bool = False
    summary_ru: str | None = None
    summary_model_version: str | None = None
    is_generated_summary: bool | None = None
    summary_source_id: str | None = None
    summary_evidence_quotes: tuple[str, ...] = ()
    summary_numbers_verified: bool | None = None
    summary_review_status: str | None = None
    original_metadata: dict[str, Any] = field(default_factory=dict)
    trust_level: str | None = None
    trust_reason: str | None = None
    evidence_weight: float | None = None
    license_status: str | None = None
    allows_derivative_analytics: bool | None = None


@dataclass(frozen=True, slots=True)
class CandidateGroup:
    candidate_id: str
    suggested_name: str
    evidence: tuple[CandidateEvidence, ...]
    document_count: int
    source_family_counts: dict[str, int]
    source_code_counts: dict[str, int]
    independent_source_family_count: int
    discovery_score: float
    score_components: dict[str, float]
    early_warning_document_count: int
    confirmed_emerging_document_count: int
    document_delta: int
    status: str
    eligibility_reason: str
    query: str
    report_claims: dict[str, DiscoveryReportExcerpt] = field(default_factory=dict)
    review_only: bool = True
    classifier_confidence: float | None = None
    classifier_status: str = "not_run_no_validated_candidate_model"
    discovery_version: str = DISCOVERY_VERSION

    @property
    def evidence_document_ids(self) -> tuple[str, ...]:
        return tuple(item.document_id for item in self.evidence)

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True, slots=True)
class DiscoveryResult:
    query: str
    candidates: tuple[CandidateGroup, ...]
    discovery_version: str = DISCOVERY_VERSION

    def as_dict(self) -> dict[str, Any]:
        return asdict(self)


def discover_candidates(
    query: str,
    documents: Iterable[DiscoveryDocument | NormalizedDocument],
    *,
    min_term_documents: int = 1,
    min_candidate_documents: int = 2,
) -> DiscoveryResult:
    """Extract and conservatively merge candidate phrases from documents.

    ``NormalizedDocument`` values are accepted only when their source metadata
    is supplied in ``raw_payload`` under ``source_code`` and ``source_family``.
    This avoids silently inventing provenance.
    """
    if not query.strip():
        raise ValueError("query must not be empty")
    if min_term_documents < 1 or min_candidate_documents < 1:
        raise ValueError("minimum document counts must be positive")

    normalized_documents = [_coerce_document(item) for item in documents]
    query_tokens = _tokens(query)
    candidates: dict[str, list[tuple[DiscoveryDocument, tuple[str, ...]]]] = defaultdict(list)
    for document in normalized_documents:
        terms = _extract_terms(document.title, document.topics, query_tokens)
        for term in terms:
            candidates[term].append((document, (term,)))

    filtered = {
        term: values
        for term, values in candidates.items()
        if len({item[0].document_id for item in values}) >= min_term_documents
    }
    groups = _merge_terms(filtered)
    output: list[CandidateGroup] = []
    for terms, term_values in groups:
        grouped_docs: dict[str, tuple[DiscoveryDocument, set[str]]] = {}
        for term, values in term_values.items():
            for document, _ in values:
                evidence = grouped_docs.setdefault(document.document_id, (document, set()))
                evidence[1].add(term)
        evidence_rows = tuple(
            CandidateEvidence(
                document_id=document.document_id,
                source_code=document.source_code,
                source_family=document.source_family,
                title=document.title,
                url=document.url,
                document_type=document.document_type,
                language=document.language,
                matched_terms=tuple(sorted(matched)),
                published_at=document.published_at,
                original_title=document.original_title or document.title,
                original_abstract=document.original_abstract,
                original_abstract_truncated=document.original_abstract_truncated,
                summary_ru=document.summary_ru,
                summary_model_version=document.summary_model_version,
                is_generated_summary=document.is_generated_summary,
                summary_source_id=document.summary_source_id,
                summary_evidence_quotes=document.summary_evidence_quotes,
                summary_numbers_verified=document.summary_numbers_verified,
                summary_review_status=document.summary_review_status,
                original_metadata=document.original_metadata,
                trust_level=document.trust_level,
                trust_reason=document.trust_reason,
                evidence_weight=document.evidence_weight,
                license_status=document.license_status,
                allows_derivative_analytics=document.allows_derivative_analytics,
            )
            for document, matched in sorted(
                grouped_docs.values(), key=lambda pair: pair[0].document_id
            )
        )
        if len(evidence_rows) < min_candidate_documents:
            continue
        output.append(_make_group(query, terms, evidence_rows))

    output.sort(key=lambda group: (-group.discovery_score, group.candidate_id))
    return DiscoveryResult(query=query, candidates=tuple(output))


def _coerce_document(document: DiscoveryDocument | NormalizedDocument) -> DiscoveryDocument:
    if isinstance(document, DiscoveryDocument):
        if not document.source_code.strip() or not document.source_family.strip():
            raise ValueError(f"document {document.document_id!r} has missing source provenance")
        return document
    payload = document.raw_payload or {}
    source_code = str(payload.get("source_code", "")).strip()
    source_family = str(payload.get("source_family", "")).strip()
    if not source_code or not source_family:
        raise ValueError(
            f"normalized document {document.external_id!r} requires raw_payload "
            "source_code and source_family for discovery"
        )
    return DiscoveryDocument.from_normalized(
        document,
        source_code=source_code,
        source_family=source_family,
    )


def _topics_from_mapping(topics: Mapping[str, Any]) -> list[str]:
    values: list[str] = []
    for key in ("ids", "names", "keywords", "topics", "labels"):
        value = topics.get(key)
        if isinstance(value, str):
            values.append(value)
        elif isinstance(value, (list, tuple, set)):
            values.extend(str(item) for item in value if str(item).strip())
    return values


def _normalize(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).casefold().replace("–", "-").replace("—", "-")
    return " ".join(_TOKEN_RE.findall(value))


def _tokens(value: str) -> tuple[str, ...]:
    return tuple(token for token in _normalize(value).split() if token not in _STOPWORDS)


def _extract_terms(title: str, topics: tuple[str, ...], query_tokens: tuple[str, ...]) -> set[str]:
    query_set = set(query_tokens)
    terms: set[str] = set()
    for raw in (title, *topics):
        tokens = [token for token in _tokens(raw) if token not in query_set]
        if not tokens:
            continue
        # Keep noun-like adjacent phrases, but avoid all-title boilerplate.
        for size in (1, 2, 3):
            for start in range(len(tokens) - size + 1):
                phrase = " ".join(tokens[start : start + size])
                if len(phrase) >= 3 and any(len(token) >= 3 for token in tokens[start : start + size]):
                    terms.add(phrase)
    return terms


def _merge_terms(
    candidates: Mapping[str, list[tuple[DiscoveryDocument, tuple[str, ...]]]],
) -> list[tuple[tuple[str, ...], dict[str, list[tuple[DiscoveryDocument, tuple[str, ...]]]]]]:
    """Merge only high-overlap terms; character TF-IDF guards spelling variants."""
    terms = sorted(candidates)
    parent = {term: term for term in terms}

    def find(term: str) -> str:
        while parent[term] != term:
            parent[term] = parent[parent[term]]
            term = parent[term]
        return term

    def union(left: str, right: str) -> None:
        root_left, root_right = find(left), find(right)
        if root_left != root_right:
            parent[max(root_left, root_right)] = min(root_left, root_right)

    for index, left in enumerate(terms):
        for right in terms[index + 1 :]:
            left_tokens, right_tokens = set(left.split()), set(right.split())
            overlap = len(left_tokens & right_tokens) / max(1, min(len(left_tokens), len(right_tokens)))
            cosine = _char_tfidf_cosine(left, right, terms)
            if (overlap >= 0.67 and cosine >= 0.72) or cosine >= 0.93:
                union(left, right)

    merged: dict[str, dict[str, list[tuple[DiscoveryDocument, tuple[str, ...]]]]] = defaultdict(dict)
    for term in terms:
        merged[find(term)][term] = candidates[term]
    return [
        (tuple(sorted(term_map)), term_map)
        for term_map in sorted(merged.values(), key=lambda item: min(item))
    ]


def _char_ngrams(value: str, size: int = 3) -> Counter[str]:
    compact = f"  {value}  "
    return Counter(compact[index : index + size] for index in range(len(compact) - size + 1))


def _char_tfidf_cosine(left: str, right: str, corpus: list[str]) -> float:
    left_ngrams, right_ngrams = _char_ngrams(left), _char_ngrams(right)
    document_frequency = Counter()
    for term in corpus:
        document_frequency.update(_char_ngrams(term).keys())
    total = max(1, len(corpus))

    def vector(ngrams: Counter[str]) -> dict[str, float]:
        return {
            gram: count * math.log((1 + total) / (1 + document_frequency[gram])) + 1
            for gram, count in ngrams.items()
        }

    left_vector, right_vector = vector(left_ngrams), vector(right_ngrams)
    numerator = sum(left_vector.get(key, 0) * value for key, value in right_vector.items())
    denominator = math.sqrt(sum(value * value for value in left_vector.values())) * math.sqrt(
        sum(value * value for value in right_vector.values())
    )
    return numerator / denominator if denominator else 0.0


def _make_group(
    query: str, terms: tuple[str, ...], evidence: tuple[CandidateEvidence, ...]
) -> CandidateGroup:
    family_counts = Counter(item.source_family for item in evidence)
    source_counts = Counter(item.source_code for item in evidence)
    independent_families = len(family_counts)
    source_diversity = min(1.0, independent_families / 2)
    volume = min(1.0, len(evidence) / 3)
    diversity_component = round(source_diversity * 50, 2)
    volume_component = round(volume * 30, 2)
    novelty_component = round(min(1.0, len(terms) / 3) * 20, 2)
    score = round(diversity_component + volume_component + novelty_component, 2)
    early_warning_ids = {
        item.document_id
        for item in evidence
        if item.source_family.casefold() in {"preprints", "open_source", "web_news"}
    }
    confirmed_ids = {
        item.document_id
        for item in evidence
        if item.source_family.casefold() in {"research", "patents", "rd"}
    }
    early_warning_count = len(early_warning_ids)
    confirmed_count = len(confirmed_ids)
    if independent_families >= 2:
        status = "eligible"
        reason = "Материалы найдены минимум в двух независимых категориях источников."
    elif family_counts and set(family_counts) <= {"web_news"}:
        status = "pending_review"
        reason = "Одних новостных материалов недостаточно, чтобы подтвердить существование технологии."
    else:
        status = "pending_review"
        reason = "Недостаточно независимых категорий источников; нужна экспертная проверка."
    name = min(terms, key=lambda term: (-len(term.split()), term))
    stable_material = "|".join([DISCOVERY_VERSION, query, *terms, *sorted(item.document_id for item in evidence)])
    candidate_id = f"candidate-{hashlib.sha256(stable_material.encode()).hexdigest()[:20]}"
    return CandidateGroup(
        candidate_id=candidate_id,
        suggested_name=name,
        evidence=evidence,
        document_count=len(evidence),
        source_family_counts=dict(sorted(family_counts.items())),
        source_code_counts=dict(sorted(source_counts.items())),
        independent_source_family_count=independent_families,
        discovery_score=score,
        score_components={
            "source_diversity_index": diversity_component,
            "volume_index": volume_component,
            "term_support_index": novelty_component,
        },
        early_warning_document_count=early_warning_count,
        confirmed_emerging_document_count=confirmed_count,
        document_delta=early_warning_count - confirmed_count,
        status=status,
        eligibility_reason=reason,
        query=query,
        report_claims=build_report_excerpts(evidence),
    )