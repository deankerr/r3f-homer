/* eslint-disable @typescript-eslint/no-unused-vars */
import { Canvas } from '@react-three/fiber'

import { MainScene } from './MainScene'
import { TestScene } from './TestScene'

export default function App() {
  return (
    <div className="h-screen bg-black">
      <Canvas camera={{ position: [0, 10, 10] }} shadows>
        <MainScene />
        {/* <TestScene /> */}
      </Canvas>
    </div>
  )
}

/* 
rotation-y={Math.PI / 2}
*/
