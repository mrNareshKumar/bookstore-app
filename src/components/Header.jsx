import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

export function Header() {
  const { itemCount } = useCart()
  const { user, signOut } = useAuth()

  return (
    <header className="site-header">
      <Link to="/" className="brand" aria-label="BookNest home">
        <span className="brand-mark">B</span>
        <span>BookNest</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/cart">Cart ({itemCount})</NavLink>
      </nav>

      <div className="auth-area">
        {user ? (
          <>
            <span className="user-chip">{user.name}</span>
            <button type="button" className="link-button" onClick={signOut}>
              Sign out
            </button>
          </>
        ) : (
          <NavLink to="/signin" className="button button-ghost">
            Sign in
          </NavLink>
        )}
      </div>
    </header>
  )
}
