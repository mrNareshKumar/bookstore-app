import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { OrderSummary } from '../components/OrderSummary'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

const initialForm = {
  name: '',
  email: '',
  address: '',
  city: '',
  postalCode: '',
  payment: 'card',
}

export function Checkout() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { items, subtotal, shipping, tax, total, placeOrder } = useCart()
  const [form, setForm] = useState(() => ({
    ...initialForm,
    name: user?.name ?? '',
    email: user?.email ?? '',
  }))
  const [error, setError] = useState('')

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function submitOrder(event) {
    event.preventDefault()
    const requiredFields = ['name', 'email', 'address', 'city', 'postalCode']
    const missingField = requiredFields.find((field) => !form[field].trim())

    if (missingField) {
      setError('Please complete all shipping and contact fields before placing the order.')
      return
    }

    placeOrder(form)
    navigate('/order-confirmation')
  }

  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Checkout</p>
        <h1>Place Your Order</h1>
        <p>Review your delivery details and confirm your order.</p>
      </section>

      <section className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          {!user && (
            <p className="notice">
              Have an account? <Link to="/signin">Sign in</Link> to prefill checkout.
            </p>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="name" value={form.name} onChange={updateField} />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" value={form.email} onChange={updateField} />
            </label>
            <label className="wide">
              <span>Street address</span>
              <input name="address" value={form.address} onChange={updateField} />
            </label>
            <label>
              <span>City</span>
              <input name="city" value={form.city} onChange={updateField} />
            </label>
            <label>
              <span>Postal code</span>
              <input name="postalCode" value={form.postalCode} onChange={updateField} />
            </label>
            <label className="wide">
              <span>Payment method</span>
              <select name="payment" value={form.payment} onChange={updateField}>
                <option value="card">Credit or debit card</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on delivery</option>
              </select>
            </label>
          </div>

          <button className="button" type="submit">
            Place order
          </button>
        </form>

        <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </section>
    </>
  )
}
