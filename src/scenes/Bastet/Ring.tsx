import { Object3DProps, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, MathUtils, Vector3 } from 'three'

import { ringPositions } from '@/util'

type Props = {
  Body: React.ComponentType<Object3DProps>
  amount: number
  radius: number
  orbit: number
  spread: number
  size: [number, number]
}

export function Ring(props: Props) {
  const { radius, amount, orbit, spread, size, Body } = props
  const ref = useRef<Group>(null!)

  const [scaleMin, scaleMax] = size

  const elements = useMemo(() => {
    return ringPositions(radius, amount).map((position, i) => {
      const scale = MathUtils.randFloat(scaleMin, scaleMax)
      position.x += MathUtils.randFloat(-spread, spread)
      position.y += MathUtils.randFloat(-spread, spread)
      position.z += MathUtils.randFloat(-spread, spread)
      return (
        <group position={position} scale={scale} key={i}>
          <Body />
        </group>
      )
    })
  }, [radius, amount, scaleMin, scaleMax, Body, spread])

  //* Orbit
  useFrame((_, delta) => {
    ref.current.rotation.y += orbit * delta
  })

  return <group ref={ref}>{elements}</group>
}
