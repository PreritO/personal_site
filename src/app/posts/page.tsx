import { getAllPosts } from '@/lib/markdown'
import PostsList from '@/components/PostsList'

export default function PostsPage() {
  const posts = getAllPosts()

  return (
    <div className="container">
      <h1 className="posts-header">Posts</h1>
      <PostsList posts={posts} />
    </div>
  )
} 