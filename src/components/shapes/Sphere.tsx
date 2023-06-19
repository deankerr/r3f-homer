import { MeshProps } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

type Props = MeshProps

export function Sphere(props: Props) {
  const ref = useRef<Mesh>(null!)

  // useFrame(() => {
  //   ref.current.rotation.x += 0.005
  //   ref.current.rotation.y += 0.01
  //   ref.current.position.x += 0.005
  //   ref.current.position.z += 0.005
  // })

  return (
    <mesh {...props} ref={ref}>
      <sphereGeometry args={[2, 32, 16]} />
      <meshStandardMaterial color={'orange'} wireframe />
    </mesh>
  )
}
