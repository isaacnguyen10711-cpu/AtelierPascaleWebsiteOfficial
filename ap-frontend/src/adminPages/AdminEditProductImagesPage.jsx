import { useEffect, useState } from 'react'
import PopUpDialog from '../components/PopUpDialog'

function AdminEditProductImagesPage() {
  const [productImages, setProductImages] = useState([])
  const [imageId, setImageId] = useState('')
  const [newProductId, setNewProductId] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popUpTitle, setPopUpTitle] = useState('')
  const [popUpMessage, setPopUpMessage] = useState('')

  useEffect(() => {
    loadProductImages()
  }, [])

  async function loadProductImages() {
    const response = await fetch('https://localhost:7215/api/ProductImages')

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to load product images')
      setIsPopUpOpen(true)
      return
    }

    const data = await response.json()
    setProductImages(data)
  }

  // Select the image without manually typing its info
  function handleSelectImage(image) {
    setImageId(image.id)
    setNewProductId(image.productId)
    setNewImageUrl(image.imageUrl)
  }

  async function handleSaveImage(event) {
    event.preventDefault()

    if (!imageId) {
      setPopUpTitle('Error')
      setPopUpMessage('Please select or enter an image ID')
      setIsPopUpOpen(true)
      return
    }

    const token = localStorage.getItem('token')

    const updatedImage = {
      id: Number(imageId),
      productId: Number(newProductId),
      imageUrl: newImageUrl
    }

    const response = await fetch(`https://localhost:7215/api/ProductImages/${imageId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedImage),
    })

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to update product image')
      setIsPopUpOpen(true)
      return
    }

    await loadProductImages()
    setPopUpTitle('Success')
    setPopUpMessage('Product image updated successfully')
    setIsPopUpOpen(true)
  }

  async function handleDeleteImage() {
    if (!imageId) {
      setPopUpTitle('Error')
      setPopUpMessage('Please select or enter an image ID')
      setIsPopUpOpen(true)
      return
    }

    const confirmDelete = window.confirm('Delete this product image?')

    if (!confirmDelete) {
      return
    }

    const token = localStorage.getItem('token')

    const response = await fetch(`https://localhost:7215/api/ProductImages/${imageId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to delete product image')
      setIsPopUpOpen(true)
      return
    }

    await loadProductImages()
    setImageId('')
    setNewProductId('')
    setNewImageUrl('')
    setPopUpTitle('Success')
    setPopUpMessage('Product image deleted successfully')
    setIsPopUpOpen(true)
  }

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <PopUpDialog isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)} title={popUpTitle} message={popUpMessage} />

      <section className="mx-auto max-w-5xl">
        <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
          Admin Edit Product Images
        </h1>

        <form onSubmit={handleSaveImage} className="mt-6 space-y-4 rounded-md border border-ap-brown bg-ap-pale p-6 transition duration-300 hover:shadow-lg md:mt-8 md:p-8">
          <div>
            <label htmlFor="imageId" className="block text-sm font-medium uppercase tracking-widest md:text-base">
              Image ID
            </label>
            <input
              id="imageId"
              type="number"
              value={imageId}
              onChange={(event) => setImageId(event.target.value)}
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:text-base"
            />
          </div>

          <div>
            <label htmlFor="newProductId" className="block text-sm font-medium uppercase tracking-widest md:text-base">
              Product ID
            </label>
            <input
              id="newProductId"
              type="number"
              value={newProductId}
              onChange={(event) => setNewProductId(event.target.value)}
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:text-base"
            />
          </div>

          <div>
            <label htmlFor="newImageUrl" className="block text-sm font-medium uppercase tracking-widest md:text-base">
              Image URL
            </label>
            <input
              id="newImageUrl"
              type="text"
              value={newImageUrl}
              onChange={(event) => setNewImageUrl(event.target.value)}
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:text-base"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 md:flex-row">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:text-sm"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleDeleteImage}
              className="cursor-pointer rounded-md border border-ap-brown px-5 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:text-sm"
            >
              Delete
            </button>
          </div>
        </form>

        <div className="mt-6 space-y-5 md:mt-8 lg:mt-10">
          {productImages.length > 0 ? (
            productImages.map((image) => (
              <div key={image.id} className="grid gap-4 rounded-md border border-ap-brown bg-ap-pale p-4 transition duration-300 hover:shadow-lg md:grid-cols-[1fr_2fr] md:p-5 lg:grid-cols-[1fr_3fr] lg:p-6">
                <div className="overflow-hidden rounded">
                  <img
                    src={image.imageUrl}
                    alt={`Product ${image.productId}`}
                    className="aspect-square w-full object-cover object-center"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest md:text-sm">
                      Image ID: {image.id}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-widest md:text-sm">
                      Product ID: {image.productId}
                    </p>
                  </div>

                  <p className="break-all text-sm leading-7 md:text-base">
                    {image.imageUrl}
                  </p>

                  <div className="flex flex-col gap-3 pt-2 md:flex-row">
                    <button
                      type="button"
                      onClick={() => handleSelectImage(image)}
                      className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:text-sm"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm uppercase tracking-widest md:text-base">
              No product images found.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default AdminEditProductImagesPage
