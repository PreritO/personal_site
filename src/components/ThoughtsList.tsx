'use client'
import React from 'react'

interface Thought {
  id: string
  content: string
  hasChildren: boolean
  children: any[]
}

interface ThoughtsListProps {
  thoughts: Thought[]
}

export default function ThoughtsList({ thoughts }: ThoughtsListProps) {
  if (!thoughts || thoughts.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>No thoughts to display.</p>
  }

  return (
    <ul className="thoughts-list">
      {thoughts.map((thought) => (
        <li key={thought.id} className="thought-row">
          <span className="thought-content">{thought.content}</span>
        </li>
      ))}
    </ul>
  )
}
