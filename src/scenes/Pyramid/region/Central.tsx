import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Vector3 } from 'three'

import { useBastetStore } from '@/store'

import { Orb, Pyramid } from '../components'

type Props = JSX.IntrinsicElements['group']

const floatingPosition = new Vector3(0, 26, 0)

export function Central({ ...group }: Props) {
  const floatingState = useBastetStore(state => state.floatingState)
  const ref = useRef<Group>(null!)

  // useFrame(() => {
  //   if (floatingState) {
  //     ref.current.position.lerp(floatingPosition, 0.25)
  //     console.log(ref.current.position.y)
  //   }
  // })

  return (
    <group {...group} ref={ref}>
      <Pyramid position={[0, 0.05, 0]} />
      <Orb position={[0, 20, 0]} />
    </group>
  )
}
