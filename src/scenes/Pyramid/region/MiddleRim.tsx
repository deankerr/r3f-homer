import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'
import { plotCircle } from '@/util'

import { useOrbitSwarm } from '..'
import { Shard } from '../components/'

const amount = 30
const radius = 300

const scaleMin = 2
const scaleMax = 4

const maxSpeed = 2

type Props = JSX.IntrinsicElements['group']

export function MiddleRim({ ...group }: Props) {
  const ref = useRef<THREE.Group>(null!)

  useOrbitSwarm(ref, maxSpeed, -1)

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

  return (
    <group ref={ref} {...group}>
      {...components}
    </group>
  )
}
