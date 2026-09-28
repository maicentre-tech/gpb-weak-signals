"""Контроль лимитов источников (§3.1, §21.4).

Два независимых ограничителя:

* **Частота** — token bucket. GitHub: 5 000 authenticated req/hour, поиск и
  secondary limits считаются отдельно.
* **Объём** — скользящее недельное окно. EPO OPS декларирует порог 4 ГБ/неделя;
  превышение должно останавливать загрузку, а не выясняться по факту блокировки.

Фактические лимиты подлежат перепроверке перед production (§3.1) — здесь они
параметры, а не константы в коде.
"""

from __future__ import annotations

import asyncio
import time
from collections import deque
from dataclasses import dataclass, field


class RateLimitExceeded(RuntimeError):
    """Лимит исчерпан и ждать дольше допустимого нельзя.

    Не ошибка данных: run завершается статусом PARTIAL, чекпоинт
    сохраняется, загрузка продолжится со следующего запуска (§35).
    """

    def __init__(self, source_code: str, retry_after_seconds: float) -> None:
        self.source_code = source_code
        self.retry_after_seconds = retry_after_seconds
        super().__init__(
            f"{source_code}: лимит исчерпан, повтор через {retry_after_seconds:.0f} с"
        )


@dataclass
class TokenBucket:
    """Классический token bucket с дробным пополнением."""

    capacity: float
    refill_per_second: float
    tokens: float = field(init=False)
    updated_at: float = field(default_factory=time.monotonic, init=False)

    def __post_init__(self) -> None:
        self.tokens = self.capacity

    def _refill(self) -> None:
        now = time.monotonic()
        elapsed = now - self.updated_at
        if elapsed > 0:
            self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_per_second)
            self.updated_at = now

    def try_consume(self, amount: float = 1.0) -> bool:
        self._refill()
        if self.tokens >= amount:
            self.tokens -= amount
            return True
        return False

    def wait_time(self, amount: float = 1.0) -> float:
        self._refill()
        if self.tokens >= amount:
            return 0.0
        if self.refill_per_second <= 0:
            return float("inf")
        return (amount - self.tokens) / self.refill_per_second


class VolumeWindow:
    """Скользящее окно потреблённого объёма (байты за период)."""

    def __init__(self, cap_bytes: int, window_seconds: float) -> None:
        self.cap_bytes = cap_bytes
        self.window_seconds = window_seconds
        self._events: deque[tuple[float, int]] = deque()
        self._total = 0

    def _evict(self) -> None:
        cutoff = time.monotonic() - self.window_seconds
        while self._events and self._events[0][0] < cutoff:
            _, size = self._events.popleft()
            self._total -= size

    @property
    def consumed(self) -> int:
        self._evict()
        return self._total

    @property
    def remaining(self) -> int:
        return max(0, self.cap_bytes - self.consumed)

    def record(self, size_bytes: int) -> None:
        self._evict()
        self._events.append((time.monotonic(), size_bytes))
        self._total += size_bytes

    def would_exceed(self, size_bytes: int) -> bool:
        return self.consumed + size_bytes > self.cap_bytes

    def seconds_until_free(self, size_bytes: int) -> float:
        """Когда освободится достаточно объёма — по времени выбывания
        самых старых событий из окна."""
        self._evict()
        if not self.would_exceed(size_bytes):
            return 0.0
        need = self.consumed + size_bytes - self.cap_bytes
        freed = 0
        now = time.monotonic()
        for ts, size in self._events:
            freed += size
            if freed >= need:
                return max(0.0, ts + self.window_seconds - now)
        return self.window_seconds


class RateLimiter:
    """Объединяет частотный и объёмный контроль для одного источника."""

    WEEK_SECONDS = 7 * 24 * 3600

    def __init__(
        self,
        source_code: str,
        *,
        requests_per_hour: int | None = None,
        weekly_volume_cap_bytes: int | None = None,
        min_interval_seconds: float = 0.0,
        max_wait_seconds: float = 300.0,
        safety_margin: float = 0.9,
    ) -> None:
        self.source_code = source_code
        self.max_wait_seconds = max_wait_seconds
        self.min_interval_seconds = min_interval_seconds
        """Минимальный зазор между запросами.

        Часового лимита недостаточно для источников, которые требуют именно
        равномерности: token bucket копит запас и выпускает его пачкой, на
        что arXiv отвечает 429. Здесь запросы разносятся принудительно."""
        self._last_request_at: float | None = None
        self._bucket: TokenBucket | None = None
        if requests_per_hour:
            effective = requests_per_hour * safety_margin
            self._bucket = TokenBucket(
                capacity=max(1.0, effective / 60), refill_per_second=effective / 3600
            )
        self._volume: VolumeWindow | None = None
        if weekly_volume_cap_bytes:
            self._volume = VolumeWindow(
                int(weekly_volume_cap_bytes * safety_margin), self.WEEK_SECONDS
            )
        self._lock = asyncio.Lock()

    async def acquire(self, *, estimated_bytes: int = 0) -> None:
        async with self._lock:
            if self.min_interval_seconds > 0 and self._last_request_at is not None:
                elapsed = time.monotonic() - self._last_request_at
                if elapsed < self.min_interval_seconds:
                    await asyncio.sleep(self.min_interval_seconds - elapsed)

            if self._volume is not None and estimated_bytes:
                wait = self._volume.seconds_until_free(estimated_bytes)
                if wait > self.max_wait_seconds:
                    raise RateLimitExceeded(self.source_code, wait)
                if wait > 0:
                    await asyncio.sleep(wait)

            if self._bucket is not None:
                wait = self._bucket.wait_time()
                if wait > self.max_wait_seconds:
                    raise RateLimitExceeded(self.source_code, wait)
                if wait > 0:
                    await asyncio.sleep(wait)
                self._bucket.try_consume()

            self._last_request_at = time.monotonic()

    def record_response(self, size_bytes: int) -> None:
        if self._volume is not None:
            self._volume.record(size_bytes)

    @property
    def volume_remaining(self) -> int | None:
        return self._volume.remaining if self._volume else None
