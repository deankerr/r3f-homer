import {
  Box,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'

import { WowEffects } from './Effects'
import { Floor } from './Floor'
import { Lights } from './Lights'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'

export function PyramidScene() {
  const config = useControls(
    'camera',
    {
      autoRotate: true,
      positionX: 0,
      positionY: 10,
      positionZ: 50,
      targetX: 0,
      targetY: 6,
      targetZ: 0,
    },
    { collapsed: true }
  )

  const configEffects = useControls('Wow!Effects', { enable: false })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[config.positionX, config.positionY, config.positionZ]}
      />

      <PyrText
        text="DEAN.TAXI"
        position={[0, 40, -100]}
        rotation={[Math.PI / 8, 0, 0]}
        scale={2}
      />

      <Pyramid position={[0, 0.1, 0]} />
      <Orb position={[0, 20, 0]} scale={1} />

      {/* stage */}
      <Stars radius={200} />

      <Floor />
      <Box
        args={[800, 400, 800]}
        position={[0, 190, 0]}
        material-side={THREE.BackSide}
        material-color={0x000000}
      />

      <Lights />
      <Environment preset="night" />

      {/* Utility */}
      {configEffects.enable && <WowEffects />}
      <Stats />

      <OrbitControls
        target={[config.targetX, config.targetY, config.targetZ]}
        autoRotate={config.autoRotate}
      />
    </>
  )
}
