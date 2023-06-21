import { Cone as DreiCone } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

export function Cone(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.rotation.x += 0.001
    ref.current.rotation.y += 0.01
  })

  return (
    <group {...props} ref={ref}>
      <DreiCone args={[0.5, 2]}>
        <meshNormalMaterial wireframe />
      </DreiCone>
    </group>
  )
}
