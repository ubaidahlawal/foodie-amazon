import BlogCard from '../components/blog/BlogCard'
import Newsletter from '../components/home/Newsletter'
import PageHeader from '../components/ui/PageHeader'
import { getBlogPosts } from '../services/blogService'

function BlogPage() {
  const posts = getBlogPosts()

  return (
    <>
      <PageHeader
        title="Our Blog"
        description="Healthy snacking tips, guides and ideas from the Foodie Amazon kitchen."
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </section>

      <Newsletter />
    </>
  )
}

export default BlogPage