import { Edges, Float, Text3D } from '@react-three/drei'
import { useControls } from 'leva'

import { useBastetStore } from '@/store'

type Props = JSX.IntrinsicElements['group'] & {
  text: string
}

export function URLText({ text }: Props) {
  const { x, y, z, rotationX, rotationY, rotationZ } = useControls(
    'URL 3D Text',
    {
      x: { value: 80, min: -500, max: 500, step: 1 },
      y: { value: 50, min: 0, max: 200, step: 1 },
      z: { value: -120, min: -500, max: 500, step: 1 },
      rotationX: { value: 0.4, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationY: { value: -0.7, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationZ: { value: 0.3, min: -Math.PI, max: Math.PI, step: 0.1 },
    },
    { collapsed: true }
  )

  const mainColor = useBastetStore(state => state.mainColor)

  return (
    <Float enabled={true}>
      <Text3D
        font={'font/bigblue.json'}
        size={6}
        height={10}
        position={[x, y, z]}
        rotation={[rotationX, rotationY, rotationZ]}
      >
        {text}
        <meshStandardMaterial />
        <Edges scale={1.0} threshold={15} color={mainColor} />
      </Text3D>
    </Float>
  )
}
