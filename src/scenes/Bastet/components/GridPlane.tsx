import { Grid } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { useGridColorLerpAnimation } from '..'

const planeSize = 500
// const cellSize = 40

export function GridPlane() {
  const ref = useRef<THREE.Mesh>(null!)

  const config = useControls('main', {
    grid: true,
  })

  useGridColorLerpAnimation(ref)

  return (
    <group visible={config.grid}>
      <Grid
        ref={ref}
        args={[planeSize, planeSize]}
        position={[0, 0, 0]}
        cellSize={60}
        // cellColor={'red'}
        cellThickness={0.5}
        sectionSize={50}
        sectionColor={'blue'}
        sectionThickness={1}
        fadeDistance={1000}
      />
    </group>
  )
}
