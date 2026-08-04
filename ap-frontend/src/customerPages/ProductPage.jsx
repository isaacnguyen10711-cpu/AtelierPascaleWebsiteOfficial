import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GetUserRole from '../components/GetUserRole.jsx';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const role = GetUserRole();

  const { categoryName } = useParams();

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`https://localhost:7215/api/products/category/${categoryName}`);

      if (!response.ok) {
        console.error('Failed to fetch products:', response.statusText);
        return;
      }

      const data = await response.json();
      setProducts(data);
    }

    loadProducts();
  }, [categoryName]);

  const categoryBackground = categoryName === 'new-arrival' ? 'bg-new-arrival'
    : categoryName === 'home-decor' ? 'bg-home-decor'
      : categoryName === 'gifts' ? 'bg-gifts'
        : categoryName === 'jewelry' ? 'bg-jewelry'
          : categoryName === 'art' ? 'bg-art' : '';


  return (
    <>
      <section className="relative min-h-screen">
        <div className={categoryBackground} />
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
          <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] md:pr-30 md:text-[5rem] lg:pr-50 lg:text-[7rem]">
            {categoryName.replaceAll('-', ' ')}
          </h1>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-20 text-ap-brown md:px-12 lg:px-20">
        {products.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 max-w-6xl gap-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="space-y-3">
                {product.images?.[0]?.imageUrl && (
                  <Link to={`/products/${categoryName}/${product.id}`}>
                    <img
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      className="h-[160px] w-full object-cover object-center md:h-[230px] lg:h-[300px] hover:scale-105 transition duration-300"
                    />
                  </Link>
                )}
                {role == "Admin" ? (
                  <h2 className="mt-4 text-lg font-bold md:text-xl lg:text-2xl">Product Id: {product.id}</h2>
                ) : null}
                <h2 className="font-['Tangerine'] mt-4 text-3xl font-bold md:text-4xl">{product.name}</h2>
                <p className="leading-7 text-base md:text-lg">{product.description}</p>
                <p className="text-base md:text-lg">${Number(product.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </main>
    </>
  );
}

export default ProductPage;
