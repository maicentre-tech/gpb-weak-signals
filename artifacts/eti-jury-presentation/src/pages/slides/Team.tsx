const base = import.meta.env.BASE_URL;

export default function TeamSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-[1vh] w-full bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[5vh]">
        <h1 className="slide-title font-display text-[3.6vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Команда проекта
        </h1>
        <p className="mt-[1.5vh] font-body text-[2vw] text-muted">
          muginov capital · 2 участника
        </p>

        <div className="mt-[4vh] grid flex-1 grid-cols-2 gap-[3vw]">
          <section className="flex flex-col justify-center gap-[4vh] rounded-[1.2vw] bg-primary p-[3vw] text-bg">
            <div className="flex items-center gap-[2vw]">
              <div className="flex h-[15vw] w-[15vw] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[4vw] font-bold text-primary">
                АМ
              </div>
              <h2 className="font-display text-[2.8vw] font-bold leading-[1.1]">
                Арно Мугинов
              </h2>
            </div>
            <p className="font-body text-[2vw] leading-[1.3] text-bg/85">
              Капитан · AI
            </p>
          </section>

          <section className="flex flex-col justify-center gap-[4vh] rounded-[1.2vw] bg-primary p-[3vw] text-bg">
            <div className="flex items-center gap-[2vw]">
              <img
                src={`${base}team-ildar.png`}
                crossOrigin="anonymous"
                className="h-[15vw] w-[15vw] shrink-0 rounded-full border-[0.35vw] border-accent object-cover"
                alt="Портрет участника команды"
              />
              <h2 className="font-display text-[2.8vw] font-bold leading-[1.1]">
                Ильдар Мугинов
              </h2>
            </div>
            <p className="font-body text-[2vw] leading-[1.3] text-bg/85">
              Бизнес-аналитика · ИТ-консультирование · маркетинг · управление
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}