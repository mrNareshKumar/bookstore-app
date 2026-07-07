export function BookCover({ book, size = 'medium' }) {
  return (
    <div className={`book-cover ${book.coverClass} book-cover-${size}`} aria-hidden="true">
      <span className="cover-category">{book.category}</span>
      <strong>{book.title}</strong>
      <small>{book.author}</small>
    </div>
  )
}
