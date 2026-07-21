import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './customerPages/HomePage.jsx'
import LoginPage from './customerPages/LoginPage.jsx'
import RegisterPage from './customerPages/RegisterPage.jsx'
import ProductPage from './customerPages/ProductPage.jsx'
import ProductDetailsPage from './customerPages/ProductDetailsPage.jsx'
import ShoppingCartPage from './customerPages/ShoppingCartPage.jsx'
import AdminProductEditPage from './adminPages/AdminProductEditPage.jsx'
import AdminAddProductPage from './adminPages/AdminAddProductPage.jsx'
import AdminAddProductImagesPage from './adminPages/AdminAddProductImagesPage.jsx'
import Footer from './components/Footer.jsx'
import GetUserRole from './components/GetUserRole.jsx'

function App() {
  const role = GetUserRole()

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/products/:categoryName" element={<ProductPage />} />
        <Route path="/products/:categoryName/:productId" element={role == "Admin" ? < AdminProductEditPage /> : <ProductDetailsPage />} />
        <Route path="/admin/add-product" element={<AdminAddProductPage />} />
        <Route path="/admin/add-product-image" element={<AdminAddProductImagesPage />} />
      </Routes>

      <Footer />
    </>
    )
}

export default App


