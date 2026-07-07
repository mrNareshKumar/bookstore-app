import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

export function SignIn() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function submit(event) {
    event.preventDefault()
    if (!form.name.trim() || !form.email.trim()) {
      setError('Enter your name and email to sign in.')
      return
    }

    signIn(form)
    navigate('/books')
  }

  return (
    <section className="auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <p className="eyebrow">Member access</p>
        <h1>Sign In</h1>
        <p>Use any name and email to create a local demo session.</p>
        {error && <p className="form-error">{error}</p>}
        <label>
          <span>Name</span>
          <input name="name" value={form.name} onChange={updateField} />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={updateField} />
        </label>
        <button type="submit" className="button button-full">
          Sign in
        </button>
      </form>
    </section>
  )
}
