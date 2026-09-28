"""Загрузка онтологии технологий из JSON в БД."""

from __future__ import annotations

import argparse
import asyncio
import json
from collections.abc import Mapping
from pathlib import Path
from typing import Any

from sqlalchemy import select

from eti.db.models import Technology, TechnologyAlias
from eti.db.session import session_scope
from eti.ontology.resolver import normalize_name

DEFAULT_PATH = Path("data/ontology/ai_pilot.json")


def aliases_for_entry(
    spec: Mapping[str, Any], entry: Mapping[str, Any]
) -> list[tuple[str, str]]:
    """Return technology aliases plus the ontology's umbrella-domain aliases."""
    aliases: list[tuple[str, str]] = []
    seen: set[str] = set()
    for source, values in (
        ("technology", entry.get("aliases", [])),
        ("ontology_domain", spec.get("domain_aliases", [])),
    ):
        if not isinstance(values, list):
            continue
        for value in values:
            if not isinstance(value, str) or not (normalized := normalize_name(value)):
                continue
            if normalized in seen:
                continue
            seen.add(normalized)
            aliases.append((value, source))
    return aliases


async def seed(path: Path, *, preserve_existing: bool = False) -> None:
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
                if preserve_existing:
                    changed = False
                    canonical_name_ru = entry.get("canonical_name_ru")
                    if not (technology.canonical_name_ru or "").strip() and canonical_name_ru:
                        technology.canonical_name_ru = canonical_name_ru
                        changed = True
                    if not technology.ontology_version:
                        technology.ontology_version = version
                        changed = True
                    updated += int(changed)
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

            for alias, alias_source in aliases_for_entry(spec, entry):
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
                        source_of_alias=alias_source,
                    )
                )
                alias_count += 1

    print(f"технологий: создано {created}, обновлено {updated}; алиасов добавлено {alias_count}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Загрузить пилотную онтологию технологий.")
    parser.add_argument("path", nargs="?", type=Path, default=DEFAULT_PATH)
    parser.add_argument(
        "--preserve-existing",
        action="store_true",
        help="Заполнять только отсутствующие поля существующих технологий.",
    )
    args = parser.parse_args()
    asyncio.run(seed(args.path, preserve_existing=args.preserve_existing))
