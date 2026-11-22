import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthLayout from '../components/auth/AuthLayout'
import {
  authSubmitClass,
  underlineInputClass,
} from '../components/auth/authStyles'
import { requestPasswordReset } from '../services/authService'
import { EMAIL_PATTERN } from '../utils/validation'

interface ForgotPasswordFormValues {
  email: string
}

function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    mode: 'onTouched',
    defaultValues: { email: '' },
  })

  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    await requestPasswordReset(email)
    setIsSent(true)
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we will send you a link to reset your password."
    >
      {isSent ? (
        <div role="status" className="space-y-6">
          <p className="text-sm">
            If an account exists for that email, a reset link is on its way.
            Check your inbox, and your spam folder too.
          </p>
          <Link
            to="/login"
            className="inline-block text-sm font-semibold text-primary hover:underline"
          >
            Back to Login
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-6"
        >
          <AuthField
            id="forgot-email"
            label="Email Address"
            error={errors.email?.message}
          >
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              placeholder="Email Address"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? 'forgot-email-error' : undefined}
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={authSubmitClass}
          >
            {isSubmitting ? 'Sending…' : 'Send Reset Link'}
          </button>

          <Link
            to="/login"
            className="block text-center text-sm font-semibold text-primary hover:underline"
          >
            Back to Login
          </Link>
        </form>
      )}
    </AuthLayout>
  )
}

export default ForgotPasswordPage