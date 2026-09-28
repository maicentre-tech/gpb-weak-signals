from __future__ import annotations

import json
from dataclasses import replace
from datetime import UTC, datetime

from eti.discovery import DiscoveryDocument, discover_candidates
from eti.discovery.report import DiscoveryReportExcerpt, build_report_excerpts, validate_report_excerpt
from eti.sources.base import NormalizedDocument
from eti.db.enums import DocumentType


def doc(
    document_id: str,
    title: str,
    *,
    family: str = "research",
    source: str | None = None,
    topics: tuple[str, ...] = (),
) -> DiscoveryDocument:
    return DiscoveryDocument(
        document_id=document_id,
        source_code=source or family,
        source_family=family,
        title=title,
        topics=topics,
        url=f"https://example.org/{document_id}",
        document_type="paper",
        language="en",
    )


def test_extraction_is_deterministic_and_preserves_evidence() -> None:
    documents = [
        doc("b", "Quantum sensor networks for industrial monitoring", topics=("quantum sensor",)),
        doc("a", "Quantum sensing networks improve industrial monitoring", source="patents", family="patents"),
        doc("c", "Quantum sensor networks in robotics", source="openalex", family="research"),
    ]
    first = discover_candidates("quantum sensing", documents)
    second = discover_candidates("quantum sensing", list(reversed(documents)))
    assert first.as_dict() == second.as_dict()
    assert first.candidates
    group = first.candidates[0]
    assert group.status == "eligible"
    assert group.independent_source_family_count == 2
    assert set(group.evidence_document_ids) == {"a", "b", "c"}
    assert group.candidate_id.startswith("candidate-")
    assert "quantum" not in group.suggested_name.split()


def test_query_words_are_removed_from_candidate_terms() -> None:
    result = discover_candidates(
        "battery storage",
        [
            doc("one", "Battery storage solid state electrolyte", topics=("battery", "solid state")),
            doc("two", "Battery storage solid-state electrolyte", family="patents", source="epo"),
        ],
    )
    assert result.candidates
    assert all(
        "battery" not in group.suggested_name.split()
        and "storage" not in group.suggested_name.split()
        for group in result.candidates
    )


def test_same_family_duplicates_do_not_pass_independence() -> None:
    result = discover_candidates(
        "robotics",
        [
            doc("one", "Soft gripper tactile sensing", source="openalex", family="research"),
            doc("two", "Soft gripper tactile sensing", source="arxiv", family="research"),
        ],
    )
    assert result.candidates
    assert all(group.status == "pending_review" for group in result.candidates)
    assert all(group.independent_source_family_count == 1 for group in result.candidates)


def test_news_only_and_weak_candidates_stay_pending() -> None:
    result = discover_candidates(
        "agentic systems",
        [
            doc("one", "Agentic workflow orchestration startup", family="web_news", source="gdelt"),
            doc("two", "Agentic workflow orchestration product", family="web_news", source="gdelt"),
        ],
    )
    assert result.candidates
    assert all(group.status == "pending_review" for group in result.candidates)
    assert all("новостных материалов" in group.eligibility_reason for group in result.candidates)


def test_report_excerpts_are_verbatim_and_link_to_candidate_evidence() -> None:
    abstract = (
        "The main challenge is limited data access. "
        "The method reduces energy consumption by 20%. "
        "A 2025 pilot deployed the system in two labs."
    )
    result = discover_candidates(
        "quantum sensors",
        [
            DiscoveryDocument(
                document_id="paper-1",
                source_code="openalex",
                source_family="research",
                title="Quantum sensor networks for laboratory monitoring",
                original_abstract=abstract,
            ),
            DiscoveryDocument(
                document_id="patent-1",
                source_code="epo",
                source_family="patents",
                title="Quantum sensor networks for laboratory monitoring",
                original_abstract=abstract,
            ),
        ],
    )

    candidate = next(group for group in result.candidates if group.document_count == 2)
    claims = candidate.report_claims
    assert claims["problem"].text == "The main challenge is limited data access."
    assert claims["advantage"].text == "The method reduces energy consumption by 20%."
    assert claims["case"].text == "A 2025 pilot deployed the system in two labs."
    assert all(len(claim.source_doc_ids) == 1 for claim in claims.values())
    assert all(
        claim.source_doc_ids[0] in candidate.evidence_document_ids
        for claim in claims.values()
    )
    assert claims["advantage"].text in next(
        item.original_abstract
        for item in candidate.evidence
        if item.document_id == claims["advantage"].source_doc_ids[0]
    )
    serialized = candidate.as_dict()
    api_payload = json.loads(json.dumps(serialized))
    assert api_payload["report_claims"]["advantage"]["source_doc_ids"] == [
        claims["advantage"].source_doc_ids[0]
    ]


def test_report_excerpt_verifier_rejects_unknown_sources_and_changed_text() -> None:
    source = DiscoveryDocument(
        document_id="paper-1",
        source_code="openalex",
        source_family="research",
        title="Quantum sensors",
        original_abstract="The method reduces energy consumption by 20%.",
    )
    assert validate_report_excerpt(
        DiscoveryReportExcerpt(
            text="The method reduces energy consumption by 20%.",
            source_doc_ids=("paper-1",),
        ),
        [source],
    )
    assert not validate_report_excerpt(
        DiscoveryReportExcerpt(
            text="The method reduces energy consumption by 20%.",
            source_doc_ids=("missing-document",),
        ),
        [source],
    )
    assert not validate_report_excerpt(
        DiscoveryReportExcerpt(
            text="The method reduces energy consumption by 90%.",
            source_doc_ids=("paper-1",),
        ),
        [source],
    )


def test_report_fields_stay_empty_without_matching_source_sentences() -> None:
    excerpts = build_report_excerpts(
        [
            DiscoveryDocument(
                document_id="paper-1",
                source_code="openalex",
                source_family="research",
                title="Quantum sensor networks",
                original_abstract="This paper describes a new research platform.",
            )
        ]
    )
    assert set(excerpts) == {"problem", "advantage", "case"}
    assert all(item.text is None and item.source_doc_ids == () for item in excerpts.values())


def test_candidate_exposes_early_warning_and_confirmed_evidence_counts_separately() -> None:
    title = "Soft tactile gripper sensing for robotics"
    result = discover_candidates(
        "robotics",
        [
            doc("preprint-1", title, family="preprints", source="arxiv"),
            doc("preprint-2", title, family="preprints", source="arxiv"),
            doc("paper-1", title, family="research", source="openalex"),
        ],
    )

    candidate = result.candidates[0]
    assert candidate.early_warning_document_count == 2
    assert candidate.confirmed_emerging_document_count == 1
    assert candidate.document_delta == 1
    assert candidate.review_only is True
    assert candidate.classifier_confidence is None


def test_candidate_evidence_preserves_source_metadata_and_trust_reason() -> None:
    normalized = NormalizedDocument(
        external_id="openalex:1",
        document_type=DocumentType.PAPER,
        title="Soft tactile gripper sensing for robotics",
        abstract="Original source abstract.",
        doi="10.1234/example",
        language="en",
        published_at=datetime(2026, 1, 2, tzinfo=UTC),
        external_topics={"topic": "robotics"},
        authors={"names": ["A. Researcher"]},
        raw_payload={
            "summary_ru": "Краткое резюме на русском.",
            "summary_model_version": "ru-summary-v1",
            "is_generated_summary": True,
        },
    )
    source_document = DiscoveryDocument.from_normalized(
        normalized,
        source_code="openalex",
        source_family="research",
    )
    source_document = replace(
        source_document,
        trust_level="high",
        trust_reason="Reviewed metadata source.",
        evidence_weight=0.9,
        license_status="approved",
        allows_derivative_analytics=True,
    )
    result = discover_candidates(
        "robotics",
        [
            source_document,
            doc(
                "patent:1",
                "Soft tactile gripper sensing for robotics",
                family="patents",
                source="patents",
            ),
        ],
    )

    evidence = result.candidates[0].as_dict()["evidence"]
    openalex_evidence = next(item for item in evidence if item["source_code"] == "openalex")
    assert openalex_evidence["original_title"] == normalized.title
    assert openalex_evidence["original_abstract"] == normalized.abstract
    assert openalex_evidence["published_at"] == "2026-01-02T00:00:00+00:00"
    assert openalex_evidence["summary_ru"] == "Краткое резюме на русском."
    assert openalex_evidence["summary_model_version"] == "ru-summary-v1"
    assert openalex_evidence["is_generated_summary"] is True
    assert openalex_evidence["original_metadata"]["doi"] == normalized.doi
    assert openalex_evidence["trust_reason"] == "Reviewed metadata source."
    assert openalex_evidence["evidence_weight"] == 0.9
    assert openalex_evidence["license_status"] == "approved"


def test_summary_origin_stays_unknown_when_source_omits_provenance() -> None:
    normalized = NormalizedDocument(
        external_id="openalex:2",
        document_type=DocumentType.PAPER,
        title="Graph neural retrieval",
        abstract="Source abstract.",
        raw_payload={"summary_ru": "Резюме без сведений о происхождении."},
    )

    evidence = DiscoveryDocument.from_normalized(
        normalized,
        source_code="openalex",
        source_family="research",
    )

    assert evidence.summary_ru == "Резюме без сведений о происхождении."
    assert evidence.summary_model_version is None
    assert evidence.is_generated_summary is None


def test_normalized_document_requires_explicit_provenance() -> None:
    normalized = NormalizedDocument(
        external_id="external-1",
        document_type=DocumentType.PAPER,
        title="Graph neural retrieval",
        published_at=datetime(2025, 1, 1, tzinfo=UTC),
    )
    try:
        discover_candidates("retrieval", [normalized])
    except ValueError as error:
        assert "source_code" in str(error)
    else:
        raise AssertionError("missing source provenance must fail closed")