import { Vector3 } from 'three'

export function plotCircle(amount: number, radius: number, yPos = 0) {
  const positions: [number, number, number][] = []

  for (let i = 0; i < amount; i++) {
    const x = radius * Math.sin((i / amount) * 2 * Math.PI)
    const z = radius * Math.cos((i / amount) * 2 * Math.PI)
    positions.push([x, yPos, z])
  }

  return positions
}

export function ringPositions(radius: number, amount: number) {
  const positions: Vector3[] = []

  for (let i = 0; i < amount; i++) {
    const angle = (i / amount) * 2 * Math.PI
    const x = radius * Math.sin(angle)
    const z = radius * Math.cos(angle)
    positions.push(new Vector3(x, 0, z))
  }

  return positions
}

export function spiralPositions(radius: number, amount: number) {
  const positions: [number, number, number][] = []

  for (let i = 0; i < amount; i++) {
    const angle = 0.1 * i
    const x = radius * angle * Math.cos(angle)
    const z = radius * angle * Math.sin(angle)
    positions.push([x, 0, z])
  }

  return positions
}
