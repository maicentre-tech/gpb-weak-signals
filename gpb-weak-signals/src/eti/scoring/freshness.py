"""Измерение профиля свежести источника.

Деление источников на «быстрые» и «медленные» — ярлык, а не свойство.
Здесь оно заменяется двумя измеряемыми величинами.

**Indexing lag** — сколько последних месяцев источник ещё недозаполнил.
Оценивается по форме хвоста помесячных объёмов: у источника с задержкой
индексации последние месяцы систематически ниже собственного исторического
уровня, и это видно в уже загруженных данных, без накопления истории.

**Observation lag** — сколько проходит между событием и моментом, когда мы
его увидели. Измеряется только на инкрементальных загрузках: при
историческом backfill разница между ``published_at`` и ``first_seen_at``
показывает дату запуска проекта, а не поведение источника.

Обе величины версионируются и пересчитываются регламентом, а не
задаются константой в коде.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date

import numpy as np

MAX_LAG_MONTHS = 12
"""Верхняя граница оценки. Источник, отставший больше чем на год,
диагностируется как остановленный, а не как медленный."""

MIN_BASELINE_MONTHS = 12
"""Меньше года истории — оценивать хвост не по чему."""

TAIL_THRESHOLD = 0.7
"""Доля от базового уровня, ниже которой месяц считается недозаполненным.
0.7 выбрано консервативно: естественные колебания объёма публикаций в
пределах ±30 % не должны читаться как задержка индексации."""


@dataclass
class FreshnessProfile:
    indexing_lag_months: float
    method: str
    baseline_volume: float
    tail_profile: list[float]
    sample_months: int
    confident: bool
    note: str = ""


def estimate_indexing_lag(
    monthly_counts: dict[date, float],
    *,
    as_of: date,
    threshold: float = TAIL_THRESHOLD,
    max_lag: int = MAX_LAG_MONTHS,
) -> FreshnessProfile:
    """Оценка задержки индексации по форме хвоста помесячных объёмов.

    Базовый уровень берётся как медиана месяцев, заведомо не затронутых
    задержкой — то есть более старых, чем максимальная допустимая
    задержка. Затем от самого свежего месяца назад считаются подряд идущие
    месяцы ниже порога.

    Медиана, а не среднее: у объёмов публикаций тяжёлый хвост, и одиночный
    выброс сдвинул бы базу настолько, что нормальные месяцы попали бы в
    «недозаполненные».
    """
    if not monthly_counts:
        return FreshnessProfile(0.0, "no_data", 0.0, [], 0, False, "нет данных")

    months = sorted(m for m in monthly_counts if m <= as_of)
    if len(months) < MIN_BASELINE_MONTHS + max_lag:
        return FreshnessProfile(
            0.0,
            "insufficient_history",
            0.0,
            [],
            len(months),
            False,
            f"истории {len(months)} мес, нужно минимум {MIN_BASELINE_MONTHS + max_lag}",
        )

    baseline_months = months[: -max_lag]
    baseline_values = [monthly_counts[m] for m in baseline_months]
    baseline = float(np.median(baseline_values))
    if baseline <= 0:
        return FreshnessProfile(
            0.0, "zero_baseline", 0.0, [], len(months), False, "базовый уровень нулевой"
        )

    tail_months = months[-max_lag:]
    tail = [monthly_counts[m] / baseline for m in tail_months]

    # Идём от самого свежего месяца назад, пока месяцы недозаполнены.
    # Прерываемся на первом нормальном: провал в середине хвоста — это
    # колебание активности, а не граница индексации.
    lag = 0
    for ratio in reversed(tail):
        if ratio < threshold:
            lag += 1
        else:
            break

    return FreshnessProfile(
        indexing_lag_months=float(lag),
        method="volume_profile",
        baseline_volume=baseline,
        tail_profile=[round(r, 3) for r in tail],
        sample_months=len(months),
        confident=True,
        note=(
            f"базовый уровень {baseline:.1f} док/мес, "
            f"недозаполнено последних месяцев: {lag}"
        ),
    )


def observation_lag_percentiles(lags_days: list[float]) -> tuple[float | None, float | None]:
    """Медиана и 90-й перцентиль задержки наблюдения.

    p90, а не максимум: единичная запись, доехавшая через два года,
    характеризует не источник, а сам этот документ.
    """
    if not lags_days:
        return None, None
    array = np.asarray(lags_days, dtype=float)
    return float(np.percentile(array, 50)), float(np.percentile(array, 90))
