import { forwardRef, useMemo, useState } from 'react'
import { DoubleSide, Group, MeshMatcapMaterial, Vector3 } from 'three'

import { Hex } from './Hex'
import { useMatcap } from './Textures'

const size = 4
const scale = [0.1, 0.1, 0.1] as const

type Props = JSX.IntrinsicElements['mesh']

export const Board = forwardRef<Group, Props>((props, ref) => {
  const vectors = useMemo(() => createHexes(size), [])
  const [selected, setSelected] = useState<number[]>([])

  // shared material
  const matcap = useMatcap()
  const material = useMemo(
    () =>
      new MeshMatcapMaterial({
        matcap,
        flatShading: true,
        side: DoubleSide,
      }),
    [matcap]
  )

  function handleClick(id: number) {
    console.log('clicked', id)
    if (selected.includes(id)) setSelected([])
    else setSelected([id])
  }

  return (
    <group scale={scale} ref={ref}>
      {vectors.map((vector, i) => (
        <Hex
          vector={vector}
          key={i}
          id={i}
          selected={selected.includes(i)}
          material={material}
          onClick={() => handleClick(i)}
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
  console.log('Hexes in range:', results.length)
  return results
}
