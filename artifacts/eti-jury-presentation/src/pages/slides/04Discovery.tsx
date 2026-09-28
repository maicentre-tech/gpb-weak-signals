export default function DiscoverySlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-full w-[31vw] bg-panel/45" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <div className="mb-[1.6vh] h-[0.7vh] w-[5vw] bg-accent" />
        <h1 className="slide-title max-w-[79vw] font-display text-[3.25vw] font-bold leading-[1.02] tracking-[-0.04em] text-primary">
          Запрос вне каталога — отдельный discovery-процесс
        </h1>
        <div className="mt-[3.6vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[50vw] list-disc flex-col justify-between py-[0.5vh] pl-[2vw] marker:text-accent">
            <li className="pr-[0.5vw] font-body text-[2vw] leading-[1.22]">Покрытый запрос использует рассчитанный snapshot</li>
            <li className="pr-[0.5vw] font-body text-[2vw] leading-[1.22]">Непокрытый запрос запускает ограниченный асинхронный поиск</li>
            <li className="pr-[0.5vw] font-body text-[2vw] leading-[1.22]">Кандидаты сохраняют ссылки и происхождение и ожидают review</li>
            <li className="pr-[0.5vw] font-body text-[2vw] leading-[1.22]">Discovery index — эвристическая сортировка, не вероятность</li>
            <li className="pr-[0.5vw] font-body text-[2vw] leading-[1.22]">Каноническая онтология автоматически не меняется</li>
          </ul>
          <div className="relative flex-1 rounded-[1.2vw] border border-line/70 bg-bg/80 p-[2vw]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M 50 17 L 50 33 M 50 46 L 50 56 M 50 56 C 50 67 26 66 26 77 M 50 56 C 50 67 74 66 74 77 M 26 88 C 26 95 50 91 50 96 M 74 88 C 74 95 50 91 50 96" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-primary/45" />
            </svg>
            <div className="absolute left-[25%] top-[7%] flex h-[12%] w-[50%] items-center justify-center rounded-[0.65vw] border border-primary/30 bg-panel font-body text-[1.65vw] font-semibold text-primary">Запрос</div>
            <div className="absolute left-[15%] top-[28%] flex h-[14%] w-[70%] items-center justify-center rounded-[0.65vw] border border-primary/35 bg-panel px-[0.6vw] text-center font-body text-[1.55vw] font-semibold leading-tight text-primary">Проверка покрытия</div>
            <div className="absolute left-[2%] top-[61%] flex h-[21%] w-[45%] items-center justify-center rounded-[0.65vw] border border-accent/45 bg-bg px-[0.7vw] text-center font-body text-[1.5vw] font-semibold leading-tight text-primary">Покрытый запрос · snapshot</div>
            <div className="absolute right-[2%] top-[61%] flex h-[21%] w-[45%] items-center justify-center rounded-[0.65vw] border border-primary/35 bg-bg px-[0.7vw] text-center font-body text-[1.5vw] font-semibold leading-tight text-primary">Непокрытый запрос · open search</div>
            <div className="absolute bottom-[4%] left-[32%] flex h-[12%] w-[36%] items-center justify-center rounded-[0.65vw] bg-primary font-body text-[1.65vw] font-semibold text-bg">review</div>
          </div>
        </div>
      </div>
    </div>
  );
}