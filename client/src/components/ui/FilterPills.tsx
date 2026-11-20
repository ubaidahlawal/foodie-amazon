
interface FilterOption {
    value: string
    label: string
  }
  
  interface FilterPillsProps {
    label: string
    options: FilterOption[]
    value: string
    onChange: (value: string) => void
  }
  
  function FilterPills({ label, options, value, onChange }: FilterPillsProps) {
    return (
      <div
        role="group"
        aria-label={label}
        className="flex gap-2 overflow-x-auto pb-1 scrollbar:none [&::-webkit-scrollbar]:hidden"
      >
        {options.map((option) => {
          const isActive = option.value === value
  
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(option.value)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-neutral-300 text-ink hover:border-primary hover:text-primary'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    )
  }
  
  export default FilterPills