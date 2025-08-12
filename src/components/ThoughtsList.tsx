'use client'

import { Thought } from '@/lib/notion'
import { Tag } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface ThoughtsListProps {
  thoughts: Thought[]
}

// Helper function for consistent date formatting
function formatDate(date: string) {
  if (!date) return 'No date';
  
  const d = new Date(date)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${months[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

export default function ThoughtsList({ thoughts }: ThoughtsListProps) {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')
  
  const filteredThoughts = tag 
    ? thoughts.filter(thought => thought.tags.includes(tag))
    : thoughts
  
  return (
    <div className="thoughts-list">
      {filteredThoughts.map((thought) => (
        <article key={thought.id} className="thought-item">
          <div className="thought-content">
            <p>{thought.content}</p>
          </div>
          <div className="thought-meta">
            <time className="thought-date">{formatDate(thought.date)}</time>
            {thought.tags.length > 0 && (
              <div className="thought-tags">
                <span className="thought-tags-label">
                  <Tag size={14} />
                </span>
                {thought.tags.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/thoughts?tag=${tag}`}
                    className="thought-tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
