export function underlineInputClass(hasError = false): string {
    return `w-full border-x-0 border-t-0 border-b bg-transparent px-0 py-3 text-sm outline-none transition-colors placeholder:text-ink/60 focus:border-primary ${
      hasError ? 'border-red-500' : 'border-neutral-300'
    }`
  }
  
  export const authLinkClass =
    'font-semibold text-accent underline-offset-2 hover:underline'
  
  export const authSubmitClass =
    'w-full rounded-md bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60'