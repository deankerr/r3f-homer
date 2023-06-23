/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dodecahedron,
  Edges,
  MeshTransmissionMaterial,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'

import { Starfield } from '../../components'
import { Effects } from './Effects'
import { Floor } from './Floor'
import { Lights } from './Lights'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'

export function PyramidScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 10, 50]} />
      <OrbitControls target={[0, 6, 0]} autoRotate={false} />
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

      {/* Utility */}
      {/* <Environment preset="night" /> */}
      {/* <axesHelper args={[10]} /> */}
      {/* <ambientLight intensity={0.5} /> */}
      <Stats />
    </>
  )
}
