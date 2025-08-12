'use client'

import { Book } from '@/lib/notion'
import { Star, StarHalf } from 'lucide-react'

interface BooksListProps {
  books: Book[]
}

// Helper function for consistent date formatting
function formatDate(date: string) {
  if (!date) return 'No date';
  
  const d = new Date(date)
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

// Function to render star ratings
function RenderRating({ rating }: { rating: number | undefined }) {
  if (!rating) return null;
  
  // Convert rating to number of full and half stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="book-rating">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`star-${i}`} className="star-icon filled" size={16} />
      ))}
      {hasHalfStar && <StarHalf className="star-icon half-filled" size={16} />}
    </div>
  );
}

export default function BooksList({ books }: BooksListProps) {
  return (
    <div className="books-grid">
      {books.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-info">
            <h2 className="book-title">{book.title}</h2>
            <h3 className="book-author">by {book.author}</h3>
            <div className="book-meta">
              <time className="book-date">Finished: {formatDate(book.dateFinished)}</time>
              <RenderRating rating={book.rating} />
            </div>
            {book.notes && (
              <div className="book-notes">
                <p>{book.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
