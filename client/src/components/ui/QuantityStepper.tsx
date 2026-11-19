import { Minus, Plus } from 'lucide-react'

interface QuantityStepperProps {
  value: number
  onChange: (value: number) => void
  label: string
  min?: number
  max?: number
}

const stepButtonClass =
  'flex h-8 w-8 items-center justify-center text-ink transition-colors hover:text-primary disabled:pointer-events-none disabled:text-neutral-300'

function QuantityStepper({
  value,
  onChange,
  label,
  min = 1,
  max = 99,
}: QuantityStepperProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-md border border-neutral-300"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className={stepButtonClass}
      >
        <Minus size={14} />
      </button>

      <span
        aria-live="polite"
        className="min-w-8 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </span>

      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className={stepButtonClass}
      >
        <Plus size={14} />
      </button>
    </div>
  )
}

export default QuantityStepper