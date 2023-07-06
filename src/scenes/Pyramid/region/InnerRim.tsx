import { useMemo } from 'react'

import { plotCircle } from '@/util'

import { Shard } from '../components/'

const amount = 6
const radius = 90

type Props = JSX.IntrinsicElements['group']

export function InnerRim({ ...group }: Props) {
  const components = useMemo(() => {
    const positions = plotCircle(amount, radius)

    return positions.map((position, index) => (
      <Shard position={position} scale={1.5} key={index} />
    ))
  }, [])

  return <group {...group}>{...components}</group>
}
