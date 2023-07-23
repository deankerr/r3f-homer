import { useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef, useEffect } from 'react'
import { DoubleSide, Group, LatheGeometry, Vector2 } from 'three'

import { hex3ToPosition } from '../lib'
import { useHexxDispatch, useHexxSelector } from '../shared'
import { HexxData, selectHex } from '../slice'

type Props = JSX.IntrinsicElements['group']

export const Hexes = forwardRef<Group, Props>((props, ref) => {
  const config = useControls(
    'visual',
    {
      board: folder({
        visible: true,
        matcap: { value: 0, min: 0, max: matcapPaths.length - 1, step: 1 },
        normal: { value: 0, min: 0, max: normalPaths.length - 1, step: 1 },
      }),
    },
    { collapsed: true }
  )

  useEffect(() => {
    console.log(config.matcap, ':', matcapPaths[config.matcap])
  }, [config.matcap])

  // * hex shared material
  const matcap = useTexture(matcapPaths[config.matcap])
  const normalMap = useTexture(normalPaths[0])

  // * game state
  const gameState = useHexxSelector(state => state.gameState)
  const dispatch = useHexxDispatch()

  // const { list, selected } = gameState
  // const selectionData = getSelectedNeighbours(selected ? list[selected] : null)
  // console.log('selneighbours', selectionData)
  // const selected = gameState.selected ? gameState.list[]
  // const selectedNear = selected ?

  function handleHexClick(hex: HexxData) {
    console.log('clicked', hex.vector)
    dispatch(selectHex(hex.index))
  }

  return (
    <group ref={ref} visible={config.visible} {...props}>
      {gameState.list.map((hex, i) => (
        <group key={i} position={hex3ToPosition(hex.vector)}>
          <mesh name="hex" geometry={geometry.main} onClick={() => handleHexClick(hex)}>
            <meshMatcapMaterial matcap={matcap} side={DoubleSide} flatShading={true} normalMap={normalMap} />
          </mesh>

          <mesh
            name="hex selected"
            material-color="lime"
            geometry={geometry.selected}
            visible={false} //!
            material-side={DoubleSide}
          />
        </group>
      ))}
    </group>
  )
})
Hexes.displayName = 'Hexes'

//* geometry
const lathePoints = [
  [8, 0], // outer
  [7, 0], // border
  [5, 5], // slope
  [0, 5], // pit
] as const

// scale greatest magnitude to 1
const latheVectors = lathePoints.map(points => new Vector2(...points).divideScalar(8))

// create and rotate geometry
const geometry = {
  main: new LatheGeometry(latheVectors, 6, -Math.PI / 2).rotateX(-Math.PI / 2).center(),
  selected: new LatheGeometry(latheVectors.slice(0, 2), 6, -Math.PI / 2).rotateX(-Math.PI / 2).translate(0, 0, 0.4),
}

const normalPaths = ['normals/4918-normal.jpg']

const matcapPaths = [
  'public/matcaps/board/4F439F_A28BE5_8570D6_7765C9-512px.png',
  'public/matcaps/board/8C5945_D4C0B6_C3A49C_430504-64px.png',
  'public/matcaps/board/593E2C_E5D8A9_BC9F79_9F8A68-64px.png',
  'public/matcaps/board/9650CA_46236A_7239A6_633492-512px.png',
  'public/matcaps/board/935555_F6DAD9_D39393_593333-512px.png',
]

// // * board rotation
// function rotateBoard(to: Vector3Tuple) {
//   boardRef.current.rotation.set(...to)
//   void controlsRef.current.fitToBox(boardRef.current, true)
// }
// useControls({
//   'board rotation': buttonGroup({ zero: () => rotateBoard([0, 0, 0]), one: () => rotateBoard([0, 0, Math.PI / 6]) }),
// })
