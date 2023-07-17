import { Text } from '@react-three/drei'
import { useControls } from 'leva'
import { Vector3 } from 'three'

const fontSize = 6

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
      <mesh {...meshProps} receiveShadow />

      <Text
        position-y={6}
        material-color={'red'}
        fontSize={fontSize}
        visible={hexLabels}
      >{`${q}`}</Text>

      <Text
        position-x={5}
        position-y={-5}
        material-color={'blue'}
        fontSize={fontSize}
        visible={hexLabels}
      >{`${r}`}</Text>
    </group>
  )
}
