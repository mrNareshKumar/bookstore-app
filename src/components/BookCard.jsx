import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { formatCurrency } from '../utils/catalog'
import { BookCover } from './BookCover'
import { Rating } from './Rating'

export function BookCard({ book }) {
  const { addToCart } = useCart()

  return (
    <article className="book-card">
      <Link to={`/books/${book.id}`} className="cover-link" aria-label={`View ${book.title}`}>
        <BookCover book={book} />
      </Link>
      <div className="book-card-body">
        <div>
          <p className="eyebrow">{book.category}</p>
          <h3>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="muted">by {book.author}</p>
        </div>
        <p className="book-tagline">{book.tagline}</p>
        <div className="book-meta">
          <Rating value={book.rating} />
          <span>{book.stock} in stock</span>
        </div>
        <div className="card-actions">
          <strong>{formatCurrency(book.price)}</strong>
          <button type="button" className="button button-small" onClick={() => addToCart(book.id)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  )
}
