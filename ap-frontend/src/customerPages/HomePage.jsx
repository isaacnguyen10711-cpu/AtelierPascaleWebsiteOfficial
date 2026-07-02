import { Link } from 'react-router-dom'

const images = {
  newArrival: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/Background6.jpg',
  lacquer: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/LacquerBackground.jpg',
  art: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/Background3%20edited.jpg',
}

function HomePage() {
  return (
    <>
      <section className="relative min-h-screen">
        <div className="bg-home" />

        <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
          <h1 className="pr-15 font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] md:pr-30 md:text-[5rem] lg:pr-50 lg:text-[7rem]">
            Atelier
          </h1>

          <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] md:mt-[0.2rem] md:text-[5rem] lg:mt-[0.5rem] lg:text-[7rem]">
            Pascale
          </h1>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-20 text-ap-brown md:px-12 lg:px-20">
        <section id="new-arrival" className="mx-auto max-w-5xl">
          <h2 className="mb-10 mt-[-2rem] text-center font-['Tangerine'] text-6xl font-bold md:text-7xl">
            New Arrival
          </h2>

          <div className="grid gap-15 w-[90%] mx-auto md:grid-cols-2">
            <div>
              <img src={images.newArrival} alt="New arrival collection" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
              <h3 className="mt-5 font-['Tangerine'] mx-auto text-4xl font-bold">Latest Pieces</h3>
              <p className="mt-2 leading-7 text-ap-brown/80">
                Recently added pieces selected for quiet rooms, warm shelves, and slow-looking corners.
              </p>
            </div>

            <div>
              <img src={images.art} alt="Featured art arrival" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
              <h3 className="mt-5 font-['Tangerine'] mx-auto text-4xl font-bold">Collected Forms</h3>
              <p className="mt-2 leading-7 text-ap-brown/80">
                A soft introduction to the newest textures, surfaces, and handmade details.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[90%] text-center md:max-w-[40%] lg:max-w-[50%]">
            <img src={images.lacquer} alt="Centered new arrival feature" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
            <Link to="/products" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Discover More
            </Link>
          </div>
        </section>

        <section id="lacquer" className="mx-auto mt-25 max-w-6xl">
          <h2 className="mb-12 text-center font-['Tangerine'] text-6xl font-bold md:text-7xl">
            Lacquer Impression
          </h2>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            <img src={images.lacquer} alt="Lacquer detail" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
            <img src={images.newArrival} alt="Lacquer styled piece" className="mx-auto h-[180px] w-full object-cover object-center md:h-[340px] lg:h-[460px]" />
            <img src={images.lacquer} alt="Lacquer surface" className="mx-auto h-[180px] w-full object-cover object-center md:self-end md:mt-16 md:h-[250px] lg:h-[350px]" />
            <img src={images.art} alt="Lacquer arrangement" className="mx-auto h-[180px] object-cover object-center md:h-[250px] lg:h-[350px]" />
          </div>

          <div className="mt-10 text-center">
            <Link to="/products/lacquer" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Explore Lacquer
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-28 grid max-w-6xl gap-12 md:flex md:flex-row md:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown/70">Timeless Elegance</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
              Made for Stillness
            </h2>
            <p className="mt-6 leading-8 text-ap-brown/80">
              A quiet study of shapes, finishes, and objects that bring warmth into everyday spaces.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <img src={images.newArrival} alt="Timeless elegance feature" className="mx-auto h-[260px] w-[80%] object-cover object-center md:h-[320px] lg:h-[540px]" />
            <img src={images.lacquer} alt="Timeless lacquer feature" className="mx-auto h-[220px] w-[80%] object-cover object-center md:mt-24 md:h-[320px] lg:h-[220px]" />
          </div>
        </section>

        <section id="art" className="mx-auto mt-28 max-w-6xl pb-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown/70">Moments Become Art</p>
            <h2 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
              Art
            </h2>
            <p className="mt-6 leading-8 text-ap-brown/80">
              Expressive pieces arranged with space to breathe, made to be discovered slowly.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:items-end">
            <img src={images.art} alt="Art collection piece" className="mx-auto h-[240px] w-[80%] object-cover object-center md:h-[260px] lg:h-[460px]" />
            <img src={images.newArrival} alt="Art collection arrangement" className="mx-auto h-[260px] w-[80%] object-cover object-center" />
            <img src={images.art} alt="Art collection detail" className="mx-auto h-[260px] w-[80%] object-cover object-center md:h-[320px] lg:h-[540px]" />
          </div>

          <div className="mt-10 text-center">
            <Link to="/products/art" className="inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Explore Art
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage



