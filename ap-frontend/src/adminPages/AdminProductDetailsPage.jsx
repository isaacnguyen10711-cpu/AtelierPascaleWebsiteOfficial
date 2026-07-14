function AdminProductDetailsPage() {
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
    <>
      <h1>Admin Product Details Page</h1>
      
    </>
  )
}

export default AdminProductDetailsPage