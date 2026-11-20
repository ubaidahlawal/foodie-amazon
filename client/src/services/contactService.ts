import type { ContactTopic } from '../data/contactTopics'

export interface ContactMessage {
  name: string
  email: string
  topic: ContactTopic
  message: string
}

export async function sendContactMessage(message: ContactMessage): Promise<void> {
  void message
  await new Promise((resolve) => setTimeout(resolve, 600))
}