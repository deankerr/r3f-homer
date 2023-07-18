import { useMemo } from 'react'
import { DoubleSide, MeshMatcapMaterial, Vector3 } from 'three'

import { Hex2 } from './Hex2'
import { useMatcap } from './Textures'

const size = 4

const scale = [0.1, 0.1, 0.1] as const

export function Board2() {
  const hexMap = new Map([[new Vector3(0, 0, 0), createCell(0, 0, 0)]])

  const vecs = inRange(new Vector3(0, 0, 0), size)
  console.log(vecs)

  // material
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

  return (
    <group scale={scale}>
      {vecs.map((position, i) => (
        <Hex2 vector={position} key={i} material={material} />
      ))}
    </group>
  )
}

const directions = [
  new Vector3(1, -1, 0),
  new Vector3(1, 0, -1),
  new Vector3(0, 1, -1),
  new Vector3(-1, 1, 0),
  new Vector3(-1, 0, 1),
  new Vector3(0, -1, 1),
]

type Cell = {
  position: Vector3
}

function createCell(x: number, y: number, z: number) {
  return { x, y, z }
}

// https://www.redblobgames.com/grids/hexagons-v2/

function neighbours(from: Vector3) {
  return directions.map(d => from.add(from))
}

// https://www.redblobgames.com/grids/hexagons-v2/#range
function inRange(origin: Vector3, range: number) {
  const results: Vector3[] = []

  for (let x = -range; x <= range; x++) {
    for (
      let y = Math.max(-range, -x - range);
      y <= Math.min(range, -x + range);
      y++
    ) {
      const z = -x - y
      results.push(new Vector3(x, y, z).add(origin))
    }
  }
  return results
}
