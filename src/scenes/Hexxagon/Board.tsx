import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { forwardRef, useMemo, useState } from 'react'
import { DoubleSide, Group, MeshMatcapMaterial, Vector3 } from 'three'

import { Hex } from './Hex'

const size = 4

type Props = JSX.IntrinsicElements['group']

const all = Array(61)
  .fill(0)
  .map((_, i) => i)

const evens = all.filter(n => n % 2 === 0)
const odds = all.filter(n => n % 2 === 1)

export const Board = forwardRef<Group, Props>((props, ref) => {
  const vectors = useMemo(() => createHexes(size), [])
  const [selected, setSelected] = useState<number[]>([])
  const [hasRuby, setHasRuby] = useState<number[]>([])
  const [hasPearl, setHasPearl] = useState<number[]>([])

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

  const material = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap: boardMatcap,
        normalMap: boardNormal,
        flatShading: true,
        side: DoubleSide,
      }),
    [boardMatcap, boardNormal]
  )

  function handleClick(id: number) {
    console.log('clicked', id)
    if (selected.includes(id)) setSelected([])
    else setSelected([id])
  }

  return (
    <group ref={ref} visible={config.visible} {...props}>
      {vectors.map((vector, i) => (
        <Hex
          vector={vector}
          key={i}
          id={i}
          selected={selected.includes(i)}
          material={material}
          onClick={() => handleClick(i)}
          hasRuby={hasRuby.includes(i)}
          hasPearl={hasPearl.includes(i)}
        />
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
