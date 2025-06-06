import { getSerializedPost, getPostSlugs } from '@/lib/mdx'
import BlogArticle from '@/components/blog-article'
import Wrapper from '@/components/_common/wrapper'
import { cn } from '@/lib/utils'
import TableOfContents from '@/components/table-of-contents'
import PostHeader from '@/components/post-header'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }))
}

type Props = {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const slug = (await params).slug;

  const { meta } = await getSerializedPost(slug);

  return {
    title: meta.title,
    metadataBase: new URL("https://blog.ley0x.me/"),
    description: meta.description,
    openGraph: {
      images: [meta.image],
      title: meta.title,
      description: meta.description,
      type: "article",
      url: `https://blog.ley0x.me/posts/${slug}`,
      siteName: 'blog.ley0x.me',
      authors: [meta.author],
    },
    twitter: {
      title: meta.title,
      description: meta.description,
      images: [meta.image],
      card: "summary_large_image",
      creator: meta.author,
    }
  }
}

export default async function Post({ params }: Props) {
  const myParams = await params;
  const { meta, source } = await getSerializedPost(myParams.slug);

  return (
    <section className="w-full flex flex-col lg:px-6">
      <div className="relative flex gap-x-0 lg:gap-x-5 2xl:gap-x-0">
        <Wrapper className="flex-col py-4">
          <PostHeader meta={meta} />
          <article className={cn("flex flex-col w-full mt-12")}>
            <div
              className={cn(
                'flex flex-col w-full max-w-full prose dark:prose-invert prose-lg marker:text-white',
                'prose-img:rounded',
                'prose-blockquote:border-pink-500/50',
                'prose-hr:border-white/20',
                'prose-pre:bg-pre',
                'prose-a:text-pink-500 prose-a:z-20 prose-a:relative prose-a:no-underline prose-a: duration-100',
                'after:prose-a:absolute after:prose-a:left-0 after:prose-a:-bottom-[3px] after:prose-a:w-full after:prose-a:bg-pink-500/10 after:prose-a:h-[2px] bg-transparent after:prose-a:z-10 after:prose-a:duration-100',
                'hover:after:prose-a:bg-pink-500/10 hover:after:prose-a:h-[24px]'
              )}
            >
              <BlogArticle source={source} />
            </div>
          </article>
        </Wrapper>
        <TableOfContents />
      </div>
    </section>
  )
}
