import { inject } from '@vercel/analytics'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import App from './App'
import ErrorPage from './ErrorPage'
import './index.css'

const Homer3D = React.lazy(() => import('./scenes/Homer3D/Homer3D'))
const Believe = React.lazy(() => import('./scenes/Believe/Believe'))
const Rehetep = React.lazy(() => import('./scenes/Rehetep/Rehetep'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <React.Suspense>
            <Rehetep />
          </React.Suspense>
        ),
      },
      {
        path: 'homer',
        element: (
          <React.Suspense>
            <Homer3D />
          </React.Suspense>
        ),
      },
      {
        path: 'rehetep',
        element: (
          <React.Suspense>
            <Rehetep />
          </React.Suspense>
        ),
      },
      {
        path: 'believe',
        element: (
          <React.Suspense>
            <Believe />
          </React.Suspense>
        ),
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
