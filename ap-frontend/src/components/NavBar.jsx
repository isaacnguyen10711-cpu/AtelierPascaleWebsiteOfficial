import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import GetUserToken from './GetUserToken'
import { House, Menu, X, ShoppingCart } from 'lucide-react'

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const location = useLocation()
  const isProductDetailsPage = location.pathname.startsWith('/products/') && location.pathname.split('/').length === 4
  const isBlackTextPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/cart' || isProductDetailsPage
  // Used for changing the login button to logout button if the user is logged in
  const isLoggedIn = Boolean(GetUserToken())
  const linkHover = isBlackTextPage ? 'hover:text-gray-500' : 'hover:text-gray-300'

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav className="absolute left-0 top-0 z-50 w-full border-b border-white bg-transparent shadow-md">
      <div className={`mx-auto grid grid-cols-[25%_50%_25%] items-center px-4 py-4 font-medium text-sm ${isBlackTextPage ? 'text-black' : 'text-white'} md:text-base lg:text-lg`}>
        {/* Display a menu section which contains the category menu if its on mobile view */} 
        <div className="md:hidden">
          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={linkHover}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <div className="justify-self-center md:justify-self-start">
          <div className="flex flex-row items-center gap-2">
            <Link className={linkHover} to="/" onClick={closeMenu}>
              <House className="hidden h-4 w-4 md:flex md:h-6 md:w-6 lg:h-8 lg:w-8" />
            </Link>
            <Link to="/" className={linkHover} onClick={closeMenu}>
              Atelier Pascale
            </Link>
          </div>
        </div>

        <div className="hidden justify-center md:flex md:gap-6 lg:gap-8">
          <Link className={linkHover} to="/products/new-arrival">
            New Arrival
          </Link>
          <Link className={linkHover} to="/products/home-decor">
            Home Decor
          </Link>
          <Link className={linkHover} to="/products/gifts">
            Gifts
          </Link>
          <Link className={linkHover} to="/products/jewelry">
            Jewelry
          </Link>
          <Link className={linkHover} to="/products/art">
            Art
          </Link>
          <Link className={linkHover} to="/about">
            About
          </Link>
        </div>

        <div className="justify-self-end flex flex-row items-center">
        <Link to="/cart">
            <ShoppingCart className={`mr-4 h-5 w-5 ${isBlackTextPage ? 'text-black' : 'text-white'} md:mr-4 md:h-6 md:w-6 lg:mr-6 lg:h-7 lg:w-7`} />
          </Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className={linkHover}>
              Log out
            </button>
          ) : (
            <Link to="/login" className={linkHover} onClick={closeMenu}>
              Log in
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className={`border-t border-white px-4 py-4 ${isBlackTextPage ? 'bg-ap-tan text-black' : 'bg-transparent text-white'} md:hidden`}>
          <div className="flex flex-col items-center gap-4 text-sm font-medium">
            <Link className={linkHover} to="/products/new-arrival" onClick={closeMenu}>
              New Arrival
            </Link>
            <Link className={linkHover} to="/products/home-decor" onClick={closeMenu}>
              Home Decor
            </Link>
            <Link className={linkHover} to="/products/gifts" onClick={closeMenu}>
              Gifts
            </Link>
            <Link className={linkHover} to="/products/jewelry" onClick={closeMenu}>
              Jewelry
            </Link>
            <Link className={linkHover} to="/products/art" onClick={closeMenu}>
              Art
            </Link>
            <Link className={linkHover} to="/about" onClick={closeMenu}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar

