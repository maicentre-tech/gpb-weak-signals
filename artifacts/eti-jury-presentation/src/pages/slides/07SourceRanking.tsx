export default function SourceRankingSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-[1vh] w-full bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[86vw] font-display text-[3.5vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Ранжирование учитывает качество и независимость источников
        </h1>
        <div className="mt-[4vh] grid flex-1 grid-cols-2 gap-[4vw]">
          <div className="flex flex-col justify-between">
            <div className="flex items-start gap-[1.5vw] border-b border-line/75 py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
              <p className="font-body text-[2vw] leading-[1.2]">Evidence хранит source family, type, trust level, trust reason и вес</p>
            </div>
            <div className="flex items-start gap-[1.5vw] border-b border-line/75 py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
              <p className="font-body text-[2vw] leading-[1.2]">Метрики нормализуются и агрегируются с весами семейств источников</p>
            </div>
            <div className="flex items-start gap-[1.5vw] border-b border-line/75 py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
              <p className="font-body text-[2vw] leading-[1.2]">Недоступная метрика не превращается в ноль: вес перераспределяется</p>
            </div>
            <div className="flex items-start gap-[1.5vw] py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
              <p className="font-body text-[2vw] leading-[1.2]">Новости — ранний индикатор, но не единственное доказательство внедрения</p>
            </div>
          </div>
          <div className="relative rounded-[1.2vw] border border-line/70 bg-panel/70 p-[2vw]">
            <p className="font-body text-[1.55vw] font-semibold uppercase tracking-[0.08em] text-muted">Источник → вклад</p>
            <div className="absolute left-[10%] top-[24%] flex w-[80%] items-center justify-between">
              <span className="rounded-full border border-line bg-bg px-[1vw] py-[0.9vh] font-body text-[1.65vw] text-primary">family</span>
              <span className="h-[0.15vw] w-[10%] bg-accent/75" />
              <span className="rounded-full border border-line bg-bg px-[1vw] py-[0.9vh] font-body text-[1.65vw] text-primary">trust</span>
              <span className="h-[0.15vw] w-[10%] bg-accent/75" />
              <span className="rounded-full border border-line bg-bg px-[1vw] py-[0.9vh] font-body text-[1.65vw] text-primary">weight</span>
            </div>
            <div className="absolute left-[13%] top-[45%] flex h-[24%] w-[74%] flex-col items-center justify-center rounded-[0.8vw] bg-primary text-center text-bg">
              <p className="font-display text-[2vw] font-semibold">evidence confidence</p>
              <p className="mt-[1vh] font-body text-[1.55vw]">независимые семейства усиливают поддержку</p>
            </div>
            <p className="absolute bottom-[8%] left-[12%] w-[76%] text-center font-body text-[1.7vw] leading-[1.2] text-muted">single-source support не проходит gate</p>
          </div>
        </div>
      </div>
    </div>
  );
}