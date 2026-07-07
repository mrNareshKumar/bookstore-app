import { useMemo, useState } from 'react'
import { BookCard } from '../components/BookCard'
import { EmptyState } from '../components/EmptyState'
import { books } from '../data/books'
import { filterBooks, getCategories } from '../utils/catalog'

export function BookListing() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('featured')
  const categories = useMemo(() => getCategories(books), [])
  const filteredBooks = useMemo(
    () => filterBooks(books, { query, category, sort }),
    [category, query, sort],
  )

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Catalog</p>
        <h1>Browse Books</h1>
        <p>Search by title, author, or category, then filter the shelf to match your mood.</p>
      </section>

      <section className="catalog-controls" aria-label="Book search and filters">
        <label>
          <span>Search</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search books or authors"
          />
        </label>

        <label>
          <span>Category</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </section>

      <p className="result-count">{filteredBooks.length} books found</p>

      {filteredBooks.length > 0 ? (
        <section className="book-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </section>
      ) : (
        <EmptyState
          title="No matching books"
          message="Try a different search phrase or switch back to all categories."
          actionLabel="Clear filters"
          actionTo="/books"
        />
      )}
    </>
  )
}
