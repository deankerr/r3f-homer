import { Grid, Plane } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { useGridColorLerpAnimation } from '..'

const planeSize = 1000
const cellSize = 40

const luminanceOffset = -0.2

export function Floor() {
  const ref = useRef<THREE.Mesh>(null!)

  const config = useControls('main', {
    floor: true,
  })

  useGridColorLerpAnimation(ref, 'orange', 'violet')

  return (
    <group visible={config.floor}>
      <Plane
        args={[planeSize, planeSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial color="black" />
      </Plane>

      <Grid
        ref={ref}
        args={[planeSize, planeSize]}
        position={[0, 0, 0]}
        cellThickness={0}
        sectionSize={cellSize}
        sectionThickness={1}
        fadeDistance={1000}
      />
    </group>
  )
}
