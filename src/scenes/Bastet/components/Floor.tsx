import { Plane } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { damp3 } from 'maath/easing'
import { useRef } from 'react'
import { Color, Group } from 'three'

import { useBastetStore } from '@/store'

const planeSize = 1000
const gridsquareSize = 30
// const descendY = -500
// const disappearAtY = -450

const luminanceOffset = -0.2

export function Floor() {
  const ref = useRef<Group>(null!)

  const config = useControls('main', {
    floor: true,
  })

  const mainColor = useBastetStore(state => state.mainColor)
  const color = new Color(mainColor).offsetHSL(0, 0, luminanceOffset)

  // useFrame((_, delta) => {
  //   if (floatingState) {
  //     const group = ref.current
  //     damp3(group.position, [0, descendY, 0], 60, delta)

  //     if (group.position.y <= disappearAtY) {
  //       group.position.setY(descendY)
  //       group.visible = false
  //     }
  //   }
  // })

  return (
    <group ref={ref} visible={config.floor}>
      <gridHelper
        args={[planeSize, gridsquareSize, color, color]}
        position={[0, 0.5, 0]}
      />
      <Plane
        args={[planeSize, planeSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        // visible={false}
      >
        <meshStandardMaterial color="black" />
      </Plane>
    </group>
  )
}
