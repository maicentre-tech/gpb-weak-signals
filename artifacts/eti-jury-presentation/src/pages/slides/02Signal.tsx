export default function SignalSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <div className="mb-[2vh] h-[0.7vh] w-[5vw] bg-accent" />
        <h1 className="slide-title max-w-[82vw] font-display text-[3.6vw] font-bold leading-[1.04] tracking-[-0.04em] text-primary">
          Новый сигнал начинается с разрозненных данных
        </h1>
        <div className="mt-[5vh] grid gap-[2.2vh]">
          <div className="flex items-start gap-[1.6vw] border-b border-line/80 py-[2vh]">
            <span className="mt-[0.7vh] block h-[1.4vh] w-[1.4vh] shrink-0 rounded-full bg-accent" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.28] text-text">
              Первые упоминания распределены между статьями, препринтами, патентами, кодом и новостями
            </p>
          </div>
          <div className="flex items-start gap-[1.6vw] border-b border-line/80 py-[2vh]">
            <span className="mt-[0.7vh] block h-[1.4vh] w-[1.4vh] shrink-0 rounded-full bg-primary" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.28] text-text">
              Закрытый каталог не охватывает направление до появления записи в онтологии
            </p>
          </div>
          <div className="flex items-start gap-[1.6vw] py-[2vh]">
            <span className="mt-[0.7vh] block h-[1.4vh] w-[1.4vh] shrink-0 rounded-full bg-accent" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.28] text-text">
              Аналитика должна связывать сигнал, источник и объяснение решения
            </p>
          </div>
        </div>
        <div className="mt-auto flex w-[73vw] items-center gap-[1vw] pb-[1vh]">
          <div className="h-[0.35vh] flex-1 bg-primary/35" />
          <div className="h-[1.2vh] w-[1.2vh] rounded-full bg-accent" />
          <div className="h-[0.35vh] w-[7vw] bg-primary/35" />
        </div>
      </div>
    </div>
  );
}