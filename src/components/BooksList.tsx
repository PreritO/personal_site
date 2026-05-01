'use client'

import { Book } from '@/lib/notion'
import { Star, StarHalf } from 'lucide-react'

interface BooksListProps {
  books: Book[]
}

function Stars({ rating }: { rating: number | undefined }) {
  if (!rating) return null
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="book-stars" aria-label={`Rated ${rating} out of 5`}>
      {[...Array(full)].map((_, i) => (
        <Star key={`star-${i}`} className="star-icon" size={14} fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf className="star-icon" size={14} fill="currentColor" strokeWidth={0} />}
    </span>
  )
}

function formatMonthYear(date: string) {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export default function BooksList({ books }: BooksListProps) {
  if (!books || books.length === 0) {
    return <p style={{ color: 'var(--muted)' }}>No books to display yet.</p>
  }

  return (
    <ul className="books-list">
      {books.map((book) => {
        const titleEl = book.url ? (
          <a
            href={book.url}
            target="_blank"
            rel="noopener noreferrer"
            className="book-title-link"
          >
            {book.title}
          </a>
        ) : (
          book.title
        )

        return (
          <li key={book.id} className="book-row">
            <span className="book-title">{titleEl}</span>
            {book.author && <span className="book-author">{book.author}</span>}
            <span className="book-meta">
              <Stars rating={book.rating} />
              {book.dateFinished && <span>{formatMonthYear(book.dateFinished)}</span>}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
