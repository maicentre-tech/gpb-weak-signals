"""Приложение FastAPI."""

from __future__ import annotations

from fastapi import FastAPI

from eti.api.review import router as review_router
from eti.api.routes import router
from eti.config import get_settings

settings = get_settings()

app = FastAPI(
    title="Emerging Technology Intelligence",
    version="0.1.0",
    description=(
        "Evidence-first платформа раннего обнаружения научно-технологических "
        "трендов. ML и статистика отвечают за обнаружение и ранжирование, "
        "LLM — только за объяснение на основании отобранного evidence."
    ),
)
app.include_router(router)
app.include_router(review_router)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "eti", "docs": "/docs", "api": "/api/v1"}
