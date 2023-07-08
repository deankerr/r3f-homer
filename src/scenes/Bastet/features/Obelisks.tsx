import { useMemo } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { Obelisk } from '../components'

const config = {
  radius: 500,
  amount: 10,
  scale: [5, 7],
}

export function Obelisks() {
  const obelisks = useMemo(() => {
    const { amount, radius, scale } = config
    return plotCircle(amount, radius).map((position, i) => (
      <Obelisk
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={THREE.MathUtils.randFloat(scale[0], scale[1])}
        key={`l${i}`}
      />
    ))
  }, [])

  return <>{obelisks}</>
}
