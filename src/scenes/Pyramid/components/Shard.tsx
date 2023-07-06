import { Cone, Edges } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Group, Mesh, Vector3 } from 'three'

import { usePyramidStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

const pos0 = new Vector3(10, 10, 10)

export function Shard({ ...group }: Props) {
  const ref = useRef<Group>(null!)

  const mainColor = usePyramidStore(state => state.mainColor)

  const floatingState = usePyramidStore(state => state.floatingState)
  // useFrame(() => {
  //   if (floatingState) {
  //     // const obj = ref.current
  //     // obj.rotation.set(0, 0, 0, 'XYZ')
  //     // const pos = obj.position
  //   }
  // })

  if (floatingState && ref.current) {
    ref.current.lookAt(0, 0, 0)
  }

  return (
    <group {...group} ref={ref}>
      <Cone
        args={[3, 10, 3, 1]}
        position={[0, 5.2, 0]}
        rotation={[floatingState ? Math.PI / 2 : 0, 0, 0]}
      >
        <meshPhongMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </Cone>
    </group>
  )
}
