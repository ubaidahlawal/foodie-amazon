export const contactTopics = [
    { value: 'general', label: 'General question' },
    { value: 'bulk', label: 'Bulk order' },
    { value: 'supplier', label: 'Become a supplier' },
    { value: 'order', label: 'Help with an order' },
  ] as const
  
  export type ContactTopic = (typeof contactTopics)[number]['value']
  
  export function parseContactTopic(value: string | null): ContactTopic {
    return (
      contactTopics.find((topic) => topic.value === value)?.value ?? 'general'
    )
  }