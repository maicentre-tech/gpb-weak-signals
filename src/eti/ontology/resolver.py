"""Entity resolution: источник → каноническая технология (§6, §24.21).

MappingScore складывается из шести сигналов с весами §24.21. На пилоте
доступны не все: семантическое сходство требует embedding-модели,
co-occurrence и граф ссылок — накопленной истории. Недоступные компоненты
обрабатываются по §24.19 — вес перераспределяется, ноль не подставляется.

**Важная оговорка к §24.19.** Для ETS перераспределение весов безопасно:
это агрегат, и результат остаётся сопоставимым. Для MappingScore — нет.
Если доступны только alias_match (0.15) и taxonomy_match (0.20), то после
нормировки одно совпадение по алиасу даёт 0.43, а совпадение по обоим —
1.0, то есть порог auto-accept 0.85 берётся двумя слабыми сигналами. Это
превращает «автоматически принято» в «почти всё принято автоматически».

Поэтому введён порог покрытия: auto-accept возможен, только если доступные
компоненты покрывают ``min_evidence_weight`` исходного веса. Иначе решение
понижается до human review, каким бы высоким ни был нормированный балл.
Правила в ТЗ нет — это добавление, описанное в docs/limitations.md.
"""

from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass, field

from eti.config import ScoringParams
from eti.db.enums import MappingMethod, MappingStatus, MetricStatus
from eti.scoring.normalize import redistribute_weights

MIN_EVIDENCE_WEIGHT_FOR_AUTO_ACCEPT = 0.45
"""Доля исходного веса §24.21, которая должна быть покрыта доступными
сигналами, чтобы auto-accept имел смысл. 0.45 ≈ семантика + таксономия,
либо таксономия + алиас + ещё один сигнал."""

_PUNCT = re.compile(r"[^\w\s-]", re.UNICODE)
_SPACES = re.compile(r"\s+")

STOPWORD_TOKENS = frozenset(
    {
        "ai", "и", "in", "of", "and", "for", "the", "a", "on", "with", "to",
        "systems", "system", "learning", "models", "model", "technology",
        "technologies", "based", "using", "applications", "методы", "система",
        "системы", "технологии", "модели", "обучение",
    }
)
"""Токены, не несущие различающей силы при сравнении названий тем.

«AI» в названии темы OpenAlex не отличает агентный ИИ от объяснимого —
без этого списка любые две ИИ-технологии получают таксономическое
совпадение друг с другом."""


def normalize_name(value: str) -> str:
    """Нормализация названия: регистр, пунктуация, диакритика, пробелы.

    §6.1 шаг 1. Раскладка Unicode нужна для русских и европейских названий:
    «ё» и «е», составные и предсоставленные формы должны схлопываться.
    """
    text = unicodedata.normalize("NFKC", value).casefold()
    text = text.replace("ё", "е")
    text = _PUNCT.sub(" ", text)
    return _SPACES.sub(" ", text).strip()


@dataclass(slots=True)
class TechnologyCandidate:
    """Кандидат канонической технологии с якорями во внешних таксономиях."""

    technology_id: str
    canonical_name: str
    aliases: set[str] = field(default_factory=set)
    openalex_topics: set[str] = field(default_factory=set)
    arxiv_categories: set[str] = field(default_factory=set)
    github_topics: set[str] = field(default_factory=set)
    cpc_codes: set[str] = field(default_factory=set)

    def normalized_aliases(self) -> set[str]:
        return {normalize_name(a) for a in {self.canonical_name, *self.aliases}}


@dataclass(slots=True)
class MappingDecision:
    technology_id: str
    score: float
    status: MappingStatus
    method: MappingMethod
    components: dict[str, float]
    effective_weights: dict[str, float]
    evidence_coverage: float
    reason: str = ""


class EntityResolver:
    """Сопоставление документа с канонической технологией."""

    def __init__(
        self,
        candidates: list[TechnologyCandidate],
        params: ScoringParams,
        *,
        min_evidence_weight: float = MIN_EVIDENCE_WEIGHT_FOR_AUTO_ACCEPT,
        embedder: object | None = None,
    ) -> None:
        self.candidates = candidates
        self.params = params
        self.min_evidence_weight = min_evidence_weight
        self.embedder = embedder
        self._alias_index: dict[str, list[TechnologyCandidate]] = {}
        for candidate in candidates:
            for alias in candidate.normalized_aliases():
                self._alias_index.setdefault(alias, []).append(candidate)

    # -- Отдельные сигналы ------------------------------------------------

    @staticmethod
    def _alias_match(
        title: str, abstract: str, candidate: TechnologyCandidate
    ) -> float | None:
        """Вхождение алиаса с учётом места и специфичности.

        Две вещи, без которых сигнал бесполезен:

        * **Место.** Технология в заголовке — предмет работы; та же строка
          в абстракте может быть упоминанием смежной области. Обзор
          «AI Agents vs. Agentic AI» ссылается на десяток технологий, но
          посвящён одной.
        * **Специфичность.** «agentic ai» опознаёт технологию, «ai» —
          нет. Аббревиатуры особенно опасны: «rag», «gnn», «tee», «mcp»
          встречаются как обычные слова и дают ложные срабатывания.

        Совпадение ищется по границам слов, иначе «ai» находится внутри
        «said», а «tee» — внутри «between».
        """
        best = 0.0
        for alias in candidate.normalized_aliases():
            if not alias:
                continue
            pattern = rf"(?<!\w){re.escape(alias)}(?!\w)"
            words = len(alias.split())
            is_abbreviation = words == 1 and len(alias) <= 5

            if title and re.search(pattern, title):
                score = 0.55 if is_abbreviation else (0.75 if words == 1 else 0.95)
            elif abstract and re.search(pattern, abstract):
                score = 0.30 if is_abbreviation else (0.45 if words == 1 else 0.70)
            else:
                continue
            best = max(best, score)
        return best or None

    @staticmethod
    def _taxonomy_match(doc_topics: dict, candidate: TechnologyCandidate) -> float | None:
        """Пересечение классификаторов документа и якорей технологии.

        §6.2: OpenAlex Topics — один из якорей, а не master taxonomy,
        поэтому совпадение по нему само по себе не даёт единицу.

        Помимо совпадения кодов сравниваются *названия* тем OpenAlex с
        токенами названия технологии. Без этого у научных документов
        таксономического сигнала нет вообще (кодов OpenAlex в собственной
        онтологии изначально нет — они накапливаются по мере разметки),
        и решение целиком висит на одном alias_match.
        """
        scores: list[float] = []

        code_pairs = [
            (
                {
                    str(t.get("id"))
                    for t in doc_topics.get("openalex_topics", [])
                    if isinstance(t, dict) and t.get("id")
                },
                candidate.openalex_topics,
            ),
            (set(doc_topics.get("arxiv_categories", []) or []), candidate.arxiv_categories),
            (set(doc_topics.get("github_topics", []) or []), candidate.github_topics),
            (set(doc_topics.get("cpc_codes", []) or []), candidate.cpc_codes),
        ]
        for doc_side, candidate_side in code_pairs:
            if not doc_side or not candidate_side:
                continue
            overlap = len(doc_side & candidate_side)
            if overlap:
                scores.append(min(1.0, overlap / min(len(candidate_side), 3)))

        topic_names = [
            normalize_name(str(t.get("name")))
            for t in doc_topics.get("openalex_topics", [])
            if isinstance(t, dict) and t.get("name")
        ]
        if topic_names:
            candidate_tokens = {
                token
                for alias in candidate.normalized_aliases()
                for token in alias.split()
                if token not in STOPWORD_TOKENS
            }
            for topic in topic_names:
                topic_tokens = {t for t in topic.split() if t not in STOPWORD_TOKENS}
                if not topic_tokens or not candidate_tokens:
                    continue
                shared = candidate_tokens & topic_tokens
                if shared:
                    scores.append(min(0.8, 0.4 + 0.2 * len(shared)))

        return max(scores) if scores else None

    def _semantic_similarity(self, text: str, candidate: TechnologyCandidate) -> float | None:
        """Косинусное сходство эмбеддингов. Без модели — недоступно."""
        if self.embedder is None:
            return None
        return self.embedder.similarity(text, candidate.canonical_name)  # type: ignore[attr-defined]

    # -- Решение ----------------------------------------------------------

    def score_candidate(
        self, title: str | None, abstract: str | None, topics: dict, candidate: TechnologyCandidate
    ) -> MappingDecision | None:
        normalized_title = normalize_name(title or "")
        normalized_abstract = normalize_name(abstract or "")
        combined = f"{normalized_title} {normalized_abstract}".strip()

        raw_components: dict[str, float | None] = {
            "semantic_similarity": self._semantic_similarity(combined, candidate),
            "taxonomy_match": self._taxonomy_match(topics, candidate),
            "alias_match": self._alias_match(normalized_title, normalized_abstract, candidate),
            "cooccurrence_similarity": None,
            "organization_overlap": None,
            "link_graph_signal": None,
        }

        statuses = {
            name: (MetricStatus.AVAILABLE if value is not None else MetricStatus.UNAVAILABLE)
            for name, value in raw_components.items()
        }
        weights = self.params.mapping_weights
        effective = redistribute_weights(weights, statuses)
        if not effective:
            return None

        components = {k: v for k, v in raw_components.items() if v is not None}
        score = sum(effective[name] * components[name] for name in effective)

        total_weight = sum(weights.values())
        coverage = sum(weights[name] for name in effective) / total_weight

        status, reason = self._decide(score, coverage)
        method = (
            MappingMethod.HYBRID
            if len(components) > 1
            else (MappingMethod.ALIAS_EXACT if "alias_match" in components else MappingMethod.TAXONOMY)
        )
        return MappingDecision(
            technology_id=candidate.technology_id,
            score=score,
            status=status,
            method=method,
            components=components,
            effective_weights=effective,
            evidence_coverage=coverage,
            reason=reason,
        )

    def _decide(self, score: float, coverage: float) -> tuple[MappingStatus, str]:
        """Пороги §24.21 плюс защита от auto-accept на слабом покрытии."""
        if score < self.params.mapping_review_floor:
            return MappingStatus.REJECTED, "score ниже нижнего порога"
        if score < self.params.mapping_auto_accept:
            return MappingStatus.PENDING_REVIEW, "score в полосе ручного ревью"
        if coverage < self.min_evidence_weight:
            return (
                MappingStatus.PENDING_REVIEW,
                f"score {score:.2f} достаточен, но доступные сигналы покрывают "
                f"лишь {coverage:.0%} веса — auto-accept не обоснован",
            )
        return MappingStatus.AUTO_ACCEPTED, "score выше порога при достаточном покрытии"

    def resolve(
        self, title: str | None, abstract: str | None, topics: dict, *, top_k: int = 3
    ) -> list[MappingDecision]:
        """Все подходящие технологии, отсортированные по убыванию score.

        Документ может относиться к нескольким технологиям — это норма,
        а не ошибка: обзор по агентным системам законно попадает и в
        «Agentic AI», и в «LLM Reasoning».
        """
        decisions = []
        for candidate in self.candidates:
            decision = self.score_candidate(title, abstract, topics, candidate)
            if decision and decision.status is not MappingStatus.REJECTED:
                decisions.append(decision)
        decisions.sort(key=lambda d: d.score, reverse=True)
        return decisions[:top_k]
