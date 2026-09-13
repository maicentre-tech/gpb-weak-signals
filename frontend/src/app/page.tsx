"use client";

import { useState } from "react";
import Link from "next/link";
import { api, isJob, type JobResponse, type QueryResponse } from "@/lib/api";
import { ConfidenceTag, MaturityTag, Score } from "@/components/Bits";

export default function SearchPage() {
  const [domain, setDomain] = useState("агентные системы");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [job, setJob] = useState<JobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setLoading(true);
    setError(null);
    setJob(null);
    try {
      const response = await api.query(domain);
      if (isJob(response)) {
        setJob(response);
        setResult(null);
      } else {
        setResult(response);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
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

      <div className="search">
        <input
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && run()}
          placeholder="Технологическое направление, например «Технологии в ИИ»"
        />
        <button onClick={run} disabled={loading || !domain.trim()}>
          {loading ? "Поиск…" : "Найти"}
        </button>
      </div>

      {error && <div className="banner warn">Ошибка: {error}</div>}

      {job && (
        <div className="card">
          <div className="banner info" style={{ marginBottom: 14 }}>
            Направление не покрыто текущим корпусом
          </div>
          <p style={{ marginTop: 0 }}>{job.message}</p>
          <div className="meta">
            <span>
              задача <span className="mono">{job.job_id.slice(0, 8)}</span>
            </span>
            <span>статус: {job.status}</span>
            <span>покрытие: {((job.coverage_confidence ?? 0) * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}

      {result && (
        <>
          {result.warnings.map((w) => (
            <div className="banner warn" key={w}>
              {w}
            </div>
          ))}

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
                            ниже порогов
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
        </>
      )}
    </div>
  );
}
