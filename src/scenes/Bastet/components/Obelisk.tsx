import { Capsule, Edges, Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  const ref = useRef<THREE.Group>(null!)

  const lineRef = useRef<THREE.LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  const rotate = useMemo(() => {
    return {
      x: THREE.MathUtils.randFloat(0, 0.01),
      y: THREE.MathUtils.randFloat(0.1, 0.2),
    }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.x += rotate.x * delta
    ref.current.rotation.y += rotate.y * delta
  })

  return (
    <group {...group} ref={ref}>
      <Capsule args={[1.5, 16, 1, 4]}>
        <meshStandardMaterial color="black" />

        <Edges>
          <lineBasicMaterial ref={lineRef} color={'white'} />
        </Edges>

        <Glyphs />
      </Capsule>
    </group>
  )
}

const radius = 1
const adjust = 0.4
const height = 6

function Glyphs() {
  const props = {
    font: 'font/bigblue.json',
    material: new THREE.MeshBasicMaterial({ color: 'orange' }),
  }

  const text = useMemo(() => getSideText(), [])

  return (
    <group rotation-y={Math.PI / 4}>
      <Text3D
        {...props}
        position={[radius, height, adjust]}
        rotation-y={Math.PI / 2}
      >
        {text[0]}
      </Text3D>
      <Text3D
        {...props}
        position={[-radius, height, -adjust]}
        rotation-y={-Math.PI / 2}
      >
        {text[1]}
      </Text3D>
      <Text3D {...props} position={[-adjust, height, radius]}>
        {text[2]}
      </Text3D>
      <Text3D
        {...props}
        position={[adjust, height, -radius]}
        rotation-y={Math.PI}
      >
        {text[3]}
      </Text3D>
    </group>
  )
}

const t1 = ['אהבה', 'שכחב', 'לאמץ', 'מעבר']
const t2 = ['ТИПИ', 'БУЛИ', 'ΠΟΛΗ', 'МΣУΔ']
const t3 = ['ΥΞΣΤ', 'ΓΎΏΧ', 'ΩΜΨΔ', 'ΖΠΗΘ']
const t4 = ['ДЕЖЗ', 'ΘΚΛΜ', 'ךכלם', 'ЏАБВ']

function getSideText() {
  return [t1, t2, t3, t4].map(t => {
    const n = THREE.MathUtils.randInt(0, t.length - 1)
    return verticalize(t[n])
  })
}

function verticalize(text: string) {
  return text.split('').join('\n')
}
