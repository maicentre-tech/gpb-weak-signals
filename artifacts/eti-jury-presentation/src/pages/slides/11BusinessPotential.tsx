export default function BusinessPotentialSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-[1vh] w-full bg-primary" />
      <div className="absolute bottom-0 left-0 h-[0.7vh] w-[18vw] bg-accent" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[8vh] pb-[3vh]">
        <div className="flex items-end justify-between gap-[3vw]">
          <div>
            <p className="font-body text-[1.5vw] font-bold tracking-[0.12em] text-accent">
              ПОТЕНЦИАЛ ВНЕДРЕНИЯ
            </p>
            <h1 className="slide-title mt-[0.8vh] max-w-[68vw] font-display text-[3.4vw] font-bold leading-[1.04] tracking-[-0.04em] text-primary">
              Потенциал внедрения
            </h1>
            <p className="mt-[0.6vh] font-body text-[1.5vw] text-muted">
              Гипотеза для проверки; эффект и ROI не оценивались.
            </p>
          </div>
          <span className="mb-[0.8vh] shrink-0 rounded-full border border-line px-[1vw] py-[0.8vh] font-body text-[1.5vw] font-semibold text-muted">
            НЕ РЕЗУЛЬТАТ ПИЛОТА
          </span>
        </div>

        <div className="mt-[2vh] grid grid-cols-2 gap-[1.6vw]">
          <section className="rounded-[0.8vw] border border-line bg-bg p-[1.4vw] shadow-[0_1vh_2.2vw_rgba(23,58,75,0.05)]">
            <p className="font-body text-[1.5vw] font-bold tracking-[0.1em] text-primary">
              ФАКТЫ ПРОТОТИПА
            </p>
            <h2 className="mt-[0.6vh] font-display text-[1.8vw] font-semibold text-primary">
              Что уже реализовано
            </h2>
            <ul className="mt-[1.2vh] flex list-disc flex-col gap-[0.7vh] pl-[1.5vw] marker:text-accent">
              <li className="font-body text-[2vw] leading-[1.15]">
                Live-доступ требует актуального одобрения прав.
              </li>
              <li className="font-body text-[2vw] leading-[1.15]">
                Кандидаты связаны с evidence; решение — за экспертом.
              </li>
              <li className="font-body text-[2vw] leading-[1.15]">
                ML-качество и бизнес-эффект не подтверждены.
              </li>
            </ul>
          </section>

          <section className="rounded-[0.8vw] border border-primary/20 bg-panel/55 p-[1.4vw]">
            <p className="font-body text-[1.5vw] font-bold tracking-[0.1em] text-accent">
              ПРЕДПОЛОЖЕНИЯ
            </p>
            <h2 className="mt-[0.6vh] font-display text-[1.8vw] font-semibold text-primary">
              Возможная ценность
            </h2>
            <div className="mt-[1.2vh] space-y-[0.7vh]">
              <p className="font-body text-[2vw] leading-[1.15]">
                <strong>Пользователь:</strong> теханалитики / R&amp;D — гипотеза.
              </p>
              <p className="font-body text-[2vw] leading-[1.15]">
                <strong>Ценность:</strong> быстрее первичный отбор; не измерена.
              </p>
              <p className="font-body text-[2vw] leading-[1.15]">
                <strong>Внедрение:</strong> внутренний инструмент — вариант; владелец и бюджет не определены.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-[2vh]">
          <p className="font-body text-[1.5vw] font-bold tracking-[0.1em] text-primary">
            ПУТЬ К ОГРАНИЧЕННОМУ ПИЛОТУ
          </p>
          <div className="mt-[0.8vh] grid grid-cols-4 gap-[0.8vw]">
            {[
              ["01", "Права + snapshot"],
              ["02", "Экспертные labels"],
              ["03", "Отложенный тест"],
              ["04", "Пилот + замер"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="min-h-[7vh] border-t-[0.45vh] border-accent bg-bg/75 px-[0.8vw] py-[0.6vh]"
              >
                <p className="font-display text-[1.5vw] font-bold text-accent">{number}</p>
                <p className="mt-[0.55vh] font-body text-[1.5vw] leading-[1.2] text-text">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-[0.8vh] font-body text-[1.5vw] text-muted">
            В пилоте измерить: время разбора · precision@N · покрытие · экспертную долю.
          </p>
        </div>
      </div>
    </div>
  );
}