import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { forwardRef, useMemo, useState } from 'react'
import { DoubleSide, Group, MeshMatcapMaterial, Vector3 } from 'three'

import { Hex } from './Hex'

const boardSize = 4

type Props = JSX.IntrinsicElements['group']

const all = Array(61)
  .fill(0)
  .map((_, i) => i)

const evens = all.filter(n => n % 2 === 0)
const odds = all.filter(n => n % 2 === 1)

export const Board = forwardRef<Group, Props>((props, ref) => {
  //* hex shared material
  const config = useControls(
    'board',
    {
      visible: true,
      matcap: { value: 0, min: 0, max: matcapPaths.length - 1, step: 1 },
      normal: { value: 0, min: 0, max: normalPaths.length - 1, step: 1 },
    },
    { collapsed: true }
  )

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

  //* game logic
  const [state, setState] = useState(() => createBoardState())

  function handleClick(id: number) {
    console.log('clicked', id)
    const nextHex = { ...state[id] }
    nextHex.selected = !nextHex.selected

    const nextState = [...state]
    nextState[id] = nextHex

    setState(nextState)
  }

  return (
    <group ref={ref} visible={config.visible} {...props}>
      {state.map((hex, i) => (
        <Hex {...hex} index={i} material={boardMaterial} onClick={() => handleClick(i)} key={i} />
      ))}
    </group>
  )
})
Board.displayName = 'Board'

const directions = [
  new Vector3(1, -1, 0),
  new Vector3(1, 0, -1),
  new Vector3(0, 1, -1),
  new Vector3(-1, 1, 0),
  new Vector3(-1, 0, 1),
  new Vector3(0, -1, 1),
]

function createHexes(size: number) {
  const origin = new Vector3(0, 0, 0)
  return inRange(origin, size)
}

// https://www.redblobgames.com/grids/hexagons-v2/
function neighbours(from: Vector3) {
  return directions.map(d => from.add(from))
}

// https://www.redblobgames.com/grids/hexagons-v2/#range
function inRange(origin: Vector3, range: number) {
  const results: Vector3[] = []

  for (let x = -range; x <= range; x++) {
    for (let y = Math.max(-range, -x - range); y <= Math.min(range, -x + range); y++) {
      const z = -x - y
      results.push(new Vector3(x, y, z).add(origin))
    }
  }
  // console.log('Hexes in range:', results.length)
  return results
}

const matcapPaths = [
  'matcaps/board/9D282A_38191D_DFC6CD_D6495A-64px.png', // salmon mtal
  'matcaps/board/3E2335_D36A1B_8E4A2E_2842A5-64px.png', // pink metalic classic
  'matcaps/board/C21338_920C24_E71C54_F34A7D-64px.png', // gum
  'matcaps/board/320455_720DBE_560496_47047B-512px.png', // purple
  'matcaps/board/D04444_AF2F2F_8B2424_9B2C2C-64px.png', // salmon
  'matcaps/board/BD5345_460F11_732622_EDB7B1-64px.png', // rose gold
]

const normalPaths = ['normals/4918-normal.jpg']

function createBoardState() {
  const origin = new Vector3(0, 0, 0)
  const vectors = inRange(origin, boardSize)

  const state: HexData[] = vectors.map((vector, index) => {
    return { index, vector, contents: 'empty', selected: false }
  })

  // temp initial game state
  const rubies = [4, 26, 60]
  rubies.forEach(i => (state[i].contents = 'ruby'))

  const pearls = [0, 34, 56]
  pearls.forEach(i => (state[i].contents = 'pearl'))

  const holes = [21, 31, 38]
  holes.forEach(i => (state[i].contents = 'hole'))

  console.log('create:', state)
  return state
}

/* 
Static:
  Grid Vector *
  Pixel Vector in grid //drv
  is hole

Dynamic:
  Has ruby / pearl
  is selected
  is targetable //drv
  is available move //drv

*/

export type HexData = {
  vector: Vector3
  contents: 'empty' | 'pearl' | 'ruby' | 'hole'
  selected: boolean
}
