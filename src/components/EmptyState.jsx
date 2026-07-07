import { Link } from 'react-router-dom'

export function EmptyState({ title, message, actionLabel = 'Browse books', actionTo = '/books' }) {
  return (
    <section className="empty-state">
      <h2>{title}</h2>
      <p>{message}</p>
      <Link className="button" to={actionTo}>
        {actionLabel}
      </Link>
    </section>
  )
}
