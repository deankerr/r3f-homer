import { useMemo } from 'react'

import { Shard } from '../components/'

type Props = JSX.IntrinsicElements['group']

export function InnerRim({ ...group }: Props) {
  const radius = 90
  const step = 5

  const innerObjects = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -radius; i <= radius; i += step) {
      const x = radius * Math.sin(((i * (2 * Math.PI)) / radius) * 2)
      const z = radius * Math.cos(((i * (2 * Math.PI)) / radius) * 2)

      objects.push(
        <Shard position={[x, 0, z]} rotation={[0, 0, 0]} scale={1.5} />
      )
    }
    return objects
  }, [])

  return <group {...group}>{...innerObjects}</group>
}
