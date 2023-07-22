// const directions = [
//   new Vector3(1, -1, 0),
//   new Vector3(1, 0, -1),
//   new Vector3(0, 1, -1),
//   new Vector3(-1, 1, 0),
//   new Vector3(-1, 0, 1),
//   new Vector3(0, -1, 1),
// ]
import { Vector3 } from 'three'

import type { HexxData, HexxGameState } from './gameSlice'

// https://www.redblobgames.com/grids/hexagons-v2/
// function neighbours(from: Vector3) {
//   return directions.map(d => from.add(from))
// }

// https://www.redblobgames.com/grids/hexagons-v2/#range
export function HexesInRange(origin: Vector3, range: number) {
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

export function createInitialGridState(boardSize = 4) {
  const origin = new Vector3(0, 0, 0)
  const vectors = HexesInRange(origin, boardSize)

  const grid: HexxGameState['grid'] = {}
  const list: HexxData[] = []

  const init: Record<string, HexxData['contents']> = {
    '-4,4,0': 'ruby',
    '0,-4,4': 'ruby',
    '4,0,-4': 'ruby',
    '-4,0,4': 'pearl',
    '0,4,-4': 'pearl',
    '4,-4,0': 'pearl',
    '-1,0,1': 'hole',
    '0,1,-1': 'hole',
    '1,-1,0': 'hole',
  }

  for (const vector of vectors) {
    const hash = `${vector.x},${vector.y},${vector.z}`

    const contents = init[hash] ?? 'empty'

    const hex: HexxData = { hash, vector, contents, selected: false }

    grid[hash] = hex
    list.push(hex)
  }

  return { grid, list }
}

// const all = Array(61)
//   .fill(0)
//   .map((_, i) => i)

// const evens = all.filter(n => n % 2 === 0)
// const odds = all.filter(n => n % 2 === 1)
