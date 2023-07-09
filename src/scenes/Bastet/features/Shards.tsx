import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { Shard } from '../components'

const small = {
  maxRadius: 475,
  minRadius: 120,
  arms: 10,
  amount: 5,
  scale: 1,
  yAdjust: 5.2,
  orbit: 0.1,
}

const medium = {
  radius: 250,
  amount: 15,
  scale: [4, 5],
  orbit: 0.04,
}

const large = {
  radius: 750,
  amount: 30,
  scale: [6, 8],
  orbit: 0.05,
}

const xLarge = {
  radius: 1000,
  amount: 50,
  scale: [9, 13],
  orbit: 0.06,
}

export function Shards() {
  const config = useControls('main', {
    shards: true,
  })

  //* small
  const smallRef = useRef<THREE.Group>(null!)

  const smallGroup = useMemo(() => {
    const { maxRadius, minRadius, arms, amount, scale, yAdjust } = small
    const range = (maxRadius - minRadius) / amount
    const angle = (2 * Math.PI) / arms
    const shards: JSX.Element[] = []

    for (let arm = 0; arm < arms; arm++) {
      for (let i = 0; i < amount; i++) {
        const radius = range * i + minRadius
        shards.push(
          <Shard
            position={[
              Math.sin(angle * arm) * radius,
              yAdjust,
              Math.cos(angle * arm) * radius,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={scale}
            key={`s${arm}-${i}`}
            visible={false}
          />
        )
      }
    }
    return <group ref={smallRef}>{shards}</group>
  }, [])

  //* medium
  const mediumRef = useRef<THREE.Group>(null!)

  const mediumGroup = useMemo(() => {
    const { amount, radius, scale } = medium
    const shards = plotCircle(amount, radius).map((position, i) => (
      <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scale[0], scale[1])}
        key={`m${i}`}
      />
    ))
    return <group ref={mediumRef}>{shards}</group>
  }, [])

  //* large
  const largeRef = useRef<THREE.Group>(null!)
  const largeGroup = useMemo(() => {
    const { amount, radius, scale } = large
    const shards = plotCircle(amount, radius).map((position, i) => (
      <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scale[0], scale[1])}
        key={`l${i}`}
      />
    ))
    return <group ref={largeRef}>{shards}</group>
  }, [])

  //* xLarge
  const xLargeRef = useRef<THREE.Group>(null!)
  const xLargeGroup = useMemo(() => {
    const { amount, radius, scale } = xLarge
    const shards = plotCircle(amount, radius).map((position, i) => (
      <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scale[0], scale[1])}
        key={`l${i}`}
      />
    ))
    return <group ref={xLargeRef}>{shards}</group>
  }, [])

  //* Orbits
  useFrame((_, delta) => {
    smallRef.current.rotation.y += small.orbit * delta
    mediumRef.current.rotation.y += medium.orbit * delta
    largeRef.current.rotation.y += large.orbit * delta
    xLargeRef.current.rotation.y += xLarge.orbit * delta
  })

  return (
    <group visible={config.shards}>
      {smallGroup}
      {mediumGroup}
      {largeGroup}
      {xLargeGroup}
    </group>
  )
}
