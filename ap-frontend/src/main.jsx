import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'
import Login from './customerPages/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className=" min-h-screen bg-ap-tan">
        <App />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  </StrictMode>,
)
