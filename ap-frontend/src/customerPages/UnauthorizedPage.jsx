import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-ap-tan px-6 py-28 text-ap-brown md:px-12 md:py-32 lg:px-20 lg:py-36">
      <section className="w-full max-w-sm rounded-md border border-ap-brown bg-ap-pale p-5 text-center transition duration-300 hover:shadow-lg md:max-w-md md:p-7 lg:max-w-lg lg:p-8">
        <p className="text-xs uppercase tracking-[0.3em] md:text-sm lg:text-base">
          Access Denied
        </p>

        <h1 className="mt-4 text-3xl font-medium md:text-4xl lg:text-5xl">
          Unauthorized
        </h1>

        <p className="mx-auto mt-5 text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
          You do not have permission to view this page.
        </p>

        <div className="mt-7 flex flex-col gap-3 md:mt-8 md:flex-row md:justify-center lg:mt-9 lg:gap-4">
          <Link
            to="/"
            className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
          >
            Go Home
          </Link>

          <Link
            to="/login"
            className="cursor-pointer rounded-md border border-ap-brown px-5 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
          >
            Log In
          </Link>
        </div>
      </section>
    </main>
  )
}

export default UnauthorizedPage
