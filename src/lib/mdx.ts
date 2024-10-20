import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkToc from 'remark-toc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm';
import { PostSchema } from '@/type/zod'

import rehypePrism from 'rehype-prism-plus/all';
import { refractor } from 'refractor/lib/core'

import tsx from 'refractor/lang/tsx.js'
import bash from 'refractor/lang/bash.js'
import json from 'refractor/lang/json.js'
import yaml from 'refractor/lang/yaml.js'
import markdown from 'refractor/lang/markdown.js'
import rust from 'refractor/lang/rust.js'
import python from 'refractor/lang/python.js'

refractor.register(tsx)
refractor.register(bash)
refractor.register(json)
refractor.register(yaml)
refractor.register(markdown)
refractor.register(rust)
refractor.register(python)

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const date = data.date.split('/');
  const dateObj = Date.parse(`${date[1]}/${date[0]}/${date[2]}`);

  const tags = data.tags.split(' ');
  return PostSchema.parse({ slug: realSlug, meta: { ...data, date: dateObj, tags }, content })
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1))
  return PostSchema.array().parse(posts);
}

export async function getSerializedPost(slug: string) {
  const { meta, content } = getPostBySlug(slug)
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        [remarkToc, { heading: 'Table of Contents' }],
        remarkGfm,
      ],
      rehypePlugins: [rehypeSlug, [rehypePrism, { ignoreMissing: false }]],
    },
    scope: meta,
  },
  )
  return {
    meta, source: mdxSource,
  }
}
