import { MeshProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

type Props = MeshProps

export function Cylinder(props: Props) {
  const ref = useRef<Mesh>(null!)

  // useFrame(() => {
  // ref.current.rotation.x += 0.005
  //   ref.current.rotation.y += 0.01
  // })
  return (
    <mesh {...props} ref={ref}>
      <cylinderGeometry args={[1, 1, 5]} />
      <meshStandardMaterial color={'blue'} wireframe />
    </mesh>
  )
}
