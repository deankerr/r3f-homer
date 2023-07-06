import { Edges, Icosahedron, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

import { useBastetStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

export function Orb({ ...group }: Props) {
  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta
  })

  const [mainColor] = useBastetStore(state => [state.mainColor])

  return (
    <group {...group} ref={ref}>
      <Icosahedron args={[2.7]}>
        <meshStandardMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </Icosahedron>
    </group>
  )
}
