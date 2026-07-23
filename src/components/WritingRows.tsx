import Link from 'next/link'
import { BlogPost } from '@/lib/notion'
import { formatDate } from '@/lib/format'

// Presentational rows shared by WritingList and the Suspense fallback, so the
// fallback renders the identical unfiltered list instead of a blank flash.
// The fallback renders WITHOUT the entrance-animation class; the hydrated list
// animates once (session-gated) — so the swap never double-fires the motion.
export default function WritingRows({ posts, animate = false }: { posts: BlogPost[]; animate?: boolean }) {
  return (
    <div className={animate ? 'posts-list fade-seq' : 'posts-list'}>
      {posts.map((post) => (
        <article key={post.slug} className="post-row">
          <Link href={`/writing/${post.slug}`} className="post-item">
            <time className="post-date" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h2 className="post-title">{post.title}</h2>
          </Link>
        </article>
      ))}
    </div>
  )
}
