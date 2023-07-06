import { ThreeElements, useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { MutableRefObject, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

export function useOrbitSwarm(
  groupRef: MutableRefObject<THREE.Group>,
  maxSpeed: number,
  direction: number
) {
  const floatingState = useBastetStore(state => state.floatingState)

  const speed = useRef<number>(0.01)

  useFrame((_, delta) => {
    if (floatingState && groupRef.current) {
      groupRef.current.rotation.y += speed.current * direction * delta
      damp(speed, 'current', maxSpeed, 60)
    }
  })
}
