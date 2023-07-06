import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'
import { plotCircle } from '@/util'

import { useOrbitSwarm } from '..'
import { Obelisk, Shard } from '../components/'

const radius = 500

const shardAmount = 120
const shardScaleMin = 4
const shardScaleMax = 6

const obeliskAmount = 12
const obeliskScaleMin = 3
const obeliskScaleMax = 4

const maxSpeed = 2

type Props = JSX.IntrinsicElements['group']

export function OuterRim({ ...group }: Props) {
  const ref = useRef<THREE.Group>(null!)

  useOrbitSwarm(ref, maxSpeed, 1)

  const shards = useMemo(() => {
    const positions = plotCircle(shardAmount, radius, 0)

    return positions.map((position, index) => (
      <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(shardScaleMin, shardScaleMax)}
        key={`s+${index}`}
      />
    ))
  }, [])

  const obelisks = useMemo(() => {
    const positions = plotCircle(obeliskAmount, radius)

    return positions.map((position, index) => (
      <Obelisk
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(obeliskScaleMin, obeliskScaleMax)}
        key={`o+${index}`}
      />
    ))
  }, [])

  return (
    <group ref={ref} {...group}>
      {...shards}
      {...obelisks}
    </group>
  )
}
