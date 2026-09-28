# ETI — Emerging Technology Intelligence

Сервис автоматизированного выявления **слабых научно-технологических сигналов**.
Хакатон Газпромбанк.Тех, 2026.

**Архитектурный принцип:** ML и статистика отвечают за обнаружение, сопоставление и
ранжирование; LLM — только за структурированное объяснение на основании заранее
отобранного evidence. Технология не попадает в выдачу потому, что «её нашла модель
в тексте» — сначала она должна быть подтверждена измеримыми временными сигналами
со ссылками на первоисточники.

## Документы

| Документ | Назначение |
|---|---|
| [docs/tz/v1.5-hackathon.md](docs/tz/v1.5-hackathon.md) | Действующее ТЗ |
| [docs/tz/original-brief.md](docs/tz/original-brief.md) | Расшифровка оригинального ТЗ Газпромбанк.Тех |
| [docs/ROADMAP.md](docs/ROADMAP.md) | **Что сделано и что доработать** |
| [docs/limitations.md](docs/limitations.md) | Дефекты методологии, найденные на реальных данных |
| [docs/ml-evaluation.md](docs/ml-evaluation.md) | Negative candidate review и протокол ML-валидации |
| [docs/original/](docs/original/) | Исходные материалы: PDF организаторов, размеченный датасет, версии ТЗ |

> Репозиторий закрытый: содержит материалы, предоставленные организаторами хакатона.

## Статус

| Слой | Состояние |
|---|---|
| Схема БД + миграции | Compose применяет `alembic upgrade head`; миграции не удаляют данные |
| Реестр источников + пилотная онтология | Загружаются при старте; существующие значения сохраняются |
| Ingestion (OpenAlex, arXiv, GitHub, GDELT) | Адаптеры есть; чистый Compose не скачивает документы |
| Corpus / scoring snapshot | Не включён; новая БД остаётся без документов и snapshot |
| Entity resolution, scoring, RAG | Реализованы; требуют загруженного корпуса/snapshot |
| FastAPI + экспертное ревью | Реализованы |
| Frontend (Next.js) | Реализован |
| LLM-генерация | Опциональна; Compose не запускает Ollama |
| Оркестрация (Prefect) | Опциональная зависимость для pipeline |
| Docker (API + UI + pgvector, healthcheck) | Compose поднимает локальный стенд и ждёт готовности API |
| Фильтры зрелости, хайпа и шума | Реализованы для snapshot-выдачи |
| Счётчик сигналов с confidence >75% | Рассчитывается только при наличии scoring snapshot |
| ML-проверка | grouped nested CV, OOF-калибровка и ablation готовы; корпусные негативы требуют DB и экспертной разметки |
| **Открытый поиск без онтологии (AC-03)** | **Ограниченный review-only поиск; P0-покрытие неполное, ML-confidence не рассчитывается** |
| **Русскоязычная выдача (AC-05)** | **Показывается только резюме, предоставленное источником; переводчик не подключён** |
| **Презентация (AC-11)** | **не начато** |

`data/benchmark_weak_signals_2026_09.json` — benchmark для ML-оценки, не снимок
базы demo-стенда. Он не загружается как live-корпус. Числа документов и связей
показываются только из фактически загруженной базы; чистый Compose их не выдумывает.

Результаты на 18 illustrative seed-негативах не являются доказательством качества:
source-only и rationale-only ablation почти полностью разделяют классы. Подробности
и команды — в [протоколе ML-проверки](docs/ml-evaluation.md). Сверка acceptance
criteria — в [ROADMAP](docs/ROADMAP.md).

## Стенд для жюри: локальный запуск

```bash
cp .env.example .env
openssl rand -hex 24    # вставить результат в ETI_POSTGRES_PASSWORD в .env
docker compose up --build
```

Нужны Docker Engine и Docker Compose v2; Python, Node.js и PostgreSQL на хосте
не требуются. Compose ждёт готовности PostgreSQL, применяет миграции, безопасно
заполняет недостающие записи реестра источников и пилотной онтологии, затем
запускает API и UI.

Стенд привязан к loopback-интерфейсу и предназначен для локальной демонстрации:

```bash
UI:        http://127.0.0.1:3000
API health: http://127.0.0.1:8000/api/v1/health
API docs:   http://127.0.0.1:8000/docs
```

```bash
docker compose ps
curl -fsS http://127.0.0.1:8000/api/v1/health
```

Перед live-запросами к внешним API задайте в `.env` рабочий `ETI_CONTACT_EMAIL`
команды и только необходимые одобренные credentials. Не публикуйте этот Compose
стенд в интернет: UI и API не имеют пользовательской аутентификации. Для удалённого
доступа жюри потребуется отдельное согласование площадки и проверка безопасности.

### Ограничение чистого запуска

В репозитории нет одобренного DB snapshot и воспроизводимого импорта полного
демо-корпуса. Поэтому после первого запуска схема, источники и пилотная онтология будут
готовы, но документов и scoring snapshot не будет (`latest_scoring: null` в health).
Запрос, которому нужен snapshot, вернёт 503; пройти весь сценарий до карточки,
фильтров и первоисточников на пустой базе пока нельзя. Benchmark JSON не подменяет
DB snapshot, а synthetic scores/evidence не создаются.

`docker compose down` останавливает сервисы, но сохраняет named volume базы.
Не используйте `docker compose down -v` или `docker volume rm` для устранения проблем:
это удалит данные. `alembic upgrade head` выполняется только вперёд.
Для существующего volume сохраняйте прежний `ETI_POSTGRES_PASSWORD`: изменение
переменной в `.env` само по себе не меняет пароль уже созданной роли PostgreSQL.

## Локальная разработка без Docker (опционально)

```bash
python3.12 -m venv .venv
.venv/bin/pip install -e ".[dev]"
cp .env.example .env
# Настроить ETI_DATABASE_URL для локального PostgreSQL с pgvector.
alembic upgrade head
python scripts/seed_sources.py --preserve-existing
python scripts/seed_ontology.py data/ontology/ai_pilot.json --preserve-existing
.venv/bin/uvicorn eti.api.app:app --port 8000
```

Для Prefect flows установите `.[orchestration]`; для embedding/clustering — `.[nlp]`.
UI требует Node.js 22 (см. `frontend/Dockerfile`): `npm ci --prefix frontend`,
затем `npm --prefix frontend run dev`. Для тестов: `.venv/bin/pytest`.

## Устройство

```
src/eti/
  config.py      параметры методологии; всё, помеченное как HYPOTHESIS
  db/            модель данных с битемпоральностью и point-in-time
  sources/       коннекторы: как достать и как нормализовать
  ingestion/     общая обвязка: идемпотентность, лимиты, чекпоинты, DLQ
  scoring/       формулы — чистые функции, без обращений к БД
  ontology/      entity resolution
  rag/           отбор evidence, сборка карточек, claim verifier
  api/           FastAPI + экспертное ревью
  flows/         оркестрация Prefect
frontend/        Next.js: поиск, карточка тренда, provenance
```

Коннектор знает только про свой источник. Всё, что обеспечивает воспроизводимость и
устойчивость, живёт в `ingestion` и одинаково для всех источников — поэтому
подключение нового источника сводится к одному классу, а не к новому пайплайну.
