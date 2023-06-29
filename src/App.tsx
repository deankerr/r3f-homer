 
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { MainScene } from './MainScene'
import { MaterialTestScene } from './scenes/MaterialTestScene'
import { TestScene } from './scenes/ModelTestScene'
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
      <Canvas camera={{ position: [0, 10, 12] }} color="cyan">
        {/* <MainScene /> */}
        {/* <TestScene /> */}
        <PyramidScene />
        {/* <MaterialTestScene /> */}
      </Canvas>
      <Loader />
    </div>
  )
}
