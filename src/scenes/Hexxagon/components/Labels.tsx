import { Text } from '@react-three/drei'
import { folder, useControls } from 'leva'

import { hex3ToPosition } from '../lib'
import { useHexxSelector } from '../shared'

type Props = JSX.IntrinsicElements['group']

export function Labels({ visible }: Props) {
  const config = useControls(
    'visual',
    {
      labels: folder({
        visible: false,
      }),
    },
    { collapsed: true }
  )

  const textProps = { visible, outlineWidth: 0.1 }

  const gameState = useHexxSelector(state => state.gameState)

  return (
    <group position={[0, 0, 0.45]} visible={config.visible}>
      {gameState.list.map((hex, i) => (
        <group key={i} scale={0.3} position={hex3ToPosition(hex.vector)}>
          <Text {...textProps} position={[0, 1.25, 0]} color="red">
            {hex.vector[0]}
          </Text>
          <Text {...textProps} position={[1, -1, 0]} color="blue">
            {hex.vector[1]}
          </Text>
          <Text {...textProps} position={[-1, -1, 0]} color="lime">
            {hex.vector[2]}
          </Text>
          <Text {...textProps} position={[0, 0, 0]} color="white">
            {hex.index}
          </Text>
        </group>
      ))}
    </group>
  )
}
