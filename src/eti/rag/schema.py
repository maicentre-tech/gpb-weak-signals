"""Структура аналитической карточки тренда (§9, DAG 4).

LLM обязана вернуть строго эту структуру. Свободный текст не принимается:
непроверяемый абзац нельзя ни сверить с источниками, ни показать в
provenance-панели.

Ключевое поле — ``source_doc_ids`` у каждого утверждения. §9 формулирует
жёсткое правило: «Every quantitative claim must point to source IDs».
Проверяется это не доверием к модели, а верификатором до записи в БД.
"""

from __future__ import annotations

import re
import uuid

from pydantic import BaseModel, Field, field_validator

INSUFFICIENT_EVIDENCE = "Недостаточно данных"
"""§12: при нехватке evidence поле заполняется этой строкой, а не
правдоподобной догадкой."""

NUMERIC_PATTERN = re.compile(
    r"""
    (?<!\w)
    (?:
        \d[\d\s.,]*\s*(?:%|процент\w*)      # доли
      | \d[\d\s.,]*\s*(?:раз|x|×)           # кратность
      | (?:19|20)\d{2}                      # годы
      | \d[\d\s.,]{2,}                      # многозначные числа
      | \d+                                 # любое число
    )
    (?!\w)
    """,
    re.VERBOSE | re.UNICODE,
)

HEDGE_WORDS = (
    "вероятно", "по-видимому", "скорее всего", "возможно", "как известно",
    "считается", "эксперты полагают", "многие", "большинство", "значительно",
)
"""Обороты, за которыми обычно прячется утверждение без источника.

Не запрещены — но требуют подтверждения наравне с числами: «значительно
вырос» так же непроверяемо, как «вырос на 40 %», и так же не должно
попадать в карточку без ссылки."""


class Claim(BaseModel):
    """Одно утверждение с привязкой к основанию.

    Оснований бывает два вида, и ТЗ их не различает. §9 требует, чтобы
    «каждое количественное утверждение указывало на source IDs», но
    количественные утверждения неоднородны:

    * **Факт из источника** — «рассмотрено 342 работы». Основание —
      конкретный документ, и число обязано в нём встречаться.
    * **Рассчитанный показатель** — «показатель роста 75 из 100».
      Основание — собственный расчёт системы; в документах такого числа
      нет и быть не может.

    Смешивать их нельзя в обе стороны. Требовать документ для
    рассчитанного показателя — значит запретить системе сообщать
    собственные результаты. Ослабить требование для всех — значит открыть
    модели путь протаскивать выдуманные числа, объявив их метриками.

    Поэтому у утверждения ровно одно основание: либо ``source_doc_ids``,
    либо ``metric_provenance`` с версией расчёта.
    """

    text: str
    source_doc_ids: list[uuid.UUID] = Field(default_factory=list)
    claim_type: str = "statement"
    metric_provenance: str | None = None
    """Версия расчёта для утверждений о собственных метриках, например
    ``scoring_version=0.1.0-baseline``. Заполняется системой, не моделью."""

    @field_validator("text")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()

    @property
    def is_quantitative(self) -> bool:
        """Содержит ли утверждение проверяемую количественную часть."""
        if NUMERIC_PATTERN.search(self.text):
            return True
        lowered = self.text.casefold()
        return any(hedge in lowered for hedge in HEDGE_WORDS)

    @property
    def is_insufficient(self) -> bool:
        return self.text.strip() == INSUFFICIENT_EVIDENCE

    @property
    def is_metric_claim(self) -> bool:
        return self.claim_type == "metric" or self.metric_provenance is not None


class TrendCard(BaseModel):
    """Карточка тренда — структурированный ответ LLM (§9)."""

    technology: str
    problem: Claim
    advantage: Claim
    case: Claim
    evidence: list[Claim] = Field(default_factory=list)
    caveats: list[Claim] = Field(default_factory=list)
    confidence: float = 0.0

    def all_claims(self) -> list[Claim]:
        return [self.problem, self.advantage, self.case, *self.evidence, *self.caveats]
