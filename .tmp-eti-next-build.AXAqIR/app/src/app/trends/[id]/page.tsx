"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  api,
  type Claim,
  type SourceReference,
  type TimelinePoint,
  type TrendCard,
} from "@/lib/api";
import { SignalRadar } from "@/components/SignalRadar";
import { Timeline } from "@/components/Timeline";
import { ConfidenceTag, MaturityTag } from "@/components/Bits";

const INSUFFICIENT = "Недостаточно данных";

function ClaimBlock({
  label,
  claim,
  sources,
}: {
  label: string;
  claim: Claim;
  sources: Map<string, SourceReference>;
}) {
  const insufficient = claim.text === INSUFFICIENT;
  return (
    <div className={`claim ${insufficient ? "insufficient" : ""}`}>
      <div className="label">{label}</div>
      <div className="text">{claim.text}</div>
      {claim.metric_provenance && (
        <div className="refs">
          основание: расчёт системы, <span className="mono">{claim.metric_provenance}</span>
        </div>
      )}
      {claim.source_doc_ids.length > 0 && (
        <div className="refs">
          источники:{" "}
          {claim.source_doc_ids.map((id, i) => {
            const doc = sources.get(id);
            return (
              <span key={id}>
                {i > 0 && ", "}
                {doc?.url ? (
                  <a href={doc.url} target="_blank" rel="noreferrer">
                    {doc.title?.slice(0, 46) ?? id.slice(0, 8)}
                  </a>
                ) : (
                  <span className="mono">{id.slice(0, 8)}</span>
                )}
              </span>
            );
          })}
        </div>
      )}
      {!insufficient && claim.source_doc_ids.length === 0 && !claim.metric_provenance && (
        <div className="refs" style={{ color: "var(--bad)" }}>
          утверждение без основания — не должно было пройти верификацию
        </div>
      )}
    </div>
  );
}

export default function TrendPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [card, setCard] = useState<TrendCard | null>(null);
  const [timeline, setTimeline] = useState<TimelinePoint[]>([]);
  const [sources, setSources] = useState<SourceReference[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.trend(id), api.timeline(id), api.sources(id)])
      .then(([c, t, s]) => {
        setCard(c);
        setTimeline(t);
        setSources(s);
      })
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, [id]);

  if (error) return <div className="container"><div className="banner warn">{error}</div></div>;
  if (!card) return <div className="container muted">Загрузка…</div>;

  const sourceMap = new Map(sources.map((s) => [s.document_id, s]));

  return (
    <div className="container">
      <div className="header">
        <h1>{card.canonical_name}</h1>
        <span className="sub">
          <Link href="/">← к списку</Link>
        </span>
      </div>

      {!card.verification_passed && (
        <div className="banner warn">
          Часть утверждений не прошла проверку источниками и была удалена из карточки
        </div>
      )}
      {card.is_generated_summary ? (
        <div className="banner info">
          Русская версия карточки создана автоматически. Названия и тексты источников
          сохранены в оригинале. Автоматическая проверка контролирует ссылки и числа,
          но не подтверждает смысловую точность пересказа — сверяйте выводы с публикациями ниже.
        </div>
      ) : (
        <div className="banner warn">
          Автоматическая русская версия недоступна; текст карточки показан на языке исходных данных.
        </div>
      )}

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="meta" style={{ marginBottom: 16 }}>
          <span>
            ETS <strong>{card.emerging_score.toFixed(1)}</strong>
          </span>
          <span>
            confidence <ConfidenceTag value={card.evidence_confidence} />
          </span>
          {card.classifier_confidence !== null && (
            <span>ML weak signal <strong>{(card.classifier_confidence * 100).toFixed(0)}%</strong></span>
          )}
          <span>
            зрелость <MaturityTag value={card.maturity} />
          </span>
          <span>
            стратегическая релевантность{" "}
            {card.strategic_relevance !== null ? (
              <strong>{card.strategic_relevance.toFixed(1)}</strong>
            ) : (
              <span className="muted">не настроена</span>
            )}
          </span>
          <span>на дату {card.as_of_date}</span>
        </div>

        <ClaimBlock label="Проблема" claim={card.problem} sources={sourceMap} />
        <ClaimBlock label="Преимущество" claim={card.advantage} sources={sourceMap} />
        <ClaimBlock label="Кейс" claim={card.case} sources={sourceMap} />

        {card.caveats.length > 0 && (
          <div className="claim">
            <div className="label">Оговорки</div>
            {card.caveats.map((c, i) => (
              <div key={i} className="text">
                · {c.text}
              </div>
            ))}
          </div>
        )}
      </div>

      {card.exclusion_reason && <div className="banner warn">{card.exclusion_reason}</div>}

      {card.key_predictors.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-title" style={{ marginTop: 0 }}>Ключевые предикторы модели</div>
          <div className="meta">
            {card.key_predictors.slice(0, 6).map((predictor) => (
              <span key={predictor.feature}>
                {predictor.feature} ({predictor.contribution > 0 ? "+" : ""}{predictor.contribution.toFixed(3)})
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid2">
        <div className="card">
          <div className="section-title" style={{ marginTop: 0 }}>
            Профиль сигналов
          </div>
          <SignalRadar scores={card.scores} status={card.metric_status} />
        </div>
        <div className="card">
          <div className="section-title" style={{ marginTop: 0 }}>
            Динамика по источникам
          </div>
          <Timeline points={timeline} />
        </div>
      </div>

      <div className="section-title">Доказательная база ({sources.length})</div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="scroll-x">
          <table>
            <thead>
              <tr>
                <th>Документ</th>
                <th style={{ width: 110 }}>Источник</th>
                <th style={{ width: 150 }}>Тип · семейство · язык</th>
                <th style={{ width: 100 }}>Доверие</th>
                <th style={{ width: 90 }} className="num">
                  Маппинг
                </th>
                <th style={{ width: 130 }}>Статус связи</th>
              </tr>
            </thead>
            <tbody>
              {sources.slice(0, 40).map((s) => (
                <tr key={s.document_id}>
                  <td>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.original_title ?? s.title ?? s.document_id}
                      </a>
                    ) : (
                        (s.original_title ?? s.title ?? s.document_id)
                    )}
                    {s.summary_ru && (
                      <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                        {s.summary_ru}
                        {s.is_generated_summary && (
                          <span> · автоматическое резюме ({s.summary_model_version ?? "версия не указана"})</span>
                        )}
                        {s.summary_review_status === "awaiting_human" && (
                          <span> · требуется экспертная проверка</span>
                        )}
                        {s.summary_numbers_verified && (
                          <span>
                            {" · числа сверены · ID источника "}
                            {s.summary_source_id ?? s.document_id}
                          </span>
                        )}
                      </div>
                    )}
                    {s.summary_evidence_quotes?.map((quote, index) => (
                      <blockquote
                        className="muted"
                        key={`${s.document_id}-summary-quote-${index}`}
                        style={{ fontSize: 12, margin: "4px 0" }}
                      >
                        «{quote}»
                      </blockquote>
                    ))}
                  </td>
                  <td className="muted">{s.source_name}</td>
                  <td className="muted">
                    {s.source_type} · {s.source_family} · {s.language_original ?? "не указан"}
                  </td>
                  <td>
                    <span className={`tag ${s.trust_level === "high" ? "ok" : "warn"}`}>
                      {s.trust_level === "high"
                        ? "Высокий"
                        : s.trust_level === "medium"
                          ? "Средний"
                          : s.trust_level === "low"
                            ? "Низкий"
                            : s.trust_level}
                    </span>
                    <div className="muted" style={{ fontSize: 11 }}>
                      {s.trust_reason}
                    </div>
                  </td>
                  <td className="num">{s.mapping_score.toFixed(2)}</td>
                  <td>
                    <span
                      className={`tag ${s.mapping_status === "approved" || s.mapping_status === "auto_accepted" ? "ok" : "warn"}`}
                    >
                      {s.mapping_status === "pending_review" ? "ждёт ревью" : s.mapping_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="meta" style={{ marginTop: 16 }}>
        <span>
          evidence set <span className="mono">{card.evidence_set_hash.slice(0, 16)}</span>
        </span>
        <span>
          покрытие утверждений источниками {(card.claim_source_coverage * 100).toFixed(0)}%
        </span>
        {Object.entries(card.versions).map(([k, v]) => (
          <span key={k}>
            {k}: <span className="mono">{v}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
