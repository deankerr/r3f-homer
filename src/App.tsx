import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Homer3D } from './scenes/Homer3D'
import { Rehetep } from './scenes/Rehetep'
import { useTaxiStore } from './store'

export default function App() {
  const [canStartAudio, setCanStartAudio] = useTaxiStore(state => [
    state.canStartAudio,
    state.setCanStartAudio,
  ])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  const resetKey = useResetKey()

  return (
    <div className="h-screen bg-black" onClick={handleInteraction}>
      <Canvas>
        <color attach="background" args={['#000']} />
        {/* {<Rehetep key={resetKey} />} */}
        {/* <Homer3D /> */}
        {/* <TestScene /> */}
        {/* <MaterialTestScene /> */}
        <Outlet />
      </Canvas>
      <Loader />
      <Leva collapsed={true} hidden={true} />
    </div>
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
