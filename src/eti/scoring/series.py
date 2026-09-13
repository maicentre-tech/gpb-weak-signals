"""Временные ряды метрик технологии.

Слой между таблицей ``technology_metrics`` и формулами §24: даёт окна,
агрегаты по годам и проверку достаточности данных. Все выборки — с учётом
``as_of_date``, чтобы point-in-time правило ADR-008 соблюдалось на уровне
данных, а не на уровне договорённости.
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass, field
from datetime import date

from eti.db.enums import MetricStatus, SourceFamily

FAMILY_VOLUME_FIELD: dict[SourceFamily, str] = {
    SourceFamily.RESEARCH: "papers",
    SourceFamily.PREPRINTS: "preprints",
    SourceFamily.PATENTS: "patent_families",
    SourceFamily.RD: "rd_projects",
    SourceFamily.OPEN_SOURCE: "github_repos",
    SourceFamily.COMPANIES: "companies",
    SourceFamily.WEB_NEWS: "news_mentions",
}
"""§24.11: какое поле метрик представляет активность каждого семейства."""


@dataclass(slots=True)
class PeriodMetrics:
    period_start: date
    period_end: date
    values: dict[str, float] = field(default_factory=dict)
    status: dict[str, MetricStatus] = field(default_factory=dict)

    def get(self, name: str, default: float = 0.0) -> float:
        return self.values.get(name, default)

    def is_available(self, name: str) -> bool:
        return self.status.get(name, MetricStatus.AVAILABLE) is MetricStatus.AVAILABLE


@dataclass(slots=True)
class TechnologySeries:
    """Ряд помесячных агрегатов одной технологии, отсортированный по времени."""

    technology_id: str
    as_of_date: date
    periods: list[PeriodMetrics]
    peer_group_id: str | None = None
    coverage_start: date | None = None
    """Минимальная дата, с которой источники вообще что-то видят (§29.3).
    Ряд, начинающийся ровно на этой дате, считается левоцензурированным:
    утверждать, что технология появилась именно тогда, нельзя."""

    indexing_lag_months: int = 0
    """Правая цензура: последние месяцы недоиндексированы источником.

    Дополнение к ТЗ — см. ``ScoringParams.indexing_lag_months``. Все окна
    заканчиваются на ``effective_end``, а не на ``as_of_date``, иначе
    задержка индексации читается как спад активности."""

    def __post_init__(self) -> None:
        self.periods.sort(key=lambda p: p.period_start)

    @property
    def effective_end(self) -> date:
        """Конец достоверной части ряда."""
        if self.indexing_lag_months <= 0:
            return self.as_of_date
        year, month = self.as_of_date.year, self.as_of_date.month - self.indexing_lag_months
        while month <= 0:
            month += 12
            year -= 1
        return date(year, month, 1)

    # -- Окна -------------------------------------------------------------

    def window(self, months: int, end: date | None = None) -> list[PeriodMetrics]:
        """Последние ``months`` периодов, заканчивающихся не позже ``end``."""
        end = end or self.effective_end
        eligible = [p for p in self.periods if p.period_start <= end]
        return eligible[-months:] if months > 0 else eligible

    def shifted_window(self, months: int, offset_months: int) -> list[PeriodMetrics]:
        """Окно той же длины, сдвинутое назад на ``offset_months``.

        Нужно для acceleration: сравниваются growth текущего окна и growth
        предыдущего окна той же длины (§24.5).
        """
        eligible = [p for p in self.periods if p.period_start <= self.effective_end]
        end_index = len(eligible) - offset_months
        start_index = max(0, end_index - months)
        return eligible[start_index : max(start_index, end_index)]

    # -- Агрегаты ---------------------------------------------------------

    def total(self, metric: str, periods: Sequence[PeriodMetrics] | None = None) -> float:
        target = periods if periods is not None else self.periods
        return float(sum(p.get(metric) for p in target))

    def annual_totals(self, metric: str) -> dict[int, float]:
        totals: dict[int, float] = {}
        for period in self.periods:
            if period.period_start > self.effective_end:
                continue
            totals[period.period_start.year] = (
                totals.get(period.period_start.year, 0.0) + period.get(metric)
            )
        return totals

    def active_families(self, period: PeriodMetrics, threshold: float = 1.0) -> set[SourceFamily]:
        """Семейства источников с устойчивым сигналом в периоде (§24.11)."""
        return {
            family
            for family, metric in FAMILY_VOLUME_FIELD.items()
            if period.is_available(metric) and period.get(metric) >= threshold
        }

    def families_by_year(self, threshold: float = 1.0) -> dict[int, set[SourceFamily]]:
        result: dict[int, set[SourceFamily]] = {}
        for period in self.periods:
            if period.period_start > self.effective_end:
                continue
            year = period.period_start.year
            result.setdefault(year, set()).update(self.active_families(period, threshold))
        return result

    def metric_availability(self) -> dict[str, MetricStatus]:
        """Сводный статус метрики по ряду.

        Метрика доступна, если хотя бы в одном периоде окна источник её
        отдавал. Полностью отсутствующая метрика помечается UNAVAILABLE и
        её вес перераспределяется (§24.19) — но не подменяется нулём.
        """
        names = {name for period in self.periods for name in period.values}
        result: dict[str, MetricStatus] = {}
        for name in names:
            statuses = [p.status.get(name, MetricStatus.AVAILABLE) for p in self.periods]
            if any(s is MetricStatus.AVAILABLE for s in statuses):
                result[name] = MetricStatus.AVAILABLE
            elif any(s is MetricStatus.INSUFFICIENT for s in statuses):
                result[name] = MetricStatus.INSUFFICIENT
            else:
                result[name] = MetricStatus.UNAVAILABLE
        return result
