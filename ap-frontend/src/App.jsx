import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './customerPages/HomePage.jsx'
import LoginPage from './customerPages/LoginPage.jsx'
import RegisterPage from './customerPages/RegisterPage.jsx'
import ProductPage from './customerPages/ProductPage.jsx'
import ProductDetailsPage from './customerPages/ProductDetailsPage.jsx'
import AdminProductDetailsPage from './adminPages/AdminProductDetailsPage.jsx'
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
        <Route path="/products/:categoryName" element={<ProductPage />} />
        <Route path="/products/:categoryName/:productId" element={role === 'Admin' ? <AdminProductDetailsPage /> : <ProductDetailsPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
