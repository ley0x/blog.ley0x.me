import { getAllPosts } from '@/lib/mdx'
import Main from '@common/main'
import Wrapper from '@/components/_common/wrapper';
import Posts from '@/components/posts';
import LastPost from '@/components/last-post';
import Divider from '@/components/_common/divider';

export default function Home() {
  const posts = getAllPosts();

  return (
    <Main className="h-fit grow">
      <Wrapper className="h-full flex-col">
        <h2 className="text-3xl font-bold my-6"><span className="text-pink-500 font-bold text-4xl mr-2">#</span>Last article</h2>
        <LastPost id={posts[0].slug ?? "-"} {...posts[0].meta} />
        <Divider className="my-6" />
        <Posts posts={posts} />
      </Wrapper>
    </Main>
  )
}
