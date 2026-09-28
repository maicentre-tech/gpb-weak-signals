export default function TitleSlide() {
  return (
    <div className="w-screen h-screen overflow-hidden relative slide-cover text-white">
      <div className="absolute left-[5.5vw] top-[15vh] h-[0.8vh] w-[7vw] bg-accent" />
      <section className="relative z-10 flex h-full w-[65vw] flex-col justify-center px-[5.5vw] pt-[8vh]">
        <h1 className="slide-title max-w-[56vw] font-display text-[5.1vw] font-bold leading-[1.02] tracking-[-0.045em] text-white">
          Emerging Technology Intelligence
        </h1>
        <p className="mt-[4vh] max-w-[48vw] font-body text-[2.15vw] font-semibold leading-[1.2] text-white">
          Раннее обнаружение слабых научно-технологических сигналов
        </p>
        <p className="mt-[1.6vh] max-w-[47vw] font-body text-[1.8vw] leading-[1.3] text-white/85">
          Прототип аналитического контура для открытых источников
        </p>
      </section>
      <div className="absolute bottom-[7vh] left-[5.5vw] h-[0.45vh] w-[13vw] bg-accent" />
    </div>
  );
}