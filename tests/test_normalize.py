"""Тесты нормализации — §24.1, §24.19."""

from __future__ import annotations

import pytest

from eti.db.enums import MetricStatus
from eti.scoring.normalize import (
    PeerNormalizer,
    missingness_penalty,
    percentile_rank,
    redistribute_weights,
    robust_z,
    safe_growth_ratio,
    volume_shrinkage,
    weighted_score,
)


class TestPercentileRank:
    def test_median_of_uniform_population(self) -> None:
        assert percentile_rank(5, list(range(11))) == pytest.approx(0.5)

    def test_ties_counted_at_half(self) -> None:
        """Разреженный сигнал: если у 80 % технологий патентов нет,
        нулевое значение не должно давать перцентиль 0.8."""
        population = [0.0] * 8 + [5.0, 9.0]
        assert percentile_rank(0.0, population) == pytest.approx(0.4)

    def test_empty_population_is_zero_not_error(self) -> None:
        assert percentile_rank(1.0, []) == 0.0


class TestRobustZ:
    def test_outlier_does_not_collapse_scale(self) -> None:
        """MAD вместо стандартного отклонения: выброс 1000 не должен
        сжимать шкалу так, чтобы остальные значения слиплись у нуля.
        При обычном z-score здесь получилось бы ~0.004."""
        population = [1, 2, 3, 4, 5, 1000]
        assert robust_z(5, population) > 0.5

    def test_extreme_value_is_clipped(self) -> None:
        assert robust_z(1000, [1, 2, 3, 4, 5, 1000]) == pytest.approx(3.0)

    def test_zero_mad_returns_zero(self) -> None:
        assert robust_z(7, [7, 7, 7]) == 0.0


class TestWeightRedistribution:
    def test_missing_metric_redistributes_weight(self) -> None:
        weights = {"a": 0.5, "b": 0.3, "c": 0.2}
        statuses = {"c": MetricStatus.UNAVAILABLE}
        effective = redistribute_weights(weights, statuses)

        assert set(effective) == {"a", "b"}
        assert sum(effective.values()) == pytest.approx(1.0)
        # Пропорция между доступными сохраняется: 0.5/0.3 == 0.625/0.375
        assert effective["a"] / effective["b"] == pytest.approx(0.5 / 0.3)

    def test_all_missing_returns_empty_not_zeros(self) -> None:
        """Отсутствие всех компонентов — это не score=0, это отсутствие
        результата (§24.19)."""
        weights = {"a": 1.0}
        statuses = {"a": MetricStatus.UNAVAILABLE}
        assert redistribute_weights(weights, statuses) == {}

    def test_weighted_score_returns_none_when_nothing_available(self) -> None:
        score, effective = weighted_score(
            {"a": 50.0}, {"a": 1.0}, {"a": MetricStatus.UNAVAILABLE}
        )
        assert score is None
        assert effective == {}

    def test_missing_metric_does_not_drag_score_to_zero(self) -> None:
        """Ключевое свойство §24.19: недоступная метрика не штрафует score,
        а исключается из расчёта."""
        components = {"a": 80.0, "b": 80.0, "c": 0.0}
        weights = {"a": 0.4, "b": 0.4, "c": 0.2}

        with_zero, _ = weighted_score(components, weights, {})
        with_missing, _ = weighted_score(
            components, weights, {"c": MetricStatus.UNAVAILABLE}
        )

        assert with_zero == pytest.approx(64.0)
        assert with_missing == pytest.approx(80.0)


class TestMissingnessPenalty:
    def test_penalty_equals_lost_weight_share(self) -> None:
        weights = {"a": 0.6, "b": 0.4}
        penalty = missingness_penalty(weights, {"b": MetricStatus.UNAVAILABLE})
        assert penalty == pytest.approx(0.4)

    def test_no_penalty_when_all_available(self) -> None:
        assert missingness_penalty({"a": 1.0}, {}) == 0.0


class TestPeerNormalizer:
    def test_falls_back_to_parent_when_group_too_small(self) -> None:
        """§29.4: percentile по 5 объектам статистически бессмыслен."""
        normalizer = PeerNormalizer(
            populations={"narrow": [1, 2, 3, 4, 5], "wide": list(range(100))},
            parents={"narrow": "wide"},
            min_population=30,
        )
        _, used_group, size = normalizer.normalize(50.0, "narrow")

        assert used_group == "wide"
        assert size == 100

    def test_uses_own_group_when_large_enough(self) -> None:
        normalizer = PeerNormalizer(
            populations={"big": list(range(50))}, parents={}, min_population=30
        )
        _, used_group, size = normalizer.normalize(25.0, "big")

        assert used_group == "big"
        assert size == 50

    def test_cycle_in_taxonomy_does_not_hang(self) -> None:
        normalizer = PeerNormalizer(
            populations={"a": [1], "b": [2]},
            parents={"a": "b", "b": "a"},
            min_population=30,
        )
        _, used_group, _ = normalizer.normalize(1.0, "a")
        assert used_group is None


class TestGrowthRatio:
    def test_eps_alone_does_not_dampen_small_samples(self) -> None:
        """Документирует дефект формулы §24.4.

        eps=1 не защищает от малых чисел: рост 0 → 3 документа даёт больший
        growth, чем рост 3 000 → 10 000. Это противоречит §24.18, который
        требует не считать трендом одиночный всплеск. Тест фиксирует
        поведение as-is — исправление вынесено в volume_shrinkage."""
        assert safe_growth_ratio(3, 0) > safe_growth_ratio(10_000, 3_000)

    def test_symmetric_decline(self) -> None:
        assert safe_growth_ratio(0, 2) == pytest.approx(-safe_growth_ratio(2, 0))


class TestVolumeShrinkage:
    """Дополнение к §24.4, закрывающее дефект выше."""

    def test_small_sample_is_shrunk_below_large_one(self) -> None:
        small = safe_growth_ratio(3, 0) * volume_shrinkage(3, 5)
        large = safe_growth_ratio(10_000, 3_000) * volume_shrinkage(13_000, 5)
        assert small < large

    def test_large_sample_practically_unchanged(self) -> None:
        assert volume_shrinkage(10_000, 5) == pytest.approx(1.0, abs=1e-3)

    def test_disabled_by_zero_k(self) -> None:
        assert volume_shrinkage(3, 0) == 1.0

    def test_monotonic_in_volume(self) -> None:
        values = [volume_shrinkage(n, 5) for n in (1, 5, 20, 100, 1000)]
        assert values == sorted(values)
