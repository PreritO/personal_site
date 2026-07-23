import { Suspense } from 'react'
import { getAllPosts } from '@/lib/notion'
import WritingList from '@/components/WritingList'
import WritingRows from '@/components/WritingRows'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Writing | Prerit Oberai',
}

export const revalidate = process.env.REVALIDATION_TIME_BLOG
  ? parseInt(process.env.REVALIDATION_TIME_BLOG)
  : 3600

// No try/catch here on purpose: a throw during ISR regeneration retains the
// last good page; a throw on an uncached request reaches error.tsx. Catching
// would replace good cached pages with degraded ones (review decision #28).
export default async function WritingPage() {
  const posts = await getAllPosts()

  return (
    <div className="container">
      <h1 className="posts-header">Writing</h1>
      {posts.length === 0 ? (
        <p className="writing-empty">
          I&apos;m starting to write longer-form — on manufacturing, building
          Prototyping.io, and the things that don&apos;t fit in a conversation.
          First essay soon.
        </p>
      ) : (
        <Suspense fallback={<WritingRows posts={posts} />}>
          <WritingList posts={posts} />
        </Suspense>
      )}
    </div>
  )
}
