/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { MainScene } from './MainScene'
import { TestScene } from './TestScene'
import { PyramidScene } from './scenes/Pyramid/PyramidScene'
import { useTaxiStore } from './store'

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
      <Canvas camera={{ position: [0, 10, 12] }}>
        {/* <MainScene /> */}
        {/* <TestScene /> */}
        <PyramidScene />
      </Canvas>
      <Loader />
    </div>
  )
}
