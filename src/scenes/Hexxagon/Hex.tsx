import { Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo } from 'react'
import { DoubleSide, LatheGeometry, MeshBasicMaterial, Vector2, Vector3 } from 'three'

import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

type Props = {
  vector: Vector3
  selected: boolean
  id: number
  hasRuby?: boolean
  hasPearl?: boolean
} & JSX.IntrinsicElements['mesh']

export function Hex(props: Props) {
  const { vector, material, selected, onClick, id, hasRuby, hasPearl } = props

  const config = useControls('hex', { labels: false }, { collapsed: true })

  const position = props.position ?? hexToPixel(vector)

  return (
    <group position={props.position ? props.position : position} onClick={onClick}>
      <mesh name="hex" material={material} geometry={geometry.main} />
      <mesh
        name="hex selected"
        material-color="lime"
        geometry={geometry.selected}
        visible={selected}
        material-side={DoubleSide}
      />

      <Ruby scale={0.65} visible={hasRuby} />
      <Pearl scale={0.65} visible={hasPearl} />
      <Labels data={[...vector.toArray(), id]} visible={config.labels} />
    </group>
  )
}

type LabelProps = { data: number[]; visible: boolean }
function Labels({ data, visible }: LabelProps) {
  const textProps = { visible, outlineWidth: 0.1 }

  return (
    <group scale={0.3} position={[0, 0, 0.6]}>
      <Text {...textProps} position={[0, 1.25, 0]} color="red">
        {data[0]}
      </Text>
      <Text {...textProps} position={[1, -1, 0]} color="blue">
        {data[1]}
      </Text>
      <Text {...textProps} position={[-1, -1, 0]} color="lime">
        {data[2]}
      </Text>
      <Text {...textProps} position={[0, 0, 0]} color="white">
        {data[3]}
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
  selected: new LatheGeometry(latheVectors.slice(0, 2), 6, -Math.PI / 2).rotateX(-Math.PI / 2).translate(0, 0, 0.4),
}
