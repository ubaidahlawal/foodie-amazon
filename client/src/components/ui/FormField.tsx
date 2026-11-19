import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  optional?: boolean
  className?: string
  children: ReactNode
}

function FormField({
  id,
  label,
  error,
  optional = false,
  className = '',
  children,
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold">
        {label}
        {optional && (
          <span className="font-normal text-ink/60"> (optional)</span>
        )}
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

export default FormField