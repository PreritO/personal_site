import { getAllBooks } from '@/lib/notion'
import { Metadata } from 'next'
import BooksList from '@/components/BooksList'
import './styles.css'

export const metadata: Metadata = {
  title: 'Books | Prerit Oberai',
}

// Use environment variable for revalidation time with fallback
export const revalidate = process.env.REVALIDATION_TIME_BOOKS ? 
  parseInt(process.env.REVALIDATION_TIME_BOOKS) : 86400;

export default async function BooksPage() {
  const books = await getAllBooks()

  return (
    <div className="container">
      <h1 className="books-header">Books I've Read</h1>
      <div className="books-intro">
        <p>
          Here's a collection of books I've read recently, along with links so you can check them out.
        </p>
      </div>
      <BooksList books={books} />
    </div>
  )
}
