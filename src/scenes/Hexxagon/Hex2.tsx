import { useMemo } from 'react'
import { LatheGeometry, Vector2, Vector3 } from 'three'

const width = 2
const height = 1
const labelFontSize = 4

const geometry = createHexGeometry(width, height)

type Props = {
  vector: Vector3
} & JSX.IntrinsicElements['mesh']

const radius = 8

export function Hex2(props: Props) {
  const position = useMemo(() => hexToPixel(props.vector), [props.vector])

  return (
    <group position={position}>
      <mesh {...props} geometry={geometry} />
    </group>
  )
}

function hexToPixel(vector: Vector3) {
  const x = radius * ((3 / 2) * vector.x)
  const y = radius * ((Math.sqrt(3) / 2) * vector.x + Math.sqrt(3) * vector.y)

  return new Vector3(x * width, y * height, 0)
}

function createHexGeometry(width: number, height: number) {
  const hexShape = [
    [8, 0], // outer
    [7, 0], // border
    [5, 5], //  slope
    [0, 5], // pit
  ].map(p => new Vector2(...p))

  return new LatheGeometry(hexShape, 6, -Math.PI / 2)
    .rotateX(-Math.PI / 2)
    .scale(width, height, 1)
}
