import { Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './customerPages/HomePage.jsx'
import LoginPage from './customerPages/LoginPage.jsx'
import RegisterPage from './customerPages/RegisterPage.jsx'
import ProductPage from './customerPages/ProductPage.jsx'
import ProductDetailsPage from './customerPages/ProductDetailsPage.jsx'
import ShoppingCartPage from './customerPages/ShoppingCartPage.jsx'
import CheckoutPage from './customerPages/CheckoutPage.jsx'
import OrderConfirmationPage from './customerPages/OrderConfirmationPage.jsx'
import MyOrdersPage from './customerPages/MyOrdersPage.jsx'
import UnauthorizedPage from './customerPages/UnauthorizedPage.jsx'
import AdminProductEditPage from './adminPages/AdminProductEditPage.jsx'
import AdminAddProductPage from './adminPages/AdminAddProductPage.jsx'
import AdminProductImagesPage from './adminPages/AdminProductImagesPage.jsx'
import AboutPage from './customerPages/AboutPage.jsx'
import Footer from './components/Footer.jsx'
import GetUserRole from './components/GetUserRole.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import { useState, useEffect } from 'react'

function App() {
  const [role, setRole] = useState(null)
  const [isRoleLoading, setIsRoleLoading] = useState(true)

  // Fetch the user role when the component mounts so that we can conditionally render routes based on the user's role.
  useEffect(() => {
    async function fetchUserRole() {
      const userRole = await GetUserRole()
      setRole(userRole)
      setIsRoleLoading(false)
    }
    fetchUserRole()
  }, [])

  if (isRoleLoading) {
    return (
      <main className="min-h-screen bg-ap-tan px-6 pt-32 text-center text-ap-brown">
        Loading...
      </main>
    )
  }

  return (
    <>
      <ScrollToTop />
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/checkout" element={role == "Customer" ? <CheckoutPage /> : <Navigate to="/unauthorized" replace />} />
        <Route path="/order-confirmation/:orderId" element={role == "Customer" ? <OrderConfirmationPage /> : <Navigate to="/unauthorized" replace />} />
        <Route path="/orders" element={<MyOrdersPage /> } />
        <Route path="/products/:categoryName" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products/:categoryName/:productId" element={role == "Admin" ? < AdminProductEditPage /> : <ProductDetailsPage />} />
        <Route path="/admin/add-product" element={role == "Admin" ? <AdminAddProductPage /> : <Navigate to="/unauthorized" replace />} />
        <Route path="/admin/product-image" element={role == "Admin" ? <AdminProductImagesPage /> : <Navigate to="/unauthorized" replace />} />
      </Routes>

      <Footer />
    </>
    )
}

export default App



