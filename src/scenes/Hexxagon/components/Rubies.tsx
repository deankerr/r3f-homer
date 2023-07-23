import { useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef } from 'react'
import { DoubleSide, Group, LatheGeometry, Vector2 } from 'three'

import { hex3ToPosition } from '../lib'
import { useHexxSelector } from '../shared'

type Props = JSX.IntrinsicElements['group']

export const Rubies = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  const config = useControls(
    'visual',
    {
      rubies: folder({
        visible: true,
        matcap: { value: 0, min: 0, max: matcapPaths.length - 1, step: 1 },
      }),
    },
    { collapsed: true }
  )

  const matcap = useTexture('matcaps/ruby/' + matcapPaths[config.matcap])

  const gameState = useHexxSelector(state => state.gameState)

  return (
    <group ref={ref} {...groupProps} visible={config.visible}>
      {gameState.list
        .filter(hex => hex.contents === 'ruby')
        .map((hex, i) => (
          <group key={i} position={hex3ToPosition(hex.vector)} scale={0.65}>
            <mesh geometry={geometry}>
              <meshMatcapMaterial matcap={matcap} side={DoubleSide} flatShading={true} />
            </mesh>
          </group>
        ))}
    </group>
  )
})
Rubies.displayName = 'Rubies'

//* geometry
const geometry = (() => {
  const segments = 10

  const points = [
    [0, 0],
    [3.8, 0], // face side 1
    [6, 2],
    [6, 3], // middle
    [6, 4],
    [3.8, 6], // face side 2
    [0, 6],
  ]

  // scale greatest magnitude to 1
  const vectors = points.map(points => new Vector2(...points).divideScalar(6))

  // create / rotate / center
  return new LatheGeometry(vectors, segments, -Math.PI / 2).rotateX(-Math.PI / 2).center()
})()

const matcapPaths = [
  'AB2C2C_EBB4B3_561212_DE8484-512px.png', // r b tl
  '9D282A_38191D_DFC6CD_D6495A-512px.png', // r l tl
  'D54C2B_5F1105_F39382_F08375-512px.png', // r b u
  'BD5345_460F11_732622_EDB7B1-512px.png', // r b u
  '803537_310F10_C35A5D_D89093-512px.png', // r l l textured
  '9F1A27_F1AF7F_CD5845_D08441-512px.png', // r goldish b tr
  '965146_2B191D_DF7A5C_BFD6E1-512px.png', // r goldish l tr
]