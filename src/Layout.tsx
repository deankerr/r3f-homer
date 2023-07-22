import { Analytics } from '@vercel/analytics/react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { useTaxiStore } from './store'

export const Layout = () => {
  const [canStartAudio, setCanStartAudio] = useTaxiStore(state => [state.canStartAudio, state.setCanStartAudio])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  // const location = useLocation()

  // function hash(value: string) {
  //   return location.hash.includes(value)
  // }

  return (
    <div className="fixed h-screen w-screen" onClick={handleInteraction}>
      <SceneNavigation />

      <Outlet />

      {__PROD__ && <Analytics />}
    </div>
  )
}

const SceneNavigation = () => {
  return (
    <div className="fixed bottom-0 z-10 flex w-screen justify-center gap-2 sm:bottom-auto sm:top-0">
      <SceneLink to="Rehetep" />
      <SceneLink to="Homer" />
      <SceneLink to="Believe" devOnly />
      <SceneLink to="Hexxagon" devOnly />
    </div>
  )
}

const SceneLink = ({ to, devOnly = false }: { to: string; devOnly?: boolean }) => {
  const location = useLocation()

  if (devOnly && !__DEV__) return null

  const text = devOnly ? 'text-blue-400' : 'text-fuchsia-400'
  const border = devOnly ? 'border-blue-400' : 'border-fuchsia-400'

  return (
    <Link to={'/' + to.toLowerCase() + location.hash}>
      <div className={`inline rounded-full border-2 bg-black bg-opacity-40 px-2 uppercase ${text} ${border}`}>{to}</div>
    </Link>
  )
}

// const DevHud = () => {
//   const groupRef = useRef<Group>(null!)

//   const viewport = useThree(state => state.viewport)
//   useLayoutEffect(() => {
//     if (groupRef.current) {
//       groupRef.current.position.set(viewport.width, -viewport.height - 1, 1)
//     }
//   }, [viewport])

//   useFrame((_, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += delta * 1.57
//     }
//   })

//   return (
//     <Hud renderPriority={2}>
//       <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={50} />

//       <Center ref={groupRef}>
//         <Resize>
//           <Svg src="taxi-sign-3.svg" fillMaterial={{ color: 'yellow' }} />
//         </Resize>
//       </Center>
//     </Hud>
//   )
// }
