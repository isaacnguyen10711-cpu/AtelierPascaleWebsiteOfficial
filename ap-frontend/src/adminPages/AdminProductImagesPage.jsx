import { useEffect, useState } from 'react'
import PopUpDialog from '../components/PopUpDialog'
import HandleExpiredCookies from '../components/HandleExpiredCookies'

const API_URL = import.meta.env.VITE_API_URL

function AdminEditProductImagesPage() {
  const [productImages, setProductImages] = useState([])
  const [productId, setProductId] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageId, setImageId] = useState('')
  const [newProductId, setNewProductId] = useState('')
  const [newImageUrl, setNewImageUrl] = useState('')
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
  const [popUpTitle, setPopUpTitle] = useState('')
  const [popUpMessage, setPopUpMessage] = useState('')

  useEffect(() => {
    loadProductImages()
  }, [])

  async function loadProductImages() {
    const response = await fetch(`${API_URL}/api/ProductImages`, {
      credentials: 'include',
    })

    if (HandleExpiredCookies(response)) {
      return
    }

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

  async function handleAddProductImage(event) {
    event.preventDefault()

    const newProductImage = {
      productId: Number(productId),
      imageUrl,
    }

    const response = await fetch(`${API_URL}/api/ProductImages`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductImage),
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to add product image. Please try again.')
      setIsPopUpOpen(true)
      return
    }

    await loadProductImages()
    setProductId('')
    setImageUrl('')
    setPopUpTitle('Success')
    setPopUpMessage('Product image added successfully!')
    setIsPopUpOpen(true)
  }

  async function handleSaveImage(event) {
    event.preventDefault()

    if (!imageId) {
      setPopUpTitle('Error')
      setPopUpMessage('Please select or enter an image ID')
      setIsPopUpOpen(true)
      return
    }

    const updatedImage = {
      id: Number(imageId),
      productId: Number(newProductId),
      imageUrl: newImageUrl
    }

    const response = await fetch(`${API_URL}/api/ProductImages/${imageId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedImage),
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to update product image')
      setIsPopUpOpen(true)
      return
    }

    await loadProductImages()
    setImageId('')
    setNewProductId('')
    setNewImageUrl('')
    setPopUpTitle('Success')
    setPopUpMessage('Product image updated successfully')
    setIsPopUpOpen(true)
  }

  function handleDeleteImageClick() {
    if (!imageId) {
      setPopUpTitle('Error')
      setPopUpMessage('Please select or enter an image ID')
      setIsPopUpOpen(true)
      return
    }

    // Open the popup first. The image is not deleted until Confirm is clicked.
    setIsDeletePopUpOpen(true)
  }

  async function handleDeleteImage() {
    // This runs from the Confirm button inside the popup.
    setIsDeletePopUpOpen(false)

    const response = await fetch(`${API_URL}/api/ProductImages/${imageId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (HandleExpiredCookies(response)) {
      return
    }

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
      <PopUpDialog
        isOpen={isDeletePopUpOpen}
        onClose={() => setIsDeletePopUpOpen(false)}
        onConfirm={handleDeleteImage}
        title="Delete Product Image"
        message="Are you sure you want to delete this product image?"
      />

      <section className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl">
        <h1 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
          Admin Edit Product Images
        </h1>

        <form onSubmit={handleAddProductImage} className="mt-6 grid gap-4 rounded-md border border-ap-brown bg-ap-pale p-5 transition duration-300 hover:shadow-lg md:mt-8 md:grid-cols-2 md:gap-5 md:p-6 lg:mt-10 lg:gap-6 lg:p-8">
          <div className="md:col-span-2">
            <h2 className="text-sm font-medium uppercase tracking-widest md:text-base lg:text-lg">
              Add Product Image
            </h2>
          </div>

          <div>
            <label htmlFor="productId" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">
              Product ID
            </label>
            <input
              id="productId"
              type="number"
              value={productId}
              onChange={(event) => setProductId(event.target.value)}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Add Image
            </button>
          </div>
        </form>

        <form onSubmit={handleSaveImage} className="mt-6 grid gap-4 rounded-md border border-ap-brown bg-ap-pale p-5 transition duration-300 hover:shadow-lg md:mt-8 md:grid-cols-2 md:gap-5 md:p-6 lg:mt-10 lg:gap-6 lg:p-8">
          <div className="md:col-span-2">
            <h2 className="text-sm font-medium uppercase tracking-widest md:text-base lg:text-lg">
              Edit Product Image
            </h2>
          </div>

          <div>
            <label htmlFor="imageId" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">
              Image ID
            </label>
            <input
              id="imageId"
              type="number"
              value={imageId}
              onChange={(event) => setImageId(event.target.value)}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div>
            <label htmlFor="newProductId" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">
              Product ID
            </label>
            <input
              id="newProductId"
              type="number"
              value={newProductId}
              onChange={(event) => setNewProductId(event.target.value)}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="newImageUrl" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">
              Image URL
            </label>
            <input
              id="newImageUrl"
              type="text"
              value={newImageUrl}
              onChange={(event) => setNewImageUrl(event.target.value)}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row lg:gap-4">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleDeleteImageClick}
              className="cursor-pointer rounded-md border border-ap-brown px-5 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Delete
            </button>
          </div>
        </form>

        <div className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 md:gap-4 lg:mt-10 lg:gap-8">
          {productImages.length > 0 ? (
            productImages.map((image) => (
              <div key={image.id} className="grid gap-4 rounded-md border border-ap-brown bg-ap-pale p-4 transition duration-300 hover:shadow-lg md:grid-cols-2 md:gap-6 md:p-5 lg:gap-8 lg:p-6">
                <div className="overflow-hidden rounded">
                  <img
                    src={image.imageUrl}
                    alt={`Product ${image.productId}`}
                    className="aspect-square w-full object-cover object-center"
                  />
                </div>

                <div className="space-y-4 md:space-y-5 lg:space-y-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest md:text-sm lg:text-base">
                      Image ID: {image.id}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-widest md:text-sm lg:text-base">
                      Product ID: {image.productId}
                    </p>
                  </div>

                  <p className="line-clamp-3 break-all text-sm leading-7 md:text-base md:leading-8 lg:text-lg lg:leading-9">
                    {image.imageUrl}
                  </p>

                  <div className="flex flex-col gap-3 pt-2 md:flex-row lg:gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelectImage(image)}
                      className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
                    >
                      Select
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm uppercase tracking-widest md:text-base lg:text-lg">
              No product images found.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default AdminEditProductImagesPage
