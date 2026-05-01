import { getAllBooks } from '@/lib/notion'
import { Metadata } from 'next'
import BooksList from '@/components/BooksList'

export const metadata: Metadata = {
  title: 'Books | Prerit Oberai',
}

export const revalidate = process.env.REVALIDATION_TIME_BOOKS
  ? parseInt(process.env.REVALIDATION_TIME_BOOKS)
  : 86400

export default async function BooksPage() {
  const books = await getAllBooks()

  return (
    <div className="container">
      <h1 className="books-header">Bookshelf</h1>
      <p className="books-intro">Mostly biographies. Always taking recs.</p>
      <BooksList books={books} />
    </div>
  )
}
