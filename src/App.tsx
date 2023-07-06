import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Leva, useControls } from 'leva'

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

  const [scene, setScene] = useTaxiStore(state => [state.scene, state.setScene])
  useControls({ sceneToggle: { value: true, onChange: () => setScene() } })

  return (
    <div className="h-screen bg-black" onClick={handleInteraction}>
      <Canvas camera={{ position: [0, 10, 12] }}>
        {scene === 'Homer' && <MainScene />}
        {scene === 'Pyramid' && <PyramidScene />}
        {/* <TestScene /> */}
        {/* <MaterialTestScene /> */}
      </Canvas>
      <Loader />
      <Leva collapsed={false} />
    </div>
  )
}
