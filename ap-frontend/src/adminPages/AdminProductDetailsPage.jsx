import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function AdminProductDetailsPage() {
  const [product, setProduct] = useState(null)
  const [newName, setNewName] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newPrice, setNewPrice] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const { categoryName, productId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadProductDetails() {
      const response = await fetch(`https://localhost:7215/api/products/${productId}`)

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
      setIsLoading(false)
    }

    loadProductDetails()
  }, [productId])

  async function handleSaveNewData(event) {
    event.preventDefault()

    const token = localStorage.getItem('token')

    // Create an updated product object with the new values
    const updatedProduct = {
      id: productId,
      name: newName,
      description: newDescription,
      price: Number(newPrice),
      categoryId: Number(newCategoryId),
    }

    // Send a PUT request to update the product details
    const response = await fetch(`https://localhost:7215/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProduct),
    })

    if (!response.ok) {
      alert('Failed to save product')
      return
    }

    // Update the product state with the new details from the updated product object
    setProduct({ ...product, ...updatedProduct })
    setIsEditing(false)
    alert('Product saved')
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Delete this product?')

    if (!confirmDelete) {
      return
    }

    // Send a DELETE request to delete the product
    const token = localStorage.getItem('token')
    const response = await fetch(`https://localhost:7215/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      alert('Failed to delete product')
      return
    }

    navigate(`/products/${categoryName}`)
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

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <section className="mx-auto max-w-3xl">
        <Link to={`/products/${categoryName}`} className="mb-8 inline-block text-sm uppercase tracking-widest hover:text-ap-beige">
          Back To Products
        </Link>

        <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
          Admin Product Details
        </h1>

        <form onSubmit={handleSaveNewData} className="mt-10 rounded-md space-y-6 border border-ap-brown bg-ap-pale p-6 md:p-8">
          <div>
            <label htmlFor="name" className="block text-sm uppercase tracking-widest">Name</label>
            <input
              id="name"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              disabled={!isEditing}
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 disabled:bg-ap-pale"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm uppercase tracking-widest">Description</label>
            <textarea
              id="description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              disabled={!isEditing}
              rows="6"
              className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 disabled:bg-ap-pale"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="price" className="block text-sm uppercase tracking-widest">Price</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={newPrice}
                onChange={(event) => setNewPrice(event.target.value)}
                disabled={!isEditing}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 disabled:bg-ap-pale"
              />
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm uppercase tracking-widest">Category ID</label>
              <input
                id="categoryId"
                type="number"
                value={newCategoryId}
                onChange={(event) => setNewCategoryId(event.target.value)}
                disabled={!isEditing}
                className="mt-2 w-full rounded-md border border-ap-brown bg-white px-4 py-3 disabled:bg-ap-pale"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 md:flex-row">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="border border-ap-brown px-8 py-3 text-sm uppercase tracking-widest hover:bg-ap-brown hover:text-ap-tan"
            >
              Edit
            </button>
            <button
              type="submit"
              disabled={!isEditing}
              className="bg-ap-brown px-8 py-3 text-sm uppercase tracking-widest text-ap-tan hover:bg-ap-beige hover:text-white disabled:bg-ap-beige"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="border border-ap-brown px-8 py-3 text-sm uppercase tracking-widest hover:bg-ap-brown hover:text-ap-tan"
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

