import { z } from 'zod'

export const PostMetaSchema = z.object({
  date: z.number(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  tags: z.string().array(),
  author: z.literal('@ley0x_'),
  lang: z.literal('fr').or(z.literal('en')),
})

export const PostSchema = z.object({
  meta: PostMetaSchema,
  slug: z.string().optional(),
  content: z.string(),
})
