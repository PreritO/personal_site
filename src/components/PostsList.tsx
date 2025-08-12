'use client'

import Link from 'next/link'
import { BlogPost } from '@/lib/notion'
import { useSearchParams } from 'next/navigation'

interface PostsListProps {
  posts: BlogPost[]
  selectedTag?: string
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
        <article key={post.slug}>
          <Link href={`/posts/${post.slug}`} className="post-item">
            <h2 className="text-2xl font-serif opacity-90 hover:opacity-100 transition-opacity leading-tight">
              {post.title}
            </h2>
            <time className="post-date">{new Date(post.date).toLocaleDateString()}</time>
          </Link>
        </article>
      ))}
    </div>
  )
} 