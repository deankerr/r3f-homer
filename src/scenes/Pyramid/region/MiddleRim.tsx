import { useMemo } from 'react'

import { Shard } from '../components/'

type Props = JSX.IntrinsicElements['group'] & { mainColor: string }

export function MiddleRim({ mainColor, ...group }: Props) {
  const radius = 175
  const step = 10
  const scaleMin = 1
  const scaleMax = 2

  const debris = useMemo(() => {
    const objects: JSX.Element[] = []

    // shard "hills"
    for (let i = -radius; i < radius; i += step) {
      const x = radius * Math.sin((i * (2 * Math.PI)) / (2 * radius))
      const z = radius * Math.cos((i * (2 * Math.PI)) / (2 * radius))

      const rotation: [number, number, number] = [
        -Math.PI / 2,
        0,
        Math.random() * 2 * Math.PI,
      ] // supine

      const scale = Math.random() * (scaleMax - scaleMin) + scaleMin

      objects.push(
        <Shard
          position={[x, 0, z]}
          rotation={rotation}
          scale={scale}
          mainColor={mainColor}
        />
      )
    }

    return objects
  }, [mainColor])

  return <group {...group}>{...debris}</group>
}

// [0, Math.random() * 2 * Math.PI, 0] // erect
