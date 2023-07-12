import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function Starfield() {
  const ref = useRef<THREE.Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta * 0.015
  })

  return (
    <group ref={ref}>
      <Stars radius={900} factor={12} />
    </group>
  )
}
