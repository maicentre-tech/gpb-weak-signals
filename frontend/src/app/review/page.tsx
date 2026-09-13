"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  api,
  type QueueItem,
  type QueueResponse,
  type ReviewStats,
  type TechnologyOption,
} from "@/lib/api";

const COMPONENT_LABELS: Record<string, string> = {
  semantic_similarity: "Семантика",
  taxonomy_match: "Таксономия",
  alias_match: "Алиас",
  cooccurrence_similarity: "Совстречаемость",
  organization_overlap: "Организации",
  link_graph_signal: "Граф ссылок",
};

export default function ReviewPage() {
  const [queue, setQueue] = useState<QueueResponse | null>(null);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [technologies, setTechnologies] = useState<TechnologyOption[]>([]);
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [reassigning, setReassigning] = useState(false);
  const [done, setDone] = useState(0);

  const load = useCallback(async () => {
    const [q, s, t] = await Promise.all([
      api.reviewQueue(25),
      api.reviewStats(),
      api.reviewTechnologies(),
    ]);
    setQueue(q);
    setStats(s);
    setTechnologies(t.filter((x) => x.status !== "merged"));
    setIndex(0);
  }, []);

  useEffect(() => {
    load().catch((e) => setNote(String(e)));
  }, [load]);

  const item: QueueItem | undefined = queue?.items[index];

  const decide = useCallback(
    async (decision: "confirm" | "reject" | "reassign", technologyId?: string) => {
      if (!item || busy) return;
      setBusy(true);
      try {
        const result = await api.reviewDecide(item.mapping_id, decision, technologyId);
        setNote(result.message);
        setDone((n) => n + 1);
        // Счётчик очереди уменьшается локально: перезапрашивать сводку
        // после каждого решения значит слать лишний запрос на каждое
        // нажатие клавиши при очереди в сотни связей.
        setStats((s) =>
          s
            ? {
                ...s,
                mappings_by_status: {
                  ...s.mappings_by_status,
                  pending_review: Math.max(0, (s.mappings_by_status.pending_review ?? 1) - 1),
                },
              }
            : s,
        );
        setReassigning(false);
        if (queue && index + 1 >= queue.items.length) {
          await load();
        } else {
          setIndex((i) => i + 1);
        }
      } catch (e) {
        setNote(e instanceof Error ? e.message : String(e));
      } finally {
        setBusy(false);
      }
    },
    [item, busy, queue, index, load],
  );

  // Очередь измеряется сотнями связей; без клавиатуры разбор такого объёма
  // мышью нереалистичен, и человеческий контроль остаётся на бумаге.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (reassigning || busy) return;
      if (e.key === "1") decide("confirm");
      if (e.key === "2") decide("reject");
      if (e.key === "3") setReassigning(true);
      if (e.key === "ArrowRight" && queue) setIndex((i) => Math.min(i + 1, queue.items.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [decide, reassigning, busy, queue]);

  const pending = stats?.mappings_by_status?.pending_review ?? 0;

  return (
    <div className="container">
      <div className="header">
        <h1>Экспертное ревью связей</h1>
        <span className="sub">
          <Link href="/">← к поиску</Link>
        </span>
      </div>

      {stats && (
        <div className="banner info" style={{ marginBottom: 14 }}>
          В очереди <strong>{pending}</strong> связей · разобрано за сессию{" "}
          <strong>{done}</strong> · рецензентов {stats.reviewers}
          <div style={{ marginTop: 6, fontSize: 12.5, opacity: 0.85 }}>{stats.note}</div>
        </div>
      )}

      {note && <div className="banner warn">{note}</div>}

      {!item && queue && (
        <div className="card">Очередь пуста — все связи разобраны.</div>
      )}

      {item && (
        <>
          <div className="card" style={{ marginBottom: 14 }}>
            <div className="meta" style={{ marginBottom: 12 }}>
              <span>
                {index + 1} из {queue?.items.length}
              </span>
              <span>источник: {item.source_code}</span>
              <span>в очереди {item.days_in_queue} дн</span>
              <span>метод: {item.mapping_method}</span>
            </div>

            <div className="claim">
              <div className="label">Документ</div>
              <div className="text">
                {item.document_url ? (
                  <a href={item.document_url} target="_blank" rel="noreferrer">
                    {item.document_title ?? item.document_id}
                  </a>
                ) : (
                  (item.document_title ?? item.document_id)
                )}
              </div>
              {item.document_abstract && (
                <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
                  {item.document_abstract}
                </div>
              )}
            </div>

            <div className="claim">
              <div className="label">Предложенная технология</div>
              <div className="text" style={{ fontSize: 16 }}>
                {item.technology_name}
              </div>
            </div>

            <div className="claim" style={{ marginBottom: 0 }}>
              <div className="label">
                Балл {item.mapping_score.toFixed(2)} · покрытие сигналов{" "}
                {((item.evidence_coverage ?? 0) * 100).toFixed(0)}%
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                {Object.entries(item.score_components.components ?? {}).map(([k, v]) => (
                  <span key={k} className="tag">
                    {COMPONENT_LABELS[k] ?? k}: {v.toFixed(2)}
                  </span>
                ))}
              </div>
              {item.score_components.reason && (
                <div className="muted" style={{ fontSize: 12.5, marginTop: 8 }}>
                  {item.score_components.reason}
                </div>
              )}
            </div>
          </div>

          {!reassigning ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="btn ok" onClick={() => decide("confirm")} disabled={busy}>
                Подтвердить <kbd>1</kbd>
              </button>
              <button className="btn bad" onClick={() => decide("reject")} disabled={busy}>
                Отклонить <kbd>2</kbd>
              </button>
              <button className="btn" onClick={() => setReassigning(true)} disabled={busy}>
                Переназначить <kbd>3</kbd>
              </button>
              <button
                className="btn ghost"
                onClick={() => queue && setIndex((i) => Math.min(i + 1, queue.items.length - 1))}
                disabled={busy}
              >
                Пропустить <kbd>→</kbd>
              </button>
            </div>
          ) : (
            <div className="card">
              <div className="label" style={{ marginBottom: 10 }}>
                Выберите правильную технологию
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {technologies.map((t) => (
                  <button
                    key={t.technology_id}
                    className="btn small"
                    disabled={busy || t.technology_id === item.technology_id}
                    onClick={() => decide("reassign", t.technology_id)}
                  >
                    {t.canonical_name}
                  </button>
                ))}
              </div>
              <button
                className="btn ghost small"
                style={{ marginTop: 12 }}
                onClick={() => setReassigning(false)}
              >
                Отмена
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
