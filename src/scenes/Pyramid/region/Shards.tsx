import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { Shard } from '../components/'

const small = {
  maxRadius: 475,
  minRadius: 90,
  arms: 16,
  amount: 8,
  scale: 1,
  yAdjust: 5.2,
}

const medium = {
  radius: 300,
  amount: 32,
  scale: [2, 4],
}

const large = {
  radius: 500,
  amount: 104,
  scale: [4, 6],
}

export function Shards() {
  //* small
  const smallGroup = useMemo(() => {
    const { maxRadius, minRadius, arms, amount, yAdjust } = small
    const sharms: THREE.Vector3[][] = []
    const range = (maxRadius - minRadius) / amount

    for (let iArm = 0; iArm < arms; iArm++) {
      const arm: THREE.Vector3[] = []
      const angle = (2 * Math.PI * iArm) / arms

      for (let i = 0; i < amount; i++) {
        const radius = range * i + minRadius
        arm.push(
          new THREE.Vector3(
            Math.sin(angle) * radius,
            yAdjust,
            Math.cos(angle) * radius
          )
        )
      }
      sharms.push(arm)
    }

    return (
      <group>
        {sharms.flat().map((vec3, i) => (
          <Shard
            position={vec3}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={small.scale}
            key={`s${i}`}
          />
        ))}
      </group>
    )
  }, [])

  //* medium
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
    return <group>{shards}</group>
  }, [])

  //* large
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

    return <group>{shards}</group>
  }, [])

  return (
    <>
      {smallGroup}
      {mediumGroup}
      {largeGroup}
    </>
  )
}
