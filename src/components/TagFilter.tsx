'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

type TagFilterProps = {
  allTags: string[]
}

export function TagFilter({ allTags }: TagFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedTag = searchParams.get('tag')

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag) {
      params.set('tag', tag)
    } else {
      params.delete('tag')
    }
    router.push(`/posts?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleTagClick(null)}
        className={`px-3 py-1 rounded-full text-sm ${
          !selectedTag
            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        All
      </button>
      {allTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTag === tag
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  )
} 