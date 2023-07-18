import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { DoubleSide, LatheGeometry, Vector2, Vector3 } from 'three'

import { Ruby } from './Ruby'

// lathe size
const radius = 8

// scaled by
const width = 2
const height = 1

const labelFontSize = 4

const [geometry, selectedGeometry] = createHexGeometry(width, height)

type Props = {
  vector: Vector3
  selected: boolean
  id: number
} & JSX.IntrinsicElements['mesh']

export function Hex(props: Props) {
  const { vector, material, selected, onClick, id } = props

  const { showHexVectors, rubies } = useControls({
    showHexVectors: false,
    rubies: true,
  })

  const position = useMemo(() => hexToPixel(vector), [vector])

  return (
    <group position={position} onClick={onClick}>
      <mesh material={material} geometry={geometry} />
      {showHexVectors && HexVectorLabel(vector, id)}
      <mesh
        material-color="lime"
        geometry={selectedGeometry}
        visible={selected}
        position-z={1}
        material-side={DoubleSide}
      />
      {rubies && <Ruby flatShading={true} />}
    </group>
  )
}

function HexVectorLabel(vector: Vector3, id: number) {
  return (
    <group>
      <Text
        position-y={3}
        material-color={'red'}
        fontSize={labelFontSize}
      >{`${vector.x}`}</Text>

      <Text
        position-x={4}
        position-y={-3}
        material-color={'blue'}
        fontSize={labelFontSize}
      >{`${vector.y}`}</Text>

      <Text
        position-x={-4}
        position-y={-3}
        material-color={'lime'}
        fontSize={labelFontSize}
      >{`${vector.z}`}</Text>

      <Text material-color={'white'} fontSize={labelFontSize}>
        {id}
      </Text>
    </group>
  )
}

function hexToPixel(vector: Vector3) {
  const x = radius * ((3 / 2) * vector.x)
  const y = radius * ((Math.sqrt(3) / 2) * vector.x + Math.sqrt(3) * vector.y)
  console.log('hextopixel')
  return new Vector3(x * width, y * height, 0)
}

function createHexGeometry(width: number, height: number) {
  const hexShape = [
    [8, 0], // outer
    [7, 0], // border
    [5, 5], //  slope
    [0, 5], // pit
  ].map(p => new Vector2(...p))

  const main = new LatheGeometry(hexShape, 6, -Math.PI / 2)
    .rotateX(-Math.PI / 2)
    .scale(width, height, 1)

  const selected = new LatheGeometry(
    [hexShape[0], hexShape[1]],
    6,
    -Math.PI / 2
  )
    .rotateX(-Math.PI / 2)
    .scale(width, height, 1)

  return [main, selected]
}
