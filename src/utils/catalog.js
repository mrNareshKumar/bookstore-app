export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

export function getCategories(books) {
  return ['All', ...Array.from(new Set(books.map((book) => book.category))).sort()]
}

export function filterBooks(books, { query = '', category = 'All', sort = 'featured' }) {
  const normalizedQuery = query.trim().toLowerCase()

  return books
    .filter((book) => {
      const matchesQuery = [book.title, book.author, book.category]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery)
      const matchesCategory = category === 'All' || book.category === category
      return matchesQuery && matchesCategory
    })
    .sort((first, second) => {
      if (sort === 'price-low') return first.price - second.price
      if (sort === 'price-high') return second.price - first.price
      if (sort === 'rating') return second.rating - first.rating
      if (sort === 'newest') return second.year - first.year
      return second.rating - first.rating || first.title.localeCompare(second.title)
    })
}
