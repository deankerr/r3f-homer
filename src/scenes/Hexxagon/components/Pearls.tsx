import { GradientTexture, GradientType } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef } from 'react'
import { Group, RingGeometry, SphereGeometry } from 'three'

import { hex3ToPosition } from '../lib'
import { useHexxSelector } from '../shared'

type Props = JSX.IntrinsicElements['group']

export const Pearls = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  const config = useControls(
    'visual',
    {
      pearls: folder({
        visible: true,
      }),
    },
    { collapsed: true }
  )

  const gameState = useHexxSelector(state => state.gameState)

  return (
    <group ref={ref} {...groupProps} visible={config.visible}>
      {gameState.list
        .filter(hex => hex.contents === 'pearl')
        .map((hex, i) => (
          <group key={i} position={hex3ToPosition(hex.vector)} scale={0.65}>
            <mesh geometry={geometry.outer} material-color="#d7d7d7" />

            <mesh geometry={geometry.main} scale={0.82}>
              <meshPhongMaterial>
                <GradientTexture
                  stops={[0.2, 0.5, 0.8]}
                  colors={['blue', 'thistle', 'magenta']}
                  //@ts-expect-error incorrectly typed as undefined?
                  type={GradientType.Linear}
                />
              </meshPhongMaterial>
            </mesh>
          </group>
        ))}
    </group>
  )
})
Pearls.displayName = 'Pearls'

//* geometry
const geometry = (() => {
  return {
    main: new SphereGeometry(),
    outer: new RingGeometry(),
  }
})()
