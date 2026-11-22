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
import {
  EMAIL_PATTERN,
  PASSWORD_PATTERN,
  PHONE_PATTERN,
} from '../utils/validation'

interface SignUpFormValues {
  name: string
  email: string
  phone: string
  password: string
  agree: boolean
}

function SignUpPage() {
  const location = useLocation()
  const { user, signUp } = useAuth()
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', password: '', agree: false },
  })

  const destination = getSafeRedirect(location.state)

  if (user) {
    return <Navigate to={destination} replace />
  }

  const describe = (name: keyof SignUpFormValues, id: string) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-error` : undefined,
  })

  const onSubmit = async ({ name, email, phone, password }: SignUpFormValues) => {
    setSubmitError('')

    try {
      await signUp({ name, email, phone, password })
    } catch (error) {
      setSubmitError(
        error instanceof AuthError && error.code === 'email-taken'
          ? 'An account with this email already exists. Try signing in instead.'
          : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <AuthLayout
      title="Sign up"
      subtitle={
        <>
          Already have an account?{' '}
          <Link to="/login" state={location.state} className={authLinkClass}>
            Sign In
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
        <AuthField id="signup-name" label="Your name" error={errors.name?.message}>
          <input
            id="signup-name"
            autoComplete="name"
            placeholder="Your name"
            className={underlineInputClass(!!errors.name)}
            {...describe('name', 'signup-name')}
            {...register('name', { required: 'Enter your name' })}
          />
        </AuthField>

        <AuthField
          id="signup-email"
          label="Email Address"
          error={errors.email?.message}
        >
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            className={underlineInputClass(!!errors.email)}
            {...describe('email', 'signup-email')}
            {...register('email', {
              required: 'Enter your email address',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Enter a valid email address',
              },
            })}
          />
        </AuthField>

        <AuthField
          id="signup-phone"
          label="Phone Number"
          error={errors.phone?.message}
        >
          <input
            id="signup-phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone Number"
            className={underlineInputClass(!!errors.phone)}
            {...describe('phone', 'signup-phone')}
            {...register('phone', {
              required: 'Enter your phone number',
              pattern: {
                value: PHONE_PATTERN,
                message: 'Enter a valid phone number',
              },
            })}
          />
        </AuthField>

        <PasswordField
          id="signup-password"
          label="Password"
          autoComplete="new-password"
          error={errors.password?.message}
          registration={register('password', {
            required: 'Create a password',
            pattern: {
              value: PASSWORD_PATTERN,
              message: 'Use at least 8 characters, with a letter and a number',
            },
          })}
        />

        <div>
          <label className="flex items-start gap-3 text-xs">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
              aria-invalid={errors.agree ? true : undefined}
              aria-describedby={errors.agree ? 'signup-agree-error' : undefined}
              {...register('agree', {
                required: 'You need to agree to continue',
              })}
            />
            <span>
              I agree with{' '}
              <Link
                to="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                to="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary hover:underline"
              >
                Terms of Use
              </Link>
            </span>
          </label>

          {errors.agree && (
            <p
              id="signup-agree-error"
              role="alert"
              className="mt-1 text-xs text-red-600"
            >
              {errors.agree.message}
            </p>
          )}
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-600">
            {submitError}
          </p>
        )}

        <button type="submit" disabled={isSubmitting} className={authSubmitClass}>
          {isSubmitting ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>
    </AuthLayout>
  )
}

export default SignUpPage