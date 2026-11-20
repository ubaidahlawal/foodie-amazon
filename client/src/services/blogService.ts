import { blogPosts } from '../data/blogPosts'
import type { BlogPost } from '../types/blog'

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  )
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}