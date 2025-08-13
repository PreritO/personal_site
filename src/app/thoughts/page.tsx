import { getThoughtsPage } from '@/lib/notion';
import ThoughtsList from '@/components/ThoughtsList';
import { Metadata } from 'next'
import './styles.css'

export const metadata: Metadata = {
  title: 'Thoughts | Prerit Oberai',
}

export default async function ThoughtsPage() {
  const { blocks: thoughts } = await getThoughtsPage();
  
  return (
    <div className="container">
      <h1 className="thoughts-header">Random Thoughts</h1>
      <div className="thoughts-intro">
        <p>
          A twitter feed without all the bells and whistles.
        </p>
      </div>
      <ThoughtsList thoughts={thoughts} />
    </div>
  );
}

export const revalidate = 600; // Revalidate every 10 minutes