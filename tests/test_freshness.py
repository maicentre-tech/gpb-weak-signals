"""Тесты измерения свежести источника."""

from __future__ import annotations

from datetime import date

import pytest

from eti.scoring.freshness import estimate_indexing_lag, observation_lag_percentiles


def series(values: list[float], start_year: int = 2022) -> dict[date, float]:
    result: dict[date, float] = {}
    year, month = start_year, 1
    for value in values:
        result[date(year, month, 1)] = value
        month += 1
        if month > 12:
            month, year = 1, year + 1
    return result


class TestIndexingLag:
    def test_detects_underfilled_tail(self) -> None:
        """Источник с задержкой индексации: последние месяцы систематически
        ниже собственного уровня."""
        counts = series([30.0] * 30 + [20.0, 12.0, 6.0, 3.0, 1.0, 0.0])
        profile = estimate_indexing_lag(counts, as_of=date(2024, 12, 1))

        assert profile.method == "volume_profile"
        # Все шесть хвостовых месяцев ниже порога: 20/30 = 0.67 < 0.7.
        assert profile.indexing_lag_months == 6
        assert profile.baseline_volume == pytest.approx(30.0)

    def test_threshold_boundary(self) -> None:
        """Месяц ровно на пороге считается заполненным, ниже — нет."""
        at_threshold = series([30.0] * 30 + [30.0] * 5 + [21.0])
        assert estimate_indexing_lag(at_threshold, as_of=date(2024, 12, 1)).indexing_lag_months == 0

        below = series([30.0] * 30 + [30.0] * 5 + [20.0])
        assert estimate_indexing_lag(below, as_of=date(2024, 12, 1)).indexing_lag_months == 1

    def test_no_lag_when_tail_is_full(self) -> None:
        counts = series([25.0] * 36)
        profile = estimate_indexing_lag(counts, as_of=date(2024, 12, 1))
        assert profile.indexing_lag_months == 0

    def test_natural_fluctuation_not_treated_as_lag(self) -> None:
        """Колебание в пределах ±30 % не должно читаться как задержка."""
        counts = series([30.0] * 30 + [26.0, 24.0, 28.0, 25.0, 27.0, 23.0])
        profile = estimate_indexing_lag(counts, as_of=date(2024, 12, 1))
        assert profile.indexing_lag_months == 0

    def test_dip_in_middle_of_tail_does_not_extend_lag(self) -> None:
        """Провал в середине хвоста — колебание активности, а не граница
        индексации: отсчёт прерывается на первом нормальном месяце."""
        counts = series([30.0] * 30 + [30.0, 5.0, 30.0, 30.0, 8.0, 2.0])
        profile = estimate_indexing_lag(counts, as_of=date(2024, 12, 1))
        assert profile.indexing_lag_months == 2

    def test_outlier_does_not_shift_baseline(self) -> None:
        """Медиана вместо среднего: одиночный выброс не должен объявлять
        нормальные месяцы недозаполненными."""
        counts = series([30.0] * 20 + [5000.0] + [30.0] * 9 + [28.0] * 6)
        profile = estimate_indexing_lag(counts, as_of=date(2024, 12, 1))
        assert profile.baseline_volume == pytest.approx(30.0)
        assert profile.indexing_lag_months == 0

    def test_insufficient_history_is_not_confident(self) -> None:
        counts = series([10.0] * 8)
        profile = estimate_indexing_lag(counts, as_of=date(2022, 8, 1))
        assert profile.confident is False
        assert profile.method == "insufficient_history"

    def test_empty_input_handled(self) -> None:
        profile = estimate_indexing_lag({}, as_of=date(2024, 1, 1))
        assert profile.indexing_lag_months == 0.0
        assert profile.confident is False


class TestObservationLag:
    def test_percentiles(self) -> None:
        p50, p90 = observation_lag_percentiles([1, 2, 3, 4, 5, 6, 7, 8, 9, 100])
        assert p50 == pytest.approx(5.5)
        assert p90 < 100

    def test_empty_returns_none(self) -> None:
        assert observation_lag_percentiles([]) == (None, None)
