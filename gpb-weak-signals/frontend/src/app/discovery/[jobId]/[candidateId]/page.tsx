"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  api,
  type DiscoveryCandidate,
  type DiscoveryEvidence,
  type DiscoveryReportExcerpt,
  type JobResponse,
  type CandidateMappingReview,
  type TechnologyOption,
} from "@/lib/api";
import {
  candidateStatusLabel,
  discoveryReportBackHref,
  documentTypeLabel,
  eligibilityReasonLabel,
  findReportCandidate,
  metadataValue,
  resolveReportExcerpt,
  sourceCodeLabel,
  sourceFamilyLabel,
  trustLevelLabel,
} from "@/lib/discovery-report";

const COMPONENT_LABELS: Record<string, string> = {
  source_diversity_index: "Разнообразие семейств источников",
  volume_index: "Количество документов",
  term_support_index: "Поддержка терминов",
};

function MissingClaim({ title }: { title: string }) {
  return (
    <div className="claim insufficient">
      <div className="label">{title}</div>
      <div className="text">
        Недостаточно данных. В результате открытого поиска нет проверенного утверждения
        для этого раздела. Сверьте первичные материалы ниже; выводы не сформированы
        автоматически.
      </div>
    </div>
  );
}

function ReportExcerptClaim({
  title,
  excerpt,
  evidence,
}: {
  title: string;
  excerpt: DiscoveryReportExcerpt | undefined;
  evidence: DiscoveryEvidence[];
}) {
  const resolved = resolveReportExcerpt(excerpt, evidence);
  if (!resolved) return <MissingClaim title={title} />;

  return (
    <section className="claim">
      <div className="label">{title}</div>
      <div className="text">{resolved.text}</div>
      <div className="refs">
        Дословная выдержка на языке первоисточника. Категория подобрана по словам в
        тексте и требует экспертной оценки. Источник:{" "}
        {resolved.evidence.map((item, index) => {
          const evidenceIndex = evidence.findIndex(
            (candidate) => candidate.document_id === item.document_id,
          );
          const sourceTitle =
            item.original_title || item.title || item.document_id;
          return (
            <span key={item.document_id}>
              {index > 0 && " · "}
              <a href={`#evidence-${evidenceIndex}`}>{sourceTitle}</a>
            </span>
          );
        })}
      </div>
    </section>
  );
}

function EvidenceCard({
  evidence,
  index,
}: {
  evidence: DiscoveryEvidence;
  index: number;
}) {
  const title = evidence.original_title || evidence.title || evidence.url || evidence.document_id;
  const summaryOrigin =
    evidence.is_generated_summary === true
      ? "Сформировано автоматически"
      : evidence.is_generated_summary === false
        ? "В источнике резюме не отмечено как автоматически сформированное"
        : "Происхождение резюме не указано";

  return (
    <article className="card" id={`evidence-${index}`} style={{ marginBottom: 12 }}>
      <h3 style={{ fontSize: 15, margin: "0 0 6px" }}>
        {evidence.url ? (
          <a href={evidence.url} target="_blank" rel="noreferrer noopener">
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <div className="meta" style={{ marginBottom: 10 }}>
        <span>
          {sourceCodeLabel(evidence.source_code)} /{" "}
          {evidence.source_family
            ? sourceFamilyLabel(evidence.source_family)
            : "Семейство источников не указано"}
        </span>
        <span>
          Дата публикации:{" "}
          {metadataValue(evidence.published_at?.slice(0, 10), "не указана")}
        </span>
        <span>Тип: {documentTypeLabel(evidence.document_type)}</span>
        <span>
          Язык оригинала: {metadataValue(evidence.language, "не указан")}
        </span>
        <span className="mono">Идентификатор: {evidence.document_id}</span>
      </div>

      {evidence.matched_terms.length > 0 && (
        <p className="muted" style={{ margin: "0 0 8px" }}>
          Совпавшие термины поиска: {evidence.matched_terms.join(", ")}
        </p>
      )}

      {evidence.summary_ru ? (
        <div className="claim" style={{ marginBottom: 10 }}>
          <div className="label">Резюме на русском</div>
          <div className="text">{evidence.summary_ru}</div>
          <div className="refs">
            {summaryOrigin}
            {evidence.summary_model_version
              ? ` · версия модели ${evidence.summary_model_version}`
              : ""}
            {evidence.summary_review_status === "awaiting_human"
              ? " · требуется экспертная проверка"
              : " · смысл резюме не проверен"}
          </div>
          {evidence.summary_numbers_verified && (
            <div className="refs">
              Числа сверены с источником · ID:{" "}
              {evidence.summary_source_id || evidence.document_id}
            </div>
          )}
          {evidence.summary_evidence_quotes?.map((quote, index) => (
            <blockquote className="refs" key={`${evidence.document_id}-summary-quote-${index}`}>
              «{quote}»
            </blockquote>
          ))}
        </div>
      ) : null}

      {evidence.original_abstract ? (
        <div className="claim" style={{ marginBottom: 8 }}>
          <div className="label">Исходный текст</div>
          <div className="text">
            {evidence.original_abstract}
            {evidence.original_abstract_truncated ? " …" : ""}
          </div>
        </div>
      ) : (
        <p className="muted" style={{ margin: "0 0 8px" }}>
          Аннотация или описание источника не предоставлены.
        </p>
      )}

      <p className="muted" style={{ margin: "0 0 8px" }}>
        Уровень доверия к источнику: {trustLevelLabel(evidence.trust_level)}
        {evidence.trust_reason
          ? ` · основание (текст источника): ${evidence.trust_reason}`
          : ""}
      </p>

      {evidence.original_metadata &&
        Object.keys(evidence.original_metadata).length > 0 && (
          <details className="muted">
            <summary>Исходные метаданные</summary>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
                fontSize: 12,
              }}
            >
              {JSON.stringify(evidence.original_metadata, null, 2)}
            </pre>
          </details>
        )}
    </article>
  );
}

function CandidateReport({ candidate }: { candidate: DiscoveryCandidate }) {
  const statusText = candidateStatusLabel(candidate.status);

  return (
    <>
      <div className="banner info">
        Это результат открытого поиска только для экспертной проверки, а не
        подтверждённая технология. Эвристический индекс используется для
        упорядочивания кандидатов; это не вероятность и не оценка модели.
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="meta" style={{ marginBottom: 12 }}>
          <span>
            Эвристический индекс:{" "}
            <strong>{candidate.discovery_score.toFixed(1)}/100</strong>
          </span>
          <span>{candidate.document_count} документов</span>
          <span>{candidate.independent_source_family_count} независимых семейств источников</span>
          <span>{statusText}</span>
        </div>

        <section className="claim">
          <div className="label">Описание поискового кандидата</div>
          <div className="text">
            По запросу «{candidate.query}» автоматическое извлечение предложило название
            «{candidate.suggested_name}». Это название, выделенное по материалам поиска,
            а не проверенное описание технологии.
          </div>
          {candidate.evidence.length > 0 && (
            <div className="refs">
              Материалы, где алгоритм нашёл совпадения:{" "}
              {candidate.evidence.map((evidence, index) => (
                <span key={evidence.document_id}>
                  {index > 0 && " · "}
                  <a href={`#evidence-${index}`}>
                    {evidence.original_title || evidence.title || evidence.document_id}
                  </a>
                </span>
              ))}
            </div>
          )}
        </section>

        <ReportExcerptClaim
          title="Проблема или возможность"
          excerpt={candidate.report_claims?.problem}
          evidence={candidate.evidence}
        />
        <ReportExcerptClaim
          title="Потенциальное преимущество"
          excerpt={candidate.report_claims?.advantage}
          evidence={candidate.evidence}
        />
        <ReportExcerptClaim
          title="Пример применения"
          excerpt={candidate.report_claims?.case}
          evidence={candidate.evidence}
        />

        <section className="claim" style={{ marginBottom: 0 }}>
          <div className="label">Почему кандидат отмечен для проверки</div>
          <div className="text">{eligibilityReasonLabel(candidate.eligibility_reason)}</div>
          <div className="refs">
            Статус: {statusText} · Документы ранних сигналов:{" "}
            {candidate.early_warning_document_count ?? "нет данных"} документов ·
            Документы подтверждённых направлений:{" "}
            {candidate.confirmed_emerging_document_count ?? "нет данных"}{" "}
            документов · Изменение числа документов:{" "}
            {candidate.document_delta ?? "нет данных"}.
            Эти значения — количество документов, не модельные оценки.
          </div>
        </section>
      </div>

      <div className="grid2" style={{ marginBottom: 16 }}>
        <section className="card">
          <h2 className="section-title" style={{ marginTop: 0 }}>
            Покрытие источниками
          </h2>
          <div className="meta">
            {Object.entries(candidate.source_family_counts).length > 0 ? (
              Object.entries(candidate.source_family_counts).map(([family, count]) => (
                <span key={family}>
                  {sourceFamilyLabel(family)}: <strong>{count}</strong>
                </span>
              ))
            ) : (
              <span>Данные о семействах источников отсутствуют.</span>
            )}
          </div>
          <p className="muted" style={{ marginBottom: 0 }}>
            Индекс и число документов описывают результат этого поиска. Они не являются
            вероятностью, доказательством истинности или ML-оценкой.
          </p>
        </section>

        <section className="card">
          <h2 className="section-title" style={{ marginTop: 0 }}>
            Компоненты индекса
          </h2>
          <div className="meta">
            {Object.entries(candidate.score_components).length > 0 ? (
              Object.entries(candidate.score_components).map(([key, value]) => (
                <span key={key}>
                  {COMPONENT_LABELS[key] || key}: <strong>{value.toFixed(1)}</strong>
                </span>
              ))
            ) : (
              <span>Компоненты индекса отсутствуют.</span>
            )}
          </div>
          <p className="muted" style={{ marginBottom: 0 }}>
            Оценка кандидата моделью в этом отчёте не показывается.{" "}
            {candidate.classifier_status === "not_run_no_validated_candidate_model" ||
            !candidate.classifier_status
              ? "Валидированная модель кандидатов отсутствует."
              : "Статус модели не используется как вероятность сигнала."}
          </p>
        </section>
      </div>

      <section>
        <h2 className="section-title">Источники и исходные материалы</h2>
        {candidate.evidence.length > 0 ? (
          candidate.evidence.map((evidence, index) => (
            <EvidenceCard
              key={`${candidate.candidate_id}:${evidence.document_id}`}
              evidence={evidence}
              index={index}
            />
          ))
        ) : (
          <div className="card muted">Для этого кандидата нет доступных материалов.</div>
        )}
      </section>
    </>
  );
}

function CandidateMappingReviewPanel({
  candidate,
  job,
  match,
}: {
  candidate: DiscoveryCandidate;
  job: JobResponse;
  match: { candidate_id: string; technology_id: string; canonical_name: string; reason: string; confidence: string } | undefined;
}) {
  const [technologies, setTechnologies] = useState<TechnologyOption[]>([]);
  const [replacement, setReplacement] = useState("");
  const [reason, setReason] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<CandidateMappingReview[]>([]);
  const [busy, setBusy] = useState(false);
  const [readOnly, setReadOnly] = useState(true);

  useEffect(() => {
    Promise.all([
      api.reviewTechnologies(),
      api.health(),
      api.reviewCandidateMappings(candidate.candidate_id),
    ])
      .then(([items, health, savedReviews]) => {
        setTechnologies(items.filter((item) => item.status !== "merged"));
        setReadOnly(health.public_read_only);
        setReviews(savedReviews);
      })
      .catch((error) =>
        setStatusMessage(error instanceof Error ? error.message : String(error)),
      );
  }, [candidate.candidate_id]);

  if (!match) {
    return (
      <section className="card" style={{ marginBottom: 16 }}>
        <h2 className="section-title" style={{ marginTop: 0 }}>Сопоставление с онтологией</h2>
        <p className="muted" style={{ marginBottom: 0 }}>
          Уверенная рекомендация отсутствует. Новую связь нельзя создать автоматически;
          эксперт может оставить кандидата без сопоставления.
        </p>
        {statusMessage && <p className="muted" role="status">{statusMessage}</p>}
      </section>
    );
  }

  async function decide(decision: "confirm" | "reject" | "reassign") {
    if (!match || readOnly || busy || (decision === "reassign" && !replacement)) return;
    const recommendation = match;
    setBusy(true);
    try {
      const saved = await api.decideCandidateMapping({
        candidate_id: candidate.candidate_id,
        job_id: job.job_id,
        candidate_name: candidate.suggested_name,
        suggested_technology_id: recommendation.technology_id,
        suggested_technology_name: recommendation.canonical_name,
        decision,
        replacement_technology_id: decision === "reassign" ? replacement : null,
        evidence: candidate.evidence.map((item) => ({
          document_id: item.document_id,
          source_code: item.source_code,
          title: item.original_title || item.title,
          url: item.url,
          published_at: item.published_at ?? null,
        })),
        provenance: {
          discovery_version: candidate.discovery_version,
          query: candidate.query,
          match_confidence: recommendation.confidence,
          match_reason: recommendation.reason,
        },
        reason: reason.trim() || null,
      });
      setReviews((current) => [saved, ...current]);
      setStatusMessage("Решение сохранено отдельно от автоматической рекомендации.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  }

  const latestReview = reviews[0];
  const latestTarget = latestReview?.replacement_technology_id
    ? technologies.find(
        (technology) =>
          technology.technology_id === latestReview.replacement_technology_id,
      )?.canonical_name ?? latestReview.replacement_technology_id
    : null;

  return (
    <section className="card" style={{ marginBottom: 16 }}>
      <h2 className="section-title" style={{ marginTop: 0 }}>Рекомендация онтологии</h2>
      <p style={{ marginTop: 0 }}>
        Кандидат сопоставлен с <strong>{match.canonical_name}</strong>{" "}
        <span className="tag">{match.confidence}</span>
      </p>
      <p className="muted" style={{ fontSize: 13 }}>{match.reason}</p>
      {readOnly && (
        <div className="banner info">Публичный режим только для чтения: решение не отправляется.</div>
      )}
      <p className="muted" style={{ fontSize: 12 }}>
        Без входа через SSO записывается временный идентификатор рецензента; он не подтверждает личность.
      </p>
      <textarea
        aria-label="Причина решения"
        placeholder="Причина решения эксперта (необязательно)"
        value={reason}
        onChange={(event) => setReason(event.target.value)}
        disabled={readOnly || busy}
        style={{ width: "100%", minHeight: 64, marginBottom: 10 }}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn ok" disabled={readOnly || busy} onClick={() => decide("confirm")}>
          Подтвердить связь
        </button>
        <button className="btn bad" disabled={readOnly || busy} onClick={() => decide("reject")}>
          Отклонить связь
        </button>
        <select
          aria-label="Новая технология"
          value={replacement}
          onChange={(event) => setReplacement(event.target.value)}
          disabled={readOnly || busy}
        >
          <option value="">Заменить на…</option>
          {technologies
            .filter((item) => item.technology_id !== match.technology_id)
            .map((item) => <option key={item.technology_id} value={item.technology_id}>{item.canonical_name}</option>)}
        </select>
        <button className="btn" disabled={readOnly || busy || !replacement} onClick={() => decide("reassign")}>
          Сохранить замену
        </button>
      </div>
      {latestReview && (
        <div className="claim" style={{ marginTop: 14 }}>
          <div className="label">Последнее решение эксперта</div>
          <div className="text">
            {latestReview.decision === "confirm"
              ? `Подтверждено: ${latestReview.suggested_technology_name}`
              : latestReview.decision === "reject"
                ? `Отклонено сопоставление: ${latestReview.suggested_technology_name}`
                : `Заменено на: ${latestTarget ?? "технология из решения"}`}
          </div>
          <div className="refs">
            Исходная рекомендация сохранена · рецензент {latestReview.reviewer_id}
            {" · "}
            {new Date(latestReview.reviewed_at).toLocaleString("ru-RU")}
          </div>
          {latestReview.reason && (
            <p className="muted" style={{ marginBottom: 0 }}>
              Основание: {latestReview.reason}
            </p>
          )}
        </div>
      )}
      {statusMessage && <p className="muted" role="status">{statusMessage}</p>}
    </section>
  );
}

export default function DiscoveryReportPage({
  params,
}: {
  params: Promise<{ jobId: string; candidateId: string }>;
}) {
  const { jobId, candidateId } = use(params);
  const [job, setJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const backHref = discoveryReportBackHref(jobId);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const load = async () => {
      try {
        const next = await api.getJob(jobId);
        if (cancelled) return;
        setJob(next);
        setError(null);
        if (["queued", "running"].includes(next.status)) {
          timer = setTimeout(load, 1800);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    };

    void load();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [jobId]);

  const candidate = findReportCandidate(job, candidateId);

  return (
    <main className="container">
      <div className="header">
        <h1>{candidate?.suggested_name || "Отчёт открытого поиска"}</h1>
        <span className="sub">
          <Link href={backHref}>← к результатам поиска</Link>
        </span>
      </div>

      {error ? (
        <div className="banner warn" role="alert">
          Не удалось загрузить сохранённый результат поиска: {error}
        </div>
      ) : !job ? (
        <div className="card muted">Загрузка отчёта…</div>
      ) : candidate ? (
        <>
          <CandidateMappingReviewPanel
            candidate={candidate}
            job={job}
            match={job.result?.candidate_matches?.find((item) => item.candidate_id === candidate.candidate_id)}
          />
          <CandidateReport candidate={candidate} />
        </>
      ) : ["queued", "running"].includes(job.status) ? (
        <div className="card muted">Поиск ещё выполняется. Отчёт обновится автоматически.</div>
      ) : (
        <div className="banner warn" role="status">
          Кандидат не найден в сохранённом результате этой задачи. Возможно, результат
          поиска обновился или ссылка содержит неверный идентификатор.
        </div>
      )}
    </main>
  );
}