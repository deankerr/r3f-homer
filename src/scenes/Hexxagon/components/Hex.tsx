import { Circle, Text } from '@react-three/drei'
import { useControls } from 'leva'
import { DoubleSide, LatheGeometry, Vector2, Vector3 } from 'three'

import { hex3ToPosition } from '../lib'
import { HexxData } from '../slice'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

type Props = HexxData & JSX.IntrinsicElements['mesh'] & { index: number }

export function Hex(props: Props) {
  const { vector, material, selected, onClick, contents, index } = props

  const config = useControls({ showLabels: true })

  const position = props.position ?? hex3ToPosition(vector)

  return (
    <group position={position}>
      <mesh name="hex" material={material} geometry={geometry.main} onClick={onClick} />

      <mesh
        name="hex selected"
        material-color="lime"
        geometry={geometry.selected}
        visible={selected}
        material-side={DoubleSide}
      />

      <Ruby scale={0.65} visible={contents === 'ruby'} />
      <Pearl scale={0.65} visible={contents === 'pearl'} />
      <Circle args={[0.6]} material-color="black" visible={contents === 'hole'} />

      <Labels data={[...vector, index]} visible={config.showLabels} />
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
