import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const newArrivalImages = [
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 11.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 11.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 16.jpg'
];

const homeDecorImages = [
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 1.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 2.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 3.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 4.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Home Decor/Pic 9.jpg'
];

const giftsImages = [
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 1.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 2.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 3.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 4.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 14.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Gifts/Pic 19.jpg'
];

const jewelryImages = [
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Jewelry/Pic 1.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Jewelry/Pic 2.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Jewelry/Pic 3.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Jewelry/Pic 4.jpg'
]

const artImages = [
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Art/Pic 1.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Art/Pic 2.jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Art/Pic 3 (2).jpg',
  'https://atelierpascaleimages.blob.core.windows.net/product-images/Art/Pic 4.jpg'
]

function HomePage() {
  return (
    <>
      <section className="relative min-h-screen">
        <div className="absolute bg-home" />

        {/* Stack 2 h1 in flex-col and push them to the end */}
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
          <Reveal>
          <h1 className="pr-15 font-['Mea_Culpa'] text-[4rem] font-thin tracking-[0.15em] transition duration-300 hover:translate-x-2 md:pr-30 md:text-[5rem] lg:pr-50 lg:text-[7rem]">
            Atelier
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
          <h1 className="font-['Mea_Culpa'] text-[4rem] font-thin tracking-[0.15em] transition duration-300 hover:translate-x-2 md:mt-[0.2rem] md:text-[5rem] lg:mt-[0.5rem] lg:text-[7rem]">
            Pascale
            </h1>
          </Reveal>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-20 text-ap-brown md:px-12 lg:px-20">
        <Reveal>
        <section id="new-arrival" className="mx-auto max-w-5xl lg:max-w-6xl">
          <h2 className="mt-[-2rem] text-center font-['Tangerine'] text-5xl font-bold transition duration-300 hover:-translate-y-1 md:text-6xl lg:text-7xl">
            New Arrival
          </h2>

          <div className="mx-auto mt-5 grid w-full gap-10 md:mt-7 md:grid-cols-2 md:gap-12 md:w-[90%] lg:mt-9 lg:gap-15 lg:w-[80%]">
            <div className="transition duration-300 hover:-translate-y-1">
              <div className="overflow-hidden rounded">
                <img src={newArrivalImages[0]} alt="New arrival collection" className="mx-auto h-[240px] w-full object-cover object-center scale-105 lg:h-[300px]" />
              </div>
              <h3 className="mx-auto mt-5 font-['Tangerine'] text-4xl font-bold transition duration-300 hover:text-ap-beige md:text-5xl lg:text-6xl">Latest Pieces</h3>
              <p className="mt-2 text-sm leading-7 text-ap-brown md:text-base md:leading-8 lg:text-lg lg:leading-9">
                Recently added pieces selected for quiet rooms, warm shelves, and slow-looking corners.
              </p>
            </div>

            <div className="transition duration-300 hover:-translate-y-1">
              <div className="overflow-hidden rounded">
                <img src={newArrivalImages[1]} alt="Featured art arrival" className="mx-auto h-[240px] w-full object-cover object-center lg:h-[300px]" />
              </div>
              <h3 className="mx-auto mt-5 font-['Tangerine'] text-4xl font-bold transition duration-300 hover:text-ap-beige md:text-5xl lg:text-6xl">Collected Forms</h3>
              <p className="mt-2 text-sm leading-7 text-ap-brown md:text-base md:leading-8 lg:text-lg lg:leading-9">
                A soft introduction to the newest textures, surfaces, and handmade details.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 w-full text-center md:mt-12 md:w-[45%] lg:mt-14 lg:w-[40%]">
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={newArrivalImages[2]} alt="Centered new arrival feature" className="mx-auto h-[240px] w-full object-cover object-center lg:h-[300px]" />
            </div>
            <Link to="/products/new-arrival" className="mt-8 inline-block cursor-pointer border border-ap-brown px-7 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
              Discover More
            </Link>
          </div>
        </section>
        </Reveal>

        <Reveal>
        <section id="home-decor" className="mx-auto mt-24 grid max-w-6xl gap-8 md:mt-28 md:grid-cols-2 md:items-center md:gap-10 lg:mt-32 lg:gap-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ap-brown md:text-sm lg:text-base">Timeless Elegance</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold transition duration-300 hover:-translate-y-1 md:text-6xl lg:text-7xl">
              Home Decor
            </h2>
            <p className="mt-5 text-sm leading-7 text-ap-brown md:mt-6 md:text-base md:leading-8 lg:text-lg lg:leading-9">
              Objects and finishes chosen to bring warmth, stillness, and character into everyday rooms.
            </p>
            <Link to="/products/home-decor" className="mt-8 inline-block cursor-pointer border border-ap-brown px-7 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
              Explore
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-[5fr_4fr] md:gap-5 lg:gap-6">
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={homeDecorImages[0]} alt="Home decor collection" className="mx-auto h-[450px] w-full object-cover object-center md:h-[320px] lg:h-[420px]" />
            </div>
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1 md:mt-10">
              <img src={homeDecorImages[1]} alt="Home decor detail" className="mx-auto h-[450px] w-full object-cover object-center md:h-[270px] lg:h-[350px]" />
            </div>
          </div>
        </section>
        </Reveal>

        <Reveal>
        <section id="gifts" className="mx-auto mt-24 max-w-6xl md:mt-28 lg:mt-32">
          <div className="mb-8 text-center md:mb-10 lg:mb-12">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ap-brown md:text-sm lg:text-base">Thoughtful Gestures</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold transition duration-300 hover:-translate-y-1 md:text-6xl lg:text-7xl">
              Gifts
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-ap-brown md:mt-6 md:text-base md:leading-8 lg:text-lg lg:leading-9">
              Small pieces with presence, made for celebrations, quiet gratitude, and personal keepsakes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={giftsImages[0]} alt="Gift collection detail" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
            </div>
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={giftsImages[1]} alt="Gift collection piece" className="mx-auto h-[180px] w-full object-cover object-center md:h-[320px] lg:h-[430px]" />
            </div>
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1 md:self-center">
              <img src={giftsImages[2]} alt="Gift collection surface" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
            </div>
            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={giftsImages[3]} alt="Gift collection arrangement" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
            </div>
          </div>

          <div className="text-center">
            <Link to="/products/gifts" className="mt-8 inline-block cursor-pointer border border-ap-brown px-7 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
              Explore
            </Link>
          </div>
        </section>
        </Reveal>

        <Reveal>
        <section id="jewelry" className="mx-auto mt-24 grid max-w-6xl gap-8 md:mt-28 md:grid-cols-2 md:items-center md:gap-12 lg:mt-32 lg:gap-16">
          <div className="overflow-hidden rounded order-2 transition duration-300 hover:-translate-y-1 md:order-1">
            <img src={jewelryImages[2]} alt="Jewelry collection" className="mx-auto h-[400px] w-full object-cover object-center md:h-[340px] lg:h-[550px]" />
          </div>

          <div className="order-1 md:order-2">
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ap-brown md:text-sm lg:text-base">Personal Details</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold transition duration-300 hover:-translate-y-1 md:text-6xl lg:text-7xl">
              Jewelry
            </h2>
            <p className="mt-5 text-sm leading-7 text-ap-brown md:mt-6 md:text-base md:leading-8 lg:text-lg lg:leading-9">
              Delicate accents and expressive forms selected for everyday wear and meaningful moments.
            </p>
            <Link to="/products/jewelry" className="mt-8 inline-block cursor-pointer border border-ap-brown px-7 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
              Explore
            </Link>
          </div>
        </section>
        </Reveal>

        <Reveal>
        <section id="art" className="mx-auto mt-24 max-w-6xl pb-10 md:mt-28 md:pb-12 lg:mt-32 lg:pb-14">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-7 lg:gap-8">
            <div className="col-span-2 m-1 md:col-span-1 md:m-2 lg:m-3">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ap-brown md:text-sm lg:text-base">Moments Become Art</p>
              <h2 className="font-['Tangerine'] text-5xl font-bold transition duration-300 hover:-translate-y-1 md:text-6xl lg:text-7xl">
                Art
              </h2>
              <p className="mt-5 text-sm leading-7 text-ap-brown md:mt-6 md:text-base md:leading-8 lg:text-lg lg:leading-9">
                Expressive pieces arranged with space to breathe, made to be discovered slowly.
              </p>
              <Link to="/products/art" className="mt-4 inline-block cursor-pointer border border-ap-brown px-7 py-3 text-xs uppercase tracking-[0.2em] transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm md:mt-6 lg:mt-8 lg:px-9 lg:py-4">
                Explore
              </Link>
            </div>

            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={artImages[0]} alt="Art collection piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>

            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={artImages[1]} alt="Art collection arrangement" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>

            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={artImages[2]} alt="Art styling piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>

            <div className="overflow-hidden rounded transition duration-300 hover:-translate-y-1">
              <img src={artImages[3] } alt="Art detail piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>
          </div>
        </section>
        </Reveal>
      </main>
    </>
  )
}

export default HomePage


