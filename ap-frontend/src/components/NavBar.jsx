import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { House, Menu, X } from 'lucide-react'

function NavBar() {
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'
  const isLoggedIn = Boolean(localStorage.getItem('token'))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const linkHover = isLoginPage ? 'hover:text-gray-500' : 'hover:text-gray-300'

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.reload()
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav className="absolute left-0 top-0 z-50 w-full border-b border-white bg-transparent shadow-md">
      <div className={`mx-auto grid grid-cols-[25%_50%_25%] items-center px-4 py-4 font-medium text-sm ${isLoginPage ? 'text-black' : 'text-white'} md:text-base lg:text-lg`}>
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
          <Link className={linkHover} to="/products/jewellry">
            Jewellry
          </Link>
          <Link className={linkHover} to="/products/art">
            Art
          </Link>
        </div>

        <div className="justify-self-end">
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
        <div className={`border-t border-white px-4 py-4 ${isLoginPage ? 'bg-ap-tan text-black' : 'bg-transparent text-white'} md:hidden`}>
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
            <Link className={linkHover} to="/products/jewellry" onClick={closeMenu}>
              Jewellry
            </Link>
            <Link className={linkHover} to="/products/art" onClick={closeMenu}>
              Art
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
