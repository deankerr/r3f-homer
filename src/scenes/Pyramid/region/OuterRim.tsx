import { useMemo } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { Obelisk, Shard } from '../components/'

const radius = 300

const shardAmount = 120
const shardScaleMin = 4
const shardScaleMax = 6

const obeliskAmount = 12
const obeliskScaleMin = 3
const obeliskScaleMax = 5

type Props = JSX.IntrinsicElements['group']

export function OuterRim({ ...group }: Props) {
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
    <group {...group}>
      {...shards}
      {...obelisks}
    </group>
  )
}
