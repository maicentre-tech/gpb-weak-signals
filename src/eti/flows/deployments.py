"""Регистрация расписаний §9.

Расписания заданы по ТЗ, но с одной поправкой: scoring не запускается по
своему собственному расписанию вслепую, а идёт после entity resolution в
рамках ``full_refresh``. Независимый ежемесячный scoring посчитал бы
метрики по онтологии, устаревшей на месяц ingestion, и не сообщил бы об этом.

    python -m eti.flows.deployments   # регистрирует расписания в Prefect
"""

from __future__ import annotations

import asyncio

from eti.flows.dags import full_refresh_flow, ingestion_flow

DAILY_INGESTION_CRON = "0 3 * * *"
"""Ночью: у OpenAlex и GitHub в это время ниже нагрузка, а суточный
инкремент уже сформирован."""

WEEKLY_FULL_CRON = "0 4 * * 1"
"""Полный цикл раз в неделю. §9 предписывает ежемесячный scoring; на
пилоте недельный шаг позволяет быстрее заметить ошибки методологии,
а в production частота согласуется с SLA обновления."""


async def register(query: str = "artificial intelligence") -> None:
    await ingestion_flow.to_deployment(
        name="daily-ingestion",
        cron=DAILY_INGESTION_CRON,
        parameters={"query": query, "mode": "incremental"},
        tags=["eti", "ingestion"],
    ).apply()

    await full_refresh_flow.to_deployment(
        name="weekly-full-refresh",
        cron=WEEKLY_FULL_CRON,
        parameters={"query": query, "mode": "incremental"},
        tags=["eti", "scoring"],
    ).apply()


if __name__ == "__main__":
    asyncio.run(register())
