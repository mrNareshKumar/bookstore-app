import { describe, expect, it } from 'vitest'
import { books } from '../data/books'
import { filterBooks, getCategories } from './catalog'

describe('catalog helpers', () => {
  it('filters books by search query and category', () => {
    const result = filterBooks(books, {
      query: 'react',
      category: 'Technology',
      sort: 'featured',
    })

    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('React Patterns Field Guide')
  })

  it('sorts books from lowest price first', () => {
    const result = filterBooks(books, {
      query: '',
      category: 'All',
      sort: 'price-low',
    })

    expect(result[0].title).toBe('The Garden After Rain')
  })

  it('returns all categories with All first', () => {
    expect(getCategories(books)[0]).toBe('All')
    expect(getCategories(books)).toContain('Technology')
  })
})
