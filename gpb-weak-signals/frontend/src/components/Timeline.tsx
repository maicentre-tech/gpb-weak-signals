"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TimelinePoint } from "@/lib/api";

const SERIES: { key: keyof TimelinePoint; label: string; color: string }[] = [
  { key: "papers", label: "Публикации", color: "#4f8cff" },
  { key: "preprints", label: "Препринты", color: "#7c5cff" },
  { key: "patent_families", label: "Патентные семейства", color: "#3fb950" },
  { key: "github_repos", label: "Репозитории", color: "#d29922" },
  { key: "news_mentions", label: "Упоминания в СМИ", color: "#8b949e" },
];

export function Timeline({ points }: { points: TimelinePoint[] }) {
  if (points.length === 0) {
    return <div className="muted">Нет помесячных данных</div>;
  }

  const active = SERIES.filter((s) =>
    points.some((p) => Number(p[s.key]) > 0),
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={points} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="period_start"
          tick={{ fill: "var(--muted)", fontSize: 11 }}
          tickFormatter={(value) => String(value ?? "").slice(0, 7)}
          minTickGap={40}
        />
        <YAxis tick={{ fill: "var(--muted)", fontSize: 11 }} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelFormatter={(label) => String(label ?? "").slice(0, 7)}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {active.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label}
            stackId="1"
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.35}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
