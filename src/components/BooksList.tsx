'use client'

import { Book } from '@/lib/notion'
import { Star, StarHalf, ExternalLink } from 'lucide-react'

interface BooksListProps {
  books: Book[]
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
    <div className="books-list">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <div className="book-main">
            <strong className="book-title">{book.title}</strong>
            {book.url && (
              <a 
                href={book.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="book-link"
                aria-label={`Link to ${book.title}`}
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
