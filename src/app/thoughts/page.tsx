import { getThoughtsPage } from '@/lib/notion';
import ThoughtsList from '@/components/ThoughtsList';
import { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'Thoughts | Prerit Oberai',
}

export default async function ThoughtsPage() {
  const { blocks: thoughts } = await getThoughtsPage();
  const generatedAt = new Date().toISOString();
  
  return (
    <div className="container">
      <h1 className="thoughts-header">Random Thoughts</h1>
      {/* Debug timestamp - remove this later */}
      <div className="text-xs text-gray-500 mb-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
        🔧 Debug: Page generated at {generatedAt}
      </div>
      <div className="thoughts-intro">
        <p>
          A twitter feed without all the bells and whistles.
        </p>
      </div>
      <ThoughtsList thoughts={thoughts} />
    </div>
  );
}

export const revalidate = 1800; // 30 minutes for testing instead of using env var