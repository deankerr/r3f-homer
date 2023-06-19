import { Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

export function OuterSpace() {
  const starsRef = useRef<Group>(null!)

  useFrame(() => {
    starsRef.current.rotation.x += 0.0005
    starsRef.current.rotation.y += 0.0005
  })

  return (
    <group ref={starsRef}>
      <Stars radius={100} factor={4} saturation={2} speed={1} fade />
    </group>
  )
}
