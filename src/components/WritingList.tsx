'use client'

import { useSearchParams } from 'next/navigation'
import { BlogPost } from '@/lib/notion'
import WritingRows from '@/components/WritingRows'

interface WritingListProps {
  posts: BlogPost[]
}

// Client-side tag filtering keeps the page statically generated (ISR). Reading
// searchParams in the server page would opt the route into dynamic rendering
// and silently kill ISR — rejected in review (decision #17).
export default function WritingList({ posts }: WritingListProps) {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')

  const filteredPosts = tag ? posts.filter((post) => post.categories.includes(tag)) : posts

  if (tag && filteredPosts.length === 0) {
    return (
      <p className="writing-empty">
        No essays tagged &ldquo;{tag}&rdquo; yet.{' '}
        <a href="/writing">View all essays</a>
      </p>
    )
  }

  return <WritingRows posts={filteredPosts} />
}
