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

import { Floor } from './Floor'
import { Lights } from './Lights'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'
import { ShaderFX } from './ShaderFX'

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

  const configEffects = useControls('Wow!Effects', { enable: true })

  const cams = [
    [config.positionX, config.positionY, config.positionZ],
    [0, 30, 60],
    [0, 60, 90],
    [0, 80, 120],
    [0, 20, 160],
  ] as [number, number, number][]

  const cinema = useControls('cinema', {
    pos: { value: 0, min: 0, max: cams.length - 1, step: 1 },
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={cams[cinema.pos]} />

      <PyrText
        text="DEAN.TAXI"
        position={[0, 40, -100]}
        rotation={[Math.PI / 8, 0, 0]}
        scale={2}
      />

      <Pyramid position={[0, 0.1, 0]} />
      <Orb position={[0, 20, 0]} scale={1} />

      {/* stage */}
      <Stars radius={100} />

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
      {configEffects.enable && <ShaderFX />}
      <Stats />

      <OrbitControls
        target={[config.targetX, config.targetY, config.targetZ]}
        autoRotate={config.autoRotate}
        autoRotateSpeed={8}
      />
    </>
  )
}
