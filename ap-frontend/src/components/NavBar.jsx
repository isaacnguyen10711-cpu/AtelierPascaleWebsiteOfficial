import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-transparent border-b border-white shadow-md">
      <div className="mx-auto flex items-center gap-4 px-4 py-4 font-medium text-white md:gap-6 lg:gap-8">
        <Link to="/">Home</Link>
        <Link to="/products/lacquer">Lacquer</Link>
        <Link to="/products/art">Art</Link>
      </div>
    </nav>
  )
}

export default NavBar
