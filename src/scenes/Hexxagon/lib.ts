import { Vector3 } from 'three'

import type { Hex3, HexxData } from './slice'

const directions = [
  new Vector3(1, -1, 0),
  new Vector3(1, 0, -1),
  new Vector3(0, 1, -1),
  new Vector3(-1, 1, 0),
  new Vector3(-1, 0, 1),
  new Vector3(0, -1, 1),
]

// https://www.redblobgames.com/grids/hexagons-v2/
export function neighbours(from: Vector3) {
  return directions.map(d => from.add(from))
}

// https://www.redblobgames.com/grids/hexagons-v2/#range
export function hexesInRange(origin: Hex3, range: number) {
  const results: Hex3[] = []

  for (let x = -range; x <= range; x++) {
    for (let y = Math.max(-range, -x - range); y <= Math.min(range, -x + range); y++) {
      const z = -x - y
      results.push([x + origin[0], y + origin[1], z + origin[2]])
    }
  }
  // console.log('Hexes in range:', results.length)
  return results
}

export function getSelectedNeighbours(origin: HexxData | null) {
  if (!origin) return { origin: null, near: null, far: null }

  const near = neighbours(new Vector3(...origin.vector))
  const far = hexesInRange(origin.vector, 2)

  return { origin, near, far }
}

export function hex3ToPosition(vector: Hex3) {
  const [x, y] = vector
  const positionX = 1 * ((3 / 2) * x)
  const positionY = 1 * ((Math.sqrt(3) / 2) * x + Math.sqrt(3) * y)

  return new Vector3(positionX * 1, positionY * 1, 0)
}

export function createInitialGridState(boardSize = 4) {
  const vectors = hexesInRange([0, 0, 0], boardSize)

  const list: HexxData[] = vectors.map((vector, i) => {
    let contents: HexxData['contents'] = 'empty'

    if (initRuby.some(vec => hex3Equals(vec, vector))) contents = 'ruby'
    if (initPearl.some(vec => hex3Equals(vec, vector))) contents = 'pearl'
    if (initHole.some(vec => hex3Equals(vec, vector))) contents = 'hole'

    const hex: HexxData = { index: i, vector, contents }

    return hex
  })

  return list
}

function hex3Equals(vector1: Hex3, vector2: Hex3) {
  return vector1.every((n, i) => n === vector2[i])
}

const initRuby: Hex3[] = [
  [-4, 4, 0],
  [0, -4, 4],
  [4, 0, -4],
]
const initPearl: Hex3[] = [
  [-4, 0, 4],
  [0, 4, -4],
  [4, -4, 0],
]
const initHole: Hex3[] = [
  [-1, 0, 1],
  [0, 1, -1],
  [1, -1, 0],
]
