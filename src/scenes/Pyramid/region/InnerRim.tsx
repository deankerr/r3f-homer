import { useFrame } from '@react-three/fiber'
import { damp } from 'maath/easing'
import { useMemo, useRef } from 'react'
import { Group } from 'three'

import { useBastetStore } from '@/store'
import { plotCircle } from '@/util'

import { Shard } from '../components/'

const amount = 6
const radius = 90

const maxSpeed = 3

type Props = JSX.IntrinsicElements['group']

export function InnerRim(props: Props) {
  const ref = useRef<Group>(null!)
  const speedRef = useRef<number>(0.01)

  const floatingState = useBastetStore(state => state.floatingState)
  useFrame((_, delta) => {
    if (floatingState) {
      ref.current.rotation.y += speedRef.current * delta
      damp(speedRef, 'current', maxSpeed, 60, delta)
    }
  })

  const components = useMemo(() => {
    const positions = plotCircle(amount, radius)

    return positions.map((position, index) => (
      <Shard
        position={position}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.5}
        key={index}
      />
    ))
  }, [])

  return (
    <group ref={ref} {...props}>
      {...components}
    </group>
  )
}
