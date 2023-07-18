import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { LatheGeometry, Vector2, Vector3 } from 'three'

// lathe size
const radius = 8

// scaled by
const width = 2
const height = 1

const labelFontSize = 4

const geometry = createHexGeometry(width, height)

type Props = {
  vector: Vector3
} & JSX.IntrinsicElements['mesh']

export function Hex(props: Props) {
  const { showHexVectors } = useControls({ showHexVectors: __DEV__ })

  const position = useMemo(() => hexToPixel(props.vector), [props.vector])

  return (
    <group position={position}>
      <mesh {...props} geometry={geometry} />
      {showHexVectors && HexVectorLabel(props.vector)}
    </group>
  )
}

function HexVectorLabel(vector: Vector3) {
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
    </group>
  )
}

function hexToPixel(vector: Vector3) {
  const x = radius * ((3 / 2) * vector.x)
  const y = radius * ((Math.sqrt(3) / 2) * vector.x + Math.sqrt(3) * vector.y)
  console.log('pixe')
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
