import { Edges, Icosahedron } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group']

export function Orb({ ...group }: Props) {
  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y += delta
  })

  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'main')

  return (
    <group {...group} ref={ref}>
      <Icosahedron args={[2.7]}>
        <meshStandardMaterial color="black" />
        <Edges>
          <lineBasicMaterial ref={lineRef} color={'white'} />
        </Edges>
      </Icosahedron>
    </group>
  )
}
