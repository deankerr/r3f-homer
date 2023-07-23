import { useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef, useMemo } from 'react'
import { DoubleSide, Group, MeshMatcapMaterial } from 'three'

import { getSelectedNeighbours } from '../lib'
import { useHexxDispatch, useHexxSelector } from '../shared'
import { HexxData, selectHex } from '../slice'
import { Hex } from './Hex'

type Props = JSX.IntrinsicElements['group']

export const Board = forwardRef<Group, Props>((props, ref) => {
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

  const boardMaterial = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap: boardMatcap,
        normalMap: boardNormal,
        flatShading: true,
        side: DoubleSide,
      }),
    [boardMatcap, boardNormal]
  )

  // * game state
  const gameState = useHexxSelector(state => state.gameState)
  const dispatch = useHexxDispatch()

  const { list, selected } = gameState
  const selectionData = getSelectedNeighbours(selected ? list[selected] : null)
  console.log('selneighbours', selectionData)
  // const selected = gameState.selected ? gameState.list[]
  // const selectedNear = selected ?

  function handleHexClick(hex: HexxData) {
    console.log('clicked', hex.vector)
    dispatch(selectHex(hex.index))
  }

  return (
    <group ref={ref} visible={config.visible} {...props}>
      {gameState.list.map(hex => (
        <Hex
          {...hex}
          selected={gameState.selected === hex.index}
          material={boardMaterial}
          onClick={() => handleHexClick(hex)}
          key={hex.index}
        />
      ))}
    </group>
  )
})
Board.displayName = 'Board'

const matcapPaths = [
  'matcaps/board/9D282A_38191D_DFC6CD_D6495A-64px.png', // salmon mtal
  'matcaps/board/3E2335_D36A1B_8E4A2E_2842A5-64px.png', // pink metalic classic
  'matcaps/board/C21338_920C24_E71C54_F34A7D-64px.png', // gum
  'matcaps/board/320455_720DBE_560496_47047B-512px.png', // purple
  'matcaps/board/D04444_AF2F2F_8B2424_9B2C2C-64px.png', // salmon
  'matcaps/board/BD5345_460F11_732622_EDB7B1-64px.png', // rose gold
]

const normalPaths = ['normals/4918-normal.jpg']
