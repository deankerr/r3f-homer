import { Capsule, Edges, Text3D } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  return (
    <group {...group}>
      <Capsule args={[1.5, 16, 1, 4]}>
        <meshStandardMaterial color="black" wireframe={false} />
        <Edges>
          <lineBasicMaterial ref={lineRef} color={'white'} />
        </Edges>
      </Capsule>
      <Glyphs />
    </group>
  )
}

function Glyphs() {
  return (
    <group>
      <TwoSides rotation-y={-Math.PI / 4} />
      <TwoSides rotation-y={Math.PI / 4} />
    </group>
  )
}

type TwoSidesProps = JSX.IntrinsicElements['group']
function TwoSides(props: TwoSidesProps) {
  const font = {
    font: 'font/bigblue.json',
    material: new THREE.MeshBasicMaterial({ color: 'orange' }),
  }
  const radius = 1.1
  const adjust = 0.4
  const height = 6

  return (
    <group {...props}>
      <Text3D
        {...font}
        position={[radius, height, adjust]}
        rotation-y={Math.PI / 2}
      >
        {vertical('אהבה')}
      </Text3D>

      <Text3D
        {...font}
        position={[-radius, height, -adjust]}
        rotation-y={-Math.PI / 2}
      >
        {vertical('ציפור')}
      </Text3D>
    </group>
  )
}

function vertical(text: string) {
  return text.split('').join('\n')
}
