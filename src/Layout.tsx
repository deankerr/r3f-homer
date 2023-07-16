import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Link, Outlet } from 'react-router-dom'

import { LoadingScene } from './scenes/LoadingScene'
import { useTaxiStore } from './store'

const showControls = process.env.NODE_ENV !== 'development'
export const Layout = () => {
  const [canStartAudio, setCanStartAudio] = useTaxiStore(state => [
    state.canStartAudio,
    state.setCanStartAudio,
  ])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  return (
    <div className="h-screen" onClick={handleInteraction}>
      <SceneNavigation />
      <Leva collapsed={true} hidden={showControls} />
      <Canvas>
        <color attach="background" args={['#000']} />
        <LoadingScene />
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
      <div className="mx-1 inline-block rounded-full border-2 border-fuchsia-400 bg-black bg-opacity-40 px-2 uppercase text-fuchsia-400">
        {to}
      </div>
    </Link>
  )
}

// const useResetKey = () => {
//   const [resetKey, setResetKey] = useState(Date.now())

//   const handler = (event: KeyboardEvent) => {
//     if (event.key === 'R') setResetKey(Date.now())
//   }

//   useEffect(() => {
//     document.addEventListener('keydown', handler)

//     return () => document.removeEventListener('keydown', handler)
//   }, [])

//   return resetKey
// }
