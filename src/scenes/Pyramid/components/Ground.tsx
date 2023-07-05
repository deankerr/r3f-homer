import { Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { damp3 } from 'maath/easing'
import { useRef } from 'react'
import { Group } from 'three'

import { usePyramidStore } from '@/store'

const size = 1000
const step = 60

export function Ground() {
  const mainColor = usePyramidStore((state) => state.mainColor)

  const floatingState = usePyramidStore((state) => state.floatingState)
  const groupRef = useRef<Group>(null!)

  useFrame((_, delta) => {
    if (floatingState) {
      damp3(groupRef.current.position, [0, -500, 0], 60, delta)
    }
  })

  return (
    <group ref={groupRef}>
      <gridHelper
        args={[size, step, mainColor, mainColor]}
        position={[0, 0.5, 0]}
        visible={true}
      />
      <Plane
        args={[size, size]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        visible={true}
      >
        <meshStandardMaterial color="black" />
      </Plane>
    </group>
  )
}
