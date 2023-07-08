import { Grid, Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { damp3 } from 'maath/easing'
import { useRef } from 'react'
import { Color, Group } from 'three'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

const planeSize = 1000
const cellSize = 40

const luminanceOffset = -0.2

export function Floor() {
  const ref = useRef<THREE.Mesh>(null!)

  const config = useControls('main', {
    floor: true,
  })

  const color1 = new THREE.Color('orange')
  const color2 = new THREE.Color('violet')

  useFrame(state => {
    if (!ref.current) return
    // this is probably bad?
    const mat = ref.current.material as THREE.ShaderMaterial
    const cellColor = mat.uniforms.sectionColor.value as THREE.Color

    cellColor.lerpColors(
      color1,
      color2,
      Math.abs(Math.sin(state.clock.elapsedTime / 2))
    )
  })

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
