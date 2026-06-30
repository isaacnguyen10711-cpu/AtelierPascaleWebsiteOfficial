import { useState } from 'react'
import { Link } from 'react-router-dom'

function App() {


  return (
    <div>
      <nav className="bg-ap-beige shadow-md">
        <div className="mx-auto px-4 py-4 flex items-center gap-4 text-white font-medium md:gap-6 lg:gap-8">
          <Link to="/">
            Home
          </Link>
          <Link to="/products/lacquer">
            Lacquer
          </Link>
          <Link to="/products/art">
            Art
          </Link>
        </div>
      </nav>
    </div>

  )
}

export default App
