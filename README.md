# ETI — Emerging Technology Intelligence

Evidence-first платформа раннего обнаружения научно-технологических трендов.
Реализация хакатонного ТЗ «Emerging Technology Intelligence» v1.5.

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
| Frontend (Next.js 16 + React 19) | готово: поиск, TOP-N, карточка, радар, timeline, provenance, статус источников |
| LLM-генерация карточек | проверено на qwen2.5:3b через Ollama, 5/5 валидного JSON |
| P0-классификатор слабых сигналов | готов baseline: 100 экспертных положительных примеров + открытые контрпримеры зрелости, хайпа и шума; локальные объяснения по признакам |
| Docker Compose | готово: PostgreSQL/pgvector, FastAPI и Next.js |
| Экспертное ревью (§21.1) | API — все 8 операций; UI — 3 из 8 |
| Оркестрация (Prefect) | готово: 3 потока + сквозной, расписания §9 |

### Покрытие требований §21.1 (human-in-the-loop)

| Операция | API | UI |
|---|---|---|
| Подтверждение связи | да | да |
| Отклонение связи | да | да |
| Переназначение на другую технологию | да | да |
| Объединение технологий | да | нет |
| Разделение технологии | да | нет |
| Правка названия и алиасов | да | нет |
| Оценка качества evidence | да | нет |
| Разметка Emerging / Not Emerging / Mature | да | нет |

Три операции, доступные в интерфейсе, закрывают поток разбора очереди —
он измеряется сотнями связей и работает с клавиатуры. Остальные пять
вызываются через API и требуют экранов, которых пока нет.

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

## Быстрый запуск в Docker

Требуется Docker Desktop. Контейнеры поднимают PostgreSQL с pgvector, API и
русскоязычный web-интерфейс:

```bash
docker compose up --build
```

После старта: UI — `http://localhost:3000`, OpenAPI — `http://localhost:8000/docs`.
Первичная инициализация данных выполняется из контейнера API:

```bash
docker compose exec api alembic upgrade head
docker compose exec api python scripts/seed_sources.py
docker compose exec api python scripts/seed_ontology.py
```

Перед демонстрацией обучите модель: каталог `artifacts/` автоматически
монтируется в API-контейнер. Без файла модели система продолжает применять
проверяемые фильтры зрелости, хайпа и шума, но показывает отсутствие ML-оценки.

## Обучение P0-классификатора

Датасет организаторов содержит 100 положительных экспертных примеров. Для
классификации бинарный baseline дополняет их явно помеченными контрпримерами
трёх обязательных для отсечения классов: зрелые технологии, маркетинговый
хайп и информационный шум. Эти контрпримеры не выдаются за разметку
организаторов; их можно расширять в `src/eti/ml/signal_classifier.py`.

```bash
python scripts/train_signal_classifier.py \
  "/path/to/100_слабых_технологических_сигналов_сентябрь_2026.xlsx"
```

Команда сохраняет `artifacts/signal_classifier.joblib` и
`artifacts/signal_classifier_report.json` с Accuracy, Precision, Recall и
F1. В отчёте явно указано, что финальное прохождение порога 75–80% возможно
подтвердить только на закрытой выборке жюри. Для каждого решения доступны
вероятность и вклад токенов (ключевые предикторы), а не непрозрачный балл.

После первого scoring-прогона сформируйте негативы из собственного корпуса
для ручной проверки и следующего цикла обучения:

```bash
python scripts/build_corpus_negatives.py
```

Скрипт включает только кандидатов, которые объяснимо исключены как зрелые,
хайп или шум; происхождение каждого примера фиксируется в JSON.

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

# то же самое одним потоком, в правильном порядке
python scripts/run_flow.py full --query "agentic AI" --sources openalex,github
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
