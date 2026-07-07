# BookNest Interactive Bookstore : https://mrnareshkumar.github.io/bookstore-app/

BookNest is a ReactJS bookstore application built for the assignment requirements. Users can browse books, search and filter the catalog, open book detail pages, add and remove cart items, sign in with a local demo account, and place an order through checkout.

## Features

- Home page with featured books
- Book listing with search, category filtering, and sorting
- Book detail pages with stock, rating, and purchase actions
- Shopping cart with quantity updates, removal, clear cart, subtotal, tax, shipping, and total
- Checkout form with validation and order confirmation
- Local demo authentication using React Context and localStorage
- Unit tests for catalog helper behavior

## Tech Stack

- ReactJS
- Vite
- React Router
- React Context API
- CSS
- Vitest

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run tests:

```bash
npm test
```

## Project Structure

```text
src/
  components/     Shared UI components
  context/        Auth and cart providers
  data/           Book catalog data
  pages/          Route-level pages
  utils/          Formatting, filtering, and tests
```

## Notes

The authentication and ordering flows are local demo implementations intended for the assignment. Cart, user, and recent order data are stored in the browser localStorage.
