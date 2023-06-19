/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { MainScene } from './MainScene'
import { TestScene } from './TestScene'
import { useTaxiStore } from './store'

const test = false

export default function App() {
  const [canStartAudio, setCanStartAudio] = useTaxiStore((state) => [
    state.canStartAudio,
    state.setCanStartAudio,
  ])

  function handleInteraction() {
    if (!canStartAudio) setCanStartAudio()
  }

  return (
    <div className="h-screen bg-black" onClick={handleInteraction}>
      <Canvas camera={{ position: [0, 10, 10] }}>
        {test ? <TestScene /> : <MainScene />}
      </Canvas>
      <Loader />
    </div>
  )
}
