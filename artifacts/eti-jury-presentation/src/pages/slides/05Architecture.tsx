export default function ArchitectureSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute left-0 top-0 h-full w-[1.2vw] bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[84vw] font-display text-[3.5vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Архитектура разделяет сбор, анализ и интерфейс
        </h1>
        <div className="mt-[4vh] grid flex-1 grid-cols-3 gap-[1.5vw]">
          <div className="flex flex-col justify-between rounded-[1.2vw] border border-line/70 bg-panel/70 p-[1.8vw]">
            <p className="font-body text-[1.55vw] font-semibold uppercase tracking-[0.08em] text-muted">Сбор</p>
            <div>
              <p className="font-display text-[2.2vw] font-semibold leading-tight text-primary">Search adapters</p>
              <p className="mt-[1.5vh] font-body text-[1.9vw] leading-[1.25] text-text">Открытые источники → ingestion → PostgreSQL + pgvector</p>
            </div>
            <p className="font-body text-[1.5vw] text-muted">идемпотентность · лимиты · чекпоинты</p>
          </div>
          <div className="flex flex-col justify-between rounded-[1.2vw] border border-line/70 bg-panel/70 p-[1.8vw]">
            <p className="font-body text-[1.55vw] font-semibold uppercase tracking-[0.08em] text-muted">Анализ</p>
            <div>
              <p className="font-display text-[2.2vw] font-semibold leading-tight text-primary">ML + scoring</p>
              <p className="mt-[1.5vh] font-body text-[1.9vw] leading-[1.25] text-text">Сопоставление, признаки, фильтры, evidence verifier</p>
            </div>
            <p className="font-body text-[1.5vw] text-muted">решение остаётся проверяемым</p>
          </div>
          <div className="flex flex-col justify-between rounded-[1.2vw] border border-line/70 bg-panel/70 p-[1.8vw]">
            <p className="font-body text-[1.55vw] font-semibold uppercase tracking-[0.08em] text-muted">Интерфейс</p>
            <div>
              <p className="font-display text-[2.2vw] font-semibold leading-tight text-primary">FastAPI + Next.js</p>
              <p className="mt-[1.5vh] font-body text-[1.9vw] leading-[1.25] text-text">API, поиск, карточка сигнала и provenance для эксперта</p>
            </div>
            <p className="font-body text-[1.5vw] text-muted">Docker Compose для локального запуска</p>
          </div>
        </div>
        <div className="mt-[3vh] flex items-center justify-between border-t border-line/75 pt-[2vh]">
          <p className="font-body text-[1.8vw] text-text">LLM — только русское объяснение на основании заранее отобранного evidence</p>
          <span className="font-body text-[1.5vw] font-semibold uppercase tracking-[0.1em] text-accent">не source of truth</span>
        </div>
      </div>
    </div>
  );
}