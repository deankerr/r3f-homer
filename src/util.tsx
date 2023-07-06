export function plotCircle(amount: number, radius: number, yPos = 0) {
  const positions: [number, number, number][] = []

  for (let i = 0; i < amount; i++) {
    const x = radius * Math.sin((i / amount) * 2 * Math.PI)
    const z = radius * Math.cos((i / amount) * 2 * Math.PI)
    positions.push([x, yPos, z])
  }

  return positions
}
