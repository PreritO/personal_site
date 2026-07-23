import { getAllPosts, getPostBySlug } from '@/lib/notion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { formatDate } from '@/lib/format'
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from '@/lib/site'
import CoverImage from '@/components/CoverImage'

export const revalidate = process.env.REVALIDATION_TIME_BLOG
  ? parseInt(process.env.REVALIDATION_TIME_BLOG)
  : 3600

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

type Props = {
  params: {
    slug: string
  }
}

function absoluteImage(url: string | undefined): string | undefined {
  if (!url) return undefined
  return url.startsWith('/') ? `${SITE_URL}${url}` : url
}

function descriptionFor(post: { description?: string; content: string }): string {
  if (post.description) return post.description
  const text = post.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  if (text) return text.slice(0, 155)
  return SITE_TAGLINE
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // getPostBySlug is React.cache()d — this and the page body share one fetch.
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found | Prerit Oberai' }
  }

  const description = descriptionFor(post)
  const ogImage = absoluteImage(post.coverImage)
  const canonical = `${SITE_URL}/writing/${post.slug}`

  return {
    title: `${post.title} | ${SITE_NAME}`,
    description,
    alternates: { canonical },
    openGraph: {
      title: post.title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: 'article',
      publishedTime: post.date,
      authors: [SITE_NAME],
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: post.title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }
}

// JSON-LD must not let Notion-controlled text terminate the <script> element.
function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  // null means "no published post with this slug" — API failures throw from
  // getPostBySlug and reach error.tsx instead (never disguised as a 404).
  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: descriptionFor(post),
        ...(post.coverImage ? { image: [absoluteImage(post.coverImage)] } : {}),
        datePublished: post.date,
        author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
        publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/writing/${post.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Writing', item: `${SITE_URL}/writing` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${SITE_URL}/writing/${post.slug}` },
        ],
      },
    ],
  }

  return (
    <article className="container-wide fade-seq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      {post.coverImage && <CoverImage src={post.coverImage} />}
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <time className="post-date" dateTime={post.date}>{formatDate(post.date)}</time>
          {post.categories.length > 0 && (
            <div className="post-tags">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={`/writing?tag=${encodeURIComponent(category)}`}
                  className="post-tag"
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <footer className="post-byline">
        Prerit Oberai is the co-founder and CTO of{' '}
        <a href="https://www.prototyping.io/" target="_blank" rel="noopener noreferrer">Prototyping.io</a>{' '}
        (YC P26), an AI-driven manufacturing platform.{' '}
        <Link href="/">More about Prerit</Link> · <Link href="/writing">More writing</Link>
      </footer>
    </article>
  )
}
