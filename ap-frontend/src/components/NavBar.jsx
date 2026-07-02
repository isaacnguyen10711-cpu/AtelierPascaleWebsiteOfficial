import { Link, useLocation } from 'react-router-dom'
import LoginPage from '../customerPages/LoginPage';
function NavBar() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  let isLoggedIn;
  if (localStorage.getItem('token')) {
    isLoggedIn = true;
  }
  else {
    isLoggedIn = false;
  }

  function handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent border-b border-white shadow-md">
      <div className={`mx-auto flex items-center gap-4 px-4 py-4 font-medium text-sm ${isLoginPage ? 'text-black' : 'text-white'} md:gap-6 md:text-md lg:gap-8 lg:text-lg`}>
        <Link to="/">Home</Link>
        <Link to="/products/new-arrival">New Arrival</Link>
        <Link to="/products/lacquer">Lacquer</Link>
        <Link to="/products/art">Art</Link>
        {isLoggedIn ? (<button onClick={handleLogout} className={`flex flex-1 justify-end ${isLoginPage ? 'hover:text-gray-500' : 'hover:text-gray-300'}`}>Log out</button>)
          : (<Link to="/login" className={`flex flex-1 justify-end ${isLoginPage ? 'hover:text-gray-500' : 'hover:text-gray-300'}`}>Log in</Link>)}
      </div>
    </nav>
  )
}

export default NavBar
