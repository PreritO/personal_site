import { getThoughtsPage } from '@/lib/notion'
import ThoughtsList from '@/components/ThoughtsList'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thoughts | Prerit Oberai',
}

export const revalidate = process.env.REVALIDATION_TIME_THOUGHTS
  ? parseInt(process.env.REVALIDATION_TIME_THOUGHTS)
  : 600

export default async function ThoughtsPage() {
  let thoughts: any[] = []
  let error: string | null = null

  try {
    const result = await getThoughtsPage()
    thoughts = result.blocks
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error'
    console.error('Thoughts page: failed to fetch thoughts:', error)
  }

  return (
    <div className="container">
      <h1 className="thoughts-header">Random Thoughts</h1>
      <p className="thoughts-intro">A twitter feed without all the bells and whistles.</p>
      {error && (
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Couldn&apos;t load thoughts: {error}
        </p>
      )}
      <ThoughtsList thoughts={thoughts} />
    </div>
  )
}
