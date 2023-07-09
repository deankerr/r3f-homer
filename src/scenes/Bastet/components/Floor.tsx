import { Grid, Plane } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { useGridColorLerpAnimation } from '..'

const planeSize = 2000
const cellSize = 40

export function Floor() {
  const ref = useRef<THREE.Mesh>(null!)

  const config = useControls('main', {
    floor: true,
  })

  useGridColorLerpAnimation(ref)

  return (
    <group visible={config.floor}>
      {/* <Plane
        args={[planeSize, planeSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.15, 0]}
      >
        <meshStandardMaterial color="black" />
      </Plane> */}

      <Grid
        ref={ref}
        args={[planeSize, planeSize]}
        position={[0, 0, 0]}
        cellSize={60}
        // cellColor={'red'}
        cellThickness={0.5}
        sectionSize={180}
        sectionColor={'blue'}
        sectionThickness={0.6}
        fadeDistance={1000}
      />
    </group>
  )
}
