
import { Link } from 'react-router-dom'

const companyImages = [
  '',
  '',
]

function AboutPage() {
  return (
    <>
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-about" />
        <div className="absolute top-50 left-0 right-0 flex items-center justify-end pr-10 text-right text-white md:pr-20 lg:pr-30">
          <div className="max-w-xs md:max-w-lg lg:max-w-2xl">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] md:text-sm lg:text-base">
              Atelier Pascale
            </p>
            <h1 className="font-['Mea_Culpa'] text-[4rem] font-thin tracking-[0.15em] transition duration-300 hover:translate-x-2 md:text-[6rem] lg:text-[8rem]">
              About Us
            </h1>
          </div>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-16 text-ap-brown md:px-12 md:py-20 lg:px-20 lg:py-24">
        <section className="mx-auto grid max-w-6xl gap-10 border-b border-ap-brown pb-14 md:grid-cols-[1fr_1.4fr] md:gap-14 md:pb-16 lg:gap-20 lg:pb-20">
          <h2 className="font-['Tangerine'] text-[3rem] font-light leading-none md:text-[4rem] lg:text-[5rem]">
            Made to feel collected, not crowded.
          </h2>
          <div className="space-y-5 text-sm font-light leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
            <p>
              Atelier Pascale brings together art, home pieces, and thoughtful gifts with a softer sense of luxury. The focus is not on having more, but on choosing pieces that feel personal and lasting.
            </p>
            <p>
              Every product is selected with attention to texture, proportion, and mood, so each piece can sit naturally inside a home while still feeling special.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl py-14 md:py-16 lg:py-20">
          <div className="mb-8 grid gap-6 md:grid-cols-[1fr_1.4fr] md:gap-10 lg:mb-10 lg:gap-14">
            <h2 className="text-2xl font-light md:text-3xl lg:text-4xl">
              The people behind Atelier Pascale
            </h2>
            <p className="text-sm font-light leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
              Our company is shaped by a small team with a shared eye for thoughtful spaces, careful presentation, and personal service.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-0 overflow-hidden">
            {companyImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Atelier Pascale company and team ${index + 1}`}
                  className="aspect-[3/4] w-full object-cover object-center transition duration-300 hover:-translate-y-1 md:aspect-[4/5] lg:aspect-[5/6]"
                />
              ) 
            )}
          </div>
        </section>

        <section className="mx-auto max-w-6xl border-y border-ap-brown py-12 text-center md:py-14 lg:py-16">
          <p className="mx-auto max-w-3xl font-['Tangerine'] text-[2.8rem] font-light leading-none md:text-[4rem] lg:text-[5rem]">
            A home should hold the things you love slowly.
          </p>
        </section>

        <section className="mx-auto grid max-w-6xl gap-8 pt-14 md:grid-cols-[1.2fr_1fr] md:gap-12 md:pt-16 lg:gap-16 lg:pt-20">
          <div>
            <h2 className="mb-5 text-2xl font-light md:text-3xl lg:text-4xl">
              Explore the collection
            </h2>
            <p className="text-sm font-light leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
              Start with new arrivals or browse the art category to find pieces that shape the tone of a space.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end lg:gap-4">
            <Link to="/products/new-arrival" className="w-full border border-ap-brown px-5 py-3 text-center text-sm font-light transition duration-300 hover:-translate-y-1 hover:bg-ap-pale md:w-64 md:text-base lg:w-72">
              New Arrivals
            </Link>
            <Link to="/products/art" className="w-full border border-ap-brown px-5 py-3 text-center text-sm font-light transition duration-300 hover:-translate-y-1 hover:bg-ap-pale md:w-64 md:text-base lg:w-72">
              View Art
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default AboutPage
