import { getAllPosts } from '@/lib/mdx'
import Main from '@common/main'
import Wrapper from '@/components/_common/wrapper';
import Posts from '@/components/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <Main className="h-fit grow">
      <Wrapper className="h-full flex-col">
        <Posts posts={posts} />
      </Wrapper>
    </Main>
  )
}
