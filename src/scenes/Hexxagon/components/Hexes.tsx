import { useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef } from 'react'
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

  // * hex shared material
  const boardMatcap = useTexture(matcapPaths[config.matcap])
  const boardNormal = useTexture(normalPaths[0])

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
            <meshMatcapMaterial matcap={boardMatcap} side={DoubleSide} flatShading={true} normalMap={boardNormal} />
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

const matcapPaths = [
  'matcaps/board/3E2335_D36A1B_8E4A2E_2842A5-64px.png', // pink metalic classic
  'matcaps/board/9D282A_38191D_DFC6CD_D6495A-64px.png', // salmon mtal
  'matcaps/board/C21338_920C24_E71C54_F34A7D-64px.png', // gum
  'matcaps/board/320455_720DBE_560496_47047B-512px.png', // purple
  'matcaps/board/D04444_AF2F2F_8B2424_9B2C2C-64px.png', // salmon
  'matcaps/board/BD5345_460F11_732622_EDB7B1-64px.png', // rose gold
]

const normalPaths = ['normals/4918-normal.jpg']

// // * board rotation
// function rotateBoard(to: Vector3Tuple) {
//   boardRef.current.rotation.set(...to)
//   void controlsRef.current.fitToBox(boardRef.current, true)
// }
// useControls({
//   'board rotation': buttonGroup({ zero: () => rotateBoard([0, 0, 0]), one: () => rotateBoard([0, 0, Math.PI / 6]) }),
// })
