import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

import { plotCircle } from '@/util'

import { useOrbitSwarm } from '..'
import { Shard } from '../components'

export function Spikes() {
  const config = useControls(
    'Spikes',
    {
      rings: 8,
      amountStart: 6,
      amountStep: 2,
      radiusStart: 90,
      radiusStep: 50,
    },
    { collapsed: true }
  )

  const ref = useRef<THREE.Group>(null!)
  useOrbitSwarm(ref, 1, 1)

  //* Mesh construction
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

  return (
    <group ref={ref} position={[0, 5.2, 0]}>
      {...meshes}
    </group>
  )
}
