import { Capsule, Edges, Text3D } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

const t = ['FELT', 'אהבה', 'שכח', 'ТИПИ', 'БУТИ', 'ΠΟΛΗ', 'דעטעקט', 'СВИЛА']
type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  const text = useMemo(() => {
    const n = THREE.MathUtils.randInt(0, t.length - 1)
    return [0, 1, 2, 3].map(v => t[(n + v) % t.length])
  }, [])

  return (
    <group {...group}>
      <Capsule args={[1.5, 16, 1, 4]}>
        <meshStandardMaterial color="black" wireframe={false} />

        <Edges>
          <lineBasicMaterial ref={lineRef} color={'white'} />
        </Edges>

        <Glyphs text={text} />
      </Capsule>
    </group>
  )
}

function Glyphs({ text }: { text: string[] }) {
  const material = new THREE.MeshBasicMaterial({ color: 'orange' })
  const radius = 1
  const adjust = 0.4
  const height = 6
  return (
    <group rotation-y={Math.PI / 4}>
      <Side
        text={text[0]}
        position={[radius, height, adjust]}
        rotation-y={Math.PI / 2}
        material={material}
      />
      <Side
        text={text[1]}
        position={[-radius, height, -adjust]}
        rotation-y={-Math.PI / 2}
        material={material}
      />
      <Side
        text={text[2]}
        position={[-adjust, height, radius]}
        material={material}
      />
      <Side
        text={text[3]}
        position={[adjust, height, -radius]}
        rotation-y={Math.PI}
        material={material}
      />
    </group>
  )
}

function Side({
  text,
  ...props
}: JSX.IntrinsicElements['mesh'] & { text: string }) {
  return (
    <Text3D font="font/bigblue.json" {...props}>
      {vertical(text)}
    </Text3D>
  )
}

function vertical(text: string) {
  return text.split('').join('\n')
}
