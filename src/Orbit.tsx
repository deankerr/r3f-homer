import { GroupProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

type OrbitSpeed = {
  x?: number
  y?: number
  z?: number
}

export function Orbit(props: OrbitSpeed & GroupProps) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.rotation.x += props.x ?? 0
    ref.current.rotation.y += props.y ?? 0
    ref.current.rotation.z += props.z ?? 0
  })

  return <group ref={ref}>{props.children}</group>
}
