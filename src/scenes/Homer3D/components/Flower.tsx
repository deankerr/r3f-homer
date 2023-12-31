import { MeshProps, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

export function Flower(props: MeshProps) {
  const mesh = useRef<Mesh>(null!)
  useFrame((state, delta) => {
    mesh.current.rotation.z += delta / 2
  })
  return (
    <mesh {...props} ref={mesh} rotation-x={Math.PI / 2}>
      <torusKnotGeometry args={[0.4, 0.05, 400, 32, 3, 7]} />
      {/* <meshStandardMaterial color={'cyan'} /> */}
      <meshNormalMaterial />
    </mesh>
  )
}
