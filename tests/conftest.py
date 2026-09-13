from __future__ import annotations

from datetime import date

import pytest

from eti.config import ScoringParams
from eti.db.enums import MetricStatus
from eti.scoring.series import PeriodMetrics, TechnologySeries


@pytest.fixture
def params() -> ScoringParams:
    return ScoringParams()


def month_range(start_year: int, months: int) -> list[date]:
    result = []
    year, month = start_year, 1
    for _ in range(months):
        result.append(date(year, month, 1))
        month += 1
        if month > 12:
            month, year = 1, year + 1
    return result


def make_series(
    monthly: dict[str, list[float]],
    *,
    start_year: int = 2020,
    as_of: date | None = None,
    coverage_start: date | None = None,
    unavailable: set[str] | None = None,
) -> TechnologySeries:
    """Ряд из помесячных значений: {metric: [v1, v2, ...]}."""
    length = max(len(v) for v in monthly.values())
    dates = month_range(start_year, length)
    unavailable = unavailable or set()
    periods = []
    for i, d in enumerate(dates):
        values = {m: (v[i] if i < len(v) else 0.0) for m, v in monthly.items()}
        status = {
            m: (MetricStatus.UNAVAILABLE if m in unavailable else MetricStatus.AVAILABLE)
            for m in values
        }
        periods.append(PeriodMetrics(period_start=d, period_end=d, values=values, status=status))
    return TechnologySeries(
        technology_id="t1",
        as_of_date=as_of or dates[-1],
        periods=periods,
        coverage_start=coverage_start,
    )
