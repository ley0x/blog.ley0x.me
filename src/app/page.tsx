import Link from 'next/link'
import { getAllPosts } from '@/lib/mdx'
import Layout from '@/components/layout'

export default function Home() {
  const posts = getAllPosts()

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/posts/${post.slug}`} className="text-lg font-semibold hover:underline">
              {post.meta.title}
            </Link>
            <p className="text-gray-600">{post.meta.excerpt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
