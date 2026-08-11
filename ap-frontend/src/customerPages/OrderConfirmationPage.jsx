import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function OrderConfirmationPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadOrder() {
      const response = await fetch(`https://localhost:7215/api/Orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        setOrder(null)
        setIsLoading(false)
        return
      }

      const data = await response.json()
      setOrder(data)
      setIsLoading(false)
    }

    loadOrder()
  }, [orderId])

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 md:py-32 lg:px-20 lg:py-36">
      <section className="mx-auto max-w-3xl rounded border border-ap-brown bg-ap-pale p-6 text-center transition duration-300 hover:shadow-lg md:max-w-4xl md:p-8 lg:max-w-5xl lg:p-10">
        <p className="text-xs uppercase tracking-[0.3em] md:text-sm lg:text-base">
          Atelier Pascale
        </p>

        <h1 className="mt-5 font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
          Order Confirmed
        </h1>

        {isLoading ? (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
            Loading your order details...
          </p>
        ) : order ? (
          <div className="mx-auto mt-5 max-w-2xl text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
            <p>
              Thank you for your order
            </p>
            <p>
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        ) : (
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
            We could not load this order. Please check your account or try again.
          </p>
        )}

        <div className="mx-auto mt-8 max-w-xl border-y border-ap-brown py-6 text-left md:mt-10 lg:mt-12">
          <p className="text-xs uppercase tracking-[0.3em] md:text-sm">
            Order Receipt
          </p>

          <div className="mt-6 space-y-5 text-sm md:text-base lg:text-lg">
            <div className="flex items-start justify-between gap-6 border-b border-ap-brown pb-4">
              <p className="text-xs uppercase tracking-widest md:text-sm">Order Number</p>
              <p className="text-right font-medium">
                {order.orderId}
              </p>
            </div>

            <div className="flex items-start justify-between gap-6 border-b border-ap-brown pb-4">
              <p className="text-xs uppercase tracking-widest md:text-sm">Order Date</p>
              <p className="text-right font-medium">
                {new Date(order.orderDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-start justify-between gap-6">
              <p className="text-xs uppercase tracking-widest md:text-sm">Total</p>
              <p className="text-right font-medium">
                {order.totalPrice}
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 md:mt-10 md:flex-row lg:mt-12">
          <Link to="/" className="cursor-pointer rounded bg-ap-brown px-6 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
            Back Home
          </Link>

          <Link to="/products/new-arrival" className="cursor-pointer rounded border border-ap-brown px-6 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-8 md:text-sm lg:px-9 lg:py-4">
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  )
}

export default OrderConfirmationPage
