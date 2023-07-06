import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Vector3 } from 'three'

import { Cat } from '@/components/models/Cat'
import { useBastetStore } from '@/store'

import { Orb, Pyramid } from '../components'

type Props = JSX.IntrinsicElements['group']

export function Central({ ...group }: Props) {
  const mainColor = useBastetStore(state => state.mainColor)
  const floatingState = useBastetStore(state => state.floatingState)
  const ref = useRef<Group>(null!)

  return (
    <group {...group} ref={ref}>
      <Pyramid position={[0, 0.05, 0]} />
      <Orb position={[0, 20, 0]} />

      <Cat
        position={[20, 0, 0]}
        scale={30}
        rotation={[0, -Math.PI / 2, 0]}
        color={mainColor}
      />
      <Cat
        position={[-20, 0, 0]}
        scale={30}
        rotation={[0, Math.PI / 2, 0]}
        color={mainColor}
      />
      <Cat
        position={[0, 0, 20]}
        scale={30}
        rotation={[0, Math.PI, 0]}
        color={mainColor}
      />
      <Cat
        position={[0, 0, -20]}
        scale={30}
        rotation={[0, 0, 0]}
        color={mainColor}
      />
    </group>
  )
}
