import { Edges, Instance, Instances } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { useOrbitSwarm } from '..'
import { IShard } from '../components/'

const small = {
  maxRadius: 475,
  minRadius: 90,
  arms: 16,
  amount: 8,
  scale: 1,
  yAdjust: 5.2,
}

const medium = {
  radius: 250,
  amount: 32,
  scale: [2, 4],
}

const large = {
  radius: 500,
  amount: 104,
  scale: [4, 6],
}

export function InstanceShards() {
  //* small
  const smallRef = useRef<THREE.Group>(null!)
  useOrbitSwarm(smallRef, [1, 1, 0])

  const smallGroup = useMemo(() => {
    const { maxRadius, minRadius, arms, amount, scale, yAdjust } = small
    const range = (maxRadius - minRadius) / amount
    const angle = (2 * Math.PI) / arms
    const shards: JSX.Element[] = []

    for (let arm = 0; arm < arms; arm++) {
      for (let i = 0; i < amount; i++) {
        const radius = range * i + minRadius
        shards.push(
          <IShard
            position={[
              Math.sin(angle * arm) * radius,
              yAdjust,
              Math.cos(angle * arm) * radius,
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={scale}
            key={`s${arm}-${i}`}
          />
        )
      }
    }
    return <group ref={smallRef}>{shards}</group>
  }, [])

  //* medium
  const mediumRef = useRef<THREE.Group>(null!)
  useOrbitSwarm(mediumRef, [1, 0, -1])

  const mediumGroup = useMemo(() => {
    const { amount, radius, scale } = medium
    const shards = plotCircle(amount, radius).map((position, i) => (
      <IShard
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
  useOrbitSwarm(largeRef, [0, -1, 1])

  const largeGroup = useMemo(() => {
    const { amount, radius, scale } = large
    const shards = plotCircle(amount, radius).map((position, i) => (
      <IShard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scale[0], scale[1])}
        key={`l${i}`}
      />
    ))
    return <group ref={largeRef}>{shards}</group>
  }, [])

  const geom = useMemo(() => {
    const geom = new THREE.ConeGeometry(3, 10, 3, 1)
    geom.rotateX(-Math.PI / 2)
    geom.rotateY(Math.PI)
    return geom
  }, [])

  return (
    <Instances geometry={geom} rotation={[0, 3, 0]}>
      <meshStandardMaterial color="black" />

      {smallGroup}
      {mediumGroup}
      {largeGroup}
    </Instances>
  )
}
