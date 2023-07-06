import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { useEffect, useState } from 'react'

import { MainScene } from './MainScene'
import { MaterialTestScene } from './scenes/MaterialTestScene'
import { TestScene } from './scenes/ModelTestScene'
import { PyramidScene } from './scenes/Pyramid/PyramidScene'
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
      <Canvas camera={{ position: [0, 10, 12] }}>
        {<PyramidScene key={resetKey} />}
        {/* {scene === 'Homer' && <MainScene />} */}
        {/* <TestScene /> */}
        {/* <MaterialTestScene /> */}
      </Canvas>
      <Loader />
      <Leva collapsed={true} />
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
