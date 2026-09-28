export default function ScoringSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute left-0 top-0 h-full w-[1.2vw] bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[82vw] font-display text-[3.5vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          От признаков к объяснимому ранжированию
        </h1>
        <div className="mt-[4vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[51vw] list-disc flex-col justify-between py-[1vh] pl-[2vw] marker:text-accent">
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.23]">Scoring объединяет novelty, growth, acceleration, cross-domain и evidence confidence</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.23]">ML-классификатор показывает вероятность и ключевые предикторы</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.23]">Фильтры зрелости, хайпа и шума применяются после модели</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.23]">Каждое исключение сопровождается причиной</li>
          </ul>
          <div className="relative flex-1 rounded-[1.2vw] border border-line/70 bg-panel/70 p-[2vw]">
            <div className="absolute left-[7%] top-[8%] font-body text-[1.5vw] font-semibold uppercase tracking-[0.08em] text-muted">Scoring</div>
            <div className="absolute left-[7%] top-[17%] flex w-[86%] flex-wrap gap-[0.75vw]">
              <span className="rounded-full border border-line bg-bg px-[0.9vw] py-[0.7vh] font-body text-[1.55vw] text-primary">novelty</span>
              <span className="rounded-full border border-line bg-bg px-[0.9vw] py-[0.7vh] font-body text-[1.55vw] text-primary">growth</span>
              <span className="rounded-full border border-line bg-bg px-[0.9vw] py-[0.7vh] font-body text-[1.55vw] text-primary">acceleration</span>
              <span className="rounded-full border border-line bg-bg px-[0.9vw] py-[0.7vh] font-body text-[1.55vw] text-primary">cross-domain</span>
              <span className="rounded-full border border-line bg-bg px-[0.9vw] py-[0.7vh] font-body text-[1.55vw] text-primary">evidence confidence</span>
            </div>
            <div className="absolute left-1/2 top-[43%] h-[7vh] w-[0.12vw] -translate-x-1/2 bg-accent/70" />
            <div className="absolute left-[14%] top-[57%] flex h-[19%] w-[72%] flex-col items-center justify-center rounded-[0.8vw] border border-primary/30 bg-bg text-center">
              <p className="font-display text-[1.8vw] font-semibold text-primary">ML-классификатор</p>
              <p className="mt-[0.7vh] font-body text-[1.5vw] text-muted">вероятность · ключевые предикторы</p>
            </div>
            <div className="absolute left-[14%] top-[79%] flex w-[72%] flex-wrap justify-center gap-[0.8vw]">
              <span className="rounded-full bg-primary px-[1vw] py-[0.7vh] font-body text-[1.5vw] text-bg">зрелость</span>
              <span className="rounded-full bg-primary px-[1vw] py-[0.7vh] font-body text-[1.5vw] text-bg">хайп</span>
              <span className="rounded-full bg-primary px-[1vw] py-[0.7vh] font-body text-[1.5vw] text-bg">шум</span>
            </div>
            <p className="absolute bottom-[2.2vh] left-[18%] w-[64%] text-center font-body text-[1.5vw] text-muted">Причина исключения</p>
          </div>
        </div>
      </div>
    </div>
  );
}