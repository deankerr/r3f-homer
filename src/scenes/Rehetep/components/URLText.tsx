import { Edges, Float, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group'] & {
  text: string
}

export function URLText({ text }: Props) {
  const { x, y, z, rotationX, rotationY, rotationZ } = useControls(
    'URL 3D Text',
    {
      x: { value: 100, min: -500, max: 500, step: 1 },
      y: { value: 125, min: 0, max: 200, step: 1 },
      z: { value: -255, min: -500, max: 500, step: 1 },
      rotationX: { value: 0.4, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationY: { value: -0.7, min: -Math.PI, max: Math.PI, step: 0.1 },
      rotationZ: { value: 0.3, min: -Math.PI, max: Math.PI, step: 0.1 },
    },
    { collapsed: true }
  )

  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'main')

  return (
    <Float enabled={true}>
      <Text3D
        font={'font/bigblue.json'}
        size={12}
        height={10}
        position={[x, y, z]}
        rotation={[rotationX, rotationY, rotationZ]}
      >
        {text}
        <meshStandardMaterial />
        <Edges>
          <lineBasicMaterial ref={lineRef} color={'orange'} />
        </Edges>
      </Text3D>
    </Float>
  )
}
