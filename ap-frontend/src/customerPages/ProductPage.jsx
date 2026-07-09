import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  const { categoryName } = useParams();

  useEffect(() => {
    async function loadProducts() {
      const categoryResponse = await fetch('https://localhost:7215/api/Categories');
      const categoryData = await categoryResponse.json();

      const selectedCategory = categoryData.find(
        (cat) => cat.name.toLowerCase().replaceAll(' ', '-') === categoryName.toLowerCase()
      );

      if (!selectedCategory) {
        setCategory('');
        setProducts([]);
        return;
      }

      setCategory(selectedCategory.name);

      const productResponse = await fetch('https://localhost:7215/api/products');
      const productData = await productResponse.json();

      const productsByCategory = productData.filter(
        (product) => product.categoryId === selectedCategory.id
      );

      setProducts(productsByCategory);
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
            {category}
          </h1>
        </div>
      </section>

      <main className="bg-ap-tan px-6 py-20 text-ap-brown md:px-12 lg:px-20">
        {products.length > 0 ? (
          <div className="mx-auto grid grid-cols-2 max-w-6xl gap-8  lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="space-y-3">
                {product.images?.[0]?.imageUrl && (
                  <Link to={`/products/${categoryName}/${product.id}`}>
                    <img
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      className="h-[220px] w-full object-cover object-center md:h-[260px] lg:h-[300px] hover:scale-105 transition duration-300"
                    />
                  </Link>
                )}
                <h2 className="font-['Tangerine'] text-4xl font-bold">{product.name}</h2>
                <p className="leading-7">{product.description}</p>
                <p>${Number(product.price).toFixed(2)}</p>
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
