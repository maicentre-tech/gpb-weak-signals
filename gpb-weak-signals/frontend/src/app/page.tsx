"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, isJob, type JobResponse, type QueryResponse, type SignalStats } from "@/lib/api";
import { ConfidenceTag, MaturityTag, Score } from "@/components/Bits";
import {
  classifierConfidenceLabel,
  discoveryReportHref,
  eligibilityReasonLabel,
  jobStatusLabel,
  sourceCodeLabel,
  sourceMessageLabel,
  sourceStatusLabel,
} from "@/lib/discovery-report";

export default function SearchPage() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [searchedDomain, setSearchedDomain] = useState("");
  const [job, setJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<SignalStats | null>(null);
  const [publicReadOnly, setPublicReadOnly] = useState(false);

  const snapshotUnavailable = error?.includes("Расчёт ещё не выполнялся") ?? false;

  useEffect(() => {
    api.signalStats().then(setStats).catch(() => setStats(null));
    api.health().then((health) => setPublicReadOnly(health.public_read_only)).catch(() => {});
  }, []);

  useEffect(() => {
    const savedJobId = new URLSearchParams(window.location.search).get("job");
    if (!savedJobId) return;
    let cancelled = false;
    api
      .getJob(savedJobId)
      .then((savedJob) => {
        if (cancelled) return;
        setJob(savedJob);
        setDomain(savedJob.query_text);
        setSearchedDomain(savedJob.query_text);
        setError(null);
        if (window.location.hash === "#open-search-results") {
          window.requestAnimationFrame(() => {
            document.getElementById("open-search-results")?.scrollIntoView({ block: "start" });
          });
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const activeJobId = job?.job_id;
  const activeJobStatus = job?.status;
  useEffect(() => {
    if (!activeJobId || !activeJobStatus || !["queued", "running"].includes(activeJobStatus)) {
      return;
    }
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const next = await api.getJob(activeJobId);
        if (cancelled) return;
        setJob(next);
        if (["queued", "running"].includes(next.status)) {
          timer = setTimeout(poll, 2000);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    };
    timer = setTimeout(poll, 1000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [activeJobId, activeJobStatus]);

  async function run() {
    const query = domain.trim();
    setLoading(true);
    setError(null);
    setJob(null);
    setResult(null);
    try {
      const response = await api.query(query);
      if (isJob(response)) {
        setJob(response);
      } else {
        setResult(response);
        setSearchedDomain(query);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  async function loadMore() {
    if (!result || !result.has_more || loading || loadingMore) return;
    setLoadingMore(true);
    setError(null);
    try {
      const response = await api.query(
        searchedDomain,
        result.limit,
        result.offset + result.results.length,
        result.as_of_date,
      );
      if (isJob(response)) {
        setError("Не удалось продолжить поиск по сохранённому snapshot.");
        return;
      }
      setResult((current) =>
        current
          ? {
              ...response,
              offset: current.offset,
              results: [...current.results, ...response.results],
            }
          : response,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Emerging Technology Intelligence</h1>
        <span className="sub">раннее обнаружение научно-технологических трендов</span>
        <span style={{ marginLeft: "auto" }}>
          <Link href="/review">Ревью</Link>
          {" · "}
          <Link href="/sources">Источники</Link>
        </span>
      </div>

      {publicReadOnly && (
        <div className="banner info" role="status" style={{ marginBottom: 14 }}>
          Поиск использует только готовый snapshot. Внешний поиск и экспертные изменения
          отключены.
        </div>
      )}

      {stats && (
        <div className="meta" style={{ marginBottom: 18 }}>
          {stats.snapshot_available ? (
            <>
              <span>
                <strong>{stats.confidence_over_75}</strong> сигналов с evidence confidence &gt;75%
              </span>
              <span>{stats.eligible} допущено в ранжирование</span>
              <span>{stats.candidates} кандидатов обработано</span>
              <span>{stats.hype_suspected} отсечено как хайп</span>
              <span>{stats.noise_excluded} как шум</span>
              <span>Счётчик выше относится к evidence confidence, а не к ML-вероятности.</span>
            </>
          ) : (
            <span className="muted">Статистика недоступна: scoring snapshot не загружен.</span>
          )}
        </div>
      )}

      <div className="search">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Любая технологическая тема на русском или английском"
        />
        <button onClick={run} disabled={loading || !domain.trim()}>
          {loading ? "Поиск…" : "Найти"}
        </button>
      </div>

      {error &&
        (snapshotUnavailable ? (
          <div className="card" role="status">
            <strong>Поиск пока недоступен</strong>
            <p style={{ marginBottom: 0 }}>
              Для стенда ещё не загружен рассчитанный snapshot. После загрузки одобренного
              корпуса поиск станет доступен.
            </p>
          </div>
        ) : (
          <div className="banner warn" role="alert">
            Ошибка: {error}
          </div>
        ))}

      {job && (
        <div className="card" id="open-search-results">
          <div className="banner info" style={{ marginBottom: 14 }}>
            Экспертный поиск по теме
          </div>
          <p style={{ marginTop: 0 }}>{job.message}</p>
          <div className="meta">
            <span>
              задача <span className="mono">{job.job_id.slice(0, 8)}</span>
            </span>
            <span>Статус: {jobStatusLabel(job.status)}</span>
            <span>покрытие: {((job.coverage_confidence ?? 0) * 100).toFixed(0)}%</span>
          </div>
          {job.status === "failed" && (
            <div className="banner warn" style={{ marginTop: 14 }}>
              Экспертный поиск завершился ошибкой. Проверьте сообщение выше, доступность
              настроенной модели и адаптеров, а также разрешения источников.
            </div>
          )}
          {job.result && (
            <section style={{ marginTop: 20 }}>
              <div className="banner warn" style={{ marginBottom: 14 }}>
                Эвристический индекс используется только для упорядочивания; это не вероятность
                и не оценка проверенной модели. Оценка кандидатов моделью не показывается:
                валидированной модели нет. Все предложения требуют проверки экспертом;
                каноническая онтология не изменялась.
              </div>
              {job.result.query_plan ? (
                <div className="card" style={{ margin: "0 0 14px" }}>
                  <strong>Разбор запроса ИИ</strong>
                  <p style={{ margin: "6px 0" }}>
                    Тема: {job.result.query_plan.normalized_topic}
                  </p>
                  <p className="muted" style={{ margin: "6px 0" }}>
                    Поисковые варианты: {job.result.query_plan.search_queries.join(" · ")}
                  </p>
                  {job.result.query_plan.technology_matches.length > 0 ? (
                    <div>
                      <span className="muted">Возможные совпадения с онтологией:</span>
                      <ul style={{ margin: "6px 0 0", paddingLeft: 20 }}>
                        {job.result.query_plan.technology_matches.map((match) => (
                          <li key={match.technology_id}>
                            <Link href={`/trends/${match.technology_id}`}>
                              {match.canonical_name_ru || match.canonical_name}
                            </Link>
                            <span className="muted">
                              {" "}· {match.confidence === "high" ? "высокая" : "средняя"}
                              {" "}категориальная уверенность, не вероятность · {match.reason}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="muted" style={{ margin: "6px 0 0" }}>
                      Уверенного совпадения с существующей технологией не найдено.
                    </p>
                  )}
                </div>
              ) : (
                <div className="banner info" style={{ marginBottom: 14 }}>
                  ИИ-разбор запроса не запускался: live-поиск остановлен до обработки запроса.
                </div>
              )}
              <div className="meta" style={{ marginBottom: 14 }}>
                <span>Документов: {job.result.fetched_document_count}</span>
                <span>
                  Источников, где выполнен поиск: {job.result.searched_sources.length}
                  {job.result.searched_sources.length > 0
                    ? ` (${job.result.searched_sources.join(", ")})`
                    : ""}
                </span>
                {job.result.source_coverage && (
                  <span>
                    P0: {job.result.source_coverage.p0_searched.length}/
                    {job.result.source_coverage.p0_required.length} источников выполнено
                  </span>
                )}
              </div>
              {job.result.search_scope === "approved_project_sources_metadata_only" && (
                <div className="banner info" style={{ marginBottom: 14 }}>
                  Открытый поиск использует только адаптеры с заполненной записью о правах
                  и разрешением на производную аналитику. Обрабатываются метаданные и аннотации;
                  полные тексты и PDF не загружаются.
                </div>
              )}
              {job.result.source_statuses && job.result.source_statuses.length > 0 && (
                <details className="card" style={{ margin: "0 0 14px" }} open>
                  <summary><strong>Статус источников</strong></summary>
                  <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
                    {job.result.source_statuses.map((source) => (
                      <li key={source.code}>
                        <span
                          className={`tag ${
                            ["blocked", "failed", "partial", "adapter_missing"].includes(source.status)
                              ? "warn"
                              : ""
                          }`}
                        >
                          {sourceStatusLabel(source.status)}
                        </span>{" "}
                        <strong>{sourceCodeLabel(source.code)}</strong>
                        <span className="muted"> — {sourceMessageLabel(source.message)}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              )}
              {job.result.candidate_mapping_status === "unavailable" && (
                <div className="banner warn" style={{ marginBottom: 14 }}>
                  ИИ-сопоставление кандидатов с существующими технологиями недоступно.
                  Ниже показаны только детерминированные результаты открытого поиска для
                  экспертной проверки; это не вывод ИИ.
                </div>
              )}
              {job.result.candidate_mapping_status === "no_confident_matches" && (
                <div className="banner info" style={{ marginBottom: 14 }}>
                  ИИ не нашёл достаточно уверенного соответствия кандидатов текущей онтологии.
                </div>
              )}
              {job.result.source_coverage?.p0_missing_adapters.length ? (
                <p className="muted">
                  Адаптеры P0, которых пока нет:{" "}
                  {job.result.source_coverage.p0_missing_adapters.join(", ")}.
                </p>
              ) : null}
              {job.result.warnings.map((warning) => (
                <div className="banner warn" key={warning}>
                  {warning}
                </div>
              ))}
              {job.result.candidates.length === 0 ? (
                <p>В найденных материалах не выделено устойчивых кандидатов.</p>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {job.result.candidates.map((candidate, index) => (
                    <article
                      className="card"
                      key={candidate.candidate_id}
                      style={{ margin: 0 }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          gap: 8,
                        }}
                      >
                        <h3 style={{ margin: 0 }}>
                          {index + 1}. {candidate.suggested_name}
                        </h3>
                        <span className="tag">
                          Эвристический индекс {candidate.discovery_score.toFixed(0)}/100
                        </span>
                      </div>
                      <p className="muted">
                        {candidate.document_count} документов ·{" "}
                        {candidate.independent_source_family_count} групп источников ·{" "}
                         {eligibilityReasonLabel(candidate.eligibility_reason)} ·{" "}
                        {candidate.review_only === true
                           ? "только для экспертной проверки"
                          : "не подтверждено — проверка обязательна"}
                      </p>
                      <p style={{ margin: "8px 0 0" }}>
                        <Link
                          className="btn small"
                          href={discoveryReportHref(job.job_id, candidate.candidate_id)}
                        >
                          Открыть отчёт
                        </Link>
                      </p>
                      {job.result?.candidate_matches
                        ?.filter((match) => match.candidate_id === candidate.candidate_id)
                        .map((match) => (
                          <p key={match.technology_id} style={{ margin: "6px 0" }}>
                            <strong>Возможное соответствие:</strong>{" "}
                            <Link href={`/trends/${match.technology_id}`}>
                              {match.canonical_name_ru || match.canonical_name}
                            </Link>
                            <span className="muted">
                              {" "}· {match.confidence === "high" ? "высокая" : "средняя"}
                              {" "}категориальная уверенность, не вероятность · {match.reason}
                            </span>
                          </p>
                        ))}
                      <div className="meta">
                        <span>
                          Документы ранних сигналов:{" "}
                          {candidate.early_warning_document_count ?? "—"}
                        </span>
                        <span>
                          Документы подтверждённых направлений:{" "}
                          {candidate.confirmed_emerging_document_count ?? "—"} док.
                        </span>
                        <span>Δ документов: {candidate.document_delta ?? "—"}</span>
                        <span>
                          Оценка кандидата моделью:{" "}
                          {classifierConfidenceLabel(
                            candidate.classifier_confidence,
                            candidate.classifier_status,
                          )}
                        </span>
                      </div>
                      <p className="muted">
                        Эти поля показывают число документов по типам источников, а не
                        оценки модели.
                      </p>
                      <ul style={{ paddingLeft: 20, marginBottom: 0 }}>
                        {candidate.evidence.slice(0, 5).map((evidence) => (
                          <li key={`${candidate.candidate_id}:${evidence.document_id}`}>
                            {evidence.url ? (
                              <a href={evidence.url} target="_blank" rel="noreferrer">
                                {evidence.original_title || evidence.title || evidence.url}
                              </a>
                            ) : (
                              evidence.original_title || evidence.title || evidence.document_id
                            )}
                            <span className="muted">
                              {" "}· {evidence.source_code} / {evidence.source_family}
                              {evidence.published_at
                                ? ` · ${evidence.published_at.slice(0, 10)}`
                                : ""}
                              {evidence.document_type ? ` · ${evidence.document_type}` : ""}
                              {evidence.language ? ` · ${evidence.language}` : ""}
                            </span>
                            {evidence.summary_ru ? (
                              <div style={{ margin: "4px 0" }}>
                                <p style={{ margin: 0 }}>
                                  <strong>Резюме на русском:</strong> {evidence.summary_ru}
                                </p>
                                <span className="muted">
                                  {evidence.is_generated_summary === true
                                    ? "Сформировано автоматически"
                                    : evidence.is_generated_summary === false
                                      ? "Не отмечено как автоматически сформированное"
                                      : "Происхождение резюме не указано"}
                                  {evidence.summary_model_version
                                    ? ` · модель ${evidence.summary_model_version}`
                                    : ""}
                                  {evidence.summary_review_status === "awaiting_human"
                                    ? " · требуется экспертная проверка"
                                    : ""}
                                  {evidence.summary_numbers_verified
                                    ? ` · числа сверены · ID источника ${evidence.summary_source_id ?? evidence.document_id}`
                                    : ""}
                                </span>
                                {evidence.summary_evidence_quotes?.map((quote, index) => (
                                  <blockquote
                                    className="muted"
                                    key={`${evidence.document_id}-summary-quote-${index}`}
                                    style={{ fontSize: 12, margin: "4px 0" }}
                                  >
                                    «{quote}»
                                  </blockquote>
                                ))}
                              </div>
                            ) : (
                              <p className="muted" style={{ margin: "4px 0" }}>
                                Отдельное русское резюме не сформировано; исходный текст
                                показан без перевода
                                {evidence.language ? ` (${evidence.language})` : ""}.
                              </p>
                            )}
                            {evidence.original_abstract && (
                              <p className="muted" style={{ margin: "4px 0" }}>
                                <strong>Оригинальный текст:</strong>{" "}
                                {evidence.original_abstract}
                                {evidence.original_abstract_truncated ? " …" : ""}
                              </p>
                            )}
                            {evidence.original_metadata &&
                              Object.keys(evidence.original_metadata).length > 0 && (
                                <details className="muted" style={{ margin: "4px 0" }}>
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
                            {evidence.trust_level || evidence.trust_reason ? (
                              <p className="muted" style={{ margin: "4px 0" }}>
                                Доверие к источнику: {evidence.trust_level || "не указано"}
                                {evidence.trust_reason ? ` — ${evidence.trust_reason}` : ""}
                              </p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      )}

      {result && (
        <>
          {result.warnings.map((w) => (
            <div className="banner warn" key={w}>
              {w}
            </div>
          ))}

          {result.total_results === 0 ? (
            <div className="card" role="status">
              По этому запросу в готовом snapshot нет карточек технологий.
            </div>
          ) : (
            <>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="scroll-x">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: 40 }}>#</th>
                        <th>Технология</th>
                        <th className="num">ETS</th>
                        <th className="num">
                          {result.strategic_relevance_configured ? "Приоритет" : "Приоритет*"}
                        </th>
                        <th style={{ width: 90 }}>Confidence</th>
                        <th style={{ width: 120 }}>Зрелость</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.map((t) => (
                        <tr key={t.technology_id} className={t.passes_filters ? "" : "dimmed"}>
                          <td className="muted">{t.rank}</td>
                          <td>
                            <Link href={`/trends/${t.technology_id}`}>{t.canonical_name}</Link>
                            {!t.passes_filters && (
                              <span className="tag warn" style={{ marginLeft: 8 }}>
                                {t.signal_status === "hype_suspected"
                                  ? "похоже на хайп"
                                  : t.signal_status === "noise_excluded"
                                    ? "недостаточно доказательств"
                                    : t.signal_status === "mature_excluded"
                                      ? "зрелая технология"
                                      : "ниже порогов"}
                              </span>
                            )}
                            {t.canonical_name_ru && (
                              <div className="muted" style={{ fontSize: 12 }}>
                                {t.canonical_name_ru}
                              </div>
                            )}
                          </td>
                          <td className="num">
                            <Score value={t.emerging_score} />
                          </td>
                          <td className="num">
                            <Score value={t.strategic_priority} />
                          </td>
                          <td>
                            <ConfidenceTag value={t.evidence_confidence} />
                            {t.classifier_confidence !== null && (
                              <div className="muted" style={{ fontSize: 12 }}>
                                ML {(t.classifier_confidence * 100).toFixed(0)}%
                              </div>
                            )}
                          </td>
                          <td>
                            <MaturityTag value={t.maturity} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="meta" style={{ marginTop: 14 }}>
                <span>
                  Показано карточек: {result.results.length} из {result.total_results}
                </span>
                <span>дата расчёта: {result.as_of_date}</span>
                <span>
                  версия scoring: <span className="mono">{result.scoring_version}</span>
                </span>
                <span>
                  версия данных: <span className="mono">{result.dataset_version}</span>
                </span>
                {!result.strategic_relevance_configured && (
                  <span>* стратегический приоритет не рассчитан: матрица не передана</span>
                )}
              </div>
              {result.has_more && (
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button onClick={loadMore} disabled={loadingMore || loading}>
                    {loadingMore ? "Загружаю…" : "Показать ещё карточки"}
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
