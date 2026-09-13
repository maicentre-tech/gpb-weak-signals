"""Контракт коннектора источника.

Коннектор отвечает только за две вещи: как достать сырые записи и как
превратить одну сырую запись в нормализованный документ. Всё остальное —
идемпотентность, чекпоинты, retry, DLQ, аудит — общая инфраструктура
(``eti.ingestion.runner``), одинаковая для всех источников. Поэтому
подключение EPO OPS, когда появятся учётные данные, сводится к одному
новому классу, а не к новому пайплайну (§21.4).
"""

from __future__ import annotations

import asyncio
import hashlib
import json
from abc import ABC, abstractmethod
from collections.abc import AsyncIterator
from datetime import date, datetime

import httpx
import structlog
from pydantic import BaseModel, Field

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.ingestion.ratelimit import RateLimiter

log = structlog.get_logger(__name__)

RETRYABLE_STATUS = {429, 500, 502, 503, 504}


class RawRecord(BaseModel):
    """Сырая запись как её отдал источник."""

    external_id: str
    payload: dict
    source_revision: str | None = None
    event_type: ChangeEventType = ChangeEventType.CREATE
    cursor: str | None = None
    """Позиция записи в потоке — для чекпоинта."""


class NormalizedDocument(BaseModel):
    """Приведённый к общей схеме документ."""

    external_id: str
    document_type: DocumentType
    title: str | None = None
    abstract: str | None = None
    url: str | None = None
    doi: str | None = None
    language: str | None = None

    published_at: datetime | None = None
    available_from: datetime | None = None
    """Когда факт стал публично доступен. Если источник не сообщает —
    заполняется runner'ом как published_at + publication_lag_days."""

    priority_date: date | None = None
    filing_date: date | None = None
    publication_date: date | None = None
    grant_date: date | None = None

    external_topics: dict = Field(default_factory=dict)
    authors: dict = Field(default_factory=dict)
    institutions: dict = Field(default_factory=dict)

    metrics: dict[str, float] = Field(default_factory=dict)
    """Изменяемые величины (citations, stars, forks, contributors,
    downloads). Пишутся в document_metric_snapshots с observed_at, а не в
    поле документа: иначе история значений теряется и §34 невыполним."""

    source_revision: str | None = None
    raw_payload: dict = Field(default_factory=dict)
    event_type: ChangeEventType = ChangeEventType.CREATE

    def content_hash(self) -> str:
        """Хеш содержательной части — без изменяемых метрик.

        Метрики намеренно исключены: рост числа звёзд не должен выглядеть
        как изменение документа и порождать UPDATE-событие каждый день.
        """
        material = {
            "external_id": self.external_id,
            "title": self.title,
            "abstract": self.abstract,
            "doi": self.doi,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "priority_date": self.priority_date.isoformat() if self.priority_date else None,
            "external_topics": self.external_topics,
            "authors": self.authors,
        }
        blob = json.dumps(material, sort_keys=True, ensure_ascii=False, default=str)
        return hashlib.sha256(blob.encode("utf-8")).hexdigest()


class Connector(ABC):
    """Базовый класс коннектора."""

    code: str
    name: str
    family: SourceFamily
    default_document_type: DocumentType
    requires_credentials: bool = False
    rate_limit_per_hour: int | None = None
    weekly_volume_cap_bytes: int | None = None
    supports_backfill: bool = True
    supports_change_events: bool = False
    """True, если источник сообщает update/delete/correction (§23.5).
    Для остальных изменения выявляются сравнением content_hash."""
    min_interval_seconds: float = 0.0
    """Принудительный зазор между запросами для источников, которым мало
    часового лимита (arXiv)."""
    max_retries: int = 5

    def __init__(self, client: httpx.AsyncClient, limiter: RateLimiter) -> None:
        self.client = client
        self.limiter = limiter

    @abstractmethod
    def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        """Итератор сырых записей начиная с чекпоинта.

        Должен быть возобновляемым: прерывание на любой записи и
        последующий запуск с сохранённым курсором не теряет и не дублирует
        данные (§21.4).
        """

    @abstractmethod
    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        """Нормализация одной записи. ``None`` — запись отбрасывается
        осознанно (например, отозванная публикация)."""

    async def request(self, url: str, **kwargs: object) -> httpx.Response:
        """GET с учётом лимитов, экспоненциальным backoff и уважением к
        Retry-After.

        Источник вправе ответить 429 даже при соблюдении объявленных
        лимитов — реальные ограничения бывают строже документированных
        и меняются (§3.1). Поэтому backoff здесь обязателен, а не опционален.
        """
        delay = 1.0
        last_error: Exception | None = None

        for attempt in range(1, self.max_retries + 1):
            await self.limiter.acquire()
            try:
                response = await self.client.get(url, **kwargs)  # type: ignore[arg-type]
            except httpx.TransportError as exc:
                last_error = exc
                if attempt == self.max_retries:
                    raise
                await asyncio.sleep(delay)
                delay = min(delay * 2, 60.0)
                continue

            self.limiter.record_response(len(response.content))

            if response.status_code in RETRYABLE_STATUS and attempt < self.max_retries:
                wait = delay
                if retry_after := response.headers.get("Retry-After"):
                    try:
                        wait = max(wait, float(retry_after))
                    except ValueError:
                        pass
                log.info(
                    "retrying_request",
                    source=self.code,
                    status=response.status_code,
                    attempt=attempt,
                    wait_seconds=round(wait, 1),
                )
                await asyncio.sleep(wait)
                delay = min(delay * 2, 60.0)
                continue

            response.raise_for_status()
            return response

        raise last_error or RuntimeError(f"{self.code}: запрос не удался")

    async def request_json(self, url: str, **kwargs: object) -> dict:
        response = await self.request(url, **kwargs)
        return response.json()
