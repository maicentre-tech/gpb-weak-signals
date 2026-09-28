export default function SourcesSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute left-0 top-0 h-[0.8vh] w-full bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[82vw] font-display text-[3.45vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Источники проходят правовой фильтр
        </h1>
        <div className="mt-[4vh] flex min-h-0 flex-1 gap-[4vw]">
          <ul className="flex w-[51vw] list-disc flex-col justify-between py-[1vh] pl-[2vw] marker:text-accent">
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">OpenAlex — библиографические и научные метаданные</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">arXiv — препринты</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">GitHub — репозитории и активность разработки</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">GDELT — новостное внимание, но не доказательство внедрения</li>
            <li className="pr-[1vw] font-body text-[2vw] leading-[1.24]">Открытый поиск использует только включённые источники с разрешённой лицензией и derivative analytics</li>
          </ul>
          <div className="relative flex-1 rounded-[1.2vw] border border-line/70 bg-panel/65 p-[2vw]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d="M 36 16 C 48 16 50 42 65 50" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-accent/70" />
              <path d="M 36 38 C 49 38 52 46 65 50" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-primary/55" />
              <path d="M 36 62 C 49 62 52 54 65 50" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-primary/55" />
              <path d="M 36 84 C 48 84 50 58 65 50" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-accent/70" />
            </svg>
            <div className="absolute left-[7%] top-[8%] flex h-[15%] w-[32%] items-center rounded-[0.6vw] border border-line bg-bg px-[1vw] font-body text-[1.55vw] font-semibold text-primary">OpenAlex</div>
            <div className="absolute left-[7%] top-[30%] flex h-[15%] w-[32%] items-center rounded-[0.6vw] border border-line bg-bg px-[1vw] font-body text-[1.55vw] font-semibold text-primary">arXiv</div>
            <div className="absolute left-[7%] top-[54%] flex h-[15%] w-[32%] items-center rounded-[0.6vw] border border-line bg-bg px-[1vw] font-body text-[1.55vw] font-semibold text-primary">GitHub</div>
            <div className="absolute left-[7%] top-[77%] flex h-[15%] w-[32%] items-center rounded-[0.6vw] border border-line bg-bg px-[1vw] font-body text-[1.55vw] font-semibold text-primary">GDELT</div>
            <div className="absolute right-[5%] top-[32%] flex h-[36%] w-[38%] flex-col justify-center rounded-[0.8vw] border border-primary/35 bg-bg px-[1.3vw] text-center">
              <div className="mx-auto mb-[1.8vh] h-[0.8vh] w-[4vw] bg-accent" />
              <p className="font-display text-[1.75vw] font-semibold leading-[1.1] text-primary">Карточка доказательств</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}