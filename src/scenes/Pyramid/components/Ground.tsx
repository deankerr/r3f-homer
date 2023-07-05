import { Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { Group } from 'three'

import { usePyramidStore } from '@/store'

const size = 1000
const step = 60

const ypos = new THREE.Vector3(0, -100, 0)

export function Ground() {
  const mainColor = usePyramidStore((state) => state.mainColor)

  const floatingState = usePyramidStore((state) => state.floatingState)
  const ref = useRef<Group>(null!)

  useFrame(() => {
    if (floatingState) {
      // ref.current.position.lerp(ypos, 0.001)
      ref.current.position.y -= 0.25
    }
  })

  return (
    <group ref={ref}>
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
