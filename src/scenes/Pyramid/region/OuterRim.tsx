import { useMemo } from 'react'

import { Obelisk, Shard } from '../components/'

type Props = JSX.IntrinsicElements['group']

export function OuterRim({ ...group }: Props) {
  const radius = 600
  const hillsStep = 10
  const hillScaleMin = 4
  const hillScaleMax = 6

  const obeliskStep = 100
  const obeliskScaleMin = 3
  const obeliskScaleMax = 5

  const edgeObjects = useMemo(() => {
    const objects: JSX.Element[] = []

    // shard "hills"
    for (let i = -radius; i < radius; i += hillsStep) {
      const x = radius * Math.sin((i * (2 * Math.PI)) / (2 * radius))
      const z = radius * Math.cos((i * (2 * Math.PI)) / (2 * radius))

      const rotation: [number, number, number] = [
        -Math.PI / 2,
        0,
        Math.random() * 2 * Math.PI,
      ] // supine

      const scale = Math.random() * (hillScaleMax - hillScaleMin) + hillScaleMin

      objects.push(
        <Shard position={[x, 0, z]} rotation={rotation} scale={scale} />
      )
    }

    // obelisks / erect shards
    for (let i = -radius; i < radius; i += obeliskStep) {
      const x = radius * Math.sin((i * (2 * Math.PI)) / (2 * radius))
      const z = radius * Math.cos((i * (2 * Math.PI)) / (2 * radius))

      const scale =
        Math.random() * (obeliskScaleMax - obeliskScaleMin) + obeliskScaleMin

      objects.push(
        // <Shard position={[x, 0, z]} rotation={rotation} scale={scale} />
        <Obelisk
          position={[x, 0, z]}
          rotation={[0, Math.random() * 2 * Math.PI, 0]}
          scale={scale}
        />
      )
    }

    return objects
  }, [])

  return <group {...group}>{...edgeObjects}</group>
}

// [0, Math.random() * 2 * Math.PI, 0] // erect
