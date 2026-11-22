import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import authPhoto from '../../assets/images/auth-photo.png'
import logo from '../../assets/images/Foodie-logo.png'

interface AuthLayoutProps {
  title: string
  subtitle: ReactNode
  children: ReactNode
}

function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="relative aspect-315/361 sm:aspect-2/1 lg:aspect-auto">
        <img
          src={authPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <Link
          to="/"
          aria-label="Foodie Amazon home"
          className="absolute left-1/2 top-[23%] w-[19%] -translate-x-1/2 -translate-y-1/2 sm:w-[14%] lg:top-[12%] lg:w-[18%]"
        >
          <img src={logo} alt="" className="aspect-square w-full rounded-full" />
        </Link>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-primary">{title}</h1>
          <p className="mt-3 text-sm">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default AuthLayout