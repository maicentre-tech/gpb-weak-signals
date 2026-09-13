# ETI — Emerging Technology Intelligence

Evidence-first платформа раннего обнаружения научно-технологических трендов.
Реализация ТЗ «Emerging Technology Intelligence» v1.4.

**Архитектурный принцип:** ML и статистика отвечают за обнаружение,
сопоставление и ранжирование; LLM — только за структурированное объяснение
на основании заранее отобранного evidence. Тренд не попадает в выдачу
потому, что его «нашла модель в тексте» — сначала он должен быть подтверждён
измеримыми временными сигналами со ссылками на источники.

## Статус

Вертикальный срез (пилот): направление «Технологии в ИИ», открытые источники.

| Слой | Статус |
|---|---|
| Схема БД + миграции | готово, 22 таблицы |
| Ingestion-фреймворк | готово (идемпотентность, чекпоинты, DLQ, аудит) |
| Коннектор OpenAlex | готово, проверен на живом API |
| Коннекторы arXiv / GitHub / GH Archive / PatentsView | в работе |
| Scoring §24.1–24.12 | формулы готовы, пайплайн в работе |
| Entity resolution | не начат |
| RAG + claim verifier | не начат |
| API + frontend | не начат |

Расхождения с ТЗ и найденные в нём дефекты — в [docs/limitations.md](docs/limitations.md).

## Требования

- Python 3.12+
- PostgreSQL 16+ с расширением pgvector

## Установка

```bash
python3.12 -m venv .venv
.venv/bin/pip install -e ".[dev]"
cp .env.example .env    # заполнить ETI_CONTACT_EMAIL и токены
```

Postgres (macOS/Homebrew — pgvector собран под 17/18, не под 16):

```bash
brew install postgresql@17 pgvector
LC_ALL=en_US.UTF-8 pg_ctl -D /opt/homebrew/var/postgresql@17 start
createdb eti && psql -d eti -c "CREATE EXTENSION vector"
```

## Запуск

```bash
alembic upgrade head
python scripts/seed_sources.py
python scripts/ingest.py openalex --query "agentic AI" --mode backfill --cursor 2015-01-01 --limit 400
pytest
```

## Устройство

```
src/eti/
  config.py      параметры методологии; всё, помеченное в ТЗ как HYPOTHESIS
  db/            модель данных (§32.1 + битемпоральность)
  sources/       коннекторы: как достать и как нормализовать
  ingestion/     общая обвязка: идемпотентность, лимиты, чекпоинты, DLQ
  scoring/       формулы §24 — чистые функции, без обращений к БД
  ontology/      entity resolution
  rag/           evidence retrieval и claim verifier
  api/           FastAPI
```

Коннектор знает только про свой источник. Всё, что обеспечивает
воспроизводимость и устойчивость, живёт в `ingestion` и одинаково для всех
источников — поэтому подключение EPO OPS, когда появятся учётные данные,
сводится к одному новому классу, а не к новому пайплайну.
