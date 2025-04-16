import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = join(process.cwd(), 'src/posts')

export type Post = {
  slug: string
  title: string
  date: string
  tags: string[]
  content: string
}

export function getAllPosts(): Post[] {
  const fileNames = readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = join(postsDirectory, fileName)
      const fileContents = readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        tags: data.tags || [],
        content,
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = join(postsDirectory, `${slug}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title,
    date: data.date,
    tags: data.tags || [],
    content: contentHtml,
  }
} 