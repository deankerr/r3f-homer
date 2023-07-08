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
      <group rotation-y={Math.PI / 4}>
        {plotCircle(4, 0.7).map((pos, i) => (
          <group position={pos} rotation-y={(Math.PI / 2) * i} key={i}>
            <Glyphs rotation={[0, (Math.PI / 2) * i, 0]} />
          </group>
        ))}
      </group>
    </group>
  )
}

type GlyphProps = JSX.IntrinsicElements['mesh']
function Glyphs(d: GlyphProps) {
  const props = {
    font: 'font/bigblue.json',
    material: new THREE.MeshBasicMaterial({ color: 'orange' }),
  }
  const height = 6
  const shift = 0.4

  const sides: JSX.Element[] = []

  for (let i = 0; i < 1; i++) {
    sides.push()
  }
  return (
    <Text3D {...props} position={[-shift, height, shift]}>
      {vertical('BAIET')}
    </Text3D>
  )
}

function vertical(text: string) {
  return text.split('').join('\n')
}
