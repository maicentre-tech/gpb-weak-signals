export default function EvidenceSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute bottom-0 left-0 h-[1vh] w-full bg-accent" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[82vw] font-display text-[3.55vw] font-bold leading-[1.02] tracking-[-0.04em] text-primary">
          Доказательства остаются рядом с выводом
        </h1>
        <div className="mt-[4vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[52vw] list-disc flex-col justify-between py-[1vh] pl-[2vw] marker:text-accent">
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">Утверждения карточки ссылаются на документы из evidence set</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">Для источников доступны URL, даты, тип документа, язык оригинала и семейство</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">Trust level и причина доверия показываются отдельно от scoring confidence</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">Single-source gate исключает поддержку только одним семейством; DB migration ещё требует проверки</li>
          </ul>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-[37vw] rounded-[1vw] border border-line bg-bg shadow-[0_1.4vh_3vw_rgba(23,58,75,0.08)]">
              <div className="flex items-center justify-between border-b border-line px-[1.8vw] py-[1.8vh]">
                <p className="font-display text-[1.85vw] font-semibold text-primary">Карточка технологии</p>
                <div className="h-[0.75vh] w-[3.6vw] bg-accent" />
              </div>
              <div className="px-[1.8vw] py-[1.1vh]">
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">URL</p>
                  <div className="mt-[0.65vh] h-[0.8vh] w-[85%] bg-panel" />
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">даты</p>
                  <div className="mt-[0.65vh] h-[0.8vh] w-[58%] bg-panel" />
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">тип документа</p>
                  <div className="mt-[0.65vh] h-[0.8vh] w-[67%] bg-panel" />
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">язык оригинала</p>
                  <div className="mt-[0.65vh] h-[0.8vh] w-[49%] bg-panel" />
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">семейство</p>
                  <div className="mt-[0.65vh] h-[0.8vh] w-[73%] bg-panel" />
                </div>
              </div>
              <div className="flex justify-between border-t border-line bg-panel/70 px-[1.8vw] py-[1.5vh]">
                <span className="font-body text-[1.5vw] font-semibold text-primary">Trust level</span>
                <span className="font-body text-[1.5vw] text-muted">scoring confidence</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}