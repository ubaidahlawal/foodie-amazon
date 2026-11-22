import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'
import logo from '../../assets/images/Foodie-logo.png'
import { navLinks } from '../../data/navigation'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

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
  const { itemCount, openCart } = useCart()
  const { user, signOut } = useAuth()

  const closeMenu = () => setIsMenuOpen(false)
  const firstName = user?.name.split(' ')[0]

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
          <Link
            to="/products"
            aria-label="Search products"
            className={iconButtonClass}
          >
            <Search size={20} />
          </Link>

          <span
            className="hidden h-6 w-px bg-neutral-200 sm:block"
            aria-hidden="true"
          />

          <Link to="/wishlist" aria-label="Wishlist" className={iconButtonClass}>
            <Heart size={20} />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${itemCount} items`}
            className={`${iconButtonClass} relative`}
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </button>

          {user ? (
            <>
              <span className="hidden text-sm font-medium xl:inline">
                Hi, {firstName}
              </span>
              <button
                type="button"
                onClick={signOut}
                aria-label={`Sign out ${user.name}`}
                title="Sign out"
                className={iconButtonClass}
              >
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" aria-label="Log in" className={iconButtonClass}>
              <User size={20} />
            </Link>
          )}

          <Link
            to="/contact"
            className="ml-2 hidden rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark sm:inline-block"
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
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut()
                    closeMenu()
                  }}
                  className={`${mobileLinkClass({ isActive: false })} w-full text-left`}
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className={mobileLinkClass({ isActive: false })}
                >
                  Log in
                </Link>
              )}
            </li>

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