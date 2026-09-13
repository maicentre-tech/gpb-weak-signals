"""Загрузка онтологии технологий из JSON в БД."""

from __future__ import annotations

import asyncio
import json
import sys
from pathlib import Path

from sqlalchemy import select

from eti.db.models import Technology, TechnologyAlias
from eti.db.session import session_scope
from eti.ontology.resolver import normalize_name

DEFAULT_PATH = Path("data/ontology/ai_pilot.json")


async def seed(path: Path) -> None:
    spec = json.loads(path.read_text(encoding="utf-8"))
    version = spec["ontology_version"]
    created = updated = alias_count = 0

    async with session_scope() as session:
        for entry in spec["technologies"]:
            name = entry["canonical_name"]
            found = await session.execute(
                select(Technology).where(Technology.canonical_name == name)
            )
            technology = found.scalar_one_or_none()

            if technology is None:
                technology = Technology(
                    canonical_name=name,
                    canonical_name_ru=entry.get("canonical_name_ru"),
                    ontology_version=version,
                    openalex_topics={"ids": entry.get("openalex_topics", [])},
                    arxiv_categories={"codes": entry.get("arxiv_categories", [])},
                    github_keywords={"topics": entry.get("github_topics", [])},
                    cpc_codes={"codes": entry.get("cpc_codes", [])},
                )
                session.add(technology)
                await session.flush()
                created += 1
            else:
                technology.canonical_name_ru = entry.get("canonical_name_ru")
                technology.ontology_version = version
                updated += 1

            existing_aliases = await session.execute(
                select(TechnologyAlias.normalized_alias).where(
                    TechnologyAlias.technology_id == technology.id
                )
            )
            known = set(existing_aliases.scalars())

            for alias in entry.get("aliases", []):
                normalized = normalize_name(alias)
                if not normalized or normalized in known:
                    continue
                known.add(normalized)
                is_cyrillic = any("а" <= ch <= "я" for ch in normalized)
                session.add(
                    TechnologyAlias(
                        technology_id=technology.id,
                        alias=alias,
                        normalized_alias=normalized,
                        language="ru" if is_cyrillic else "en",
                        is_abbreviation=len(normalized) <= 5 and " " not in normalized,
                    )
                )
                alias_count += 1

    print(f"технологий: создано {created}, обновлено {updated}; алиасов добавлено {alias_count}")


if __name__ == "__main__":
    asyncio.run(seed(Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PATH))
