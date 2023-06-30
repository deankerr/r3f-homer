import { useMemo } from 'react'

import { Shard } from '../components/'

type Props = JSX.IntrinsicElements['group'] & { mainColor: string }

export function InnerRim({ mainColor, ...group }: Props) {
  const radius = 60
  const step = 5

  const innerObjects = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -radius; i <= radius; i += step) {
      const x = radius * Math.sin(((i * (2 * Math.PI)) / radius) * 2)
      const z = radius * Math.cos(((i * (2 * Math.PI)) / radius) * 2)

      objects.push(
        <Shard
          position={[x, 0, z]}
          rotation={[0, 0, 0]}
          scale={1.5}
          mainColor={mainColor}
        />
      )
    }
    return objects
  }, [mainColor])

  return <group {...group}>{...innerObjects}</group>
}
