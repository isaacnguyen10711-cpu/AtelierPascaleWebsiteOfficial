import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  const { categoryName } = useParams();

  // Fetch products based on the categoryName from the URL
  async function loadProducts() {
    const categoryResponse = await fetch(`https://localhost:7215/api/Categories`);
    const categoryData = await categoryResponse.json();

    const selectedCategory = categoryData.find((cat) => cat.name.toLowerCase().replaceAll(' ', '-') === categoryName.toLowerCase());

    // Prevent setting category if selectedCategory is undefined
    if (!selectedCategory) {
      setCategory('');
      setProducts([]);
      return;
    }

    setCategory(selectedCategory.name);

    const productResponse = await fetch(`https://localhost:7215/api/products`);
    const productData = await productResponse.json();

    const productsByCategory = productData.filter((product) => product.categoryId === selectedCategory.id);
    setProducts(productsByCategory);
  }

  useEffect(() => {
    loadProducts();
  }, [categoryName]);

  const categoryBackground = categoryName === 'new-arrival' ? 'bg-new-arrival'
    : categoryName === 'home-decor' ? 'bg-home-decor'
      : categoryName === 'gifts' ? 'bg-gifts'
        : categoryName === 'jewelry' ? 'bg-jewelry'
          : categoryName === 'art' ? 'bg-art' : '';

  return (
    <>
      <div className="relative min-h-screen">
        <div className={categoryBackground} />
        <div className="absolute inset-0 flex flex-col items-end justify-center pr-10 text-white md:pr-20 lg:pr-30">
          <h1 className="font-['Mea_Culpa'] text-[3rem] font-thin tracking-[0.15em] md:pr-30 md:text-[5rem] lg:pr-50 lg:text-[7rem]">
            {category}
          </h1>
        </div>
        {/* Lists out products */} 
        {products.length > 0 ? (
          <div className="border border-ap-brown flex flex-col-2 md:flex-col-4 gap-4 ">
            <div>
              {products.map((product) => (
                <div key={product.id} className="space-y-2 md:space-y-4">
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p>{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </>
  );
}

export default ProductPage;