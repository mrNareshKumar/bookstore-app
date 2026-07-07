import { Link } from 'react-router-dom'
import { BookCover } from '../components/BookCover'
import { EmptyState } from '../components/EmptyState'
import { OrderSummary } from '../components/OrderSummary'
import { useCart } from '../context/useCart'
import { formatCurrency } from '../utils/catalog'

export function Cart() {
  const { items, subtotal, shipping, tax, total, updateQuantity, removeFromCart, clearCart } =
    useCart()

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add a few books to your cart and they will show up here."
      />
    )
  }

  return (
    <>
      <section className="page-heading page-heading-row">
        <div>
          <p className="eyebrow">Shopping cart</p>
          <h1>Your Cart</h1>
        </div>
        <button type="button" className="link-button" onClick={clearCart}>
          Clear cart
        </button>
      </section>

      <section className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <article className="cart-item" key={item.bookId}>
              <BookCover book={item.book} size="small" />
              <div>
                <h2>{item.book.title}</h2>
                <p className="muted">by {item.book.author}</p>
                <p>{formatCurrency(item.book.price)}</p>
              </div>
              <label className="quantity-field">
                <span>Qty</span>
                <input
                  type="number"
                  min="1"
                  max={item.book.stock}
                  value={item.quantity}
                  onChange={(event) => updateQuantity(item.bookId, event.target.value)}
                />
              </label>
              <button
                type="button"
                className="link-button"
                onClick={() => removeFromCart(item.bookId)}
              >
                Remove
              </button>
            </article>
          ))}
        </div>

        <div className="checkout-column">
          <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
          <Link className="button button-full" to="/checkout">
            Checkout
          </Link>
        </div>
      </section>
    </>
  )
}
