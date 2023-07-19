import { StatsGl } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva } from 'leva'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { LoadingScene } from './scenes/LoadingScene'
import { useTaxiStore } from './store'

export const Layout = () => {
  const [canStartAudio, setCanStartAudio] = useTaxiStore(state => [state.canStartAudio, state.setCanStartAudio])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  const location = useLocation()
  const hashLeva = location.hash.includes('leva')
  const hashStats = location.hash.includes('stats')

  return (
    <div className="h-screen" onClick={handleInteraction}>
      <SceneNavigation />

      <Canvas>
        <color attach="background" args={['#000']} />
        <LoadingScene />
        <Outlet />
        {(hashStats || __DEV__) && <StatsGl horizontal={false} />}
      </Canvas>

      <Leva collapsed={!hashLeva} hidden={__PROD__ && !hashLeva} />
    </div>
  )
}
//<Perf position="bottom-left" antialias={false} logsPerSecond={2} chart={{ hz: 1, length: 30 }}
const SceneNavigation = () => {
  return (
    <div className="fixed left-0 top-0 z-10">
      <SceneLink to="Rehetep" />
      <SceneLink to="Homer" />
      <SceneLink to="Believe" devOnly />
      <SceneLink to="Hexxagon" devOnly />
    </div>
  )
}

const SceneLink = ({ to, devOnly = false }: { to: string; devOnly?: boolean }) => {
  if (devOnly && !__DEV__) return null

  const text = devOnly ? 'text-blue-400' : 'text-fuchsia-400'
  const border = devOnly ? 'border-blue-400' : 'border-fuchsia-400'

  return (
    <Link to={'/' + to.toLowerCase()}>
      <div
        className={`mx-1 inline-block rounded-full border-2 bg-black bg-opacity-40 px-2 uppercase ${text} ${border}`}
      >
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
