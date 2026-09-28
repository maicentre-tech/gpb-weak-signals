# ETI — архитектура, стек и эксплуатация

Срез проверен: **28 сентября 2026**. ETI-приложение находится в `gpb-weak-signals/`; эта страница описывает его и отделяет от других приложений Replit workspace.

## Ссылки и текущая публикация

- [Опубликованный ETI Jury Stand](https://gpb-weak-signals.replit.app/)
- [Локальный запуск и ограничения приложения](../gpb-weak-signals/README.md)
- [Replit-конфигурация ETI-артефакта](../artifacts/eti-jury-stand/.replit-artifact/artifact.toml)
- [Срез приёмки от 26 сентября](../gpb-weak-signals/docs/final-acceptance.md) — исторический отчёт, а не live-статус deployment.

На момент проверки Replit сообщал об успешной последней сборке и публичном autoscale deployment. `GET /`, `GET /api/v1/health`, `GET /api/v1/sources/status` и общий health endpoint `GET /api/healthz` отвечали `200`. Корень отдавал страницу с заголовком “Emerging Technology Intelligence”; ETI health сообщал `status: ok`, `database: ok` и `public_read_only: true`.

Публичные `/docs` и `/openapi.json` на deployment возвращают `404`. Интерактивная документация FastAPI доступна при локальном запуске на `http://127.0.0.1:8000/docs`; не используйте её как публичную ссылку. Проверки статуса и маршрутов сделаны 28 сентября 2026 и могут устареть после следующей публикации.

## Что находится в workspace

| Компонент | Назначение |
|---|---|
| [`gpb-weak-signals/`](../gpb-weak-signals/README.md) | ETI-продукт: Next.js UI, FastAPI, PostgreSQL/pgvector и обработка данных. |
| [`artifacts/eti-jury-stand/`](../artifacts/eti-jury-stand/.replit-artifact/artifact.toml) | Replit-артефакт, который собирает ETI UI и маршрутизирует ETI API. |
| [`artifacts/api-server/`](../artifacts/api-server/src/app.ts) | Отдельный общий Express API workspace. Его `/api/healthz` не является ETI FastAPI. |
| [`lib/api-spec/openapi.yaml`](../lib/api-spec/openapi.yaml) | OpenAPI-схема общего Express API; она не описывает ETI API. |
| `artifacts/eti-jury-presentation/` | Отдельная презентация, не часть ETI backend. |

## Архитектура ETI

```text
Научные, технологические и новостные источники
        ↓
Адаптеры sources → ingestion и контроль повторов/лимитов
        ↓
Нормализация → ontology/entity resolution
        ↓
Метрики и scoring snapshot
        ↓
Отбор evidence и проверка claims
        ↓
FastAPI (/api/v1) ← Next.js интерфейс
        ↕
PostgreSQL 16 + pgvector
```

- `sources/` содержит адаптеры источников; `ingestion/` обеспечивает общую обработку данных.
- `ontology/` сопоставляет названия и алиасы технологий; `scoring/` рассчитывает измеримые показатели.
- `rag/` собирает карточки из отобранных evidence и проверяет claims по источникам.
- Обычный запрос читает заранее рассчитанный snapshot; он не запускает полный pipeline заново. В изолированном локальном экспертном режиме неизвестное направление может создать фоновую задачу.
- ML и статистика отвечают за обнаружение, сопоставление и ранжирование. LLM необязательна и используется только для структурированного объяснения на основе уже отобранного evidence.

Подробности реализации: [`FastAPI app`](../gpb-weak-signals/src/eti/api/app.py), [основные маршруты](../gpb-weak-signals/src/eti/api/routes.py), [экспертное ревью](../gpb-weak-signals/src/eti/api/review.py).

## Технологический стек

### ETI-приложение

- Python `>=3.12`; FastAPI, Uvicorn, Pydantic.
- PostgreSQL 16 с `pgvector`; SQLAlchemy, Alembic и `psycopg`.
- Численные компоненты: NumPy, pandas, SciPy, scikit-learn и joblib.
- Next.js `^16.3.5`, React 19, TypeScript 5.7.3, Recharts; frontend-контейнер использует Node.js 22.
- Docker Compose v2 поднимает базу, bootstrap/migrations, API и frontend. Опциональные группы Python-зависимостей: `nlp` и `orchestration` (Prefect).
- Точные декларации зависимостей: [`pyproject.toml`](../gpb-weak-signals/pyproject.toml) и [`frontend/package.json`](../gpb-weak-signals/frontend/package.json).

### Replit workspace

Workspace также содержит отдельную pnpm/Node.js 24 основу с TypeScript 5.9, Express 5, Drizzle, Zod, Orval и esbuild. Это хостовый слой и другие артефакты, а не стек ETI FastAPI. Не путайте общий `/api/healthz` с `/api/v1/health` ETI.

## Локальный запуск

Рекомендуемый вариант — Docker Compose. Команды выполняются из корня репозитория:

```bash
cd gpb-weak-signals
cp .env.example .env
openssl rand -hex 24
# Поместите случайное значение в ETI_POSTGRES_PASSWORD внутри .env.
docker compose up --build
```

- UI: `http://127.0.0.1:3000`
- ETI API: `http://127.0.0.1:8000`
- Health: `http://127.0.0.1:8000/api/v1/health`
- Интерактивная API-документация: `http://127.0.0.1:8000/docs`
- Быстрая проверка: `curl -fsS http://127.0.0.1:8000/api/v1/health`

Compose привязывает UI и API к loopback. Для остановки используйте `docker compose down`; named volume базы при этом сохраняется. Не используйте `docker compose down -v` или удаление volume для обычного завершения работы — это удалит данные. Нативный запуск без Docker описан в [README приложения](../gpb-weak-signals/README.md).

## Replit: сборка и публикация

Настройки ETI-публикации находятся в [`artifact.toml`](../artifacts/eti-jury-stand/.replit-artifact/artifact.toml): web-сервис обслуживает `/`, FastAPI — `/api/v1`, startup health path — `/api/v1/health`. Frontend собирается через `npm ci` и `npm run build -- --webpack`; API-зависимости устанавливаются через `uv pip` в выбранный Python runtime. Публикацию запускают из Replit Publishing.

На проверенную дату deployment работал по адресу [gpb-weak-signals.replit.app](https://gpb-weak-signals.replit.app/); ETI health и статус источников отвечали `200`. Полная интерактивная OpenAPI-страница через публичный host не опубликована. После новой публикации повторно проверьте build status, корневую страницу и `/api/v1/health`; не переносите старый результат проверки на новую сборку.

## API

Основной ETI router имеет префикс `/api/v1`. Ниже — основные маршруты, объявленные FastAPI:

| Метод | Маршрут | Назначение |
|---|---|---|
| `GET` | `/api/v1/health` | Состояние API, базы и snapshot. |
| `GET` | `/api/v1/signals/stats` | Сводные показатели текущего scoring snapshot. |
| `POST` | `/api/v1/query` | Поиск по подготовленному snapshot; формат ответа включает результаты и предупреждения. |
| `GET` | `/api/v1/jobs/{job_id}` | Статус результата фонового поиска в экспертном режиме. |
| `GET` | `/api/v1/trends/{technology_id}` | Карточка технологии, метрики и evidence. |
| `GET` | `/api/v1/trends/{technology_id}/timeline` | Временной ряд метрик. |
| `GET` | `/api/v1/trends/{technology_id}/signals` | Профиль сигналов. |
| `GET` | `/api/v1/trends/{technology_id}/sources` | Источники и происхождение данных. |
| `GET` | `/api/v1/sources/status` | Статус реестра и загрузок источников. |
| `GET` | `/api/v1/models` | Доступные модели. |
| `GET` | `/api/v1/review/queue` | Очередь экспертной проверки связей. |
| `GET` / `POST` | `/api/v1/review/...` | Чтение и операции экспертной разметки; см. `review.py` и локальный `/docs`. |

С публичным `ETI_PUBLIC_READ_ONLY=true` изменяющие HTTP-методы блокируются, кроме `POST /api/v1/query`. В этом режиме query использует snapshot и не создаёт live-search задания. Read-only — **не аутентификация**: пользовательские учётные записи и SSO не настроены, а GET-маршруты не следует считать закрытыми. Не помещайте в публичную базу данные, которые нельзя показывать без входа.

## Ограничения и статус данных

- Чистый Docker Compose создаёт схему, реестр источников и пилотную онтологию, но не загружает одобренный корпус или scoring snapshot. Snapshot-зависимый запрос на пустой базе не даст полноценную демо-выдачу.
- Материалы организаторов включены по указанию пользователя проекта. Публичная доступность репозитория не назначает им лицензию и не предоставляет дополнительных прав на повторное использование; соблюдайте исходные условия правообладателей.
- Перед подключением новых источников отдельно проверяйте условия их использования. Публичный endpoint не подтверждает лицензию или право повторно распространять полученные данные.
- Отчёт [final acceptance от 26 сентября](../gpb-weak-signals/docs/final-acceptance.md) фиксирует состояние на свою дату и содержит старую проверку deployment-маршрутов. Текущее состояние проверено выше 28 сентября; для новых изменений проверку нужно повторить.