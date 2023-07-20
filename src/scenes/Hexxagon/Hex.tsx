import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { DoubleSide, LatheGeometry, Vector2, Vector3 } from 'three'

import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

const labelFontSize = 4

type Props = {
  vector: Vector3
  selected: boolean
  id: number
} & JSX.IntrinsicElements['mesh']

export function Hex(props: Props) {
  const { vector, material, selected, onClick, id } = props

  const config = useControls(
    'hex',
    {
      labels: false,
      allRubies: false,
      allPearls: false,
      alternate: true,
    },
    { collapsed: true }
  )

  const position = useMemo(() => hexToPixel(vector), [vector])

  const rubyMesh = <Ruby />
  const pearlMesh = <Pearl position={[0, 0, -2]} />

  return (
    <group position={props.position ? props.position : position} onClick={onClick}>
      <mesh material={material} geometry={geometry.main} />

      {config.labels && HexVectorLabel(vector, id)}

      <mesh
        material-color="lime"
        geometry={geometry.selected}
        visible={selected}
        // position-z={1}
        material-side={DoubleSide}
      />

      {config.allRubies && rubyMesh}
      {config.allPearls && pearlMesh}
      {config.alternate && (vector.z % 2 ? rubyMesh : pearlMesh)}
    </group>
  )
}

function HexVectorLabel(vector: Vector3, id: number) {
  return (
    <group>
      <Text position-y={3} material-color={'red'} fontSize={labelFontSize}>{`${vector.x}`}</Text>

      <Text position-x={4} position-y={-3} material-color={'blue'} fontSize={labelFontSize}>{`${vector.y}`}</Text>

      <Text position-x={-4} position-y={-3} material-color={'lime'} fontSize={labelFontSize}>{`${vector.z}`}</Text>

      <Text material-color={'white'} fontSize={labelFontSize}>
        {id}
      </Text>
    </group>
  )
}

function hexToPixel(vector: Vector3) {
  const x = 1 * ((3 / 2) * vector.x)
  const y = 1 * ((Math.sqrt(3) / 2) * vector.x + Math.sqrt(3) * vector.y)
  return new Vector3(x * 1, y * 1, 0)
}

//* geometry
const lathePoints = [
  [8, 0], // outer
  [7, 0], // border
  [5, 5], // slope
  [0, 5], // pit
] as const

// scale greatest magnitude to 1
const latheVectors = lathePoints.map(points => new Vector2(...points).divideScalar(8))

// create and rotate geometry
const geometry = {
  main: new LatheGeometry(latheVectors, 6, -Math.PI / 2).rotateX(-Math.PI / 2).center(),
  selected: new LatheGeometry(latheVectors.slice(0, 2), 6, -Math.PI / 2).rotateX(-Math.PI / 2).translate(0, 0, 0.1),
}
