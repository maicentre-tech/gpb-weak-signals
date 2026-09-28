export default function ValidationSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-full w-[1vw] bg-accent" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[86vw] font-display text-[3.15vw] font-bold leading-[1.02] tracking-[-0.04em] text-primary">
          ML-валидация: протокол готов, labels ещё нужны
        </h1>
        <div className="mt-[3.8vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[53vw] list-disc flex-col justify-between py-[0.7vh] pl-[2vw] marker:text-accent">
            <li className="pr-[0.7vw] font-body text-[2vw] leading-[1.22]">Grouped nested CV не разделяет одну технологию между train и test folds</li>
            <li className="pr-[0.7vw] font-body text-[2vw] leading-[1.22]">Калибровка рассчитывается только по inner out-of-fold прогнозам</li>
            <li className="pr-[0.7vw] font-body text-[2vw] leading-[1.22]">Отчёт включает PR-AUC, Brier, ECE, confusion matrix и ablation</li>
            <li className="pr-[0.7vw] font-body text-[2vw] leading-[1.22]">Корпусные негативы не подтверждены экспертной разметкой</li>
            <li className="pr-[0.7vw] font-body text-[2vw] leading-[1.22]">Порог 80% нельзя заявлять как достигнутый результат</li>
          </ul>
          <div className="relative flex-1 rounded-[1.2vw] border border-line/70 bg-bg/75 p-[2vw]">
            <div className="absolute left-[8%] top-[8%] flex h-[14%] w-[84%] items-center justify-center rounded-[0.7vw] bg-primary px-[1vw] text-center font-display text-[1.8vw] font-semibold text-bg">Grouped nested CV</div>
            <div className="absolute left-[10%] top-[31%] flex h-[18%] w-[35%] items-center justify-center rounded-[0.7vw] border border-primary/30 bg-panel px-[1vw] text-center font-body text-[1.55vw] font-semibold leading-tight text-primary">train folds</div>
            <div className="absolute right-[10%] top-[31%] flex h-[18%] w-[35%] items-center justify-center rounded-[0.7vw] border border-accent/45 bg-panel px-[1vw] text-center font-body text-[1.55vw] font-semibold leading-tight text-primary">test folds</div>
            <div className="absolute left-[15%] top-[55%] h-[0.35vh] w-[70%] bg-accent/65" />
            <div className="absolute left-[15%] top-[64%] flex h-[15%] w-[70%] items-center justify-center rounded-[0.7vw] border border-line bg-bg font-body text-[1.55vw] font-semibold text-primary">inner out-of-fold</div>
            <div className="absolute bottom-[6%] left-[7%] flex w-[86%] flex-wrap justify-center gap-[0.65vw]">
              <span className="rounded-full bg-panel px-[0.8vw] py-[0.65vh] font-body text-[1.5vw] text-primary">PR-AUC</span>
              <span className="rounded-full bg-panel px-[0.8vw] py-[0.65vh] font-body text-[1.5vw] text-primary">Brier</span>
              <span className="rounded-full bg-panel px-[0.8vw] py-[0.65vh] font-body text-[1.5vw] text-primary">ECE</span>
              <span className="rounded-full bg-panel px-[0.8vw] py-[0.65vh] font-body text-[1.5vw] text-primary">confusion matrix</span>
              <span className="rounded-full bg-panel px-[0.8vw] py-[0.65vh] font-body text-[1.5vw] text-primary">ablation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}