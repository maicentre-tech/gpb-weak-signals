export default function ApplicationSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-paper text-text">
      <div className="absolute left-0 top-0 h-full w-[1.2vw] bg-accent" />
      <div className="relative flex h-full flex-col px-[5.5vw] pt-[13vh] pb-[4vh]">
        <h1 className="slide-title max-w-[83vw] font-display text-[3.6vw] font-bold leading-[1.03] tracking-[-0.04em] text-primary">
          Потенциал применения: эксперт получает проверяемые гипотезы
        </h1>
        <div className="mt-[4vh] flex flex-1 flex-col justify-between">
          <div className="flex items-center justify-between rounded-[1.2vw] bg-primary px-[2vw] py-[2.2vh] text-bg">
            <span className="font-body text-[1.9vw]">запрос</span>
            <span className="font-body text-[2vw] text-accent">→</span>
            <span className="font-body text-[1.9vw]">источники</span>
            <span className="font-body text-[2vw] text-accent">→</span>
            <span className="font-body text-[1.9vw]">кандидаты</span>
            <span className="font-body text-[2vw] text-accent">→</span>
            <span className="font-body text-[1.9vw]">карточка</span>
          </div>
          <div className="grid grid-cols-2 gap-x-[5vw] gap-y-[1vh] px-[1vw]">
            <div className="flex items-start gap-[1.5vw] border-b border-line/75 py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
              <p className="font-body text-[2vw] leading-[1.2]">Автоматизируется первичный этап поиска зарождающихся технологий</p>
            </div>
            <div className="flex items-start gap-[1.5vw] border-b border-line/75 py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
              <p className="font-body text-[2vw] leading-[1.2]">Эксперт видит преимущество, кейс, статус и первоисточники</p>
            </div>
            <div className="flex items-start gap-[1.5vw] py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-primary" />
              <p className="font-body text-[2vw] leading-[1.2]">Human-in-the-loop сохраняет контроль при неполных данных</p>
            </div>
            <div className="flex items-start gap-[1.5vw] py-[1.5vh]">
              <span className="mt-[0.8vh] block h-[1.35vh] w-[1.35vh] shrink-0 rounded-full bg-accent" />
              <p className="font-body text-[2vw] leading-[1.2]">Текущий пилот — прототип: качество и ML-confidence требуют labels и проверки</p>
            </div>
          </div>
          <div className="border-t border-line/75 pt-[2vh]">
            <p className="font-body text-[2vw] leading-[1.2] text-text">KPI пилота: время до готового списка кандидатов · доля экспертно подтверждённых кандидатов в топ-10 · доля выводов со ссылкой на первоисточник и цитатой.</p>
            <p className="mt-[0.7vh] font-body text-[1.5vw] leading-[1.2] text-muted">Сначала фиксируем базовый ручной сценарий; численные цели и результаты появятся только после проверки.</p>
          </div>
        </div>
      </div>
    </div>
  );
}