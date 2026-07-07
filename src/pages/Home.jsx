import { Link } from 'react-router-dom'
import { BookCard } from '../components/BookCard'
import { BookCover } from '../components/BookCover'
import { books } from '../data/books'

const featuredBooks = books.slice(0, 3)

export function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Independent reads, curated daily</p>
          <h1>Find your next shelf-worthy book.</h1>
          <p>
            Browse thoughtful fiction, practical guides, poetry, travel writing, and
            technology books with fast checkout and a tidy cart experience.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/books">
              Browse catalog
            </Link>
            <Link className="button button-ghost" to="/signin">
              Member sign in
            </Link>
          </div>
        </div>
        <div className="hero-shelf" aria-label="Featured books">
          {featuredBooks.map((book) => (
            <BookCover key={book.id} book={book} size="large" />
          ))}
        </div>
      </section>

      <section className="section-heading">
        <p className="eyebrow">Featured picks</p>
        <h2>Books readers are reaching for</h2>
      </section>

      <section className="book-grid">
        {featuredBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </>
  )
}
