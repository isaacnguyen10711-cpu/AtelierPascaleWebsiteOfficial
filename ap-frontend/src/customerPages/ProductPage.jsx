import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const categoryTitles = {
  'new-arrival': 'New Arrival',
  'home-decor': 'Home Decor',
  gifts: 'Gifts',
  jewelry: 'Jewelry',
  art: 'Art',
}

function toCategoryName(value) {
  return value
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function toCategorySlug(value) {
  return value.toLowerCase().replaceAll(' ', '-')
}

function ProductPage() {
  const { categoryName } = useParams()
  const currentCategory = categoryName ?? ''
  const pageTitle = categoryTitles[currentCategory] ?? toCategoryName(currentCategory)

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('https://localhost:7215/api/Products')

        if (!response.ok) {
          setError('Could not load products.')
          return
        }

        const data = await response.json()
        setProducts(data)
      } catch {
        setError('Could not connect to the product API.')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (currentCategory === 'new-arrival') {
      return products.filter((product) => product.isNewArrival)
    }

    return products.filter((product) => {
      const productCategory = product.category?.name ?? ''
      return toCategorySlug(productCategory) === currentCategory
    })
  }, [currentCategory, products])

  return (
    <main className="min-h-screen bg-ap-tan px-6 pb-20 pt-32 text-ap-brown md:px-12 lg:px-20">
      <section className="mx-auto max-w-6xl">
        <div className="border-b border-ap-beige pb-10 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">Atelier Pascale</p>
          <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl lg:text-8xl">
            {pageTitle}
          </h1>
        </div>

        {isLoading && <p className="mt-14 text-center text-lg">Loading products...</p>}

        {!isLoading && error && <p className="mt-14 text-center text-lg">{error}</p>}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <div className="mx-auto mt-14 max-w-xl text-center">
            <h2 className="font-['Tangerine'] text-5xl font-bold">No products yet</h2>
            <p className="mt-4 leading-7">
              Add products to this category in the database and they will appear here.
            </p>
            <Link to="/" className="mt-8 inline-block border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
              Back Home
            </Link>
          </div>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const imageUrl = product.images?.[0]?.imageUrl

              return (
                <article key={product.id} className="group">
                  <div className="bg-ap-pale">
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} className="h-[260px] w-full object-cover object-center md:h-[320px]" />
                    ) : (
                      <div className="flex h-[260px] w-full items-center justify-center border border-ap-beige text-sm uppercase tracking-[0.2em] md:h-[320px]">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <h2 className="font-['Tangerine'] text-4xl font-bold">{product.name}</h2>
                    <p className="mt-2 leading-7">{product.description}</p>
                    <p className="mt-4 font-medium">${Number(product.price).toFixed(2)}</p>
                    <button className="mt-5 border border-ap-brown px-6 py-2 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan">
                      Add To Cart
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}

export default ProductPage
