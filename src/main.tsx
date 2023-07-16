import { inject } from '@vercel/analytics'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import ErrorPage from './ErrorPage'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (process.env.NODE_ENV !== 'development') {
  inject()
}
