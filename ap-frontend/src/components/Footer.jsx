import { Link } from 'react-router-dom'
import { Camera, Mail, MapPin, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="border-t border-ap-beige bg-ap-pale text-ap-brown">
      <div className="mx-auto grid max-w-6xl gap-20 px-6 py-12 md:grid-cols-[4fr_1fr_1fr_1fr] md:px-12 lg:px-20">
        <div>
          <h2 className="font-['Tangerine'] text-5xl font-bold md:text-6xl">
            Atelier Pascale
          </h2>
          <p className="mt-4 max-w-sm leading-7">
            Quality and craftsmanship in home decor, gifts, jewelry and art.
          </p>
        </div>

        {/* Section includes links to different pages */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]">Explore</h3>
          <div className="flex flex-col gap-3">
            <Link to="/" className="hover:text-ap-beige">Home</Link>
            <Link to="/products/new-arrival" className="hover:text-ap-beige">New Arrival</Link>
            <Link to="/products/home-decor" className="hover:text-ap-beige">Home Decor</Link>
            <Link to="/products/art" className="hover:text-ap-beige">Art</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]">Service</h3>
          <div className="flex flex-col gap-3">
            <Link to="/products/gifts" className="hover:text-ap-beige">Gifts</Link>
            <Link to="/products/jewellry" className="hover:text-ap-beige">Jewelry</Link>
            <Link to="/login" className="hover:text-ap-beige">Account</Link>
            <Link to="/cart" className="hover:text-ap-beige">Shopping Bag</Link>
          </div>
        </div>

        {/* Section includes contact information */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em]">Atelier</h3>
          <div className="flex flex-col gap-3">
            <a href="mailto:isaac.nguyen10711@gmail.com" className="flex items-center gap-2 hover:text-ap-beige">
              <Mail className="h-4 w-4" />
              isaac.nguyen10711@gmail.com
            </a>
            <a href="tel:+61000000000" className="flex items-center gap-2 hover:text-ap-beige">
              <Phone className="h-4 w-4" />
              +61 000 000 000
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Adelaide, Australia
            </p>
            <a href="https://www.instagram.com/" className="flex items-center gap-2 hover:text-ap-beige">
              <Camera className="h-4 w-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t border-ap-brown px-6 py-5 text-sm md:flex-row md:items-center md:justify-between md:px-12 lg:px-20">
        <p>2026 Atelier Pascale. All rights reserved.</p>
        <p>Designed by Isaac Nguyen.</p>
      </div>
    </footer>
  )
}

export default Footer

