import { Text } from '@react-three/drei'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'

import ErrorPage from './ErrorPage'
import { Layout } from './Layout'

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />
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
    ],
  },
])

function Home() {
  return <Text>Welcome Home</Text>
}

function Fallback() {
  console.log('init')
  return <div>NOW LOADING</div>
}
