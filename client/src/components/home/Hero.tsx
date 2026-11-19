import { Link } from 'react-router-dom'
import { ShoppingBag, Star } from 'lucide-react'
import chiliImage from '../../assets/images/chili.png'
import garlicImage from '../../assets/images/garlic.png'
import heroImage from '../../assets/images/hero-img.png'
import heroWave from '../../assets/images/hero-wave.png'
import { serviceHighlights } from '../../data/home'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <img
        src={heroWave}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-104 w-full object-fill lg:block"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-14 pt-10 text-center sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-24 lg:pt-16 lg:text-left">
        <div>
          <p className="text-sm font-medium">Discover the Pure Taste of Nature</p>

          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
            <span className="block">
              Organic <span className="text-accent">Snacks</span>
            </span>
            <span className="block">
              Made <span className="text-accent">with</span> Love,
            </span>
            <span className="block">
              Just <span className="text-accent">for</span> You
            </span>
          </h1>

          <Link
            to="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:brightness-95"
          >
            Shop Now
            <ShoppingBag size={16} />
          </Link>

          <div
            className="mt-6 flex items-center justify-center gap-2 lg:justify-start"
            aria-hidden="true"
          >
            <span className="h-1.5 w-8 rounded-full bg-accent" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/30 lg:bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-primary/30 lg:bg-white" />
          </div>
        </div>

        <div className="relative mx-auto mb-6 aspect-square w-full max-w-70 sm:max-w-md lg:mb-0">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/60" />

          <img
            src={heroImage}
            alt="A plate of organic snacks with nuts, cookies and chocolate"
            className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover"
          />

          <img
            src={garlicImage}
            alt=""
            aria-hidden="true"
            className="absolute left-[85%] top-0 z-10 w-[14%] drop-shadow-md"
          />

          <img
            src={chiliImage}
            alt=""
            aria-hidden="true"
            className="absolute left-[85%] top-[63%] z-10 w-[22%]"
          />

          <div
            className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 translate-y-1/2 gap-1 rounded-lg bg-white px-4 py-2 shadow-lg"
            aria-label="Rated 5 out of 5 stars"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={22} className="fill-accent text-accent" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative bg-mint pb-14 pt-6 text-ink lg:bg-transparent lg:pb-14 lg:pt-0 lg:text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="mx-auto grid w-fit gap-5 sm:w-full sm:grid-cols-3 lg:ml-auto lg:mr-0 lg:max-w-2xl">
            {serviceHighlights.map(({ title, description, icon: Icon }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white lg:bg-white lg:text-primary">
                  <Icon size={20} />
                </span>
                <div className="text-left">
                  <p className="font-heading text-sm font-bold">{title}</p>
                  <p className="text-xs text-ink/70 lg:text-white/90">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Hero