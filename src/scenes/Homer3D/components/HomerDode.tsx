import { Dodecahedron as DreiDodecahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

export function HomerDode(props: JSX.IntrinsicElements['group']) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.rotation.z += 0.01
  })

  return (
    <group {...props} ref={ref}>
      <DreiDodecahedron>
        <meshNormalMaterial wireframe />
      </DreiDodecahedron>
    </group>
  )
}
