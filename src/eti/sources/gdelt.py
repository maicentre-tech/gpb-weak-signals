"""Коннектор GDELT DOC 2.0 — сигнал медийного внимания (§3, P1).

Роль источника в методологии узкая и её важно не переоценить: §24.17 даёт
новостям вес 0.40 — вдвое ниже научных и патентных записей. Медийное
внимание показывает, что о технологии говорят, но не доказывает, что она
существует как технология. §27 содержит отдельный тестовый сценарий
«высокое news attention при слабом research evidence» — именно на такой
случай и нужен низкий вес.

API открыт и не требует ключа. Ограничения: максимум 250 записей на запрос
и окно не длиннее нескольких месяцев, поэтому история берётся нарезкой по
интервалам дат.
"""

from __future__ import annotations

import re
from collections.abc import AsyncIterator, Iterator
from datetime import UTC, date, datetime, timedelta

import structlog

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.sources.base import Connector, NormalizedDocument, RawRecord

log = structlog.get_logger(__name__)

API_URL = "https://api.gdeltproject.org/api/v2/doc/doc"
MAX_RECORDS = 250
SLICE_DAYS = 30
COVERAGE_START = date(2017, 1, 1)
"""DOC 2.0 покрывает период примерно с 2017 года."""


def title_matches_query(title: str | None, query: str) -> bool:
    """Проверка, что статья действительно о запрошенной технологии.

    Фразовый поиск GDELT ненадёжен: по запросу «agentic AI» в выдачу
    попадают биржевые подборки вида «10 Best Nancy Pelosi Stocks to Buy».
    Такие статьи, попав в счётчик news_mentions, напрямую искажают Market
    Momentum (§24.9), и низкий вес источника (0.40 по §24.17) от этого не
    спасает — вес снижает вклад верного сигнала, а не отсеивает неверный.

    Проверка простая и намеренно строгая: все значимые слова запроса
    должны присутствовать в заголовке. Статьи, где технология упомянута
    только в теле, отбрасываются — для сигнала внимания это приемлемая
    цена за отсутствие мусора.
    """
    if not title:
        return False
    normalized_title = title.casefold()
    tokens = [t for t in re.split(r"\W+", query.casefold()) if len(t) > 2]
    if not tokens:
        return bool(query.casefold() in normalized_title)
    return all(
        re.search(rf"(?<!\w){re.escape(token)}", normalized_title) for token in tokens
    )


class GdeltConnector(Connector):
    code = "gdelt"
    name = "GDELT DOC 2.0"
    family = SourceFamily.WEB_NEWS
    default_document_type = DocumentType.NEWS
    requires_credentials = False
    rate_limit_per_hour = 600
    min_interval_seconds = 5.0
    """GDELT не публикует явного лимита, но агрессивно отвечает пустыми
    ответами на частые обращения. Равномерный темп надёжнее."""
    supports_backfill = True
    supports_change_events = False

    def __init__(self, *args: object, query_term: str | None = None, **kwargs: object) -> None:
        super().__init__(*args, **kwargs)  # type: ignore[arg-type]
        self.query_term = query_term
        """Запрос запоминается, чтобы normalize мог проверить релевантность:
        он вызывается отдельно от fetch и иначе не знает, что искали."""

    @staticmethod
    def _date_slices(start: date, end: date) -> Iterator[tuple[date, date]]:
        cursor = start
        while cursor < end:
            chunk_end = min(cursor + timedelta(days=SLICE_DAYS), end)
            yield cursor, chunk_end
            cursor = chunk_end

    @staticmethod
    def _stamp(value: date) -> str:
        return value.strftime("%Y%m%d%H%M%S")

    async def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        term = query or "artificial intelligence"
        self.query_term = term
        start = max(date.fromisoformat(cursor), COVERAGE_START) if cursor else COVERAGE_START
        end = date.today()
        fetched = 0

        for slice_start, slice_end in self._date_slices(start, end):
            response = await self.request(
                API_URL,
                params={
                    "query": f'"{term}"',
                    "mode": "artlist",
                    "format": "json",
                    "maxrecords": str(MAX_RECORDS),
                    "startdatetime": self._stamp(slice_start),
                    "enddatetime": self._stamp(slice_end),
                    "sort": "datedesc",
                },
            )
            # GDELT отдаёт HTML с текстом ошибки вместо JSON при неверном
            # запросе, сохраняя код 200. Пустой ответ — тоже штатный случай.
            try:
                payload = response.json()
            except ValueError:
                log.warning(
                    "gdelt_non_json_response",
                    slice=f"{slice_start}..{slice_end}",
                    body=response.text[:200],
                )
                continue

            articles = payload.get("articles", [])
            if not articles:
                continue

            for article in articles:
                url = article.get("url")
                if not url:
                    continue
                yield RawRecord(
                    external_id=url,
                    payload=article,
                    source_revision=article.get("seendate"),
                    cursor=slice_end.isoformat(),
                )
                fetched += 1
                if limit and fetched >= limit:
                    return

    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        article = raw.payload

        if self.query_term and not title_matches_query(article.get("title"), self.query_term):
            # Осознанный отброс, а не ошибка: runner учтёт его как skipped.
            log.debug(
                "gdelt_irrelevant_article",
                title=(article.get("title") or "")[:80],
                query=self.query_term,
            )
            return None

        seen_at: datetime | None = None
        if stamp := article.get("seendate"):
            for fmt in ("%Y%m%dT%H%M%SZ", "%Y%m%d%H%M%S"):
                try:
                    seen_at = datetime.strptime(stamp, fmt).replace(tzinfo=UTC)
                    break
                except ValueError:
                    continue

        language = (article.get("language") or "").lower()[:8] or None

        return NormalizedDocument(
            external_id=article["url"],
            document_type=DocumentType.NEWS,
            title=article.get("title"),
            # Полный текст статей не сохраняется: лицензия источника этого
            # не покрывает (§23.3, allows_fulltext_storage=False).
            abstract=None,
            url=article["url"],
            language=language,
            published_at=seen_at,
            available_from=seen_at,
            external_topics={"domain": article.get("domain")},
            authors={},
            institutions={},
            metrics={},
            source_revision=article.get("seendate"),
            raw_payload=article,
            event_type=ChangeEventType.CREATE,
        )
