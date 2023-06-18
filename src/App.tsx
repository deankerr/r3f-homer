import { OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import Box from './Box'
import Floor from './Floor'
import Lights from './Lights'
import Skull from './Skull'

function App() {
  return (
    <Canvas shadows camera={{ position: [4, 4, 1.5] }}>
      <Lights />
      <Box position={[-1.2, 1, 0]} />
      <Box position={[1.2, 1, 0]} />
      <Skull />
      <Floor />
      <OrbitControls target={[0, 1, 0]} />
      <Stats />
    </Canvas>
  )
}

export default App
