import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'
import { plotCircle } from '@/util'

import { Obelisk, Shard } from '../components/'

const radius = 300

const shardAmount = 120
const shardScaleMin = 4
const shardScaleMax = 6

const obeliskAmount = 12
const obeliskScaleMin = 3
const obeliskScaleMax = 5

const maxSpeed = 3

type Props = JSX.IntrinsicElements['group']

export function OuterRim({ ...group }: Props) {
  const ref = useRef<THREE.Group>(null!)
  const speedRef = useRef<number>(0.01)

  const floatingState = useBastetStore(state => state.floatingState)
  useFrame((_, delta) => {
    if (floatingState) {
      ref.current.rotation.y -= speedRef.current * delta
      damp(speedRef, 'current', maxSpeed, 60, delta)
    }
  })

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
