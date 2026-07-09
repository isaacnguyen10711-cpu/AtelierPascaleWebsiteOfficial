import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import HomePage from './customerPages/HomePage.jsx'
import LoginPage from './customerPages/LoginPage.jsx'
import RegisterPage from './customerPages/RegisterPage.jsx'
import ProductPage from './customerPages/ProductPage.jsx'
import ProductDetailsPage from './customerPages/ProductDetailsPage.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> 
        <Route path="/products/:categoryName" element={<ProductPage />} />
        <Route path="/products/:categoryName/:productId" element={<ProductDetailsPage />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App