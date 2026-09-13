"""Нормализация исходных показателей (§24.1, §24.2, §24.18, §24.19).

Три правила, ради которых существует этот модуль:

1. **Тяжёлые хвосты.** Сырые счётчики публикаций/цитирований распределены
   степенным образом. Без log1p + percentile одна крупная область
   (например, ИИ) полностью доминирует score (§24.1).
2. **Сопоставимость.** 1 000 публикаций в ИИ и 1 000 в квантовой физике —
   не одинаковая интенсивность сигнала. Нормализация выполняется внутри
   peer group из внешней таксономии, а не по всей выборке (§24.2, §29.4).
3. **missing ≠ zero.** Недоступная метрика не превращается в ноль; её вес
   перераспределяется между доступными, а confidence снижается (§24.19).
"""

from __future__ import annotations

import math
from collections.abc import Iterable, Mapping, Sequence

import numpy as np

from eti.db.enums import MetricStatus

MIN_REFERENCE_POPULATION = 30
"""Ниже этого размера percentile_rank статистически неустойчив: перестановка
двух объектов двигает score на единицы пунктов. §29.4 требует fallback на
родительский уровень таксономии."""


def log1p(value: float) -> float:
    """ln(1 + x). Для отрицательных значений (например, отрицательного
    ускорения) применяется симметрично, иначе знак терялся бы."""
    if value >= 0:
        return math.log1p(value)
    return -math.log1p(-value)


def winsorize(values: Sequence[float], lower_pct: float = 1.0, upper_pct: float = 99.0) -> np.ndarray:
    """Обрезка экстремумов по перцентилям (§24.18)."""
    arr = np.asarray(values, dtype=float)
    if arr.size == 0:
        return arr
    lo, hi = np.nanpercentile(arr, [lower_pct, upper_pct])
    return np.clip(arr, lo, hi)


def robust_z(value: float, population: Sequence[float], clip: float = 3.0) -> float:
    """z_norm(x) = clip((x - median) / MAD, -3, 3) из §24.1.

    MAD вместо стандартного отклонения — выбросы не должны сжимать шкалу
    для всех остальных.
    """
    arr = np.asarray(population, dtype=float)
    arr = arr[~np.isnan(arr)]
    if arr.size == 0:
        return 0.0
    median = float(np.median(arr))
    mad = float(np.median(np.abs(arr - median)))
    if mad == 0:
        return 0.0
    # 1.4826 приводит MAD к сопоставимости со стандартным отклонением
    # для нормального распределения.
    return float(np.clip((value - median) / (1.4826 * mad), -clip, clip))


def percentile_rank(value: float, population: Sequence[float]) -> float:
    """Доля популяции ниже значения, с половинным учётом равных (0..1).

    Половинный учёт связей важен для разреженных сигналов: если у 80 %
    технологий патентов нет вообще, то нулевое значение не должно давать
    перцентиль 0.8 — оно даёт 0.4.
    """
    arr = np.asarray(population, dtype=float)
    arr = arr[~np.isnan(arr)]
    if arr.size == 0:
        return 0.0
    below = float(np.sum(arr < value))
    equal = float(np.sum(arr == value))
    return (below + 0.5 * equal) / arr.size


def score_0_100(value: float, population: Sequence[float]) -> float:
    """score_0_100(x) = 100 * percentile_rank(x) из §24.1."""
    return 100.0 * percentile_rank(value, population)


class PeerNormalizer:
    """Нормализация внутри peer group с fallback на родительский уровень.

    Хранит референсные популяции по уровням таксономии. Если на нижнем
    уровне выборка меньше ``min_population``, используется родительский
    (§29.4). Фактически использованный уровень возвращается вместе со
    score — он обязан попасть в ``trend_scores`` для воспроизводимости.
    """

    def __init__(
        self,
        populations: Mapping[str, Sequence[float]],
        parents: Mapping[str, str | None] | None = None,
        min_population: int = MIN_REFERENCE_POPULATION,
    ) -> None:
        self._populations = {k: np.asarray(v, dtype=float) for k, v in populations.items()}
        self._parents = dict(parents or {})
        self.min_population = min_population

    def resolve_group(self, peer_group_id: str) -> tuple[str | None, np.ndarray]:
        """Поднимается по таксономии до группы достаточного размера."""
        seen: set[str] = set()
        current: str | None = peer_group_id
        while current and current not in seen:
            seen.add(current)
            population = self._populations.get(current)
            if population is not None and population.size >= self.min_population:
                return current, population
            current = self._parents.get(current)
        # Ничего подходящего — глобальная популяция как последний рубеж.
        if self._populations:
            merged = np.concatenate(list(self._populations.values()))
            return None, merged
        return None, np.asarray([], dtype=float)

    def normalize(self, value: float, peer_group_id: str) -> tuple[float, str | None, int]:
        """Возвращает (score 0..100, фактический peer_group_id, размер выборки)."""
        used_group, population = self.resolve_group(peer_group_id)
        return score_0_100(value, population), used_group, int(population.size)


def redistribute_weights(
    weights: Mapping[str, float], statuses: Mapping[str, MetricStatus | str]
) -> dict[str, float]:
    """§24.19: вес недоступной метрики распределяется между доступными.

        effective_weight_i = w_i / sum(w_available)

    Возвращает веса, суммирующиеся к 1.0 по доступным компонентам. Если
    доступных нет — пустой словарь: считать ETS не из чего, и вызывающий
    код обязан это обработать, а не получить ноль.
    """
    available = {
        key: weight
        for key, weight in weights.items()
        if str(statuses.get(key, MetricStatus.AVAILABLE)) == str(MetricStatus.AVAILABLE)
    }
    total = sum(available.values())
    if total <= 0:
        return {}
    return {key: weight / total for key, weight in available.items()}


def weighted_score(
    components: Mapping[str, float],
    weights: Mapping[str, float],
    statuses: Mapping[str, MetricStatus | str] | None = None,
) -> tuple[float | None, dict[str, float]]:
    """Взвешенная сумма с перераспределением весов.

    Возвращает (score, фактические веса). ``None`` — когда ни одного
    доступного компонента: это не ноль, это отсутствие результата.
    """
    statuses = statuses or {}
    effective = redistribute_weights(weights, statuses)
    if not effective:
        return None, {}
    total = sum(effective[key] * components.get(key, 0.0) for key in effective)
    return total, effective


def missingness_penalty(
    weights: Mapping[str, float], statuses: Mapping[str, MetricStatus | str]
) -> float:
    """Доля веса, потерянная из-за недоступных метрик (0..1).

    Используется для снижения EvidenceConfidence: результат, собранный из
    половины сигналов, не может иметь ту же уверенность, что полный (§24.19).
    """
    total = sum(weights.values())
    if total <= 0:
        return 0.0
    missing = sum(
        weight
        for key, weight in weights.items()
        if str(statuses.get(key, MetricStatus.AVAILABLE)) != str(MetricStatus.AVAILABLE)
    )
    return missing / total


def safe_growth_ratio(current: float, previous: float, eps: float = 1.0) -> float:
    """ln((V_t + eps) / (V_t-k + eps)) из §24.4.

    eps = 1 не даёт делению на ноль взорваться на малых объёмах и
    одновременно гасит всплески вида 0 → 2 документа, которые §24.18
    запрещает считать трендом.
    """
    return math.log((current + eps) / (previous + eps))


def volume_shrinkage(volume: float, k: float) -> float:
    """Множитель усадки прироста для малых выборок: n / (n + k).

    **Дополнение к ТЗ, не описанное в §24.4.** Формула §24.4 с eps=1 не
    защищает от малых чисел: рост 0 → 3 документа даёт growth 1.386, что
    больше, чем рост 3 000 → 10 000 (1.204). §24.18 требует «не считать
    трендом одиночный всплеск из 1–2 документов», но единственный механизм
    в ТЗ — бинарный порог MIN_ACTIVITY на этапе отбора (§24.20), который
    не исправляет искажение ранжирования среди прошедших порог кандидатов.

    Усадка к нулю пропорционально объёму решает это непрерывно: при k = 5
    выборка из 3 объектов сохраняет 37 % своего прироста, из 100 — 95 %.

    Параметр включается/выключается через ``ScoringParams`` и входит в
    ``scoring_version``: при калибровке его влияние должно проверяться
    отдельно от весов ETS.
    """
    if k <= 0:
        return 1.0
    return volume / (volume + k)


def mean_or_none(values: Iterable[float | None]) -> float | None:
    present = [v for v in values if v is not None]
    if not present:
        return None
    return float(np.mean(present))
