"""Признаки emerging-тренда (§24.3–24.12).

Расчёт двухфазный, и это принципиально. Формулы вида
``ResearchRaw = 0.40*norm(papers_growth) + ...`` содержат нормализацию
*внутри* взвешенной суммы, а норма требует популяции сравнимых технологий.
Поэтому:

* **Фаза A** (здесь) — сырые подкомпоненты одной технологии: чистая функция
  её собственного ряда, никакой популяции не нужно.
* **Фаза B** (``eti.scoring.pipeline``) — нормализация подкомпонентов внутри
  peer group, свёртка в композит, затем внешний ``percentile_rank``.

Разделение даёт три вещи: расчёт технологии тестируется изолированно,
нормализация честно видит всю референсную популяцию (§29.4), а результат
воспроизводим, потому что состав популяции фиксируется в ``trend_scores``.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date

from eti.config import ScoringParams
from eti.db.enums import MetricStatus, SourceFamily
from eti.scoring.normalize import safe_growth_ratio, volume_shrinkage
from eti.scoring.series import FAMILY_VOLUME_FIELD, TechnologySeries


@dataclass(slots=True)
class FeatureValue:
    """Сырое значение признака со статусом доступности."""

    raw: float | None
    status: MetricStatus = MetricStatus.AVAILABLE
    detail: dict = field(default_factory=dict)

    @classmethod
    def unavailable(cls, reason: str) -> FeatureValue:
        return cls(None, MetricStatus.UNAVAILABLE, {"reason": reason})

    @classmethod
    def insufficient(cls, reason: str) -> FeatureValue:
        return cls(None, MetricStatus.INSUFFICIENT, {"reason": reason})


# ---------------------------------------------------------------------------
# Вспомогательное
# ---------------------------------------------------------------------------


def _window_total(series: TechnologySeries, metric: str, months: int, offset: int = 0) -> float:
    periods = series.shifted_window(months, offset) if offset else series.window(months)
    return series.total(metric, periods)


def _window_covered(
    series: TechnologySeries, metric: str, months: int, offset: int = 0, min_share: float = 0.75
) -> bool:
    """Есть ли в окне данные по метрике.

    Периоды, помеченные UNAVAILABLE, — это месяцы после окончания охвата
    источника. Суммировать их как нули значит выдать недогруженный источник
    за прекратившуюся активность. Если покрыто меньше ``min_share`` окна,
    прирост по этой метрике не считается вовсе — вес уйдёт другим (§24.19).
    """
    periods = series.shifted_window(months, offset) if offset else series.window(months)
    if not periods:
        return False
    covered = sum(1 for p in periods if p.is_available(metric))
    return covered / len(periods) >= min_share


def _growth_of(
    series: TechnologySeries, metric: str, months: int, params: ScoringParams | None = None
) -> float | None:
    """ln((V_t + 1) / (V_{t-k} + 1)) — §24.4, с усадкой по объёму.

    Усадка — дополнение к ТЗ; см. ``normalize.volume_shrinkage``.
    """
    if not _window_covered(series, metric, months) or not _window_covered(
        series, metric, months, offset=months
    ):
        return None
    current = _window_total(series, metric, months)
    previous = _window_total(series, metric, months, offset=months)
    if current == 0 and previous == 0:
        return None
    raw = safe_growth_ratio(current, previous)
    if params and params.volume_shrinkage_enabled:
        raw *= volume_shrinkage(current + previous, params.volume_shrinkage_k)
    return raw


def _acceleration_of(
    series: TechnologySeries, metric: str, months: int, params: ScoringParams | None = None
) -> float | None:
    """growth_t − growth_prev — §24.5, с той же усадкой по объёму."""
    if not all(
        _window_covered(series, metric, months, offset=shift)
        for shift in (0, months, 2 * months)
    ):
        return None
    v_t = _window_total(series, metric, months)
    v_k = _window_total(series, metric, months, offset=months)
    v_2k = _window_total(series, metric, months, offset=2 * months)
    if v_t == 0 and v_k == 0 and v_2k == 0:
        return None
    raw = safe_growth_ratio(v_t, v_k) - safe_growth_ratio(v_k, v_2k)
    if params and params.volume_shrinkage_enabled:
        raw *= volume_shrinkage(v_t + v_k + v_2k, params.volume_shrinkage_k)
    return raw


# ---------------------------------------------------------------------------
# §24.3 Novelty
# ---------------------------------------------------------------------------


def first_sustained_year(series: TechnologySeries, params: ScoringParams) -> tuple[int | None, bool]:
    """Первый год устойчивого наблюдения (§24.3).

    Условие: годовой объём ≥ MIN_VOLUME **и** активность минимум в
    MIN_SOURCES семействах источников. Одиночная ранняя публикация годом
    возникновения не считается (§24.18).

    Второй элемент результата — признак левой цензуры: найденный год
    совпадает с началом покрытия источников, то есть технология могла
    существовать и раньше, но источники этого не видят (§29.3). Такой
    novelty нельзя подавать как факт.
    """
    volume_by_year: dict[int, float] = {}
    for metric in FAMILY_VOLUME_FIELD.values():
        for year, total in series.annual_totals(metric).items():
            volume_by_year[year] = volume_by_year.get(year, 0.0) + total

    families_by_year = series.families_by_year()

    for year in sorted(volume_by_year):
        enough_volume = volume_by_year[year] >= params.min_annual_volume
        enough_families = len(families_by_year.get(year, set())) >= params.min_source_families
        if enough_volume and enough_families:
            censored = bool(
                series.coverage_start and year <= series.coverage_start.year
            )
            return year, censored
    return None, False


def novelty(series: TechnologySeries, params: ScoringParams) -> FeatureValue:
    """NoveltyRaw = exp(-lambda * age_years) — §24.3.

    Для патентов возраст считается от ``priority_date``: публикация патента
    не является моментом возникновения технологии (§7.1).
    """
    year, censored = first_sustained_year(series, params)
    if year is None:
        return FeatureValue.insufficient("нет года с устойчивым наблюдением")

    age_years = max(0, series.as_of_date.year - year)
    raw = pow(2.718281828459045, -params.novelty_lambda * age_years)
    return FeatureValue(
        raw,
        MetricStatus.AVAILABLE,
        {"first_year": year, "age_years": age_years, "left_censored": censored},
    )


# ---------------------------------------------------------------------------
# §24.4 Growth / §24.5 Acceleration
# ---------------------------------------------------------------------------


def growth(series: TechnologySeries, params: ScoringParams) -> FeatureValue:
    """Взвешенное среднее логарифмических приростов по семействам (§24.4)."""
    months = params.dynamics_window_months // 3 or 1
    contributions: dict[str, float] = {}
    weights: dict[str, float] = {}

    for family, metric in FAMILY_VOLUME_FIELD.items():
        value = _growth_of(series, metric, months, params)
        if value is None:
            continue
        weight = params.source_weights.get(_weight_key(family), 1.0)
        contributions[metric] = value
        weights[metric] = weight

    if not contributions:
        return FeatureValue.insufficient("нет непустых рядов объёма")

    total_weight = sum(weights.values())
    raw = sum(contributions[m] * weights[m] for m in contributions) / total_weight
    return FeatureValue(raw, MetricStatus.AVAILABLE, {"components": contributions})


def acceleration(series: TechnologySeries, params: ScoringParams) -> FeatureValue:
    """Изменение скорости роста — ключевой ранний сигнал (§24.5).

    Считается на скользящих окнах; §24.5 дополнительно рекомендует
    проверять статистическую значимость изменения наклона — это делается
    в ``pipeline`` после накопления популяции.
    """
    months = params.dynamics_window_months // 3 or 1
    contributions: dict[str, float] = {}
    weights: dict[str, float] = {}

    for family, metric in FAMILY_VOLUME_FIELD.items():
        value = _acceleration_of(series, metric, months, params)
        if value is None:
            continue
        weight = params.source_weights.get(_weight_key(family), 1.0)
        contributions[metric] = value
        weights[metric] = weight

    if not contributions:
        return FeatureValue.insufficient("недостаточно истории для ускорения")

    total_weight = sum(weights.values())
    raw = sum(contributions[m] * weights[m] for m in contributions) / total_weight
    return FeatureValue(raw, MetricStatus.AVAILABLE, {"components": contributions})


def _weight_key(family: SourceFamily) -> str:
    """Семейство → ключ в ``source_weights`` (§24.17)."""
    if family is SourceFamily.PATENTS:
        return "patent_priority"
    return str(family)


# ---------------------------------------------------------------------------
# Композитные momentum-признаки (§24.6–24.10)
# ---------------------------------------------------------------------------

RESEARCH_COMPONENTS = {
    "papers_growth": ("papers", 0.40),
    "preprints_growth": ("preprints", 0.25),
    "unique_authors_growth": ("unique_authors", 0.20),
    "unique_institutions_growth": ("unique_institutions", 0.15),
}

PATENT_COMPONENTS = {
    "priority_families_growth": ("patent_families", 0.35),
    "unique_applicants_growth": ("patent_applicants", 0.25),
    "cpc_diversity_growth": ("cpc_diversity", 0.20),
    "patent_citations_growth": ("patent_citations", 0.20),
}

MARKET_COMPONENTS = {
    "company_mentions_growth": ("company_mentions", 0.30),
    "product_events_growth": ("product_events", 0.20),
    "funding_signal_growth": ("funding_events", 0.20),
    "news_mentions_growth": ("news_mentions", 0.15),
    "company_count_growth": ("companies", 0.15),
}

ADOPTION_COMPONENTS = {
    "repo_growth": ("github_repos", 0.30),
    "stars_growth": ("github_stars", 0.20),
    "contributors_growth": ("github_contributors", 0.20),
    "release_activity_growth": ("github_releases", 0.15),
    "download_growth": ("package_downloads", 0.15),
}


def composite_components(
    series: TechnologySeries, spec: dict[str, tuple[str, float]], params: ScoringParams
) -> dict[str, float]:
    """Сырые подкомпоненты композитного признака.

    Отсутствующий подкомпонент не попадает в результат — и именно поэтому
    его вес будет перераспределён в фазе B, а не заменён нулём (§24.19).
    Это важнее, чем кажется: подстановка нуля систематически занижает
    score технологий, по которым источник просто не подключён.
    """
    months = params.dynamics_window_months // 3 or 1
    result: dict[str, float] = {}
    for component_name, (metric, _weight) in spec.items():
        value = _growth_of(series, metric, months, params)
        if value is not None:
            result[component_name] = value
    return result


def citation_momentum(series: TechnologySeries, params: ScoringParams) -> FeatureValue:
    """§24.8: скорость цитирования с поправкой на возраст и область.

    Абсолютное число цитирований без нормировки бесполезно — статья 2015
    года почти всегда обгонит статью 2025-го. Здесь считается velocity;
    нормировка по медиане области выполняется в фазе B.
    """
    months = params.dynamics_window_months
    periods = series.window(months)
    if not periods:
        return FeatureValue.insufficient("пустое окно")

    citations = series.total("citations", periods)
    if citations == 0:
        statuses = series.metric_availability()
        if statuses.get("citations") is not MetricStatus.AVAILABLE:
            return FeatureValue.unavailable("источник цитирований не подключён")

    papers = series.total("papers", periods) + series.total("preprints", periods)
    if papers == 0:
        return FeatureValue.insufficient("нет публикаций в окне")

    age_months = max(1, len(periods))
    velocity = citations / papers / age_months
    return FeatureValue(
        velocity,
        MetricStatus.AVAILABLE,
        {"citations": citations, "papers": papers, "age_months": age_months},
    )


def cross_domain(series: TechnologySeries, params: ScoringParams) -> FeatureValue:
    """§24.11: доля семейств источников с устойчивым сигналом.

    Единственный признак, который сразу даёт шкалу 0–100 без percentile:
    CrossDomainScore = 100 * active / total. Защищает от узкого
    академического всплеска.
    """
    periods = series.window(params.dynamics_window_months)
    if not periods:
        return FeatureValue.insufficient("пустое окно")

    active: set[SourceFamily] = set()
    for period in periods:
        active |= series.active_families(period)

    total_families = len(FAMILY_VOLUME_FIELD)
    raw = len(active) / total_families
    return FeatureValue(
        raw,
        MetricStatus.AVAILABLE,
        {"active_families": sorted(str(f) for f in active), "total": total_families},
    )


def maturity(series: TechnologySeries, params: ScoringParams) -> dict[str, float]:
    """Подкомпоненты зрелости (§24.12).

    Возраст сам по себе не исключает технологию: §8 прямо запрещает
    отбрасывать всё старше 7 лет, потому что так теряется долгий, но резко
    ускорившийся цикл. Поэтому в составе — насыщение, коммерциализация и
    обратное ускорение, а не только возраст.
    """
    months = params.dynamics_window_months
    periods = series.window(months)
    components: dict[str, float] = {}

    year, _ = first_sustained_year(series, params)
    if year is not None:
        components["age"] = float(series.as_of_date.year - year)

    volumes = [
        sum(p.get(m) for m in FAMILY_VOLUME_FIELD.values()) for p in periods
    ]
    if len(volumes) >= 4:
        half = len(volumes) // 2
        early, late = sum(volumes[:half]), sum(volumes[half:])
        # Насыщение: поздняя половина окна перестала расти относительно ранней.
        components["saturation"] = late / (early + late) if (early + late) > 0 else 0.0

    commercial = series.total("companies", periods) + series.total("news_mentions", periods)
    if commercial > 0:
        components["commercialization"] = commercial

    adoption = series.total("github_repos", periods)
    if adoption > 0:
        components["adoption"] = adoption

    accel = acceleration(series, params)
    if accel.raw is not None:
        components["inverse_acceleration"] = -accel.raw

    return components


def maturity_stage(score: float) -> str:
    """Границы §24.12 — HYPOTHESIS, калибруются на экспертной выборке."""
    if score < 20:
        return "Nascent"
    if score < 40:
        return "Emerging"
    if score < 60:
        return "Growth"
    if score < 80:
        return "Mainstream"
    return "Mature"


def compute_raw_features(
    series: TechnologySeries, params: ScoringParams
) -> dict[str, FeatureValue | dict[str, float]]:
    """Все сырые признаки одной технологии (фаза A)."""
    return {
        "novelty": novelty(series, params),
        "growth": growth(series, params),
        "acceleration": acceleration(series, params),
        "citation": citation_momentum(series, params),
        "cross_domain": cross_domain(series, params),
        "research_components": composite_components(series, RESEARCH_COMPONENTS, params),
        "patent_components": composite_components(series, PATENT_COMPONENTS, params),
        "market_components": composite_components(series, MARKET_COMPONENTS, params),
        "adoption_components": composite_components(series, ADOPTION_COMPONENTS, params),
        "maturity_components": maturity(series, params),
    }


__all__ = [
    "ADOPTION_COMPONENTS",
    "MARKET_COMPONENTS",
    "PATENT_COMPONENTS",
    "RESEARCH_COMPONENTS",
    "FeatureValue",
    "acceleration",
    "citation_momentum",
    "composite_components",
    "compute_raw_features",
    "cross_domain",
    "first_sustained_year",
    "growth",
    "maturity",
    "maturity_stage",
    "novelty",
]
