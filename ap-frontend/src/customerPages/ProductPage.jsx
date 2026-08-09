import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GetUserRole from '../components/GetUserRole.jsx';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const role = GetUserRole();

  const { categoryName } = useParams();

  useEffect(() => {
    async function loadProducts() {
      setProducts([])
      const response = await fetch(`https://localhost:7215/api/products/category/${categoryName}?sortBy=${sortBy}`);

      if (!response.ok) {
        console.error('Failed to fetch products:', response.statusText);
        return;
      }

      const data = await response.json();
      setProducts(data);
    }

    loadProducts();
  }, [categoryName, sortBy]);

  const categoryBackground = categoryName === 'new-arrival' ? 'bg-new-arrival'
    : categoryName === 'home-decor' ? 'bg-home-decor'
      : categoryName === 'gifts' ? 'bg-gifts'
        : categoryName === 'jewelry' ? 'bg-jewelry'
          : categoryName === 'art' ? 'bg-art' : '';

  const categoryTitle = categoryName === 'new-arrival' ? 'New Arrival'
    : categoryName === 'home-decor' ? 'Home Decor'
      : categoryName === 'gifts' ? 'Gifts'
        : categoryName === 'jewelry' ? 'Jewelry'
          : categoryName === 'art' ? 'Art' : '';

  return (
    <>
      <section className="relative min-h-screen">
        <div className={categoryBackground} />
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
          <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] transition duration-300 hover:translate-x-2 md:pr-30 md:text-[5rem] lg:pr-50 lg:text-[7rem]">
            {categoryTitle}
          </h1>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-10 text-ap-brown md:px-12 lg:px-20">
        <div className="mx-auto mb-10 flex max-w-6xl justify-end">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="cursor-pointer border border-ap-brown bg-ap-tan px-3 py-2 text-sm text-ap-brown transition duration-300 hover:bg-ap-pale focus:bg-ap-pale md:text-base"
          >
            <option value="">Sort by</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="name-a-to-z">Name: A to Z</option>
            <option value="name-z-to-a">Name: Z to A</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {products.length > 0 ? (
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-7 md:grid-cols-3 md:gap-8 lg:grid-cols-4 lg:gap-10">
            {products.map((product) => (
              <div key={product.id} className="group transition duration-300 hover:-translate-y-1">
                <Link to={`/products/${categoryName}/${product.id}`} className="block">

                  <div className="overflow-hidden rounded">
                    {product.images?.[0]?.imageUrl ? (
                      <img
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        className="h-[160px] w-full object-cover object-center transition duration-500 group-hover:scale-105 md:h-[230px] lg:h-[300px]"
                      />
                    ) : (
                      <div className="flex h-[160px] w-full items-center justify-center border border-ap-brown bg-ap-pale px-4 text-center text-xs uppercase tracking-widest md:h-[230px] md:text-sm lg:h-[300px]">
                        No image available
                      </div>
                    )}
                  </div>

                  {role == "Admin" ? (
                    <h2 className="mt-4 text-sm font-bold uppercase tracking-widest md:text-base lg:text-lg">Product Id: {product.id}</h2>
                  ) : null}

                  <h2 className="mt-4 font-['Tangerine'] text-3xl font-bold leading-none transition duration-200 group-hover:text-ap-beige md:text-4xl lg:text-5xl">
                    {product.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 md:text-base md:leading-7 lg:text-base">
                    {product.description}
                  </p>
                  <p className="mt-3 text-sm font-medium md:text-base lg:text-lg">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </main >
    </>
  );
}

export default ProductPage;
