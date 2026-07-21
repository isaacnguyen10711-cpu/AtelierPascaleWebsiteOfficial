import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function ProductDetailsPage() {
  const [product, setProduct] = useState(null)  
  const [isLoading, setIsLoading] = useState(true)
  const { categoryName, productId } = useParams()

  useEffect(() => {
    // Fetch details using its ID
    async function loadProductDetails() {
      const response = await fetch(`https://localhost:7215/api/products/${productId}`)

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
    // Implement the logic to add the product to the cart
    const response = await fetch('https://localhost:7215/api/ItemsInCarts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ productId: product.id }),
    })

    if (response.ok) {
      // Optionally, you can show a success message or update the cart state
      console.log('Product added to cart')
    } else {
      // Handle error
      console.error('Failed to add product to cart')
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
        <Link to={`/products/${categoryName}`} className="mt-6 inline-block border border-ap-brown px-6 py-2 hover:bg-ap-brown hover:text-ap-tan">
          Back To Products
        </Link>
      </main>
    )
  }

  const productCode = `AP${product.id}`
  const images = product.images ?? []

  return (
    <main className="min-h-screen bg-ap-tan text-ap-brown">
      <section className="grid min-h-screen md:grid-cols-[5fr_4fr]">
        <div className="px-6 pb-12 pt-23 md:px-5 lg:px-15">
          <Link to={`/products/${categoryName}`} className="mb-6 inline-block text-sm uppercase tracking-widest hover:text-ap-beige">
            Back To Products
          </Link>

          {/* Place images */}
          <div>
            {images.length > 0 ? (
              images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={product.name}
                  className="h-[400px] w-full object-cover object-center md:h-[540px] lg:h-[600px]"
                />
              ))
            ) : (
              <div className="flex h-[520px] items-center justify-center border border-ap-brown bg-ap-tan">
                No image available
              </div>
            )}
          </div>
        </div>

        {/* Make the details section stick to the top when scrolling for multiple images and scrollable when 
          texts go over the component height by using overflow */}
        <div className="px-6 py-12 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:px-12 md:pb-24 md:pt-28 lg:px-18">
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

          <button className="mt-10 w-full bg-ap-brown px-8 py-4 text-sm uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white">
            Add To Cart
          </button>

          {/* Additional information section */ }
          <section className="mt-12 border-t border-ap-brown">
            <div className="border-b border-ap-brown py-5">
              <h2 className="text-sm uppercase tracking-widest">Product Details</h2>
              <div className="mt-4 space-y-2 text-xs md:text-sm">
                <p>Category: {categoryName.replaceAll('-', ' ')}</p>
                <p>Reference: {productCode}</p>
                <p>Availability: Ready to order</p>
              </div>
            </div>

            <div className="border-b border-ap-brown py-5">
              <h2 className="text-sm uppercase tracking-widest">Care</h2>
              <p className="mt-4 text-sm leading-7">
                Keep this piece away from direct heat and moisture. Clean gently with a soft, dry cloth.
              </p>
            </div>

            <div className="py-5 text-sm leading-7">
              <p>Delivery: Carefully packed and prepared for dispatch.</p>
              <p>Returns: Contact Atelier Pascale for order support.</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default ProductDetailsPage



