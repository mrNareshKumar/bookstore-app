import { Link, useNavigate, useParams } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { Rating } from '../components/Rating'
import { useCart } from '../context/useCart'
import { books } from '../data/books'
import { formatCurrency } from '../utils/catalog'

export function BookDetails() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const book = books.find((item) => item.id === bookId)

  if (!book) {
    return (
      <section className="empty-state">
        <h1>Book not found</h1>
        <p>The book may have moved or is no longer available.</p>
        <Link className="button" to="/books">
          Back to catalog
        </Link>
      </section>
    )
  }

  function buyNow() {
    addToCart(book.id)
    navigate('/cart')
  }

  return (
    <section className="details-layout">
      <BookCover book={book} size="detail" />
      <div className="details-copy">
        <p className="eyebrow">{book.category}</p>
        <h1>{book.title}</h1>
        <p className="muted">by {book.author}</p>
        <Rating value={book.rating} />
        <p className="detail-tagline">{book.tagline}</p>
        <p>{book.description}</p>

        <dl className="details-list">
          <div>
            <dt>Published</dt>
            <dd>{book.year}</dd>
          </div>
          <div>
            <dt>Pages</dt>
            <dd>{book.pages}</dd>
          </div>
          <div>
            <dt>Availability</dt>
            <dd>{book.stock} in stock</dd>
          </div>
        </dl>

        <div className="purchase-panel">
          <strong>{formatCurrency(book.price)}</strong>
          <button type="button" className="button" onClick={() => addToCart(book.id)}>
            Add to cart
          </button>
          <button type="button" className="button button-ghost" onClick={buyNow}>
            Buy now
          </button>
        </div>
      </div>
    </section>
  )
}
