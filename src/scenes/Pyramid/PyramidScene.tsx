/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei'

import { Starfield } from '../../components'
import { Floor } from './Floor'
import { Lights } from './Lights'
import { Pyramid } from './Pyramid'

export function PyramidScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 8, 40]} />
      <OrbitControls target={[0, 4, 0]} autoRotate={true} />

      <Lights />
      <Starfield rotate={false} />

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
