import { Text } from '@react-three/drei'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import { Layout } from './Layout'

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Preload />} />
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => redirect('/rehetep'),
      },
      {
        path: 'homer',
        lazy: () => import('./scenes/Homer3D/Homer3D'),
      },
      {
        path: 'rehetep',
        lazy: () => import('./scenes/Rehetep/Rehetep'),
      },
      {
        path: 'believe',
        lazy: () => import('./scenes/Believe/Believe'),
      },
      {
        path: 'hexxagon',
        lazy: () => import('./scenes/Hexxagon/Hexxagon'),
      },
    ],
  },
])

function Home() {
  return <Text>Welcome Home</Text>
}

export function Preload() {
  return (
    <div className="flex h-full items-center justify-center">
      <img src="taxi-icon.svg" alt="Taxi Loading" className="max-h-screen animate-pulse" />
    </div>
  )
}
