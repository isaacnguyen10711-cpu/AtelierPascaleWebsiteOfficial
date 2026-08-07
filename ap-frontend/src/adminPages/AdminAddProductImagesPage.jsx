import { useState } from 'react'

function AdminAddProductImagesPage() {
  const [productId, setProductId] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const handleAddProductImage = async (event) => {
    event.preventDefault()

    const token = localStorage.getItem('token')
    const newProductImage = {
      productId: Number(productId),
      imageUrl,
    }

    const response = await fetch('https://localhost:7215/api/ProductImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProductImage),
    })

    if (!response.ok) {
      alert('Failed to add product image. Please try again.')
      return
    }

    alert('Product image added successfully!')
    setProductId('')
    setImageUrl('')
  }

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <section className="mx-auto max-w-3xl">
        <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
          Admin Add Product Image
        </h1>

        <div>
          <form onSubmit={handleAddProductImage} className="mt-4 space-y-4 rounded-md border border-ap-brown bg-ap-pale p-6 transition duration-300 hover:shadow-lg md:mt-5 md:space-y-4 md:p-8 lg:mt-6 lg:space-y-5">
            <div>
              <label htmlFor="productId" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Product ID
              </label>
              <input
                type="number"
                name="productId"
                id="productId"
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4 lg:text-base"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium uppercase tracking-widest md:text-base lg:text-base">
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4 lg:text-base"
              />
            </div>

            <div>
              <button
                type="submit"
                className="cursor-pointer rounded-md bg-ap-brown px-4 py-2 text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-4 md:py-2 md:text-sm lg:px-5 lg:py-3 lg:text-base"
              >
                Add Product Image
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default AdminAddProductImagesPage
