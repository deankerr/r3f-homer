import { useMemo } from 'react'

import { Shard } from '../components/'

type Props = JSX.IntrinsicElements['group']

export function InnerRim({ ...group }: Props) {
  const innerObjects = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -200; i <= 200; i += 80) {
      const x = 200 * Math.sin((i * (2 * Math.PI)) / 400)
      const z = 200 * Math.cos((i * (2 * Math.PI)) / 400)

      objects.push(
        <Shard position={[x, 0, z]} rotation={[0, 0, 0]} scale={1.5} />
      )
    }
    return objects
  }, [])

  return <group {...group}>{...innerObjects}</group>
}
