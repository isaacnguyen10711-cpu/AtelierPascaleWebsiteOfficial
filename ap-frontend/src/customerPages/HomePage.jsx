import { Link } from 'react-router-dom'

const images = {
  newArrival: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/Background6.jpg',
  homeDecor: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/LacquerBackground.jpg',
  gifts: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/Background5.jpg',
  jewelry: 'https://atelierpascaleimages.blob.core.windows.net/product-images/Background/Background6.jpg',
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

          <div className="mx-auto grid w-[90%] gap-15 md:grid-cols-2">
            <div>
              <img src={images.newArrival} alt="New arrival collection" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
              <h3 className="mx-auto mt-5 font-['Tangerine'] text-4xl font-bold">Latest Pieces</h3>
              <p className="mt-2 leading-7 text-ap-brown">
                Recently added pieces selected for quiet rooms, warm shelves, and slow-looking corners.
              </p>
            </div>

            <div>
              <img src={images.art} alt="Featured art arrival" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
              <h3 className="mx-auto mt-5 font-['Tangerine'] text-4xl font-bold">Collected Forms</h3>
              <p className="mt-2 leading-7 text-ap-brown">
                A soft introduction to the newest textures, surfaces, and handmade details.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-10 max-w-[90%] text-center md:max-w-[40%] lg:max-w-[50%]">
            <img src={images.homeDecor} alt="Centered new arrival feature" className="mx-auto h-[200px] w-full object-cover object-center md:h-[250px] lg:h-[300px]" />
            <Link to="/products/new-arrival" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Discover More
            </Link>
          </div>
        </section>

        <section id="home-decor" className="mx-auto mt-28 grid max-w-6xl gap-4 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown">Timeless Elegance</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
              Home Decor
            </h2>
            <p className="mt-6 leading-8 text-ap-brown">
              Objects and finishes chosen to bring warmth, stillness, and character into everyday rooms.
            </p>
            <Link to="/products/home-decor" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Explore
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-[5fr_4fr]">
            <img src={images.homeDecor} alt="Home decor collection" className="mx-auto h-[240px] w-full object-cover object-center md:h-[320px] lg:h-[420px]" />
            <img src={images.gifts} alt="Home decor detail" className="mx-auto h-[220px] w-full object-cover object-center md:mt-10 md:h-[270px] lg:h-[350px]" />
          </div>
        </section>

        <section id="gifts" className="mx-auto mt-28 max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown">Thoughtful Gestures</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
              Gifts
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-8 text-ap-brown">
              Small pieces with presence, made for celebrations, quiet gratitude, and personal keepsakes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <img src={images.gifts} alt="Gift collection detail" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
            <img src={images.newArrival} alt="Gift collection piece" className="mx-auto h-[180px] w-full object-cover object-center md:h-[320px] lg:h-[430px]" />
            <img src={images.homeDecor} alt="Gift collection surface" className="mx-auto h-[180px] w-full object-cover object-center md:self-center md:h-[250px] lg:h-[350px]" />
            <img src={images.art} alt="Gift collection arrangement" className="mx-auto h-[180px] w-full object-cover object-center md:h-[250px] lg:h-[350px]" />
          </div>

          <div className="text-center">
            <Link to="/products/gifts" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Explore
            </Link>
          </div>
        </section>

        <section id="jewelry" className="mx-auto mt-28 grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
          <div className="md:order-2">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown">Personal Details</p>
            <h2 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
              Jewelry
            </h2>
            <p className="mt-6 leading-8 text-ap-brown">
              Delicate accents and expressive forms selected for everyday wear and meaningful moments.
            </p>
            <Link to="/products/jewelry" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Explore
            </Link>
          </div>

          <div className="md:order-1">
            <img src={images.jewelry} alt="Jewelry collection" className="mx-auto h-[260px] w-full object-cover object-center md:h-[340px] lg:h-[460px]" />
          </div>
        </section>

        <section id="art" className="mx-auto mt-28 max-w-6xl pb-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-ap-brown">Moments Become Art</p>
              <h2 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
                Art
              </h2>
              <p className="mt-6 leading-8 text-ap-brown">
                Expressive pieces arranged with space to breathe, made to be discovered slowly.
              </p>
              <Link to="/products/art" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
                Explore
              </Link>
            </div>

            <div>
              <img src={images.art} alt="Art collection piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>

            <div>
              <img src={images.newArrival} alt="Art collection arrangement" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <img src={images.homeDecor} alt="Art styling piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>

            <div>
              <img src={images.gifts} alt="Art detail piece" className="h-[200px] w-full object-cover object-center md:h-[240px] lg:h-[280px]" />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default HomePage
