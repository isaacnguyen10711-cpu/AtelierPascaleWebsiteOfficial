function HomePage() {
  return (
    <div className="relative min-h-screen">
      <div className="bg-home" />

      <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
        <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] pr-15 md:text-[5rem] md:pr-30 lg:text-[7rem] lg:pr-50">
          Atelier
        </h1>

        <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] md:mt-[0.2rem] md:text-[5rem] lg:mt-[0.5rem] lg:text-[7rem]">
          Pascale
        </h1>
      </div>
    </div>
  )
}

export default HomePage
