import { getAllPosts } from '@/lib/notion'
import PostsList from '@/components/PostsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts | Prerit Oberai',
}

export const revalidate = process.env.REVALIDATION_TIME_BLOG ? 
  parseInt(process.env.REVALIDATION_TIME_BLOG) : 3600; // Fallback to 1 hour

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container">
      <h1 className="posts-header">Posts</h1>
      <PostsList posts={posts} />
    </div>
  )
} 