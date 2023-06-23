/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'

import { Starfield } from '../../components'
import { Effects } from './Effects'
import { Floor } from './Floor'
import { Lights } from './Lights'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'

export function PyramidScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 4, 40]} />
      <OrbitControls target={[0, 6, 0]} autoRotate={false} />
      {/* <Effects /> */}
      <PyrText
        text="DEAN.TAXI"
        position={[-2, 60, -100]}
        rotation={[Math.PI / 7, 0, 0]}
        scale={2}
      />

      <Lights />
      {/* <Starfield rotate={false} /> */}
      <Stars />

      <Pyramid position={[0, 0.1, 0]} />
      <Floor />

      {/* Utility */}
      {/* <Environment preset="night" /> */}
      {/* <axesHelper args={[10]} /> */}
      {/* <ambientLight intensity={0.5} /> */}
      <Stats />
    </>
  )
}
