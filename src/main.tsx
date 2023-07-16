import { inject } from '@vercel/analytics'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import ErrorPage from './ErrorPage'
import './index.css'
import { Believe } from './scenes/Believe'
import { Homer3D } from './scenes/Homer3D'
import { Rehetep } from './scenes/Rehetep'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Rehetep /> },
      {
        path: 'homer',
        element: <Homer3D />,
      },
      {
        path: 'rehetep',
        element: <Rehetep />,
      },
      {
        path: 'believe',
        element: <Believe />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

if (process.env.NODE_ENV !== 'development') {
  inject()
}
