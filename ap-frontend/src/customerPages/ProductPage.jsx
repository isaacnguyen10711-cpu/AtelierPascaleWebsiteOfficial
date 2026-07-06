import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');

  const { categoryName } = useParams();

  useEffect(() => {
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

    loadProducts();
  }, [categoryName]);



  return (
    <div>
      <h1 className="text-center font-['Tangerine'] text-6xl font-bold md:text-7xl">{category}</h1>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default ProductPage;