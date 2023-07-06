import { useControls } from 'leva'
import { useMemo } from 'react'

import { plotCircle } from '@/util'

import { Shard } from '.'

export function Spikes() {
  const config = useControls('Spikes', {
    rings: 8,
    amountStart: 6,
    amountStep: 2,
    radiusStart: 60,
    radiusStep: 40,
  })

  const meshes = useMemo(() => {
    const rings: [number, number, number][][] = []

    for (let i = 0; i < config.rings; i++) {
      const amount = config.amountStart + i * config.amountStep
      const radius = config.radiusStart + i * config.radiusStep
      rings.push(plotCircle(amount, radius))
    }

    return rings.map(positions =>
      positions.map((position, index) => (
        <Shard
          position={position}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1}
          key={index}
        />
      ))
    )
  }, [config])

  return <group position={[0, 5.2, 0]}>{...meshes}</group>
}
