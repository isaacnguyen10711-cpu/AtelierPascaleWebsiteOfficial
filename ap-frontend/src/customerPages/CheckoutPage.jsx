import { Link } from 'react-router-dom'

function CheckoutPage() {
  return (
    <main className="min-h-screen bg-ap-tan px-5 py-22 text-ap-brown sm:px-8 sm:py-24 md:px-10 md:py-28 lg:px-16 lg:py-32">
      <section className="mx-auto max-w-5xl lg:max-w-6xl">
        <div className="border-b border-ap-brown pb-5 sm:pb-6 md:pb-7 lg:pb-8">
          <h1 className="font-['Tangerine'] text-5xl font-bold sm:text-6xl md:text-6xl lg:text-7xl">
            Checkout
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest sm:text-sm md:text-sm lg:text-base">
            Review your details before placing the order
          </p>
        </div>

        <div className="grid gap-6 pt-6 sm:gap-7 sm:pt-7 md:grid-cols-[3fr_2fr] md:gap-8 md:pt-8 lg:gap-10 lg:pt-10">
          <section className="space-y-5 sm:space-y-6 lg:space-y-7">
            <div className="border border-ap-brown bg-ap-pale rounded p-4 sm:p-5 md:p-6 lg:p-7">
              <h2 className="text-xs uppercase tracking-widest sm:text-sm">
                Contact Details
              </h2>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:col-span-2 md:text-sm lg:text-base"
                />
              </div>
            </div>

            <div className="border border-ap-brown bg-ap-pale rounded p-4 sm:p-5 md:p-6 lg:p-7">
              <h2 className="text-xs uppercase tracking-widest sm:text-sm">
                Delivery Address
              </h2>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    className="w-full border border-ap-brown bg-white rounded px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="border border-ap-brown bg-ap-pale p-4 sm:p-5 md:p-6 lg:p-7">
              <h2 className="text-xs uppercase tracking-widest sm:text-sm">
                Payment
              </h2>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full border border-ap-brown bg-white px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full border border-ap-brown bg-white px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full border border-ap-brown bg-white px-3 py-2 text-xs outline-none sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="h-fit border border-ap-brown bg-ap-pale p-4 sm:p-5 md:p-6 lg:p-7">
            <h2 className="text-xs uppercase tracking-widest sm:text-sm">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3 border-b border-ap-brown pb-4 text-xs sm:mt-5 sm:pb-5 sm:text-sm md:text-sm lg:text-base">
              <div className="flex justify-between gap-5 sm:gap-6">
                <p>Subtotal</p>
                <p>Calculated from cart</p>
              </div>
              <div className="flex justify-between gap-5 sm:gap-6">
                <p>Shipping</p>
                <p>Calculated later</p>
              </div>
            </div>

            <button className="mt-5 w-full bg-ap-brown px-4 py-3 text-xs uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white sm:mt-6 sm:px-5 md:text-sm lg:px-6 lg:py-4">
              Place Order
            </button>

            <Link to="/cart" className="mt-4 block text-center text-xs uppercase tracking-widest hover:text-ap-beige sm:mt-5 sm:text-sm">
              Back To Cart
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}

export default CheckoutPage
