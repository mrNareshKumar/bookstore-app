import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/Header'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { BookDetails } from './pages/BookDetails'
import { BookListing } from './pages/BookListing'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { Home } from './pages/Home'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { SignIn } from './pages/SignIn'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookListing />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<BookListing />} />
          </Routes>
        </main>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
