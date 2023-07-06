import { Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { damp3 } from 'maath/easing'
import { useRef } from 'react'
import { Group } from 'three'

import { useBastetStore } from '@/store'

const planeSize = 1000
const gridsquareSize = 30
const descendY = -500
const disappearAtY = -450

export function Ground() {
  const mainColor = useBastetStore(state => state.mainColor)

  const floatingState = useBastetStore(state => state.floatingState)
  const groupRef = useRef<Group>(null!)

  useFrame((_, delta) => {
    if (floatingState) {
      const group = groupRef.current
      damp3(group.position, [0, descendY, 0], 60, delta)

      if (group.position.y <= disappearAtY) {
        group.position.setY(descendY)
        group.visible = false
      }
    }
  })

  return (
    <group ref={groupRef}>
      <gridHelper
        args={[planeSize, gridsquareSize, mainColor, mainColor]}
        position={[0, 0.5, 0]}
      />
      <Plane
        args={[planeSize, planeSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="black" />
      </Plane>
    </group>
  )
}
