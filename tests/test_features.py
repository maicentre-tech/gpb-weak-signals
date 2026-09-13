"""Тесты признаков — §24.3–24.12."""

from __future__ import annotations

from datetime import date

import pytest

from eti.db.enums import MetricStatus
from eti.scoring.features import (
    acceleration,
    cross_domain,
    first_sustained_year,
    growth,
    maturity_stage,
    novelty,
)
from tests.conftest import make_series


class TestFirstSustainedYear:
    def test_ignores_single_early_publication(self) -> None:
        """§24.3: годом возникновения считается первое *устойчивое*
        наблюдение, а не первая случайная публикация."""
        series = make_series(
            {
                "papers": [1] + [0] * 23 + [3] * 12,
                "preprints": [0] * 24 + [3] * 12,
            },
            start_year=2020,
        )
        year, _ = first_sustained_year(series, _params())
        assert year == 2022

    def test_requires_two_source_families(self) -> None:
        """Объёма мало: нужен сигнал минимум в двух семействах (§24.3)."""
        only_papers = make_series({"papers": [10] * 24}, start_year=2020)
        year, _ = first_sustained_year(only_papers, _params())
        assert year is None

        with_preprints = make_series(
            {"papers": [10] * 24, "preprints": [4] * 24}, start_year=2020
        )
        year, _ = first_sustained_year(with_preprints, _params())
        assert year == 2020

    def test_flags_left_censoring_at_coverage_boundary(self) -> None:
        """§29.3: ряд, начинающийся на границе покрытия источника, не
        доказывает, что технология тогда и появилась."""
        series = make_series(
            {"papers": [5] * 12, "preprints": [5] * 12},
            start_year=2020,
            coverage_start=date(2020, 1, 1),
        )
        year, censored = first_sustained_year(series, _params())
        assert year == 2020
        assert censored is True

    def test_no_censoring_when_coverage_starts_earlier(self) -> None:
        series = make_series(
            {"papers": [0] * 12 + [5] * 12, "preprints": [0] * 12 + [5] * 12},
            start_year=2020,
            coverage_start=date(2015, 1, 1),
        )
        year, censored = first_sustained_year(series, _params())
        assert year == 2021
        assert censored is False


class TestNovelty:
    def test_recent_technology_scores_higher(self) -> None:
        recent = make_series(
            {"papers": [0] * 24 + [8] * 12, "preprints": [0] * 24 + [8] * 12},
            start_year=2020,
        )
        old = make_series(
            {"papers": [8] * 36, "preprints": [8] * 36}, start_year=2020
        )
        assert novelty(recent, _params()).raw > novelty(old, _params()).raw

    def test_insufficient_when_no_sustained_year(self) -> None:
        series = make_series({"papers": [1] * 12}, start_year=2020)
        result = novelty(series, _params())
        assert result.raw is None
        assert result.status is MetricStatus.INSUFFICIENT


class TestGrowth:
    def test_rising_series_is_positive(self) -> None:
        series = make_series(
            {"papers": [5] * 12 + [50] * 12, "preprints": [5] * 12 + [50] * 12},
            start_year=2022,
        )
        assert growth(series, _params()).raw > 0

    def test_declining_series_is_negative(self) -> None:
        series = make_series(
            {"papers": [50] * 12 + [5] * 12, "preprints": [50] * 12 + [5] * 12},
            start_year=2022,
        )
        assert growth(series, _params()).raw < 0

    def test_empty_series_is_insufficient_not_zero(self) -> None:
        series = make_series({"papers": [0] * 24}, start_year=2022)
        result = growth(series, _params())
        assert result.raw is None
        assert result.status is MetricStatus.INSUFFICIENT


class TestAcceleration:
    def test_accelerating_series_positive(self) -> None:
        """Ускорение: прирост во втором окне больше, чем в первом."""
        series = make_series(
            {"papers": [10] * 12 + [20] * 12 + [80] * 12}, start_year=2021
        )
        assert acceleration(series, _params()).raw > 0

    def test_decelerating_series_negative(self) -> None:
        series = make_series(
            {"papers": [10] * 12 + [80] * 12 + [90] * 12}, start_year=2021
        )
        assert acceleration(series, _params()).raw < 0


class TestCrossDomain:
    def test_counts_active_families(self) -> None:
        """§24.11: защищает от узкого академического всплеска."""
        narrow = make_series({"papers": [20] * 12}, start_year=2023)
        broad = make_series(
            {
                "papers": [20] * 12,
                "preprints": [10] * 12,
                "patent_families": [5] * 12,
                "github_repos": [7] * 12,
            },
            start_year=2023,
        )
        assert cross_domain(narrow, _params()).raw < cross_domain(broad, _params()).raw

    def test_scale_is_share_of_seven_families(self) -> None:
        series = make_series({"papers": [20] * 12}, start_year=2023)
        assert cross_domain(series, _params()).raw == pytest.approx(1 / 7)


class TestMaturityStage:
    @pytest.mark.parametrize(
        ("score", "expected"),
        [(5, "Nascent"), (25, "Emerging"), (55, "Growth"), (75, "Mainstream"), (95, "Mature")],
    )
    def test_boundaries(self, score: float, expected: str) -> None:
        assert maturity_stage(score) == expected


def _params():
    from eti.config import ScoringParams

    return ScoringParams()
