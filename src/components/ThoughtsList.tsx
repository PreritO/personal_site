'use client'
import React from 'react';

interface Thought {
  id: string;
  content: string;
  hasChildren: boolean;
  children: any[];
}

interface ThoughtsListProps {
  thoughts: Thought[];
}

export default function ThoughtsList({ thoughts }: ThoughtsListProps) {
  if (!thoughts || thoughts.length === 0) {
    return <p>No thoughts to display.</p>;
  }

  return (
    <ul className="thoughts-list pl-5">
      {thoughts.map((thought) => (
      <li key={thought.id} className="thoughts-item mb-2">
        <span className="thoughts-content">{thought.content}</span>
      </li>
      ))}
    </ul>
  );

}