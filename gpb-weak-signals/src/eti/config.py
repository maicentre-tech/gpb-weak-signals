"""Конфигурация сервиса.

Все параметры методологии, помеченные в ТЗ как HYPOTHESIS (§36), вынесены сюда
и версионируются: смена значения обязана порождать новый ``scoring_version``,
а не молча менять исторические результаты (§21.5, ADR-005).
"""

from __future__ import annotations

from functools import lru_cache

from pydantic import Field, PostgresDsn
from pydantic_settings import BaseSettings, SettingsConfigDict


class ScoringParams(BaseSettings):
    """Параметры расчёта. §24.24 «Рекомендуемая конфигурация параметров».

    Значения — стартовые гипотезы, подлежащие калибровке на экспертной
    выборке (§28, ADR-005). Не использовать как утверждённую методологию.
    """

    model_config = SettingsConfigDict(env_prefix="ETI_SCORING_")

    scoring_version: str = "0.1.0-baseline"

    # --- Окна анализа (§29.3) -------------------------------------------
    dynamics_window_months: int = 36
    """Окно динамики: growth, acceleration, current momentum."""

    indexing_lag_months: int = 6
    """Сколько последних месяцев исключать из окон динамики.

    **Дополнение к ТЗ.** §29.3 описывает левую цензуру — отсутствие данных
    до начала покрытия источника. Правая цензура не описана вовсе, хотя
    она сильнее искажает результат: свежие публикации ещё не проиндексированы,
    последние месяцы всегда выглядят провалом, и growth/acceleration читают
    это как спад. Пострадают именно самые быстрорастущие технологии — то
    есть ровно те, ради которых система строится.

    Измерено на пилотном корпусе: январь 2026 — 28 публикаций, август — 1,
    при равномерном потоке в предыдущие месяцы.

    Значение подлежит эмпирической оценке по каждому источнику: сравнением
    числа документов за один и тот же месяц в последовательных снапшотах.
    6 — стартовая оценка для OpenAlex, а не измеренная константа."""

    historical_baseline_years: int = 15
    """Глубина корпуса для novelty/saturation. Минимум по ADR-003 — 10 лет."""

    aggregation_period: str = "month"

    # --- Пороги обнаружения (§24.3, §24.18) ------------------------------
    min_annual_volume: int = 5
    min_source_families: int = 2
    novelty_lambda: float = 0.35
    """Коэффициент затухания в NoveltyRaw = exp(-lambda * age_years)."""

    volume_shrinkage_enabled: bool = True
    volume_shrinkage_k: float = 5.0
    """Усадка прироста для малых выборок — дополнение к §24.4.

    Без неё кластер из 3 документов получает growth выше, чем реальный рост
    3 000 → 10 000. Подробности и обоснование — в
    ``eti.scoring.normalize.volume_shrinkage``. Параметр входит в
    scoring_version и подлежит калибровке наравне с весами."""

    # --- Веса ETS (§24.13) — HYPOTHESIS ----------------------------------
    ets_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "novelty": 0.15,
            "growth": 0.15,
            "acceleration": 0.15,
            "research": 0.15,
            "patent": 0.08,
            "citation": 0.07,
            "market": 0.10,
            "adoption": 0.08,
            "cross_domain": 0.07,
        }
    )

    # --- Веса Maturity (§24.12) ------------------------------------------
    maturity_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "age": 0.30,
            "saturation": 0.25,
            "commercialization": 0.20,
            "adoption": 0.15,
            "inverse_acceleration": 0.10,
        }
    )

    # --- Веса Evidence Confidence (§24.14) -------------------------------
    confidence_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "source_diversity": 0.30,
            "claim_source_coverage": 0.25,
            "entity_mapping_confidence": 0.20,
            "data_freshness": 0.15,
            "source_quality": 0.10,
        }
    )

    # --- Strategic Relevance (§24.15) ------------------------------------
    strategic_manual_weight: float = 0.70
    strategic_semantic_weight: float = 0.30

    # --- Entity resolution (§24.21) --------------------------------------
    mapping_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "semantic_similarity": 0.30,
            "taxonomy_match": 0.20,
            "alias_match": 0.15,
            "cooccurrence_similarity": 0.15,
            "organization_overlap": 0.10,
            "link_graph_signal": 0.10,
        }
    )
    mapping_auto_accept: float = 0.85
    mapping_review_floor: float = 0.65

    unreviewed_review_band_weight: float = 0.5
    """Вес маппинга из полосы human review, который эксперт ещё не посмотрел.

    В ТЗ правило отсутствует (открытый вопрос №6 к заказчику). Дефолт:
    учитывать с половинным весом и снижать EvidenceConfidence, вместо
    того чтобы молча считать его подтверждённым или выбрасывать.
    """

    # --- Отбор TOP-N (§24.20) --------------------------------------------
    top_n: int = 15
    min_evidence_confidence: float = 60.0
    allowed_maturity: list[str] = Field(
        default_factory=lambda: ["Nascent", "Emerging", "Growth"]
    )
    diversification_enabled: bool = False
    """§24.20: constraint опционален — иначе вытесняет реальные концентрации."""
    diversification_max_per_parent: int = 5

    # --- Веса источников (§24.17) ----------------------------------------
    source_weights: dict[str, float] = Field(
        default_factory=lambda: {
            "preprints": 1.00,
            "research": 1.00,
            "patent_priority": 0.90,
            "patent_publication": 0.60,
            "rd": 0.90,
            "open_source": 0.80,
            "companies": 0.90,
            "web_news": 0.40,
        }
    )


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_prefix="ETI_", env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    environment: str = "local"
    debug: bool = True
    # Block API operations that change shared state in public mode.
    public_read_only: bool = False
    # Keep production corpus endpoints closed until source rights are approved.
    public_data_enabled: bool = False
    # Live discovery is opt-in and reserved for an isolated local expert setup.
    expert_live_search_enabled: bool = False
    sql_echo: bool = False
    """Логирование SQL. Включать точечно: ETI_SQL_ECHO=true."""

    database_url: PostgresDsn = Field(
        default="postgresql+psycopg://eti:eti@localhost:5432/eti"  # type: ignore[arg-type]
    )
    embedding_dimensions: int = 1024
    """multilingual-e5-large / BGE-M3 → 1024. Фиксируется вместе с моделью."""

    # --- Контакт для polite pool OpenAlex -------------------------------
    contact_email: str | None = None
    """Не отправлять фиктивный адрес; OpenAlex API работает и без mailto."""

    user_agent: str = "ETI/0.1 (Emerging Technology Intelligence)"

    # --- Учётные данные источников ---------------------------------------
    github_token: str | None = None
    semantic_scholar_key: str | None = None
    cordis_api_key: str | None = None
    epo_ops_key: str | None = None
    epo_ops_secret: str | None = None

    # --- LLM gateway (§12, §21.2) -----------------------------------------
    llm_base_url: str = "http://localhost:11434/v1"
    llm_model: str = "qwen2.5:14b-instruct"
    llm_api_key: str | None = None

    raw_storage_path: str = "./data/raw"

    scoring: ScoringParams = Field(default_factory=ScoringParams)


@lru_cache
def get_settings() -> Settings:
    return Settings()
