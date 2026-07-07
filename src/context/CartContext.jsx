import { useCallback, useMemo, useState } from 'react'
import { books } from '../data/books'
import { CartContext } from './cartContextValue'

function getInitialCart() {
  try {
    const storedCart = localStorage.getItem('bookstore-cart')
    return storedCart ? JSON.parse(storedCart) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(getInitialCart)
  const [lastOrder, setLastOrder] = useState(null)

  const persist = useCallback((nextItems) => {
    setItems(nextItems)
    localStorage.setItem('bookstore-cart', JSON.stringify(nextItems))
  }, [])

  const addToCart = useCallback((bookId, quantity = 1) => {
    const book = books.find((item) => item.id === bookId)
    if (!book) return

    setItems((currentItems) => {
      const nextItems = currentItems.map((item) => ({ ...item }))
      const existingItem = nextItems.find((item) => item.bookId === bookId)

      if (existingItem) {
        existingItem.quantity = Math.min(book.stock, existingItem.quantity + quantity)
      } else {
        nextItems.push({ bookId, quantity: Math.min(book.stock, quantity) })
      }

      localStorage.setItem('bookstore-cart', JSON.stringify(nextItems))
      return nextItems
    })
  }, [])

  const updateQuantity = useCallback((bookId, quantity) => {
    const book = books.find((item) => item.id === bookId)
    if (!book) return

    const safeQuantity = Math.max(1, Math.min(book.stock, Number(quantity) || 1))
    setItems((currentItems) => {
      const nextItems = currentItems.map((item) =>
        item.bookId === bookId ? { ...item, quantity: safeQuantity } : item,
      )
      localStorage.setItem('bookstore-cart', JSON.stringify(nextItems))
      return nextItems
    })
  }, [])

  const removeFromCart = useCallback(
    (bookId) => {
      persist(items.filter((item) => item.bookId !== bookId))
    },
    [items, persist],
  )

  const clearCart = useCallback(() => {
    persist([])
  }, [persist])

  const cartItems = useMemo(
    () =>
      items
        .map((item) => {
          const book = books.find((entry) => entry.id === item.bookId)
          return book ? { ...item, book } : null
        })
        .filter(Boolean),
    [items],
  )

  const subtotal = cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  const shipping = subtotal > 0 && subtotal < 50 ? 4.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const placeOrder = useCallback((customer) => {
    const order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customer,
      items: cartItems,
      total,
      placedAt: new Date().toISOString(),
    }

    setLastOrder(order)
    localStorage.setItem('bookstore-last-order', JSON.stringify(order))
    clearCart()
    return order
  }, [cartItems, clearCart, total])

  const value = useMemo(
    () => ({
      items: cartItems,
      itemCount,
      subtotal,
      shipping,
      tax,
      total,
      lastOrder,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
    }),
    [
      addToCart,
      cartItems,
      clearCart,
      itemCount,
      lastOrder,
      placeOrder,
      removeFromCart,
      shipping,
      subtotal,
      tax,
      total,
      updateQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
