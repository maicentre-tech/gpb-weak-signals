from __future__ import annotations

from datetime import date
from types import SimpleNamespace
from uuid import uuid4

import pytest
from fastapi import BackgroundTasks
from pydantic import ValidationError

from eti.api.app import settings
from eti.api.routes import _paginate, query
from eti.api.schemas import QueryRequest


def test_query_page_size_and_offset_are_bounded() -> None:
    assert QueryRequest(domain="robotics").limit == 50
    assert QueryRequest(domain="robotics", limit=1).limit == 1
    with pytest.raises(ValidationError):
        QueryRequest(domain="robotics", limit=51)
    with pytest.raises(ValidationError):
        QueryRequest(domain="robotics", limit=0)
    assert QueryRequest(domain="robotics", offset=50).offset == 50
    with pytest.raises(ValidationError):
        QueryRequest(domain="robotics", offset=-1)


def test_query_pages_expose_the_complete_result_set() -> None:
    items = list(range(123))
    collected = []
    offset = 0
    while True:
        page, has_more = _paginate(items, offset, 50)
        collected.extend(page)
        if not has_more:
            break
        offset += len(page)

    assert collected == items
    assert _paginate(items, 123, 50) == ([], False)


async def test_query_route_returns_every_matching_card_across_pages(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    snapshot_date = date(2026, 9, 26)
    technologies = [
        SimpleNamespace(
            id=uuid4(),
            canonical_name=f"Technology {index:03}",
            canonical_name_ru=None,
        )
        for index in range(123)
    ]
    scores = [
        SimpleNamespace(
            technology_id=technology.id,
            strategic_relevance=None,
            strategic_priority=None,
            emerging_score=float(200 - index),
            evidence_confidence=90.0,
            maturity_stage=None,
            signal_status=None,
            detector_scores={},
            scoring_version="test",
            dataset_version="test",
            reference_population_size=None,
        )
        for index, technology in enumerate(technologies)
    ]

    class QueryResult:
        def __init__(self, *, rows=None, count=None):
            self.rows = rows or []
            self.count = count

        def scalars(self):
            return self

        def all(self):
            return self.rows

        def scalar_one(self):
            return self.count

    class FakeSession:
        def __init__(self):
            self.calls = 0

        async def execute(self, _statement):
            self.calls += 1
            # An explicit as_of_date first checks that the requested snapshot exists.
            if self.calls == 1 and self.check_snapshot:
                return QueryResult(count=123)
            return QueryResult(rows=scores)

        check_snapshot = False

    async def latest(_session):
        return snapshot_date

    async def match(_session, _domain):
        return technologies, 1.0

    monkeypatch.setattr("eti.api.routes._latest_scoring_date", latest)
    monkeypatch.setattr("eti.api.routes._match_technologies", match)
    monkeypatch.setattr(settings, "public_read_only", True)

    async def fetch_page(offset: int, *, anchor_snapshot: bool = False):
        session = FakeSession()
        session.check_snapshot = anchor_snapshot
        request = QueryRequest(
            domain="technology",
            limit=50,
            offset=offset,
            as_of_date=snapshot_date if anchor_snapshot else None,
        )
        return await query(request, BackgroundTasks(), session, settings)

    first = await fetch_page(0)
    second = await fetch_page(50, anchor_snapshot=True)
    third = await fetch_page(100, anchor_snapshot=True)
    combined = first.results + second.results + third.results

    assert [len(first.results), len(second.results), len(third.results)] == [50, 50, 23]
    assert [first.has_more, second.has_more, third.has_more] == [True, True, False]
    assert first.total_results == second.total_results == third.total_results == 123
    assert first.as_of_date == second.as_of_date == third.as_of_date == snapshot_date
    assert [row.rank for row in combined] == list(range(1, 124))
    assert len({row.technology_id for row in combined}) == 123