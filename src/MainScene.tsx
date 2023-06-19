/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Center,
  Cloud,
  Environment,
  Float,
  OrbitControls,
  Sky,
  Sparkles,
  Stage,
  Stars,
  Stats,
  Text3D,
  TorusKnot,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { Homer } from './Homer/Homer'
import { Bust, Chair, Gnome, Lime, Skull, Taxi } from './Model'
import { Box, Cylinder, Flower, Sphere } from './Shape'

export function MainScene() {
  return (
    <Canvas shadows>
      <Stage environment={'city'}>
        <Homer />
      </Stage>

      <OrbitControls target={[0, 0, 0]} />
      <axesHelper args={[10]} />
      {/* <gridHelper args={[100, 100]} /> */}
      <Stats />
    </Canvas>
  )
}
