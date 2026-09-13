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
| Коннектор GitHub | готово, проверен на живом API |
| Коннектор arXiv | готово, парсер под тестом; живая проверка ждёт снятия IP-кулдауна |
| Коннектор GDELT | готово, проверен на живом API, с фильтром релевантности |
| Peer groups из таксономии OpenAlex | готово (104 группы) |
| Аудит охвата источников | готово |
| Коннекторы PatentsView / GH Archive / CORDIS | не начаты |
| Entity resolution | готово (детерминированные сигналы; семантика ждёт embedding-модели) |
| Агрегация метрик + scoring §24.1–24.20 | готово, проходит насквозь до ранжирования |
| RAG: retrieval, карточки, claim verifier | готово |
| FastAPI (§10) | готово, 9 эндпоинтов |
| Frontend | не начат |
| LLM-генерация карточек | шлюз написан, локальной модели в окружении нет |

Сквозной путь работает: `ingest → mapping → aggregate → scoring → ранжирование`.
Абсолютные значения баллов пока не показательны — популяция для нормализации
меньше минимума §29.4, подключено 2 семейства источников из 7. Система сама
это фиксирует: ни одна технология не проходит порог confidence, и TOP-15
не формируется. Подробности — п. 7–9 в [docs/limitations.md](docs/limitations.md).

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
python scripts/seed_ontology.py
python scripts/ingest.py openalex --query "agentic AI" --mode backfill --cursor 2015-01-01 --limit 400
python scripts/ingest.py github --query "agentic AI agents" --mode backfill --cursor 2016-01-01 --limit 250
python scripts/ingest.py gdelt --query "agentic AI" --mode backfill --cursor 2024-06-01 --limit 400
python scripts/run_mapping.py
python scripts/audit_coverage.py
python scripts/build_peer_groups.py
python scripts/run_scoring.py --as-of 2026-09-13
python scripts/generate_card.py "Agentic"
pytest
uvicorn eti.api.app:app --reload        # http://localhost:8000/docs
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
  rag/           evidence retrieval, сборка карточек, claim verifier
  api/           FastAPI
```

Коннектор знает только про свой источник. Всё, что обеспечивает
воспроизводимость и устойчивость, живёт в `ingestion` и одинаково для всех
источников — поэтому подключение EPO OPS, когда появятся учётные данные,
сводится к одному новому классу, а не к новому пайплайну.
