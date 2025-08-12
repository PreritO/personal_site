import { getAllThoughts } from '@/lib/notion'
import { Metadata } from 'next'
import ThoughtsList from '@/components/ThoughtsList'

export const metadata: Metadata = {
  title: 'Thoughts | Prerit Oberai',
}

// Revalidate every 10 minutes
export const revalidate = 600;

export default async function ThoughtsPage() {
  const thoughts = await getAllThoughts()

  return (
    <div className="container">
      <h1 className="thoughts-header">Random Thoughts</h1>
      <div className="thoughts-intro">
        <p>
          A collection of short thoughts, ideas, and observations.
        </p>
      </div>
      <ThoughtsList thoughts={thoughts} />
    </div>
  )
}
