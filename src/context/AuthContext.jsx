import { useMemo, useState } from 'react'
import { AuthContext } from './authContextValue'


function getInitialUser() {
  try {
    const storedUser = localStorage.getItem('bookstore-user')
    return storedUser ? JSON.parse(storedUser) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getInitialUser)

  function signIn({ name, email }) {
    const nextUser = { name: name.trim(), email: email.trim() }
    setUser(nextUser)
    localStorage.setItem('bookstore-user', JSON.stringify(nextUser))
  }

  function signOut() {
    setUser(null)
    localStorage.removeItem('bookstore-user')
  }

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
