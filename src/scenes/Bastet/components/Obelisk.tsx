import { Capsule, Edges } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  return (
    <group {...group}>
      <Capsule args={[1.5, 16, 1, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
        <Edges>
          <lineBasicMaterial ref={lineRef} color={'white'} />
        </Edges>
      </Capsule>
    </group>
  )
}
