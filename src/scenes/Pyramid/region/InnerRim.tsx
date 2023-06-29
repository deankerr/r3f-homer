import { useMemo } from 'react'

import { Obelisk } from '../components/Obelisk'
import { Shard } from '../components/Shard'

type Props = JSX.IntrinsicElements['group']

export function InnerRim({ ...group }: Props) {
  const innerObjects = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -200; i <= 200; i += 80) {
      const x = 200 * Math.sin((i * (2 * Math.PI)) / 400)
      const z = 200 * Math.cos((i * (2 * Math.PI)) / 400)

      objects.push(
        <Obelisk position={[x, 0, z]} rotation={[0, (2 * Math.PI) / 2, 0]} />
      )
    }
    return objects
  }, [])

  return <group {...group}>{...innerObjects}</group>
}
