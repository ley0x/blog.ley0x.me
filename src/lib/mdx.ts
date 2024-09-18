import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import rehypePrism from 'rehype-prism-plus';
import rehypeHighlight from 'rehype-highlight'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return { slug: realSlug, meta: data, content }
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1))
  return posts
}

export async function getSerializedPost(slug: string) {
  const { meta, content } = getPostBySlug(slug)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkToc, { heading: 'Table of Contents' }]
      ],
      rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: true }], rehypeHighlight],
    },
    scope: meta,
  },
  )
  return {
    meta, source: mdxSource,
  }
}
