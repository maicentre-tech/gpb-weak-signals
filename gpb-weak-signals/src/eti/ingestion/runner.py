"""Ingestion runner — общая обвязка для всех источников (§21.4, §23.5).

Гарантии, которые обеспечивает runner, а не отдельный коннектор:

* **Идемпотентность.** Повторная доставка одного changefile не создаёт
  дублей и не меняет результат (критерий приёмки §23.6). Ключ идемпотентности
  — ``(source_id, external_id, source_revision)``; содержательные изменения
  выявляются по ``content_hash``.
* **Возобновляемость.** Чекпоинт сохраняется по ходу; rate limit или сетевая
  ошибка завершают run статусом PARTIAL, а не теряют прогресс (§35).
* **Типизированные изменения.** update/delete/correction пишутся в
  ``document_change_events``; физического удаления нет (§23.5).
* **Отсутствие тихих потерь.** Необработанная запись уходит в DLQ.
* **Legal gate.** Источник с неясной лицензией не допускается к загрузке
  вне режима разработки (§23.3).
"""

from __future__ import annotations

import uuid
from dataclasses import dataclass, field
from datetime import UTC, datetime, timedelta

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from eti.db.enums import ChangeEventType, LicenseStatus, RunStatus
from eti.db.models import (
    DeadLetterRecord,
    Document,
    DocumentChangeEvent,
    DocumentMetricSnapshot,
    IngestionCheckpoint,
    IngestionRun,
    Source,
    SourceCoverage,
)
from eti.ingestion.ratelimit import RateLimitExceeded
from eti.sources.base import Connector, NormalizedDocument

log = structlog.get_logger(__name__)


@dataclass
class RunStats:
    fetched: int = 0
    created: int = 0
    updated: int = 0
    skipped: int = 0
    failed: int = 0
    deleted: int = 0
    snapshots: int = 0
    errors: list[str] = field(default_factory=list)

    def as_dict(self) -> dict[str, int]:
        return {
            "fetched": self.fetched,
            "created": self.created,
            "updated": self.updated,
            "skipped": self.skipped,
            "failed": self.failed,
            "deleted": self.deleted,
            "snapshots": self.snapshots,
        }


class IngestionRunner:
    def __init__(
        self,
        session: AsyncSession,
        connector: Connector,
        *,
        dataset_version: str,
        allow_unclear_license: bool = False,
        checkpoint_every: int = 500,
    ) -> None:
        self.session = session
        self.connector = connector
        self.dataset_version = dataset_version
        self.allow_unclear_license = allow_unclear_license
        self.checkpoint_every = checkpoint_every

    # -- Подготовка -------------------------------------------------------

    async def _get_source(self) -> Source:
        result = await self.session.execute(
            select(Source).where(Source.code == self.connector.code)
        )
        source = result.scalar_one_or_none()
        if source is None:
            raise LookupError(
                f"Источник {self.connector.code!r} не зарегистрирован. "
                "Выполните `make seed-sources`."
            )
        return source

    def _check_license_gate(self, source: Source) -> None:
        """§23.3: источник со статусом «license unclear» не подключается
        к production ingestion автоматически."""
        if source.license_status in (LicenseStatus.PROHIBITED, LicenseStatus.UNCLEAR):
            if not self.allow_unclear_license:
                raise PermissionError(
                    f"{source.code}: license_status={source.license_status}. "
                    "Загрузка заблокирована Legal Gate (§23.3). Для локальной "
                    "разработки запускайте с allow_unclear_license=True."
                )
            log.warning(
                "license_gate_bypassed", source=source.code, status=source.license_status
            )

    async def _get_checkpoint(self, source: Source, stream: str) -> IngestionCheckpoint:
        result = await self.session.execute(
            select(IngestionCheckpoint).where(
                IngestionCheckpoint.source_id == source.id,
                IngestionCheckpoint.stream == stream,
            )
        )
        checkpoint = result.scalar_one_or_none()
        if checkpoint is None:
            checkpoint = IngestionCheckpoint(source_id=source.id, stream=stream, state={})
            self.session.add(checkpoint)
            await self.session.flush()
        return checkpoint

    async def _get_coverage(self, source: Source) -> SourceCoverage | None:
        result = await self.session.execute(
            select(SourceCoverage).where(SourceCoverage.source_id == source.id)
        )
        return result.scalar_one_or_none()

    # -- Основной цикл ----------------------------------------------------

    async def run(
        self,
        *,
        mode: str = "incremental",
        stream: str | None = None,
        query: str | None = None,
        limit: int | None = None,
    ) -> IngestionRun:
        # Чекпоинты разных режимов не смешиваются. Инкрементальная загрузка
        # держит курсор по дате изменения записи, историческая — по дате
        # публикации. Общий чекпоинт означал бы подстановку курсора одного
        # режима в фильтр другого: запрос либо падает, либо тихо возвращает
        # не тот срез.
        stream = stream or mode
        source = await self._get_source()
        self._check_license_gate(source)
        checkpoint = await self._get_checkpoint(source, stream)
        coverage = await self._get_coverage(source)
        lag_days = coverage.publication_lag_days if coverage else 0

        run = IngestionRun(
            source_id=source.id,
            mode=mode,
            status=RunStatus.RUNNING,
            started_at=datetime.now(UTC),
            cursor_from=checkpoint.cursor,
            dataset_version=self.dataset_version,
        )
        self.session.add(run)
        await self.session.flush()

        stats = RunStats()
        status = RunStatus.SUCCESS
        latest_cursor = checkpoint.cursor

        try:
            async for raw in self.connector.fetch(
                cursor=checkpoint.cursor, mode=mode, query=query, limit=limit
            ):
                stats.fetched += 1
                try:
                    await self._process_record(raw, source, run, lag_days, stats)
                except Exception as exc:  # носитель одной битой записи не валит run
                    stats.failed += 1
                    await self._to_dlq(raw, source, run, exc)
                    log.warning(
                        "record_failed",
                        source=source.code,
                        external_id=raw.external_id,
                        error=str(exc),
                    )

                if raw.cursor:
                    latest_cursor = raw.cursor
                if stats.fetched % self.checkpoint_every == 0:
                    checkpoint.cursor = latest_cursor
                    await self.session.flush()

        except RateLimitExceeded as exc:
            # Не ошибка данных: сохраняем прогресс и выходим штатно (§35).
            status = RunStatus.PARTIAL
            run.error_code = "rate_limit"
            run.error_detail = str(exc)
            log.info("run_partial_rate_limit", source=source.code, detail=str(exc))
        except Exception as exc:
            status = RunStatus.FAILED
            run.error_code = type(exc).__name__
            run.error_detail = str(exc)
            log.error("run_failed", source=source.code, error=str(exc))
            raise
        finally:
            if stats.failed and status is RunStatus.SUCCESS:
                status = RunStatus.PARTIAL
            checkpoint.cursor = latest_cursor
            checkpoint.last_successful_run_id = (
                run.id if status is not RunStatus.FAILED else checkpoint.last_successful_run_id
            )
            run.status = status
            run.finished_at = datetime.now(UTC)
            run.cursor_to = latest_cursor
            run.records_fetched = stats.fetched
            run.records_created = stats.created
            run.records_updated = stats.updated
            run.records_skipped = stats.skipped
            run.records_failed = stats.failed
            run.metrics = stats.as_dict()
            await self.session.flush()

        log.info("run_finished", source=source.code, status=status, **stats.as_dict())
        return run

    # -- Обработка одной записи -------------------------------------------

    async def _process_record(
        self,
        raw: object,
        source: Source,
        run: IngestionRun,
        lag_days: int,
        stats: RunStats,
    ) -> None:
        doc = self.connector.normalize(raw)  # type: ignore[arg-type]
        if doc is None:
            stats.skipped += 1
            return

        if doc.available_from is None and doc.published_at is not None:
            # §29.3: факт становится доступен позже события на лаг источника.
            doc.available_from = doc.published_at + timedelta(days=lag_days)

        content_hash = doc.content_hash()
        existing = await self.session.execute(
            select(Document).where(
                Document.source_id == source.id, Document.external_id == doc.external_id
            )
        )
        current = existing.scalar_one_or_none()

        if current is None:
            document = self._build_document(doc, source, content_hash)
            self.session.add(document)
            await self.session.flush()
            stats.created += 1
            self._add_change_event(
                document.id, run, ChangeEventType.CREATE, None, content_hash, doc.source_revision
            )
        elif doc.event_type is ChangeEventType.DELETE:
            current.is_deleted = True
            self._add_change_event(
                current.id,
                run,
                ChangeEventType.DELETE,
                current.content_hash,
                content_hash,
                doc.source_revision,
            )
            stats.deleted += 1
            document = current
        elif current.content_hash == content_hash:
            # Идемпотентность: повторная доставка не меняет ничего, кроме
            # свежих значений метрик.
            stats.skipped += 1
            document = current
        else:
            previous_hash = current.content_hash
            previous_payload = current.raw_payload
            self._apply_update(current, doc, content_hash)
            self._add_change_event(
                current.id,
                run,
                doc.event_type
                if doc.event_type is ChangeEventType.CORRECTION
                else ChangeEventType.UPDATE,
                previous_hash,
                content_hash,
                doc.source_revision,
                previous_payload=previous_payload,
            )
            stats.updated += 1
            document = current

        if doc.metrics:
            stats.snapshots += await self._record_metrics(document.id, doc)

    def _build_document(
        self, doc: NormalizedDocument, source: Source, content_hash: str
    ) -> Document:
        return Document(
            source_id=source.id,
            external_id=doc.external_id,
            document_type=doc.document_type,
            language=doc.language,
            title=doc.title,
            original_title=doc.title,
            abstract=doc.abstract,
            url=doc.url,
            doi=doc.doi,
            published_at=doc.published_at,
            available_from=doc.available_from,
            first_seen_at=datetime.now(UTC),
            retrieved_at=datetime.now(UTC),
            priority_date=doc.priority_date,
            filing_date=doc.filing_date,
            publication_date=doc.publication_date,
            grant_date=doc.grant_date,
            content_hash=content_hash,
            source_revision=doc.source_revision,
            raw_payload=doc.raw_payload,
            external_topics=doc.external_topics,
            authors=doc.authors,
            institutions=doc.institutions,
        )

    @staticmethod
    def _apply_update(current: Document, doc: NormalizedDocument, content_hash: str) -> None:
        current.title = doc.title
        current.abstract = doc.abstract
        current.url = doc.url
        current.doi = doc.doi
        current.language = doc.language
        current.published_at = doc.published_at
        current.available_from = doc.available_from
        current.priority_date = doc.priority_date
        current.filing_date = doc.filing_date
        current.publication_date = doc.publication_date
        current.grant_date = doc.grant_date
        current.content_hash = content_hash
        current.source_revision = doc.source_revision
        current.raw_payload = doc.raw_payload
        current.external_topics = doc.external_topics
        current.authors = doc.authors
        current.institutions = doc.institutions
        current.source_updated_at = datetime.now(UTC)
        current.retrieved_at = datetime.now(UTC)
        # embedding намеренно не сбрасывается здесь: пересчёт — задача
        # NLP DAG, который сам увидит изменившийся content_hash.

    def _add_change_event(
        self,
        document_id: uuid.UUID,
        run: IngestionRun,
        event_type: ChangeEventType,
        previous_hash: str | None,
        new_hash: str,
        revision: str | None,
        previous_payload: dict | None = None,
    ) -> None:
        self.session.add(
            DocumentChangeEvent(
                document_id=document_id,
                ingestion_run_id=run.id,
                event_type=event_type,
                source_revision=revision,
                previous_content_hash=previous_hash,
                new_content_hash=new_hash,
                previous_payload=previous_payload,
                occurred_at=datetime.now(UTC),
            )
        )

    async def _record_metrics(self, document_id: uuid.UUID, doc: NormalizedDocument) -> int:
        """Снапшот изменяемых метрик.

        Пишется один раз в сутки на метрику: чаще — бессмысленный объём,
        реже — теряется разрешение временного ряда для Citation/Adoption
        Momentum.
        """
        observed_at = datetime.now(UTC).replace(hour=0, minute=0, second=0, microsecond=0)
        written = 0
        for name, value in doc.metrics.items():
            exists = await self.session.execute(
                select(DocumentMetricSnapshot.id).where(
                    DocumentMetricSnapshot.document_id == document_id,
                    DocumentMetricSnapshot.metric_name == name,
                    DocumentMetricSnapshot.observed_at == observed_at,
                )
            )
            if exists.scalar_one_or_none() is not None:
                continue
            self.session.add(
                DocumentMetricSnapshot(
                    document_id=document_id,
                    observed_at=observed_at,
                    metric_name=name,
                    metric_value=value,
                )
            )
            written += 1
        return written

    async def _to_dlq(
        self, raw: object, source: Source, run: IngestionRun, exc: Exception
    ) -> None:
        self.session.add(
            DeadLetterRecord(
                source_id=source.id,
                ingestion_run_id=run.id,
                external_id=getattr(raw, "external_id", None),
                stage="normalize",
                error_code=type(exc).__name__,
                error_detail=str(exc)[:4000],
                payload=getattr(raw, "payload", None),
                created_at=datetime.now(UTC),
            )
        )
