import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PopUpDialog from '../components/PopUpDialog'
import HandleExpiredCookies from '../components/HandleExpiredCookies'

const API_URL = import.meta.env.VITE_API_URL

function AdminProductDetailsPage() {
  const [product, setProduct] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [isNewArrival, setIsNewArrival] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false)
  const [popUpTitle, setPopUpTitle] = useState('')
  const [popUpMessage, setPopUpMessage] = useState('')
  const { categoryName, productId } = useParams()
  const navigate = useNavigate()

  function handleClosePopUp() {
    setIsPopUpOpen(false)
  }

  function handleDeleteClick() {
    // Open the popup first. The product is not deleted until Confirm is clicked.
    setIsDeletePopUpOpen(true)
  }

  useEffect(() => {
    async function loadProductDetails() {
      const response = await fetch(`${API_URL}/api/products/${productId}`)

      if (!response.ok) {
        setProduct(null)
        setIsLoading(false)
        return
      }

      const selectedProduct = await response.json()

      // Set the product and initialize the form fields with its current details
      setProduct(selectedProduct)
      setNewName(selectedProduct.name)
      setNewDescription(selectedProduct.description)
      setNewPrice(selectedProduct.price)
      setNewCategoryId(selectedProduct.categoryId)
      setIsNewArrival(selectedProduct.isNewArrival)
      setIsLoading(false)
    }

    loadProductDetails()
  }, [productId])

  async function handleSaveNewData(event) {
    event.preventDefault()

    // Create an updated product object with the new values
    const updatedProduct = {
      id: productId,
      name: newName,
      description: newDescription,
      price: Number(newPrice),
      categoryId: Number(newCategoryId),
      isNewArrival,
    }

    // Send a PUT request to update the product details
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to save product')
      setIsPopUpOpen(true)
      return
    }

    // Update the product state with the new details from the updated product object
    setProduct({ ...product, ...updatedProduct })
    setIsEditing(false)
    setPopUpTitle('Success')
    setPopUpMessage('Product saved')
    setIsPopUpOpen(true)
  }

  async function handleDelete() {
    // This runs from the Confirm button inside the popup.
    setIsDeletePopUpOpen(false)

    // Send a DELETE request to delete the product
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (HandleExpiredCookies(response)) {
      return
    }

    if (!response.ok) {
      setPopUpTitle('Error')
      setPopUpMessage('Failed to delete product')
      setIsPopUpOpen(true)
      return
    }

    navigate(`/products/${categoryName}`)
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown md:px-12 md:pt-36 lg:px-20 lg:pt-40">
        Loading...
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown md:px-12 md:pt-36 lg:px-20 lg:pt-40">
        <p className="text-sm uppercase tracking-widest md:text-base lg:text-lg">Product not found.</p>
        <Link to={`/products/${categoryName}`} className="mt-6 inline-block border border-ap-brown px-6 py-2 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-7 md:py-3 md:text-sm lg:px-8">
          Back To Products
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <PopUpDialog isOpen={isPopUpOpen} onClose={handleClosePopUp} title={popUpTitle} message={popUpMessage} />
      <PopUpDialog
        isOpen={isDeletePopUpOpen}
        onClose={() => setIsDeletePopUpOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
      />
      <section className="mx-auto max-w-4xl md:max-w-5xl lg:max-w-6xl">
        <Link to={`/products/${categoryName}`} className="mb-6 inline-block text-xs uppercase tracking-widest transition duration-300 hover:text-ap-beige md:mb-8 md:text-sm lg:mb-10">
          Back To Products
        </Link>

        <h1 className="font-['Tangerine'] text-5xl font-bold md:text-6xl lg:text-7xl">
          Admin Product Details
        </h1>

        <form onSubmit={handleSaveNewData} className="mt-6 grid gap-4 rounded-md border border-ap-brown bg-ap-pale p-5 transition duration-300 hover:shadow-lg md:mt-8 md:grid-cols-2 md:gap-5 md:p-6 lg:mt-10 lg:gap-6 lg:p-8">
          <div>
            <label htmlFor="name" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">Name</label>
            <input
              id="name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              disabled={!isEditing}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md disabled:cursor-not-allowed disabled:bg-ap-pale md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={newPrice}
              onChange={(event) => setNewPrice(event.target.value)}
              disabled={!isEditing}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md disabled:cursor-not-allowed disabled:bg-ap-pale md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">Category ID</label>
            <input
              id="categoryId"
              type="number"
              value={newCategoryId}
              onChange={(event) => setNewCategoryId(event.target.value)}
              disabled={!isEditing}
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm outline-none transition duration-300 focus:border-ap-beige focus:shadow-md disabled:cursor-not-allowed disabled:bg-ap-pale md:px-4 md:py-3 md:text-base lg:px-5 lg:py-4"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">Description</label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              disabled={!isEditing}
              rows="6"
              required
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-3 py-2 text-sm leading-7 outline-none transition duration-300 focus:border-ap-beige focus:shadow-md disabled:cursor-not-allowed disabled:bg-ap-pale md:px-4 md:py-3 md:text-base md:leading-8 lg:px-5 lg:py-4 lg:text-lg lg:leading-9"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              id="isNewArrival"
              type="checkbox"
              checked={isNewArrival}
              onChange={(event) => setIsNewArrival(event.target.checked)}
              disabled={!isEditing}
              className="h-4 w-4 cursor-pointer accent-ap-brown disabled:cursor-not-allowed md:h-5 md:w-5 lg:h-6 lg:w-6"
            />
            <label htmlFor="isNewArrival" className="text-xs font-medium uppercase tracking-widest md:text-sm lg:text-base">Is New Arrival</label>
          </div>

          <div className="flex flex-col gap-3 pt-2 md:col-span-2 md:flex-row lg:gap-4">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-md border border-ap-brown px-5 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Edit
            </button>
            <button
              type="submit"
              disabled={!isEditing}
              className="cursor-pointer rounded-md bg-ap-brown px-5 py-3 text-xs uppercase tracking-widest text-ap-tan transition duration-300 hover:-translate-y-1 hover:bg-ap-beige hover:text-white active:translate-y-0 disabled:cursor-not-allowed disabled:bg-ap-beige disabled:hover:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="cursor-pointer rounded-md border border-ap-brown px-5 py-3 text-xs uppercase tracking-widest transition duration-300 hover:-translate-y-1 hover:bg-ap-brown hover:text-ap-tan active:translate-y-0 md:px-6 md:text-sm lg:px-7 lg:py-4"
            >
              Delete
            </button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default AdminProductDetailsPage

