import { formatCurrency } from '../utils/catalog'

export function OrderSummary({ subtotal, shipping, tax, total }) {
  return (
    <aside className="summary-panel" aria-label="Order summary">
      <h2>Order Summary</h2>
      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(subtotal)}</dd>
        </div>
        <div>
          <dt>Shipping</dt>
          <dd>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</dd>
        </div>
        <div>
          <dt>Estimated tax</dt>
          <dd>{formatCurrency(tax)}</dd>
        </div>
        <div className="summary-total">
          <dt>Total</dt>
          <dd>{formatCurrency(total)}</dd>
        </div>
      </dl>
    </aside>
  )
}
