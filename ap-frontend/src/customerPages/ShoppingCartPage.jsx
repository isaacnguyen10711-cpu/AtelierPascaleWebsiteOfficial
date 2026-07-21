import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([])

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

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-22 text-ap-brown md:px-10 md:py-24 lg:px-16 lg:py-28">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 border-b border-ap-brown pb-6 md:flex-row md:items-end md:justify-between md:pb-7 lg:pb-8">
          <div>
            <h1 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
              Shopping Cart
            </h1>
            <p className="mt-2 text-xs uppercase tracking-widest md:text-sm">
              {cartItems.length} Items
            </p>
          </div>

          <Link to="/products/new-arrival" className="text-xs uppercase tracking-widest hover:text-ap-beige md:text-sm">
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-7 pt-7 md:grid-cols-[5fr_2fr] md:gap-8 md:pt-9 lg:gap-10 lg:pt-10">
          <section className="space-y-5 md:space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-[2fr_3fr] gap-4 border-b border-ap-brown pb-5 md:grid-cols-[1fr_2fr] md:gap-5 lg:grid-cols-[1fr_3fr] lg:pb-6">
                <img
                  src={item.productImageUrl}
                  alt={item.productName}
                  className="aspect-square w-full object-cover object-center"
                />

                <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-5 lg:gap-6">
                  <div>
                    <h2 className="font-['Tangerine'] text-4xl font-bold md:text-4xl lg:text-5xl">
                      {item.productName}
                    </h2>
                    <p className="mt-2 text-xs uppercase tracking-widest md:text-sm">
                      Quantity: {item.quantity}
                    </p>
                    <button className="mt-4 text-xs uppercase tracking-widest hover:text-ap-beige md:text-sm">
                      Remove
                    </button>
                  </div>

                  <p className="text-sm font-medium md:text-base lg:text-lg">
                    ${Number(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </section>

          <section className="h-fit border border-ap-brown bg-ap-pale p-4 md:p-5 lg:p-6">
            <h2 className="text-xs uppercase tracking-widest md:text-sm">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3 border-b border-ap-brown pb-4 text-sm md:mt-5 md:pb-5">
              <div className="flex justify-between gap-6">
                <p>Subtotal</p>
                <p>${Number(subtotal).toFixed(2)}</p>
              </div>
              <div className="flex justify-between gap-6">
                <p>Shipping</p>
                <p>Calculated later</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-6 text-base font-medium md:mt-5 md:text-lg">
              <p>Total</p>
              <p>${Number(subtotal).toFixed(2)}</p>
            </div>

            <button className="mt-6 w-full bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white md:mt-7 md:px-6 md:text-sm">
              Checkout
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}

export default ShoppingCartPage




