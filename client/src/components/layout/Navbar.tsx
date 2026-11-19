
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import logo from '../../assets/images/Foodie-logo.png'
import { navLinks } from '../../data/navigation'

// Temporary value until the real cart state is built
const CART_COUNT = 2

const iconButtonClass =
  'rounded-full p-2 text-ink transition-colors hover:bg-mint hover:text-primary'

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm transition-colors hover:text-primary ${
    isActive ? 'font-bold text-ink' : 'font-medium text-ink/80'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded-md px-3 py-3 text-base transition-colors hover:bg-mint ${
    isActive ? 'font-bold text-primary' : 'font-medium text-ink'
  }`

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" onClick={closeMenu} aria-label="Foodie Amazon home">
          <img src={logo} alt="Foodie Amazon" className="h-14 w-14" />
        </Link>

        <ul className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={desktopLinkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <button type="button" aria-label="Search" className={iconButtonClass}>
            <Search size={20} />
          </button>

          <span
            className="hidden h-6 w-px bg-neutral-200 sm:block"
            aria-hidden="true"
          />

          <Link to="/wishlist" aria-label="Wishlist" className={iconButtonClass}>
            <Heart size={20} />
          </Link>

          <Link
            to="/cart"
            aria-label={`Cart, ${CART_COUNT} items`}
            className={`${iconButtonClass} relative`}
          >
            <ShoppingBag size={20} />
            {CART_COUNT > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {CART_COUNT}
              </span>
            )}
          </Link>

          <Link
            to="/contact"
            className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-block"
          >
            Contact Us
          </Link>

          <button
            type="button"
            className={`${iconButtonClass} lg:hidden`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-neutral-100 bg-white lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={mobileLinkClass}
                  onClick={closeMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="mt-2 block rounded-md bg-primary px-5 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar