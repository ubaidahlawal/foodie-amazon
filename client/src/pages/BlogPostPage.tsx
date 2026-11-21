import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Newsletter from '../components/home/Newsletter'
import { getBlogPostBySlug } from '../services/blogService'
import { formatDate } from '../utils/formatDate'

function BlogPostPage() {
  const { slug } = useParams()
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">Article not found</h1>
        <p className="mt-3 text-sm text-ink/70">
          That article may have moved, or the link is wrong.
        </p>
        <Link
          to="/blog"
          className="mt-8 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          Back to Blog
        </Link>
      </section>
    )
  }

  const { title, category, publishedAt, readMinutes, image, body } = post

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Blog
        </Link>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          {category}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-ink/60">
          {formatDate(publishedAt)} · {readMinutes} min read
        </p>

        <img
          src={image}
          alt=""
          className="mt-8 aspect-video w-full rounded-lg object-cover"
        />

        <div className="mt-8 space-y-5 text-base leading-8 text-ink/80">
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <Newsletter />
    </>
  )
}

export default BlogPostPage