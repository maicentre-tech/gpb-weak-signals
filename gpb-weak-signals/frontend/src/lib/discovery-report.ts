export interface ReportEvidence {
  document_id: string;
  title?: string | null;
  original_title?: string | null;
  original_abstract?: string | null;
}

export interface ReportExcerpt {
  text?: string | null;
  source_doc_ids?: readonly string[] | null;
}

export interface SavedReportJob<TCandidate extends { candidate_id: string }> {
  result?: { candidates?: readonly TCandidate[] } | null;
}

export function discoveryReportHref(jobId: string, candidateId: string): string {
  return `/discovery/${encodeURIComponent(jobId)}/${encodeURIComponent(candidateId)}`;
}

export function discoveryReportBackHref(jobId: string): string {
  return `/?job=${encodeURIComponent(jobId)}#open-search-results`;
}

export function findReportCandidate<TCandidate extends { candidate_id: string }>(
  job: SavedReportJob<TCandidate> | null | undefined,
  candidateId: string,
): TCandidate | null {
  return job?.result?.candidates?.find((candidate) => candidate.candidate_id === candidateId) ?? null;
}

function normalizeWhitespace(value: string): string {
  return value.trim().split(/\s+/u).join(" ");
}

/**
 * Fail closed unless every cited ID is present and the displayed quote occurs
 * verbatim (apart from whitespace) in each cited original abstract.
 */
export function resolveReportExcerpt(
  excerpt: ReportExcerpt | null | undefined,
  evidence: readonly ReportEvidence[],
): { text: string; evidence: ReportEvidence[] } | null {
  const text = typeof excerpt?.text === "string" ? excerpt.text.trim() : "";
  const ids = excerpt?.source_doc_ids;
  if (!text || !Array.isArray(ids) || ids.length === 0) return null;
  if (ids.some((id) => typeof id !== "string" || !id.trim())) return null;
  if (new Set(ids).size !== ids.length) return null;

  const evidenceById = new Map(evidence.map((item) => [item.document_id, item]));
  const cited = ids.map((id) => evidenceById.get(id));
  if (cited.some((item) => !item)) return null;

  const normalizedQuote = normalizeWhitespace(text);
  const resolvedEvidence = cited.filter((item): item is ReportEvidence => item !== undefined);
  if (
    resolvedEvidence.some(
      (item) =>
        !normalizeWhitespace(item.original_abstract ?? "").includes(normalizedQuote),
    )
  ) {
    return null;
  }
  return { text, evidence: resolvedEvidence };
}

const JOB_STATUS_LABELS: Record<string, string> = {
  queued: "В очереди",
  running: "Выполняется",
  completed: "Завершена",
  failed: "Ошибка",
};

const SOURCE_STATUS_LABELS: Record<string, string> = {
  adapter_missing: "Адаптер отсутствует",
  blocked: "Поиск заблокирован",
  failed: "Ошибка поиска",
  partial: "Выполнен частично",
  ready: "Готов к поиску",
  searched: "Поиск выполнен",
};

const SOURCE_FAMILY_LABELS: Record<string, string> = {
  open_source: "Открытый код",
  patents: "Патенты",
  preprints: "Препринты",
  rd: "Исследования и разработки",
  research: "Научные публикации",
  web_news: "Новости и публикации в интернете",
};

const SOURCE_CODE_LABELS: Record<string, string> = {
  arxiv: "arXiv",
  github: "GitHub",
  gdelt: "GDELT",
  openalex: "OpenAlex",
};

const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  dataset: "Набор данных",
  news: "Новостной материал",
  paper: "Научная публикация",
  patent: "Патент",
  preprint: "Препринт",
  repository: "Репозиторий кода",
};

const ELIGIBILITY_REASON_LABELS: Record<string, string> = {
  "News-only evidence cannot establish a technology.":
    "Одних новостных материалов недостаточно, чтобы подтвердить существование технологии.",
  "Evidence from at least two independent source families is present.":
    "Материалы найдены минимум в двух независимых категориях источников.",
  "There are documents from at least two independent source families.":
    "Материалы найдены минимум в двух независимых категориях источников.",
  "Not enough independent source families; expert review is needed.":
    "Недостаточно независимых категорий источников; нужна экспертная проверка.",
};

export function jobStatusLabel(status: string): string {
  return JOB_STATUS_LABELS[status] ?? "Статус задачи не указан";
}

export function sourceStatusLabel(status: string): string {
  return SOURCE_STATUS_LABELS[status] ?? "Статус источника не указан";
}

export function candidateStatusLabel(status: string): string {
  if (status === "eligible") {
    return "Порог первичного отбора пройден; проверка экспертом обязательна.";
  }
  if (status === "pending_review") return "Кандидат ожидает экспертной проверки.";
  return "Статус не указан; требуется экспертная проверка.";
}

export function eligibilityReasonLabel(reason: string | null | undefined): string {
  const normalized = reason?.trim() ?? "";
  if (!normalized) return "Кандидат предложен для экспертной проверки по найденным материалам.";
  const knownTranslation = ELIGIBILITY_REASON_LABELS[normalized];
  if (knownTranslation) return knownTranslation;
  return /[\u0400-\u04ff]/u.test(normalized)
    ? normalized
    : "Кандидат предложен для экспертной проверки по найденным материалам.";
}

export function sourceFamilyLabel(family: string): string {
  return SOURCE_FAMILY_LABELS[family.toLowerCase()] ?? "Другие источники";
}

export function sourceCodeLabel(code: string | null | undefined): string {
  const normalized = code?.trim() ?? "";
  if (!normalized) return "Источник не указан";
  return SOURCE_CODE_LABELS[normalized.toLowerCase()] ?? normalized;
}

export function documentTypeLabel(type: string | null | undefined): string {
  const normalized = type?.trim().toLowerCase().replace(/^documenttype\./u, "") ?? "";
  if (!normalized) return "Тип не указан";
  return DOCUMENT_TYPE_LABELS[normalized] ?? type!.trim();
}

export function trustLevelLabel(level: string | null | undefined): string {
  const normalized = level?.trim().toLowerCase() ?? "";
  if (normalized === "high") return "Высокий";
  if (normalized === "medium") return "Средний";
  if (normalized === "low") return "Низкий";
  return "Не указано";
}

export function metadataValue(
  value: string | null | undefined,
  fallback: string,
): string {
  return value?.trim() || fallback;
}

export function classifierConfidenceLabel(
  confidence: number | null | undefined,
  status: string | null | undefined,
): string {
  if (
    status !== "validated" ||
    typeof confidence !== "number" ||
    !Number.isFinite(confidence)
  ) {
    return "не показывается: модель кандидатов не прошла валидацию";
  }
  return `${(confidence * 100).toFixed(0)}%`;
}

export function sourceMessageLabel(message: string | null | undefined): string {
  const normalized = message?.trim() ?? "";
  const translations: Record<string, string> = {
    "Source License Record не заполнен полностью.":
      "Запись о правах на источник заполнена не полностью.",
    "Source License Record заполнен; derivative analytics разрешена.":
      "Права на источник заполнены; производная аналитика разрешена.",
    "Нет доступных источников с разрешённой derivative analytics.":
      "Нет доступных источников, для которых разрешена производная аналитика.",
  };
  if (!normalized) return "Дополнительные сведения об источнике не указаны.";
  if (translations[normalized]) return translations[normalized];
  return /[\u0400-\u04ff]/u.test(normalized)
    ? normalized
    : "Дополнительные сведения об источнике доступны в исходных данных.";
}