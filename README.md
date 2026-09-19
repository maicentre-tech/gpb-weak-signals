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
| [docs/original/](docs/original/) | Исходные материалы: PDF организаторов, размеченный датасет, версии ТЗ |

> Репозиторий закрытый: содержит материалы, предоставленные организаторами хакатона.

## Статус

| Слой | Состояние |
|---|---|
| Схема БД + миграции | готово, 25 таблиц |
| Ingestion (OpenAlex, arXiv, GitHub, GDELT) | готово, 835 документов |
| Entity resolution | готово, 483 связи |
| Scoring: формулы, нормализация, missing ≠ zero | готово |
| RAG + claim verifier | готово |
| FastAPI + экспертное ревью | готово, 18 эндпоинтов |
| Frontend (Next.js) | готово |
| LLM-генерация (qwen2.5:3b через Ollama) | готово |
| Оркестрация (Prefect) | готово |
| **ML-модель на датасете (AC-01)** | **не начато** |
| **Открытый поиск без онтологии (AC-03)** | **не выполнено** |
| **Русскоязычная выдача (AC-05)** | **не выполнено** |
| **Docker (AC-09)** | **не начато** |

Тестов: 119. Подробная сверка с acceptance criteria — в [ROADMAP](docs/ROADMAP.md).

## Требования

- Python 3.12+
- PostgreSQL 16+ с pgvector
- Node 20+ (для UI)
- Ollama с локальной моделью (опционально, для русскоязычных карточек)

## Установка

```bash
python3.12 -m venv .venv
.venv/bin/pip install -e ".[dev,nlp]"
cp .env.example .env    # заполнить ETI_CONTACT_EMAIL и токены
```

PostgreSQL (macOS/Homebrew — pgvector собран под 17/18, не под 16):

```bash
brew install postgresql@17 pgvector
LC_ALL=en_US.UTF-8 pg_ctl -D /opt/homebrew/var/postgresql@17 start
createdb eti && psql -d eti -c "CREATE EXTENSION vector"
```

## Запуск

```bash
alembic upgrade head
python scripts/seed_sources.py
python scripts/seed_ontology.py
python scripts/run_flow.py full --query "agentic AI" --sources openalex,github
uvicorn eti.api.app:app --port 8000     # http://localhost:8000/docs
npm --prefix frontend run dev            # http://localhost:3000
pytest
```

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
