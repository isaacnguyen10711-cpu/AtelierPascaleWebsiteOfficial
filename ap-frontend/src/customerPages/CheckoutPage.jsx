import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postcode, setPostcode] = useState('');

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    const loadCartItems = async () => {
      const response = await fetch('https://localhost:7215/api/ItemsInCart', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      setCartItems(data)
    }

    loadCartItems()
  }, [])

  const handlePlaceOrder = async () => {
    const response = await fetch(`https://localhost:7215/api/order`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        shippingAddress: address,
        city,
        state,
        postalCode: postcode
      }),
    });

    const data = await response.json();
    console.log(data);
  };

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
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:col-span-2 md:text-sm lg:text-base"
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
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    value={postcode}
                    onChange={(event) => setPostcode(event.target.value)}
                    className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="rounded border border-ap-brown bg-ap-pale p-4 sm:p-5 md:p-6 lg:p-7">
              <h2 className="text-xs uppercase tracking-widest sm:text-sm">
                Payment
              </h2>

              <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                />
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full rounded border border-ap-brown bg-white px-3 py-2 text-xs outline-none focus:border-ap-beige sm:px-4 sm:py-3 sm:text-sm md:text-sm lg:text-base"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="h-fit rounded border border-ap-brown bg-ap-pale p-4 sm:p-5 md:sticky md:top-24 md:p-6 lg:top-28 lg:p-7">
            <h2 className="text-xs uppercase tracking-widest sm:text-sm">
              Order Summary
            </h2>

            <div className="mt-4 space-y-4 border-b border-ap-brown pb-4 sm:mt-5 sm:space-y-5 sm:pb-5">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-[1fr_3fr] gap-3 sm:grid-cols-[1fr_4fr] sm:gap-4 md:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_5fr]">
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      className="aspect-square w-full object-cover object-center"
                    />

                    <div className="flex flex-col justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-medium sm:text-base md:text-sm lg:text-base">
                          {item.productName}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-widest sm:text-xs md:text-xs lg:text-sm">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-xs font-medium sm:text-sm md:text-sm lg:text-base">
                        ${Number(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs uppercase tracking-widest sm:text-sm">
                  Your cart is empty
                </p>
              )}
            </div>

            <div className="mt-4 space-y-3 border-b border-ap-brown pb-4 text-xs sm:mt-5 sm:pb-5 sm:text-sm md:text-sm lg:text-base">
              <div className="flex justify-between gap-5 sm:gap-6">
                <p>Subtotal</p>
                <p>${Number(subtotal).toFixed(2)}</p>
              </div>
              <div className="flex justify-between gap-5 sm:gap-6">
                <p>Shipping</p>
                <p>Calculated later</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-5 text-sm font-medium sm:mt-5 sm:gap-6 sm:text-base md:text-base lg:text-lg">
              <p>Total</p>
              <p>${Number(subtotal).toFixed(2)}</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-5 w-full rounded bg-ap-brown px-4 py-3 text-xs uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white sm:mt-6 sm:px-5 md:text-sm lg:px-6 lg:py-4"
            >
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
