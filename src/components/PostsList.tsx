'use client'

import Link from 'next/link'
import { BlogPost } from '@/lib/notion'
import { useSearchParams } from 'next/navigation'

interface PostsListProps {
  posts: BlogPost[]
  selectedTag?: string
}

function formatDate(date: string) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return date
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function PostsList({ posts, selectedTag }: PostsListProps) {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')

  const filteredPosts = selectedTag
    ? posts.filter(post => post.categories.includes(selectedTag))
    : tag
      ? posts.filter(post => post.categories.includes(tag))
      : posts

  return (
    <div className="posts-list">
      {filteredPosts.map((post) => (
        <article key={post.slug} className="post-row">
          <Link href={`/posts/${post.slug}`} className="post-item">
            <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
            <h2 className="post-title">{post.title}</h2>
          </Link>
        </article>
      ))}
    </div>
  )
}
