import { getAllPosts, getPostBySlug } from '@/lib/notion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { Metadata } from 'next'

// Helper function for consistent date formatting
function formatDate(date: string) {
  const d = new Date(date)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Prerit Oberai',
    }
  }
  
  return {
    title: `${post.title} | Prerit Oberai`,
  }
}

export default async function PostPage({ params }: Props) {
  const slug = params.slug

  try {
    const post = await getPostBySlug(slug)
    
    if (!post) {
      notFound()
    }

    return (
      <article className="container">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <time className="post-date">{formatDate(post.date)}</time>
            {post.categories.length > 0 && (
              <div className="post-tags">
                <span className="post-tags-label">
                  <Tag size={16} />
                </span>
                {post.categories.map((category) => (
                  <Link 
                    key={category} 
                    href={`/posts?tag=${category}`}
                    className="post-tag"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </header>
        {/* <div 
          className="post-content prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        /> */}
      </article>
    )
  } catch (error) {
    notFound()
  }
} 