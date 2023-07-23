import { GradientTexture, GradientType, useTexture } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { forwardRef, memo, useMemo, useRef } from 'react'
import {
  DoubleSide,
  Group,
  LatheGeometry,
  Mesh,
  MeshMatcapMaterial,
  RingGeometry,
  SphereGeometry,
  Vector2,
} from 'three'

type Props = JSX.IntrinsicElements['group']

export const Pearls = forwardRef<Group, Props>((props, ref) => {
  const { ...groupProps } = props

  // const config = useControls()
  const PearlGradient = memo(function PearlGradient() {
    return (
      <meshPhongMaterial>
        <GradientTexture
          stops={[0.2, 0.5, 0.8]}
          colors={['blue', 'thistle', 'magenta']}
          //@ts-expect-error incorrectly typed as undefined?
          type={GradientType.Linear}
        />
      </meshPhongMaterial>
    )
  })

  const n = new Array(5).fill(0)
  return (
    <group ref={ref} {...groupProps}>
      {/* {n.map((_, i) => (
        <MemoRuby position={[0, -i * 2, 0]} key={i} />
      ))} */}

      <mesh geometry={geometry.main} scale={0.82}>
        <PearlGradient />
      </mesh>

      <mesh geometry={geometry.main} scale={0.82}>
        <PearlGradient />
      </mesh>

      <mesh geometry={geometry.main} scale={0.82}>
        <PearlGradient />
      </mesh>

      <mesh geometry={geometry.main} scale={0.82}>
        <PearlGradient />
      </mesh>

      <mesh geometry={geometry.main} scale={0.82}>
        <PearlGradient />
      </mesh>
    </group>
  )
})
Pearls.displayName = 'Pearls'

//* geometry
const geometry = (() => {
  return {
    main: new SphereGeometry(),
    outer: new RingGeometry(),
  }
})()
