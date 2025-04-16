import { getAllPosts } from '@/lib/markdown'
import PostsList from '@/components/PostsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts | Prerit Oberai',
}

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="container">
      <h1 className="posts-header">Posts</h1>
      <PostsList posts={posts} />
    </div>
  )
} 