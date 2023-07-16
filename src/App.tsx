import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import ErrorPage from './ErrorPage'
import { LoadingScene } from './scenes/LoadingScene'
import { useTaxiStore } from './store'

export default function App() {
  return <RouterProvider router={router} fallbackElement={<LoadingScene />} />
}

const showControls = process.env.NODE_ENV !== 'development'
const Layout = () => {
  const [canStartAudio, setCanStartAudio] = useTaxiStore(state => [
    state.canStartAudio,
    state.setCanStartAudio,
  ])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  // const resetKey = useResetKey()

  return (
    <div className="h-screen" onClick={handleInteraction}>
      <SceneNavigation />
      <Leva collapsed={true} hidden={showControls} />
      <Canvas>
        <color attach="background" args={['#000']} />
        <Outlet />
      </Canvas>
    </div>
  )
}

const SceneNavigation = () => {
  return (
    <div className="fixed left-0 top-0 z-10">
      <SceneLink to="Rehetep" />
      <SceneLink to="Homer" />
      <SceneLink to="Believe" />
    </div>
  )
}

const SceneLink = ({ to }: { to: string }) => {
  return (
    <Link to={'/' + to.toLowerCase()}>
      <div
        onClick={() => console.log('nav', to)}
        className="mx-1 inline-block rounded-full border-2 border-fuchsia-400 bg-black bg-opacity-40 px-2 uppercase text-fuchsia-400"
      >
        {to}
      </div>
    </Link>
  )
}

const useResetKey = () => {
  const [resetKey, setResetKey] = useState(Date.now())

  const handler = (event: KeyboardEvent) => {
    if (event.key === 'R') setResetKey(Date.now())
  }

  useEffect(() => {
    document.addEventListener('keydown', handler)

    return () => document.removeEventListener('keydown', handler)
  }, [])

  return resetKey
}

const Homer3D = lazy(() => import('./scenes/Homer3D/Homer3D'))
const Believe = lazy(() => import('./scenes/Believe/Believe'))
const Rehetep = lazy(() => import('./scenes/Rehetep/Rehetep'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Rehetep />
          </Suspense>
        ),
      },
      {
        path: 'homer',
        element: (
          <Suspense>
            <Homer3D />
          </Suspense>
        ),
      },
      {
        path: 'rehetep',
        element: <Rehetep />,
      },
      {
        path: 'believe',
        element: (
          <Suspense>
            <Believe />
          </Suspense>
        ),
      },
    ],
  },
])
