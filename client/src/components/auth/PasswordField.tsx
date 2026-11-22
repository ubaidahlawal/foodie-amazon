import { useState } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import AuthField from './AuthField'
import { underlineInputClass } from './authStyles'

interface PasswordFieldProps {
  id: string
  label: string
  autoComplete: 'current-password' | 'new-password'
  registration: UseFormRegisterReturn
  error?: string
}

function PasswordField({
  id,
  label,
  autoComplete,
  registration,
  error,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <AuthField id={id} label={label} error={error}>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={label}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${underlineInputClass(!!error)} pr-10`}
          {...registration}
        />

        <button
          type="button"
          onClick={() => setIsVisible((visible) => !visible)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isVisible}
          className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-ink/60 transition-colors hover:text-ink"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </AuthField>
  )
}

export default PasswordField