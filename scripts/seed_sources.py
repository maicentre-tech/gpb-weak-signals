"""Реестр источников с Source License Record (§23.3).

Статусы лицензий здесь — рабочая оценка для пилота, а не юридическое
заключение. §23.3 требует, чтобы у каждого источника был подтверждённый
владелец и дата проверки до production ingestion; поля ``license_owner`` и
``license_checked_at`` намеренно оставлены пустыми — их заполняет юрист
заказчика, а не разработчик.

Статус UNCLEAR блокирует загрузку вне режима разработки.
"""

from __future__ import annotations

import asyncio
from datetime import date

from sqlalchemy import select

from eti.db.enums import LicenseStatus, SourceFamily
from eti.db.session import session_scope
from eti.db.models import Source, SourceCoverage

SOURCES: list[dict] = [
    {
        "code": "openalex",
        "name": "OpenAlex",
        "family": SourceFamily.RESEARCH,
        "base_url": "https://api.openalex.org",
        "license_status": LicenseStatus.APPROVED,
        "license_type": "CC0",
        "allows_fulltext_storage": False,
        "allows_embedding_storage": True,
        "allows_rag_use": True,
        "allows_derivative_analytics": True,
        "requires_credentials": False,
        "rate_limit_per_hour": 100_000,
        "evidence_weight": 1.00,
        "coverage": {"start": date(2010, 1, 1), "lag_days": 0},
    },
    {
        "code": "arxiv",
        "name": "arXiv",
        "family": SourceFamily.PREPRINTS,
        "base_url": "https://export.arxiv.org/api",
        "license_status": LicenseStatus.RESTRICTED,
        "license_type": "arXiv API Terms of Use; лицензия текста зависит от статьи",
        "allows_fulltext_storage": False,
        "allows_embedding_storage": True,
        "allows_rag_use": True,
        "allows_derivative_analytics": True,
        "requires_credentials": False,
        "rate_limit_per_hour": 1_200,
        "evidence_weight": 1.00,
        "coverage": {"start": date(2010, 1, 1), "lag_days": 0},
    },
    {
        "code": "github",
        "name": "GitHub REST API",
        "family": SourceFamily.OPEN_SOURCE,
        "base_url": "https://api.github.com",
        "license_status": LicenseStatus.RESTRICTED,
        "license_type": "GitHub ToS; метаданные репозиториев",
        "allows_fulltext_storage": False,
        "allows_embedding_storage": True,
        "allows_rag_use": True,
        "allows_derivative_analytics": True,
        "requires_credentials": True,
        "rate_limit_per_hour": 5_000,
        "evidence_weight": 0.80,
        "coverage": {"start": date(2011, 1, 1), "lag_days": 0},
    },
    {
        "code": "gharchive",
        "name": "GH Archive",
        "family": SourceFamily.OPEN_SOURCE,
        "base_url": "https://data.gharchive.org",
        "license_status": LicenseStatus.APPROVED,
        "license_type": "CC-BY / публичные события GitHub",
        "allows_fulltext_storage": True,
        "allows_embedding_storage": True,
        "allows_rag_use": False,
        "allows_derivative_analytics": True,
        "requires_credentials": False,
        "evidence_weight": 0.80,
        "coverage": {"start": date(2011, 2, 12), "lag_days": 1},
    },
    {
        "code": "patentsview",
        "name": "PatentsView (USPTO)",
        "family": SourceFamily.PATENTS,
        "base_url": "https://search.patentsview.org/api/v1",
        "license_status": LicenseStatus.APPROVED,
        "license_type": "Public domain (USPTO) / CC-BY для производных",
        "allows_fulltext_storage": True,
        "allows_embedding_storage": True,
        "allows_rag_use": True,
        "allows_derivative_analytics": True,
        "requires_credentials": True,
        "rate_limit_per_hour": 1_800,
        "evidence_weight": 0.90,
        # Патент публикуется в среднем через 18 месяцев после priority date.
        # Без этого лага backtesting получает утечку из будущего (§29.3).
        "coverage": {"start": date(2005, 1, 1), "lag_days": 548},
    },
    {
        "code": "crossref",
        "name": "Crossref",
        "family": SourceFamily.RESEARCH,
        "base_url": "https://api.crossref.org",
        "license_status": LicenseStatus.APPROVED,
        "license_type": "Открытые метаданные",
        "allows_embedding_storage": True,
        "allows_rag_use": True,
        "allows_derivative_analytics": True,
        "requires_credentials": False,
        "rate_limit_per_hour": 18_000,
        "evidence_weight": 0.90,
        "coverage": {"start": date(2005, 1, 1), "lag_days": 0},
    },
    {
        "code": "gdelt",
        "name": "GDELT DOC 2.0",
        "family": SourceFamily.WEB_NEWS,
        "base_url": "https://api.gdeltproject.org/api/v2/doc/doc",
        "license_status": LicenseStatus.RESTRICTED,
        "license_type": "GDELT ToS; ссылки и контекст, не полный текст СМИ",
        "allows_fulltext_storage": False,
        "allows_embedding_storage": True,
        "allows_rag_use": False,
        "allows_derivative_analytics": True,
        "requires_credentials": False,
        "rate_limit_per_hour": 600,
        # §24.17: новости — сигнал внимания, а не доказательство. Вес 0.40.
        "evidence_weight": 0.40,
        "coverage": {"start": date(2017, 1, 1), "lag_days": 0},
    },
    {
        "code": "cordis",
        "name": "CORDIS",
        "family": SourceFamily.RD,
        "base_url": "https://cordis.europa.eu",
        "license_status": LicenseStatus.UNCLEAR,
        "license_type": "Требует проверки: API-ключ vs bulk-датасеты",
        "requires_credentials": True,
        "evidence_weight": 0.90,
        "coverage": {"start": date(2007, 1, 1), "lag_days": 90},
    },
    {
        "code": "epo_ops",
        "name": "EPO OPS",
        "family": SourceFamily.PATENTS,
        "base_url": "http://ops.epo.org/3.2",
        "license_status": LicenseStatus.UNCLEAR,
        "license_type": "BLOCKED до регистрации юрлица и проверки условий (§30)",
        "requires_credentials": True,
        "rate_limit_per_hour": 1_000,
        "weekly_volume_cap_bytes": 4 * 1024**3,
        "evidence_weight": 0.90,
        "coverage": {"start": date(2005, 1, 1), "lag_days": 548},
    },
]


async def seed() -> None:
    async with session_scope() as session:
        for spec in SOURCES:
            coverage_spec = spec.pop("coverage", None)
            existing = await session.execute(select(Source).where(Source.code == spec["code"]))
            source = existing.scalar_one_or_none()
            if source is None:
                source = Source(**spec)
                session.add(source)
                await session.flush()
                action = "created"
            else:
                for key, value in spec.items():
                    setattr(source, key, value)
                action = "updated"

            if coverage_spec:
                cov = await session.execute(
                    select(SourceCoverage).where(SourceCoverage.source_id == source.id)
                )
                coverage = cov.scalar_one_or_none()
                if coverage is None:
                    session.add(
                        SourceCoverage(
                            source_id=source.id,
                            coverage_start_date=coverage_spec["start"],
                            publication_lag_days=coverage_spec["lag_days"],
                        )
                    )
                else:
                    coverage.coverage_start_date = coverage_spec["start"]
                    coverage.publication_lag_days = coverage_spec["lag_days"]

            blocked = " [BLOCKED Legal Gate]" if source.license_status == "unclear" else ""
            print(f"  {action:8} {source.code:14} {source.license_status:10}{blocked}")


if __name__ == "__main__":
    asyncio.run(seed())
