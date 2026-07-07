import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { useCart } from '../context/useCart'
import { formatCurrency } from '../utils/catalog'

export function OrderConfirmation() {
  const { lastOrder } = useCart()

  if (!lastOrder) {
    return (
      <EmptyState
        title="No recent order"
        message="Once you place an order, the confirmation will appear here."
      />
    )
  }

  return (
    <section className="confirmation">
      <p className="eyebrow">Order placed</p>
      <h1>Thank you, {lastOrder.customer.name}</h1>
      <p>
        Order <strong>{lastOrder.id}</strong> has been received. A confirmation will be
        sent to {lastOrder.customer.email}.
      </p>
      <div className="confirmation-box">
        <h2>Purchased books</h2>
        <ul>
          {lastOrder.items.map((item) => (
            <li key={item.bookId}>
              <span>
                {item.book.title} x {item.quantity}
              </span>
              <strong>{formatCurrency(item.book.price * item.quantity)}</strong>
            </li>
          ))}
        </ul>
        <p className="confirmation-total">Total paid: {formatCurrency(lastOrder.total)}</p>
      </div>
      <Link className="button" to="/books">
        Continue shopping
      </Link>
    </section>
  )
}
