import { getSerializedPost, getPostSlugs } from '@/lib/mdx'
import Layout from '@/components/layout'
import BlogArticle from '@/components/blog-article'
import TableOfContents from '@/components/table-of-contents'
import Wrapper from '@/components/_common/wrapper'
import { cn } from '@/lib/utils'
import BackToTop from '@/components/back-to-top'
import ScrollBar from '@/components/scroll-bar'

export async function generateStaticParams() {
  const posts = getPostSlugs()
  return posts.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { meta, source } = await getSerializedPost(params.slug)
  return (
    <>

      <h1 className="text-3xl font-bold mb-4">{meta.title}</h1>
      <Layout className="flex flex-row gap-x-5">
        <BackToTop />
        <ScrollBar />
        <TableOfContents />
        <Wrapper>
          <section className="w-full flex flex-col">
            <div
              className={cn(
                'flex flex-col w-full max-w-full prose prose-invert prose-lg px-8 marker:text-white',
                'prose-img:rounded',
                'prose-blockquote:border-pink-500/50',
                'prose-hr:border-white/20',
                'prose-pre:bg-pre',
                'prose-a:text-pink-500 prose-a:z-20 prose-a:relative prose-a:no-underline prose-a: duration-100',
                'after:prose-a:absolute after:prose-a:left-0 after:prose-a:-bottom-[3px] after:prose-a:w-full after:prose-a:bg-pink-500/10 after:prose-a:h-[2px] bg-transparent after:prose-a:z-10 after:prose-a:duration-100',
                'hover:after:prose-a:bg-pink-500/10 hover:after:prose-a:h-[24px]'
              )}
            >
              <pre>{JSON.stringify(meta, null, 2)}</pre>
              <BlogArticle source={source} />
            </div>
          </section>
        </Wrapper>
      </Layout>
    </>
  )
}
