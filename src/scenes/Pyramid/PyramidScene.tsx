/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AsciiRenderer,
  Dodecahedron,
  Edges,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'

import { Effects } from './Effects'
import { Floor } from './Floor'
import { Lights } from './Lights'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'

export function PyramidScene() {
  const config = useControls('camera', {
    autoRotate: true,
    positionX: 0,
    positionY: 10,
    positionZ: 50,
    targetX: 0,
    targetY: 6,
    targetZ: 0,
  })
  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[config.positionX, config.positionY, config.positionZ]}
      />
      <OrbitControls
        target={[config.targetX, config.targetY, config.targetZ]}
        autoRotate={config.autoRotate}
      />
      {/* <Effects /> */}

      <PyrText
        text="DEAN.TAXI"
        position={[0, 40, -100]}
        rotation={[Math.PI / 8, 0, 0]}
        scale={2}
      />

      <Lights />
      {/* <Starfield rotate={false} /> */}
      <Stars radius={200} />

      <Pyramid position={[0, 0.1, 0]} />
      <Orb position={[0, 20, 0]} scale={1} />

      <Floor />
      {/* <AsciiRenderer fgColor="orange" /> */}
      {/* Utility */}
      {/* <Environment preset="night" /> */}
      {/* <axesHelper args={[10]} /> */}
      {/* <ambientLight intensity={0.5} /> */}
      <Stats />
    </>
  )
}
