import { useMemo } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { Shard } from '../components/'

const amount = 30
const radius = 175

const scaleMin = 2
const scaleMax = 4

type Props = JSX.IntrinsicElements['group']

export function MiddleRim({ ...group }: Props) {
  const components = useMemo(() => {
    const positions = plotCircle(amount, radius, 0)

    return positions.map((position, index) => (
      <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scaleMin, scaleMax)}
        key={index}
      />
    ))
  }, [])

  return <group {...group}>{...components}</group>
}
