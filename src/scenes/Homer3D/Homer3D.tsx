import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useState } from 'react'

import { Orbit } from '.'
import { Homer } from './Homer'
import { BigText, HomerCone, HomerDode, Starfield } from './components'
import { Bust, Dolphin, Eye, Gnome, LightBlueSky, Lime, PlasticChair, Skull, Sun, Taxi, Toilet } from './models'

export function Component() {
  const [showSky, setShowSky] = useState(false)
  return (
    <Canvas>
      <PerspectiveCamera position={[0, 10, 12]} makeDefault />
      <Starfield rotate={true} />
      <BigText text="DEAN.TAXI" position={[-2, 10, -50]} />

      <LightBlueSky visible={showSky} />

      <Orbit y={0.01}>
        <Sun scale={10} position={[0, 50, -60]} />
        <directionalLight position={[0, 50, -60]} />
      </Orbit>

      <Orbit x={0.005} y={0.005}>
        <Taxi scale={6} position={[0, 50, 60]} />
        <Dolphin scale={20} position={[0, -50, -60]} />
      </Orbit>

      <Orbit y={0.01} z={0.001}>
        <Bust scale={20} position={[-20, 5, 0]} rotation={[0, Math.PI, 0]} />
        <Lime scale={80} position={[20, 5, 0]} />
        <Gnome scale={20} position={[0, 5, 20]} rotation={[0, Math.PI, 0]} />
        <HomerDode scale={5} position={[0, 5, -20]} />
      </Orbit>

      <Orbit x={0.001} z={0.001}>
        <PlasticChair scale={16} position={[-40, 5, 0]} />
        <Skull scale={5} position={[40, 5, 0]} />
        <Toilet scale={16} position={[0, 5, 40]} />
        <HomerCone scale={8} position={[0, 5, -40]} />
      </Orbit>

      <Homer position={[0, 6, -100]} />

      <Eye scale={200} position={[0, 200, 0]} rotation={[Math.PI / 2, 0, 0]} onClick={() => setShowSky(!showSky)} />

      <ambientLight intensity={0.1} />
      <OrbitControls target={[0, 8, 0]} enablePan={false} />
    </Canvas>
  )
}
Component.displayName = 'Homer3D'
