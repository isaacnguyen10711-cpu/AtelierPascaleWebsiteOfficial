import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName, productId } = useParams();

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch('https://localhost:7215/api/products');
      const products = await response.json();
      const selectedProduct = products.find((item) => item.id === Number(productId));

      setProduct(selectedProduct ?? null);
      setIsLoading(false);
    }

    loadProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown">
        Loading...
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown">
        <p>Product not found.</p>
        <Link to={`/products/${categoryName}`} className="mt-6 inline-block border border-ap-brown px-6 py-2 hover:bg-ap-brown hover:text-ap-tan">
          Back To Products
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ap-tan px-6 py-28 text-ap-brown md:px-12 lg:px-20">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            {product.images?.length > 0 ? (
              product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={product.name}
                  className="h-[360px] w-full object-cover object-center md:h-[520px]"
                />
              ))
            ) : (
              <div className="flex h-[360px] items-center justify-center border border-ap-brown md:h-[520px]">
                No image available
              </div>
            )}
          </div>

          <div className="md:sticky md:top-24">
            <h1 className="font-['Tangerine'] text-6xl font-bold md:text-7xl">
              {product.name}
            </h1>
            <p className="mt-6 text-2xl font-medium">
              ${Number(product.price).toFixed(2)}
            </p>
            <button className="mt-8 w-full border border-ap-brown px-8 py-3 text-sm uppercase tracking-[0.2em] hover:bg-ap-brown hover:text-ap-tan md:w-auto">
              Add To Cart
            </button>
          </div>
        </div>

        <section className="mt-16 border-t border-ap-brown pt-10">
          <h2 className="font-['Tangerine'] text-5xl font-bold">Details</h2>
          <p className="mt-6 max-w-3xl leading-8">
            {product.description}
          </p>
        </section>
      </section>
    </main>
  );
}

export default ProductDetailsPage;
