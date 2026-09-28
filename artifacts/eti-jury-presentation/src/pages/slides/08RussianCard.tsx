export default function RussianCardSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute left-[5.5vw] top-[5vh] h-[0.7vh] w-[5vw] bg-accent" />
      <div className="absolute bottom-0 right-0 h-[39vh] w-[37vw] rounded-tl-[24vw] bg-panel/65" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[83vw] font-display text-[3.5vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Русская карточка не заменяет оригинал
        </h1>
        <div className="mt-[4vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[53vw] list-disc flex-col justify-between py-[0.8vh] pl-[2vw] marker:text-accent">
            <li className="pr-[0.6vw] font-body text-[2vw] leading-[1.22]">При доступной локальной модели аналитическая карточка может быть создана по-русски</li>
            <li className="pr-[0.6vw] font-body text-[2vw] leading-[1.22]">Если модель недоступна, UI явно показывает fallback на языке источников</li>
            <li className="pr-[0.6vw] font-body text-[2vw] leading-[1.22]">Заголовки и тексты документов сохраняются без перевода</li>
            <li className="pr-[0.6vw] font-body text-[2vw] leading-[1.22]">Автоматическая проверка сверяет source IDs и числа, но не смысловую точность пересказа</li>
            <li className="pr-[0.6vw] font-body text-[2vw] leading-[1.22]">До пилота необходима человеческая проверка содержания</li>
          </ul>
          <div className="flex flex-1 items-center justify-center">
            <div className="relative w-[35vw]">
              <div className="absolute left-[5%] top-[0.7vh] h-[45vh] w-[90%] rotate-[4deg] rounded-[0.8vw] border border-line bg-panel/70" />
              <div className="relative z-10 rounded-[0.8vw] border border-primary/25 bg-bg p-[2vw] shadow-[0_1.2vh_2.8vw_rgba(23,58,75,0.07)]">
                <div className="flex items-center justify-between border-b border-line pb-[1.5vh]">
                  <p className="font-display text-[1.75vw] font-semibold text-primary">Русская карточка</p>
                  <span className="h-[0.8vh] w-[3vw] bg-accent" />
                </div>
                <div className="mt-[2vh] space-y-[1.1vh]">
                  <div className="h-[0.85vh] w-[88%] bg-panel" />
                  <div className="h-[0.85vh] w-[74%] bg-panel" />
                  <div className="h-[0.85vh] w-[81%] bg-panel" />
                </div>
                <div className="mt-[2.4vh] flex flex-wrap gap-[0.7vw]">
                  <span className="rounded-full border border-line px-[0.8vw] py-[0.55vh] font-body text-[1.5vw] text-primary">source IDs</span>
                  <span className="rounded-full border border-line px-[0.8vw] py-[0.55vh] font-body text-[1.5vw] text-primary">числа</span>
                </div>
                <div className="mt-[2.2vh] border-t border-line pt-[1.5vh]">
                  <p className="font-body text-[1.55vw] font-semibold text-muted">Оригинал</p>
                  <div className="mt-[1vh] h-[0.7vh] w-[77%] bg-panel" />
                  <div className="mt-[0.8vh] h-[0.7vh] w-[61%] bg-panel" />
                </div>
              </div>
              <p className="relative z-10 mt-[2vh] text-center font-body text-[1.55vw] font-semibold text-accent">человеческая проверка содержания</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}