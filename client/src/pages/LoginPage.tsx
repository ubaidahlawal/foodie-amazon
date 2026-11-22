import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthLayout from '../components/auth/AuthLayout'
import PasswordField from '../components/auth/PasswordField'
import {
  authLinkClass,
  authSubmitClass,
  underlineInputClass,
} from '../components/auth/authStyles'
import { useAuth } from '../hooks/useAuth'
import { AuthError } from '../services/authService'
import { getSafeRedirect } from '../utils/redirect'
import { EMAIL_PATTERN } from '../utils/validation'

interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

function LoginPage() {
  const location = useLocation()
  const { user, signIn } = useAuth()
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: 'onTouched',
    defaultValues: { email: '', password: '', remember: false },
  })

  const destination = getSafeRedirect(location.state)

  // Once signed in (or if already signed in), leave this page
  if (user) {
    return <Navigate to={destination} replace />
  }

  const onSubmit = async ({ email, password, remember }: LoginFormValues) => {
    setSubmitError('')

    try {
      await signIn({ email, password, remember })
    } catch (error) {
      setSubmitError(
        error instanceof AuthError
          ? 'Incorrect email or password.'
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <AuthLayout
      title="Login"
      subtitle={
        <>
          Don&apos;t have an account yet?{' '}
          <Link to="/signup" state={location.state} className={authLinkClass}>
            Sign Up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <AuthField
          id="login-email"
          label="Email Address"
          error={errors.email?.message}
        >
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            className={underlineInputClass(!!errors.email)}
            {...register('email', {
              required: 'Enter your email address',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Enter a valid email address',
              },
            })}
          />
        </AuthField>

        <PasswordField
          id="login-password"
          label="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          registration={register('password', {
            required: 'Enter your password',
          })}
        />

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-primary"
              {...register('remember')}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-600">
            {submitError}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className={authSubmitClass}>
          {isSubmitting ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default LoginPage