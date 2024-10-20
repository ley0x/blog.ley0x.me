import { z } from 'zod'
import { PostMetaSchema, PostSchema } from './zod'

export type PostMeta = z.infer<typeof PostMetaSchema>
export type Post = z.infer<typeof PostSchema>
