import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { MutableRefObject, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

type OrbitStyle = [number, number, number]

export function useOrbitSwarm(
  groupRef: MutableRefObject<THREE.Group>,
  orbitStyle: OrbitStyle
) {
  const [orbitX, orbitY, orbitZ] = orbitStyle
  const floatingState = useBastetStore(state => state.floatingState)

  const speed = useRef<OrbitStyle>([0.01, 0.01, 0.01])

  useFrame((_, delta) => {
    if (floatingState && groupRef.current) {
      const [x, y, z] = speed.current

      if (x) {
        groupRef.current.rotation.x += orbitX * x * delta
        damp(speed.current, '0', 1.5, 1, delta)
      }
      if (y) {
        groupRef.current.rotation.y += orbitY * y * delta
        damp(speed.current, '1', 1.5, 1, delta)
      }
      if (z) {
        groupRef.current.rotation.z += orbitZ * z * delta
        damp(speed.current, '2', 1.5, 1, delta)
      }
    }
  })
}
