import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Trash2, Plus, Minus } from 'lucide-react'
import HandleExpiredCookies from '../components/HandleExpiredCookies'
import Reveal from '../components/Reveal'

const API_URL = import.meta.env.VITE_API_URL

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const loadCartItems = async () => {
      const response = await fetch(`${API_URL}/api/ItemsInCart`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (HandleExpiredCookies(response)) {
        return
      }

      const data = await response.json()
      setCartItems(data)
    }

    loadCartItems()
  }, [])

  async function handleUpdateQuantity(itemId, newQuantity) {
    const response = await fetch(`${API_URL}/api/ItemsInCart/${itemId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (response.ok) {
      if (newQuantity <= 0) {
        handleRemoveItem(itemId)
      }
      else {
        setCartItems(cartItems.map((item) => (
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )))
      }
    }
  }

  async function handleRemoveItem(itemId) {
    const response = await fetch(`${API_URL}/api/ItemsInCart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (response.ok) {
      setCartItems(cartItems.filter((item) => item.id !== itemId))
    }
  }

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  function formatCategoryUrl(categoryName) {
    return categoryName.toLowerCase().replaceAll(' ', '-')
  }

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

          <Link to="/products/new-arrival" className="text-xs uppercase tracking-widest transition duration-200 hover:text-ap-beige md:text-sm">
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-7 pt-7 md:grid-cols-[5fr_2fr] md:gap-8 md:pt-9 lg:gap-10 lg:pt-10">
          <Reveal key="cart-items">
            <section className="space-y-5 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-[2fr_3fr] gap-4 border-b border-ap-brown pb-5 transition duration-300 hover:translate-x-1 md:grid-cols-[1fr_2fr] md:gap-5 lg:grid-cols-[1fr_3fr] lg:pb-6">
                  <Link to={`/products/${formatCategoryUrl(item.categoryName)}/${item.productId}`} className="block overflow-hidden rounded">
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      className="aspect-square w-full object-cover object-center transition duration-300 hover:scale-105"
                    />
                  </Link>

                  <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-5 lg:gap-6">
                    <div>
                      <Link to={`/products/${formatCategoryUrl(item.categoryName)}/${item.productId}`} className="block">
                        <h2 className="font-['Tangerine'] text-4xl font-bold transition duration-300 hover:text-ap-beige md:text-4xl lg:text-5xl">
                          {item.productName}
                        </h2>
                      </Link>
                      <p className="mt-2 text-xs uppercase tracking-widest md:text-sm">
                        Quantity: {item.quantity}
                      </p>
                      <button className="mt-4 cursor-pointer transition duration-200 hover:-translate-y-1 hover:text-ap-beige active:translate-y-0"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button className="mt-4 cursor-pointer transition duration-200 hover:-translate-y-1 hover:text-ap-beige active:translate-y-0"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </button>
                      <button className="mt-4 ml-2 cursor-pointer transition duration-200 hover:-translate-y-1 hover:text-ap-beige active:translate-y-0"
                        onClick={() => handleRemoveItem(item.id)}>
                        <Trash2 className="inline-block w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                      </button>
                    </div>

                    <p className="text-sm font-medium md:text-base lg:text-lg">
                      ${Number(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </section>
          </Reveal>

          <section>
            <Reveal key="view-orders" delay={0.2}>
              <div className="mb-6 w-full transition duration-300 hover:-translate-y-1 md:mb-7 lg:mb-8">
                <Link to="/orders" className="bg-ap-brown rounded py-3 px-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:bg-ap-beige hover:text-white md:px-4 md:py-4 md:text-sm">
                  View all orders
                </Link>
              </div>
            </Reveal>

            <Reveal key="order-summary" delay={0.4}>
              <div className="h-fit rounded border border-ap-brown bg-ap-pale p-4 transition duration-300 hover:shadow-lg md:p-5 lg:p-6">
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
                <Link to="/checkout">
                  <button
                    className="mt-6 w-full cursor-pointer rounded bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-200 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:mt-7 md:px-6 md:text-sm"
                    disabled={cartItems.length === 0}
                  >
                    Checkout
                  </button>
                </Link>
              </div>
            </Reveal>
          </section>
          
        </div>
      </section>
    </main>
  )
}

export default ShoppingCartPage







