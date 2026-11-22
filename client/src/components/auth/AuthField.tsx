import type { ReactNode } from 'react'

interface AuthFieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

function AuthField({ id, label, error, children }: AuthFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      {children}

      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export default AuthField