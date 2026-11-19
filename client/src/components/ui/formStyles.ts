const baseClass =
  'w-full rounded-md border bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-ink/40 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-neutral-100 disabled:text-ink/60'

export function inputClass(hasError = false): string {
  return `${baseClass} ${hasError ? 'border-red-500' : 'border-neutral-300'}`
}