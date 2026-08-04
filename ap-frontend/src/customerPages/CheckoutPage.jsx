import { Link } from 'react-router-dom'

function CheckoutPage() {
  return (
    <main className="min-h-screen bg-ap-tan px-6 py-24 text-ap-brown md:px-10 md:py-28 lg:px-16 lg:py-32">
      <section className="mx-auto max-w-5xl">
        <div className="border-b border-ap-brown pb-6 md:pb-8">
          <h1 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
            Checkout
          </h1>
          <p className="mt-2 text-xs uppercase tracking-widest md:text-sm">
            Review your details before placing the order
          </p>
        </div>

        <div className="grid gap-8 pt-8 md:grid-cols-[3fr_2fr] lg:gap-10">
          <section className="space-y-6">
            <div className="border border-ap-brown bg-ap-pale p-5 md:p-6">
              <h2 className="text-xs uppercase tracking-widest md:text-sm">
                Contact Details
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none md:col-span-2"
                />
              </div>
            </div>

            <div className="border border-ap-brown bg-ap-pale p-5 md:p-6">
              <h2 className="text-xs uppercase tracking-widest md:text-sm">
                Delivery Address
              </h2>

              <div className="mt-5 grid gap-4">
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                />
                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="border border-ap-brown bg-ap-pale p-5 md:p-6">
              <h2 className="text-xs uppercase tracking-widest md:text-sm">
                Payment
              </h2>

              <div className="mt-5 grid gap-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full border border-ap-brown bg-white px-4 py-3 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="h-fit border border-ap-brown bg-ap-pale p-5 md:p-6">
            <h2 className="text-xs uppercase tracking-widest md:text-sm">
              Order Summary
            </h2>

            <div className="mt-5 space-y-3 border-b border-ap-brown pb-5 text-sm">
              <div className="flex justify-between gap-6">
                <p>Subtotal</p>
                <p>Calculated from cart</p>
              </div>
              <div className="flex justify-between gap-6">
                <p>Shipping</p>
                <p>Calculated later</p>
              </div>
            </div>

            <button className="mt-6 w-full bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white md:text-sm">
              Place Order
            </button>

            <Link to="/cart" className="mt-5 block text-center text-xs uppercase tracking-widest hover:text-ap-beige md:text-sm">
              Back To Cart
            </Link>
          </section>
        </div>
      </section>
    </main>
  )
}

export default CheckoutPage
