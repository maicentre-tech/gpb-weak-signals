"""Тесты нормализации коннекторов.

Разбор ответа отделён от сети намеренно: парсер должен быть проверяем без
внешних вызовов, иначе тесты падают от чужих rate limit, а не от багов.
"""

from __future__ import annotations

import xml.etree.ElementTree as ET
from pathlib import Path

import pytest

from eti.db.enums import DocumentType
from eti.sources.arxiv import NS, ArxivConnector
from eti.sources.base import RawRecord
from eti.sources.github import GitHubConnector
from eti.sources.openalex import reconstruct_abstract

FIXTURES = Path(__file__).parent / "fixtures"


class TestOpenAlexAbstract:
    def test_reconstructs_word_order_from_inverted_index(self) -> None:
        inverted = {"Agentic": [0], "AI": [1], "is": [2], "emerging": [3]}
        assert reconstruct_abstract(inverted) == "Agentic AI is emerging"

    def test_handles_repeated_words(self) -> None:
        inverted = {"the": [0, 3], "agent": [1, 4], "and": [2]}
        assert reconstruct_abstract(inverted) == "the agent and the agent"

    def test_missing_index_returns_none(self) -> None:
        assert reconstruct_abstract(None) is None
        assert reconstruct_abstract({}) is None


class TestArxivNormalization:
    @pytest.fixture
    def entries(self) -> list[ET.Element]:
        root = ET.fromstring((FIXTURES / "arxiv_response.xml").read_text(encoding="utf-8"))
        return root.findall("atom:entry", NS)

    def test_parses_all_entries(self, entries: list[ET.Element]) -> None:
        assert len(entries) == 2

    def test_collapses_wrapped_title(self, entries: list[ET.Element]) -> None:
        """Atom переносит длинные заголовки — переводы строк должны
        схлопываться, иначе content_hash плывёт от форматирования."""
        payload = ArxivConnector._entry_to_dict(entries[0])
        doc = _normalize(payload)

        assert "\n" not in doc.title
        assert doc.title.startswith("Advances and Challenges in Foundation Agents:")
        assert "Brain-Inspired Intelligence" in doc.title

    def test_extracts_categories_and_doi(self, entries: list[ET.Element]) -> None:
        doc = _normalize(ArxivConnector._entry_to_dict(entries[0]))

        assert doc.external_topics["arxiv_categories"] == ["cs.AI", "cs.CL", "cs.MA"]
        assert doc.external_topics["primary_category"] == "cs.AI"
        assert doc.doi == "10.1145/3712345"
        assert doc.document_type is DocumentType.PREPRINT

    def test_missing_doi_is_none_not_empty_string(self, entries: list[ET.Element]) -> None:
        doc = _normalize(ArxivConnector._entry_to_dict(entries[1]))
        assert doc.doi is None

    def test_published_date_is_timezone_aware(self, entries: list[ET.Element]) -> None:
        doc = _normalize(ArxivConnector._entry_to_dict(entries[0]))

        assert doc.published_at is not None
        assert doc.published_at.tzinfo is not None
        assert doc.published_at.date().isoformat() == "2025-04-01"

    def test_authors_collected(self, entries: list[ET.Element]) -> None:
        doc = _normalize(ArxivConnector._entry_to_dict(entries[0]))
        assert doc.authors["count"] == 3
        assert "Bang Liu" in doc.authors["names"]

    def test_preprints_carry_no_mutable_metrics(self, entries: list[ET.Element]) -> None:
        """arXiv не отдаёт цитирований — метрик быть не должно, и это
        UNAVAILABLE, а не ноль (§24.19)."""
        doc = _normalize(ArxivConnector._entry_to_dict(entries[0]))
        assert doc.metrics == {}


class TestGitHubNormalization:
    @pytest.fixture
    def repo_payload(self) -> dict:
        return {
            "id": 748392011,
            "full_name": "ComposioHQ/composio",
            "html_url": "https://github.com/ComposioHQ/composio",
            "description": "Production-ready toolset for AI agents",
            "created_at": "2024-02-23T10:11:12Z",
            "updated_at": "2026-09-01T08:00:00Z",
            "stargazers_count": 30158,
            "forks_count": 5321,
            "watchers_count": 30158,
            "open_issues_count": 142,
            "topics": ["agentic-ai", "agents", "ai", "ai-agents"],
            "language": "TypeScript",
            "license": {"spdx_id": "Apache-2.0"},
            "owner": {"login": "ComposioHQ", "type": "Organization"},
        }

    def test_mutable_counts_go_to_metrics_not_fields(self, repo_payload: dict) -> None:
        """Звёзды меняются во времени: они обязаны попасть в снапшоты, иначе
        Adoption Momentum нечем считать задним числом (§34)."""
        doc = _normalize_github(repo_payload)

        assert doc.metrics["github_stars"] == 30158
        assert doc.metrics["github_forks"] == 5321
        assert "stargazers_count" not in doc.model_dump()

    def test_organization_owner_becomes_institution(self, repo_payload: dict) -> None:
        doc = _normalize_github(repo_payload)
        assert doc.institutions["names"] == ["ComposioHQ"]

    def test_personal_owner_is_not_institution(self, repo_payload: dict) -> None:
        repo_payload["owner"] = {"login": "someuser", "type": "User"}
        doc = _normalize_github(repo_payload)
        assert doc.institutions == {}

    def test_content_hash_ignores_star_changes(self, repo_payload: dict) -> None:
        """Рост числа звёзд не должен выглядеть как изменение документа:
        иначе каждый день генерируется ложное UPDATE-событие."""
        before = _normalize_github(repo_payload).content_hash()
        repo_payload["stargazers_count"] = 31000
        after = _normalize_github(repo_payload).content_hash()

        assert before == after

    def test_content_hash_reacts_to_description_change(self, repo_payload: dict) -> None:
        before = _normalize_github(repo_payload).content_hash()
        repo_payload["description"] = "Совершенно другое описание"
        after = _normalize_github(repo_payload).content_hash()

        assert before != after


class TestDateSlicing:
    def test_covers_range_without_gaps_or_overlap(self) -> None:
        """Потолок GitHub Search в 1 000 результатов обходится нарезкой по
        датам — срезы обязаны покрывать диапазон без дыр."""
        from datetime import date

        slices = list(GitHubConnector._date_slices(date(2024, 1, 1), date(2024, 12, 31), 90))

        assert slices[0][0] == date(2024, 1, 1)
        assert slices[-1][1] == date(2024, 12, 31)
        for (_, prev_end), (next_start, _) in zip(slices, slices[1:], strict=False):
            assert (next_start - prev_end).days == 1


def _normalize(payload: dict):
    connector = ArxivConnector.__new__(ArxivConnector)
    return connector.normalize(RawRecord(external_id=payload["id"], payload=payload))


def _normalize_github(payload: dict):
    connector = GitHubConnector.__new__(GitHubConnector)
    return connector.normalize(RawRecord(external_id=str(payload["id"]), payload=payload))


class TestOpenAlexCursor:
    """Регрессия: курсор приходит меткой времени, а фильтр ждёт дату.

    Первый запуск с пустым чекпоинтом проходит, падает второй — поэтому
    ошибка не видна при разовой проверке коннектора и всплывает только
    при повторном запуске по расписанию.
    """

    def test_timestamp_cursor_reduced_to_date(self) -> None:
        from eti.sources.openalex import as_filter_date

        assert as_filter_date("2026-09-11T09:22:31.653822") == "2026-09-11"

    def test_plain_date_passes_through(self) -> None:
        from eti.sources.openalex import as_filter_date

        assert as_filter_date("2026-09-11") == "2026-09-11"
