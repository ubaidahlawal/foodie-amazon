import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { formatDate } from '../../utils/formatDate'

interface BlogCardProps {
  post: BlogPost
}

function BlogCard({ post }: BlogCardProps) {
  const { slug, title, excerpt, category, publishedAt, readMinutes, image } = post
  const postPath = `/blog/${slug}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200">
      <Link
        to={postPath}
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden"
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {category}
        </p>
        <h2 className="mt-2 text-xl font-bold">
          <Link to={postPath} className="transition-colors hover:text-primary">
            {title}
          </Link>
        </h2>
        <p className="mt-2 flex-1 text-sm leading-6 text-ink/70">{excerpt}</p>
        <p className="mt-4 text-xs text-ink/60">
          {formatDate(publishedAt)} · {readMinutes} min read
        </p>
      </div>
    </article>
  )
}

export default BlogCard