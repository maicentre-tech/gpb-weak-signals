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
                <p className="font-display text-[1.85vw] font-semibold text-primary">Карточка</p>
                <span className="rounded-full border border-accent px-[0.7vw] py-[0.45vh] font-body text-[1.5vw] font-semibold text-accent">
                  СХЕМА · БЕЗ ДАННЫХ
                </span>
              </div>
              <div className="px-[1.8vw] py-[1.1vh]">
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">URL</p>
                  <p className="font-body text-[1.5vw] text-text">не задан</p>
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">даты</p>
                  <p className="font-body text-[1.5vw] text-text">не указаны</p>
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">тип документа</p>
                  <p className="font-body text-[1.5vw] text-text">не выбран</p>
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] border-b border-line/70 py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">язык оригинала</p>
                  <p className="font-body text-[1.5vw] text-text">не проверен</p>
                </div>
                <div className="grid grid-cols-[1.1fr_1.8fr] gap-x-[1.4vw] py-[1.45vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">семейство</p>
                  <p className="font-body text-[1.5vw] text-text">не подтверждено</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-[1.5vw] border-t border-line bg-panel/70 px-[1.8vw] py-[1.2vh]">
                <div>
                  <p className="font-body text-[1.5vw] font-semibold text-primary">Trust level</p>
                  <p className="font-body text-[1.5vw] text-muted">не присвоен</p>
                </div>
                <div>
                  <p className="font-body text-[1.5vw] font-semibold text-primary">Scoring confidence</p>
                  <p className="font-body text-[1.5vw] text-muted">не рассчитан</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}