/* eslint-disable @typescript-eslint/no-unused-vars */
import { CameraControls, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { BigText } from './BigText'
import { Homer } from './Homer/Homer'
import { Sun } from './Model'
import { OuterSpace } from './OuterSpace'

export function MainScene() {
  return (
    <Canvas camera={{ position: [0, 10, 10] }} shadows>
      <OuterSpace />
      <BigText text="DEAN.TAXI" position={[-2, 30, -40]} />

      <Sun scale={10} position={[0, 50, -60]} />

      <Homer position={[0, 6, 0]} />

      <ambientLight />

      <axesHelper args={[10]} />
      <gridHelper args={[100, 100]} />

      <OrbitControls target={[0, 8, 0]} />
      <Stats />
    </Canvas>
  )
}

/* 
<Sun scale={10} position={[0, 50, -60]} />
target={[0, 6, 0]}
*/
