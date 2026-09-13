"""Коннектор GitHub — сигнал adoption/разработки (§3, P0).

Особенно полезен для software/AI, где разработка опережает публикации:
репозиторий появляется раньше статьи о нём. §24.10 строит на этом
Adoption Momentum.

Два ограничения формируют устройство коннектора:

* **Лимит.** Authenticated REST — 5 000 запросов/час, но поиск живёт по
  отдельному, более жёсткому лимиту (порядка 30 запросов/минуту), и
  secondary limits считаются сверх того (§3.1).
* **Потолок выдачи.** Search возвращает не более 1 000 результатов на
  запрос, сколько ни листай. Историю нельзя взять пагинацией — её берут
  нарезкой запроса по интервалам дат создания. Это реализовано в
  ``_date_slices``.

Звёзды и контрибьюторы — изменяемые величины: они уходят в
``document_metric_snapshots``, а не в поля документа (см. §34 и
docs/limitations.md).
"""

from __future__ import annotations

from collections.abc import AsyncIterator, Iterator
from datetime import UTC, date, datetime, timedelta

import structlog

from eti.db.enums import ChangeEventType, DocumentType, SourceFamily
from eti.sources.base import Connector, NormalizedDocument, RawRecord

log = structlog.get_logger(__name__)

API_BASE = "https://api.github.com"
PER_PAGE = 100
SEARCH_RESULT_CAP = 1_000
"""Жёсткий потолок GitHub Search. Глубже — только нарезкой по датам."""


class GitHubConnector(Connector):
    code = "github"
    name = "GitHub REST API"
    family = SourceFamily.OPEN_SOURCE
    default_document_type = DocumentType.REPOSITORY
    requires_credentials = True
    rate_limit_per_hour = 5_000
    min_interval_seconds = 2.0
    """Поиск ограничен отдельно от основного лимита; равномерность
    надёжнее, чем пачка запросов в начале часа."""
    supports_backfill = True
    supports_change_events = False

    def __init__(self, *args: object, token: str | None = None, **kwargs: object) -> None:
        super().__init__(*args, **kwargs)  # type: ignore[arg-type]
        self.token = token
        if not token:
            log.warning(
                "github_unauthenticated",
                detail="без токена лимит 60 запросов/час — хватит только на smoke test",
            )

    @property
    def _headers(self) -> dict[str, str]:
        headers = {"Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        return headers

    @staticmethod
    def _date_slices(start: date, end: date, step_days: int = 90) -> Iterator[tuple[date, date]]:
        """Интервалы дат создания репозиториев для обхода потолка в 1 000."""
        cursor = start
        while cursor < end:
            chunk_end = min(cursor + timedelta(days=step_days), end)
            yield cursor, chunk_end
            cursor = chunk_end + timedelta(days=1)

    async def _search_page(self, query: str, page: int) -> dict:
        return await self.request_json(
            f"{API_BASE}/search/repositories",
            params={
                "q": query,
                "sort": "stars",
                "order": "desc",
                "per_page": str(PER_PAGE),
                "page": str(page),
            },
            headers=self._headers,
        )

    async def fetch(
        self, *, cursor: str | None, mode: str, query: str | None = None, limit: int | None = None
    ) -> AsyncIterator[RawRecord]:
        term = query or "machine learning"
        start = date.fromisoformat(cursor) if cursor else date(2015, 1, 1)
        end = date.today()
        fetched = 0

        for slice_start, slice_end in self._date_slices(start, end):
            search_query = f"{term} created:{slice_start.isoformat()}..{slice_end.isoformat()}"
            page = 1

            while page * PER_PAGE <= SEARCH_RESULT_CAP:
                payload = await self._search_page(search_query, page)
                items = payload.get("items", [])
                if not items:
                    break

                total = payload.get("total_count", 0)
                if page == 1 and total > SEARCH_RESULT_CAP:
                    # Срез шире потолка — часть репозиториев не будет видна.
                    # Пишем в лог, а не молчим: это пробел в покрытии, и он
                    # должен быть заметен, а не выясняться по странным метрикам.
                    log.warning(
                        "github_slice_truncated",
                        slice=f"{slice_start}..{slice_end}",
                        total=total,
                        cap=SEARCH_RESULT_CAP,
                        hint="уменьшите step_days в _date_slices",
                    )

                for repo in items:
                    yield RawRecord(
                        external_id=str(repo["id"]),
                        payload=repo,
                        source_revision=repo.get("updated_at"),
                        cursor=slice_end.isoformat(),
                    )
                    fetched += 1
                    if limit and fetched >= limit:
                        return

                if len(items) < PER_PAGE:
                    break
                page += 1

    def normalize(self, raw: RawRecord) -> NormalizedDocument | None:
        repo = raw.payload

        created_at: datetime | None = None
        if created := repo.get("created_at"):
            try:
                created_at = datetime.fromisoformat(created.replace("Z", "+00:00"))
            except ValueError:
                created_at = None
        if created_at and created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=UTC)

        owner = repo.get("owner") or {}

        return NormalizedDocument(
            external_id=str(repo["id"]),
            document_type=DocumentType.REPOSITORY,
            title=repo.get("full_name"),
            abstract=repo.get("description"),
            url=repo.get("html_url"),
            language=None,
            published_at=created_at,
            available_from=created_at,
            external_topics={
                "github_topics": repo.get("topics", []),
                "primary_language": repo.get("language"),
                "license": (repo.get("license") or {}).get("spdx_id"),
            },
            authors={
                "owner": owner.get("login"),
                "owner_type": owner.get("type"),
                "count": 1,
            },
            institutions=(
                {"names": [owner.get("login")], "count": 1}
                if owner.get("type") == "Organization"
                else {}
            ),
            metrics={
                "github_stars": float(repo.get("stargazers_count") or 0),
                "github_forks": float(repo.get("forks_count") or 0),
                "github_watchers": float(repo.get("watchers_count") or 0),
                "github_open_issues": float(repo.get("open_issues_count") or 0),
            },
            source_revision=repo.get("updated_at"),
            raw_payload=repo,
            event_type=ChangeEventType.CREATE,
        )
