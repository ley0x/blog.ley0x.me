import BackToTop from '@/components/back-to-top'
import ScrollBar from '@/components/scroll-bar'

type Props = {
  children: React.ReactNode,
  params: { slug: string }
}

export default async function Layout({ children }: Props) {
  return (
    <section>
      <BackToTop />
      <ScrollBar />
      {children}
    </section>
  )
}
