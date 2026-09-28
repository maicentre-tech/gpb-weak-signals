export function Score({ value }: { value: number | null }) {
  if (value === null || value === undefined) {
    return <span className="muted">—</span>;
  }
  return <span className="num">{value.toFixed(1)}</span>;
}

export function ConfidenceTag({ value, threshold = 60 }: { value: number; threshold?: number }) {
  const level = value >= threshold ? "ok" : value >= threshold * 0.5 ? "warn" : "bad";
  return <span className={`tag ${level}`}>{value.toFixed(0)}</span>;
}

export function MaturityTag({ value }: { value: string | null }) {
  if (!value) return <span className="muted">—</span>;
  const early = ["Nascent", "Emerging"].includes(value);
  return <span className={`tag ${early ? "ok" : ""}`}>{value}</span>;
}
