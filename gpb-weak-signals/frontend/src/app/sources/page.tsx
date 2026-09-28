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
                <th>Поисковый адаптер</th>
                <th>Допуск live-поиска</th>
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
                  </td>
                  <td className="muted">{s.family}</td>
                  <td>
                    <span
                      className={`tag ${s.adapter_implemented ? "ok" : "warn"}`}
                    >
                      {s.adapter_implemented ? "реализован" : "не реализован"}
                    </span>
                  </td>
                  <td>
                    <span className={`tag ${s.live_search_ready ? "ok" : "bad"}`}>
                      {s.live_search_ready ? "допущен" : "заблокирован"}
                    </span>
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                      Статус реестра: {s.license_status}; источник {s.enabled ? "включён" : "выключен"}
                    </div>
                    {s.blocked_reason && (
                      <div style={{ fontSize: 12, color: "var(--bad)", maxWidth: 360 }}>
                        {s.blocked_reason}
                      </div>
                    )}
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
      <div className="banner warn" style={{ marginTop: 12 }}>
        Наличие адаптера не означает разрешение на сбор. Статус `approved` в
        реестре сам по себе не снимает Legal Gate: нужны заполненные владелец и
        дата проверки Source License Record. Для отдельного discovery-запроса
        фактически запрошенные и выполненные источники показаны в его отчёте.
      </div>
    </div>
  );
}
