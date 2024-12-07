import { getSerializedPost, getPostSlugs } from '@/lib/mdx'
import BlogArticle from '@/components/blog-article'
import Wrapper from '@/components/_common/wrapper'
import { cn } from '@/lib/utils'
import TableOfContents from '@/components/table-of-contents'
import { useDate } from '@/hooks/use-date'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { meta, source } = await getSerializedPost(params.slug);
  const formattedDate = useDate(new Date(meta.date));

  return (
    <section className="w-full flex flex-col lg:px-6">
      <div className="relative flex gap-x-0 lg:gap-x-5 2xl:gap-x-0">
        <Wrapper className="flex-col py-4">
          <header className='flex flex-col w-full gap-y-4'>
            <div className='flex flex-row flex-wrap gap-2'>
              {meta.tags.map((tag, i) => (
                <Badge key={i} variant="outline-pink">{tag}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold" id="title">{meta.title}</h1>
            <h2 className='text-md text-white/80 font-semibold' id="author"><Link href={`https://x.com/${meta.author}`} className="hover:underline" target="_blank">{meta.author}</Link> / {formattedDate}</h2>
            <div className='relative flex h-80 rounded-xl overflow-hidden shadow'>
              <Image
                src={meta.image}
                layout='fill'
                objectFit='cover'
                alt='Test alt'
              />
            </div>
          </header>
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
