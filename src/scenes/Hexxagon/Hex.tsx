import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import { LatheGeometry, Vector2, Vector3 } from 'three'

// geometry
const hexShape = [
  [8, 0], // outer
  [7, 0], // border
  [5, 5], //  slope
  [0, 5], // pit
].map(p => new Vector2(...p))

const geometry = new LatheGeometry(hexShape, 6, -Math.PI / 2).rotateX(
  -Math.PI / 2
)

const labelFontSize = 4

export type CellData = {
  position: Vector3
  q: number
  r: number
  // neighbours
}

type Props = JSX.IntrinsicElements['mesh'] & CellData

export function Hex(props: Props) {
  const { position, q, r, ...meshProps } = props

  const { hexLabels } = useControls({ hexLabels: false })

  return (
    <group position={position}>
      <mesh {...meshProps} geometry={geometry} />

      <Text
        position-y={3}
        material-color={'red'}
        fontSize={labelFontSize}
        visible={hexLabels}
      >{`${q}`}</Text>

      <Text
        position-x={3}
        position-y={-3}
        material-color={'blue'}
        fontSize={labelFontSize}
        visible={hexLabels}
      >{`${r}`}</Text>

      <Text
        position-x={-3}
        position-y={-3}
        material-color={'lime'}
        fontSize={labelFontSize}
        visible={hexLabels}
      >{`${-q - r}`}</Text>
    </group>
  )
}
