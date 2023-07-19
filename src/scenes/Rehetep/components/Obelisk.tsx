import { Capsule, Edges, Text3D } from '@react-three/drei'
import { Euler, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, LineBasicMaterial, MathUtils, MeshBasicMaterial } from 'three'

import { useMaterialColorLerpAnimation } from '..'

const initialTilt = Math.PI / 8

export function Obelisk() {
  const ref = useRef<Group>(null!)

  const lineRef = useRef<LineBasicMaterial>(null!)
  useMaterialColorLerpAnimation(lineRef, 'dimmed')

  //* initial alignment
  const rotation = useMemo(() => {
    const x = MathUtils.randFloat(-initialTilt, initialTilt)
    const z = MathUtils.randFloat(-initialTilt, initialTilt)
    return [x, 0, z] as Euler
  }, [])

  //* Rotation
  const rotate = useMemo(() => {
    return {
      y: MathUtils.randFloat(0.1, 0.2),
    }
  }, [])

  useFrame((_, delta) => {
    ref.current.rotation.y += rotate.y * delta
  })

  return (
    <group rotation={rotation} ref={ref}>
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
const adjust = 0.45
const height = 6
const chars = 5

function Glyphs() {
  const props = {
    font: 'font/bigblue.json',
    lineHeight: 2,
    material: new MeshBasicMaterial({ color: 'orange' }),
  }

  const text = useMemo(() => getSideText(chars), [])

  return (
    <group rotation-y={Math.PI / 4}>
      <Text3D {...props} position={[radius, height, adjust]} rotation-y={Math.PI / 2}>
        {text[0]}
      </Text3D>
      <Text3D {...props} position={[-radius, height, -adjust]} rotation-y={-Math.PI / 2}>
        {text[1]}
      </Text3D>
      <Text3D {...props} position={[-adjust, height, radius]}>
        {text[2]}
      </Text3D>
      <Text3D {...props} position={[adjust, height, -radius]} rotation-y={Math.PI}>
        {text[3]}
      </Text3D>
    </group>
  )
}

const textData = ['אהבהשכחבלאמץמעברךכלם', 'ТИПИБУЛИΠΟΛΗМΣУΔДЕЖЗ', 'ΥΞΣΤΓΎΏΧΩΜΨΔΖΠΗΘЏАБВ']

function getSideText(chars: number) {
  const rows = textData.length - 1
  const cols = textData[0].length - 1

  return [...textData, textData[MathUtils.randInt(0, rows)]].map(t => {
    const n = MathUtils.randInt(0, cols - chars)
    return verticalize(t.slice(n, n + chars))
  })
}

function verticalize(text: string) {
  return text.split('').join('\n')
}
