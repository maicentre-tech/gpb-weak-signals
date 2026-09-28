export default function PilotSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute right-0 top-0 h-[1vh] w-full bg-primary" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[83vw] font-display text-[3.6vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Что нужно, чтобы перейти к пилоту
        </h1>
        <div className="mt-[4.5vh] flex flex-1 flex-col justify-between pb-[2vh]">
          <div className="flex items-start gap-[1.7vw] border-b border-line/75 py-[1.7vh]">
            <span className="mt-[0.9vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.25] text-text">Подключить PostgreSQL snapshot и применить подготовленную миграцию</p>
          </div>
          <div className="flex items-start gap-[1.7vw] border-b border-line/75 py-[1.7vh]">
            <span className="mt-[0.9vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.25] text-text">Выгрузить реальные корпусные негативы и получить экспертные labels</p>
          </div>
          <div className="flex items-start gap-[1.7vw] border-b border-line/75 py-[1.7vh]">
            <span className="mt-[0.9vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.25] text-text">Проверить scoring на независимой отложенной выборке</p>
          </div>
          <div className="flex items-start gap-[1.7vw] border-b border-line/75 py-[1.7vh]">
            <span className="mt-[0.9vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.25] text-text">Оценить качество и задержку русских summaries на реальных документах</p>
          </div>
          <div className="flex items-start gap-[1.7vw] py-[1.7vh]">
            <span className="mt-[0.9vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
            <p className="max-w-[79vw] font-body text-[2.05vw] leading-[1.25] text-text">Утвердить пороги только после этой проверки</p>
          </div>
        </div>
        <div className="absolute bottom-[5vh] right-[5.5vw] h-[0.5vh] w-[12vw] bg-accent/65" />
      </div>
    </div>
  );
}