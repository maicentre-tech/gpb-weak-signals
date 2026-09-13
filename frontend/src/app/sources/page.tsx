"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, type SourceStatus } from "@/lib/api";

export default function SourcesPage() {
  const [sources, setSources] = useState<SourceStatus[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.sourceStatus().then(setSources).catch((e) => setError(String(e)));
  }, []);

  if (error) return <div className="container"><div className="banner warn">{error}</div></div>;

  return (
    <div className="container">
      <div className="header">
        <h1>Состояние источников</h1>
        <span className="sub">
          <Link href="/">← к поиску</Link>
        </span>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="scroll-x">
          <table>
            <thead>
              <tr>
                <th>Источник</th>
                <th>Семейство</th>
                <th>Лицензия</th>
                <th className="num">Документов</th>
                <th>Охват</th>
                <th className="num">Отставание</th>
                <th>Последняя загрузка</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s) => (
                <tr key={s.code} className={s.documents === 0 ? "dimmed" : ""}>
                  <td>
                    {s.name}
                    {s.blocked_reason && (
                      <div style={{ fontSize: 12, color: "var(--bad)" }}>{s.blocked_reason}</div>
                    )}
                  </td>
                  <td className="muted">{s.family}</td>
                  <td>
                    <span
                      className={`tag ${s.license_status === "approved" ? "ok" : s.license_status === "restricted" ? "warn" : "bad"}`}
                    >
                      {s.license_status}
                    </span>
                  </td>
                  <td className="num">{s.documents}</td>
                  <td className="muted mono">
                    {s.coverage_start && s.coverage_end
                      ? `${s.coverage_start} … ${s.coverage_end}`
                      : "—"}
                  </td>
                  <td className="num">
                    {s.lag_days === null ? (
                      <span className="muted">—</span>
                    ) : (
                      <span className={s.lag_days > 120 ? "tag bad" : "tag ok"}>
                        {s.lag_days} дн
                      </span>
                    )}
                  </td>
                  <td className="muted">{s.last_run_status ?? "не запускалась"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="banner info" style={{ marginTop: 16 }}>
        Отставание источника более 120 дней означает, что периоды после даты
        окончания охвата не содержат данных. Такие месяцы не считаются нулевой
        активностью — они исключаются из расчёта прироста.
      </div>
    </div>
  );
}
