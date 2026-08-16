import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PopUpDialog from '../components/PopUpDialog'
import Reveal from '../components/Reveal'

import HandleExpiredCookies from '../components/HandleExpiredCookies'

const API_URL = import.meta.env.VITE_API_URL

function ProductDetailsPage() {
  const [product, setProduct] = useState(null)  
  const [isLoading, setIsLoading] = useState(true)
  const { categoryName, productId } = useParams()
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popUpMessage, setPopUpMessage] = useState('')
  const [popUpTitle, setPopUpTitle] = useState('')

  useEffect(() => {
    // Fetch details using its ID
    async function loadProductDetails() {
      const response = await fetch(`${API_URL}/api/products/${productId}`)

      if (!response.ok) {
        setProduct(null)
        setIsLoading(false)
        return
      }

      const selectedProduct = await response.json()

      setProduct(selectedProduct)
      setIsLoading(false)
    }

    loadProductDetails()
  }, [productId])

  const handleAddToCart = async () => {
    // Add this check to prevent crash while product is still null
    if (!product) {
      console.error('Product not found')
      return
    }
    // Implement the logic to add the product to the cart
    const response = await fetch(`${API_URL}/api/ItemsInCart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: product.id }),
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (response.ok) {
      setPopUpTitle("Success")
      setPopUpMessage("Product added to cart successfully!")
      setIsPopUpOpen(true)
    }
    else {
      // Handle error
      setPopUpTitle("Error")
      setPopUpMessage("Failed to add product to cart. Please try again.")
      setIsPopUpOpen(true)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown">
        Loading...
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown">
        <p>Product not found.</p>
        <Link to={`/products/${categoryName}`} className="mt-6 inline-block border border-ap-brown px-6 py-2 transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0">
          Back To Products
        </Link>
      </main>
    )
  }

  const productCode = `AP${product.id}`
  const images = product.images ?? []

  return (
    <main className="min-h-screen bg-ap-tan text-ap-brown">
      <PopUpDialog isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} title={popUpTitle} message={popUpMessage} />
      <section className="grid min-h-screen md:grid-cols-[5fr_4fr] md:gap-10">
        <div className="px-6 pb-12 pt-23 md:px-5 lg:px-15">
          <Reveal key={`${productId}-back-link`}>
          <Link to={`/products/${categoryName}`} className="mb-6 inline-block text-sm uppercase tracking-widest transition duration-200 hover:text-ap-beige">
            Back To Products
          </Link>
          </Reveal>

          {/* Place images */}
          <Reveal key={`${productId}-images`}>
            <div className="grid gap-4 md:gap-6">
              {images.length > 0 ? (
                images.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded">
                    <img
                      src={image.imageUrl}
                      alt={product.name}
                      className="aspect-square w-full object-cover object-center transition duration-500 hover:scale-105"
                    />
                  </div>
                ))
              ) : (
                <div className="flex aspect-square w-full items-center justify-center border border-ap-brown bg-ap-tan">
                  No image available
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Make the details section stick to the top when scrolling for multiple images and scrollable when 
          texts go over the component height by using overflow */}
        <div className="px-6 md:sticky md:top-20 md:h-screen md:overflow-y-auto md:px-12 md:py-12 lg:px-18">
          <Reveal key={`${productId}-details-main`}>
          <p className="text-sm uppercase tracking-widest">{productCode}</p>

          <h1 className="mt-4 font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
            {product.name}
          </h1>

          <p className="mt-6 text-lg font-medium md:text-xl lg:text-2xl">
            ${Number(product.price).toFixed(2)}
          </p>

          <p className="mt-8 leading-7">
            {product.description}
          </p>

          <button className="mt-10 w-full cursor-pointer rounded bg-ap-brown px-8 py-4 text-sm uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0"
            onClick={handleAddToCart}>
            Add To Cart
          </button>
          </Reveal>

          {/* Additional information section */ }
          <Reveal key={`${productId}-details-extra`} delay={0.2}>
          <section className="mt-12 border-t border-ap-brown">
            <div className="border-b border-ap-brown py-5 transition duration-300 hover:translate-x-1">
              <h2 className="text-sm uppercase tracking-widest">Product Details</h2>
              <div className="mt-4 space-y-2 text-xs md:text-sm">
                <p>Category: {categoryName.replaceAll('-', ' ')}</p>
                <p>Reference: {productCode}</p>
                <p>Availability: Ready to order</p>
              </div>
            </div>

            <div className="border-b border-ap-brown py-5 transition duration-300 hover:translate-x-1">
              <h2 className="text-sm uppercase tracking-widest">Care</h2>
              <p className="mt-4 text-sm leading-7">
                Keep this piece away from direct heat and moisture. Clean gently with a soft, dry cloth.
              </p>
            </div>

            <div className="py-5 text-sm leading-7 transition duration-300 hover:translate-x-1">
              <p>Delivery: Carefully packed and prepared for dispatch.</p>
              <p>Returns: Contact Atelier Pascale for order support.</p>
            </div>
          </section>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

export default ProductDetailsPage



