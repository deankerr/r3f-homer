import { useMemo } from 'react'

import { Obelisk } from '../components/Obelisk'
import { Shard } from '../components/Shard'

type Props = JSX.IntrinsicElements['group']

export function OuterRim({ ...group }: Props) {
  const radius = 1000
  const step = 20
  const scale = 1

  const edgeObjects = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -radius; i <= radius; i += step) {
      const x = radius * Math.sin((i * (2 * Math.PI)) / (2 * radius))
      const z = radius * Math.cos((i * (2 * Math.PI)) / (2 * radius))

      objects.push(
        <Shard
          position={[x, 0, z]}
          rotation={[0, (Math.random() * 4 * Math.PI) / 2, 0]}
          scale={Math.random() + scale}
        />
      )
    }
    return objects
  }, [])

  return <group {...group}>{...edgeObjects}</group>
}
