import { useMemo } from 'react'
import { Mesh } from 'three'

import { LandscapeCone } from './LandscapeCone'

type Props = JSX.IntrinsicElements['group']

export function SceneLandscape({ ...group }: Props) {
  const inner = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -200; i <= 200; i += 80) {
      const x = 200 * Math.sin((i * (2 * Math.PI)) / 400)
      const z = 200 * Math.cos((i * (2 * Math.PI)) / 400)

      objects.push(
        <LandscapeCone
          position={[x, 0, z]}
          rotation={[0, (2 * Math.PI) / 2, 0]}
        />
      )
    }
    return objects
  }, [])

  const outerRadius = 1000
  const step = 20
  const scale = 1

  const outer = useMemo(() => {
    const objects: JSX.Element[] = []
    for (let i = -outerRadius; i <= outerRadius; i += step) {
      const x = outerRadius * Math.sin((i * (2 * Math.PI)) / (2 * outerRadius))
      const z = outerRadius * Math.cos((i * (2 * Math.PI)) / (2 * outerRadius))

      objects.push(
        <LandscapeCone
          position={[x, 0, z]}
          rotation={[0, (Math.random() * 4 * Math.PI) / 2, 0]}
          scale={Math.random() + scale}
        />
      )
    }
    return objects
  }, [])

  return (
    <group {...group}>
      <LandscapeCone position={[-200, 0, -200]} />
      {...inner}
      {...outer}
    </group>
  )
}
