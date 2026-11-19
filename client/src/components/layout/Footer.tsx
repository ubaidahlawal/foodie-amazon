import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import {
  FaCcMastercard,
  FaCcVisa,
  FaFacebookF,
  FaLinkedinIn,
  FaPaypal,
  FaTwitter,
} from 'react-icons/fa'
import logo from '../../assets/images/Foodie-logo.png'
import { footerColumns } from '../../data/footer'

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedinIn },
  { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer>
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-3 border-b border-white/10 pb-10 text-center">
            <p className="font-heading text-2xl font-bold">Excellent</p>

            <div className="flex gap-1" aria-label="Rated 5 out of 5 stars">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  className="flex h-8 w-8 items-center justify-center bg-trustpilot"
                >
                  <Star size={20} className="fill-white text-white" />
                </span>
              ))}
            </div>

            <p className="text-sm">
              Based on{' '}
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                13,586 reviews
              </a>
            </p>

            <p className="flex items-center gap-1 font-semibold">
              <Star size={18} className="fill-trustpilot text-trustpilot" />
              Trustpilot
            </p>
          </div>

          <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="mb-4 text-base font-bold">{column.title}</h3>
                <ul className="space-y-3 text-sm text-white/70">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="mb-4 text-base font-bold">Follow us</h3>
              <ul className="flex gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center bg-accent text-white transition-colors hover:bg-primary"
                    >
                      <Icon size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-200 text-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:px-6 md:flex-row md:justify-between lg:px-8">
          <img src={logo} alt="Foodie Amazon" className="h-12 w-12" />

          <div className="flex items-center gap-4 text-3xl">
            <FaPaypal className="text-[#003087]" title="PayPal" />
            <FaCcVisa className="text-[#1a1f71]" title="Visa" />
            <FaCcMastercard className="text-[#eb001b]" title="Mastercard" />
          </div>

          <p className="text-xs">
            Copyright © {currentYear} FoodieAmazon. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer