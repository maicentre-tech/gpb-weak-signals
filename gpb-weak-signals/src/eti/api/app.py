"""Приложение FastAPI."""

from __future__ import annotations

from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

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

_PUBLIC_READ_ONLY_WRITE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}
_PUBLIC_READ_ONLY_ALLOWED_POSTS = {"/api/v1/query"}


@app.middleware("http")
async def enforce_public_read_only(request: Request, call_next):
    if (
        settings.public_read_only
        and request.method in _PUBLIC_READ_ONLY_WRITE_METHODS
        and not (
            request.method == "POST"
            and request.url.path in _PUBLIC_READ_ONLY_ALLOWED_POSTS
        )
    ):
        return JSONResponse(
            status_code=403,
            content={"detail": "Публичный режим: операции изменения данных отключены."},
        )
    if (
        settings.environment == "production"
        and not settings.public_data_enabled
        and request.url.path != "/api/v1/health"
    ):
        return JSONResponse(
            status_code=503,
            content={"detail": "Публичная выдача данных отключена до подтверждения прав на источники."},
        )
    return await call_next(request)


@app.get("/")
async def root() -> dict[str, str]:
    return {"service": "eti", "docs": "/docs", "api": "/api/v1"}
