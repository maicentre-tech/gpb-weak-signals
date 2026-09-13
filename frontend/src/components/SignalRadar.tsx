"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { SignalProfile } from "@/lib/api";

const LABELS: Record<keyof SignalProfile, string> = {
  novelty: "Новизна",
  growth: "Рост",
  acceleration: "Ускорение",
  research: "Наука",
  patent: "Патенты",
  citation: "Цитирование",
  market: "Рынок",
  adoption: "Внедрение",
  cross_domain: "Межотраслевой",
};

export function SignalRadar({
  scores,
  status,
}: {
  scores: SignalProfile;
  status: Record<string, string>;
}) {
  // Недоступный признак не рисуется нулём: нулевая вершина радара
  // визуально означает «сигнала нет», тогда как на деле источник просто
  // не подключён (§24.19). Такие оси выносятся в подпись под графиком.
  const available = (Object.keys(LABELS) as (keyof SignalProfile)[]).filter(
    (key) => scores[key] !== null && scores[key] !== undefined,
  );
  const missing = (Object.keys(LABELS) as (keyof SignalProfile)[]).filter(
    (key) => scores[key] === null || scores[key] === undefined,
  );

  const data = available.map((key) => ({
    axis: LABELS[key],
    value: scores[key] ?? 0,
  }));

  if (data.length < 3) {
    return (
      <div className="muted" style={{ padding: "30px 0", textAlign: "center" }}>
        Недостаточно доступных признаков для профиля сигналов
        <div style={{ marginTop: 8, fontSize: 12 }}>
          доступно {data.length} из {Object.keys(LABELS).length}
        </div>
      </div>
    );
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={290}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: "var(--muted)", fontSize: 11.5 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "var(--muted)", fontSize: 10 }} />
          <Radar
            dataKey="value"
            stroke="var(--accent)"
            fill="var(--accent)"
            fillOpacity={0.28}
          />
        </RadarChart>
      </ResponsiveContainer>
      {missing.length > 0 && (
        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
          Нет данных: {missing.map((key) => LABELS[key]).join(", ")}. Вес этих
          признаков перераспределён между доступными, нулём они не заменяются.
        </div>
      )}
    </>
  );
}
