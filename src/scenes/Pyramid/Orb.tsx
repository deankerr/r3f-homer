import {
  Dodecahedron,
  Edges,
  Icosahedron,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

type Props = JSX.IntrinsicElements['group']

export function Orb(props: Props) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.rotation.y += 0.01
  })

  return (
    <group {...props} ref={ref}>
      <Icosahedron args={[2]}>
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Icosahedron>

      <Icosahedron args={[4]}>
        <MeshTransmissionMaterial
          distortionScale={0.5}
          temporalDistortion={0}
          // roughness={0.05}
          thickness={1.5}
        />
        {/* <Edges scale={1.0} threshold={15} color="orange" /> */}
      </Icosahedron>
    </group>
  )
}
