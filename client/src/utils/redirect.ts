export function getSafeRedirect(state: unknown): string {
    if (typeof state === 'object' && state !== null && 'from' in state) {
      const { from } = state as { from: unknown }
  
      if (typeof from === 'string' && from.startsWith('/') && !from.startsWith('//')) {
        return from
      }
    }
  
    return '/'
  }