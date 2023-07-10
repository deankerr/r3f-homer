import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Group, MathUtils } from 'three'

import { ringPositions } from '@/util'

type Props = {
  of: () => JSX.Element
  amount: number
  radius: number
  orbit: number
  spread: [number, number]
  size: [number, number]
}

export function Ring(props: Props) {
  const { radius, amount, orbit, spread, size, of } = props
  const ref = useRef<Group>(null!)

  const Body = of
  const [scaleMin, scaleMax] = size

  const elements = useMemo(() => {
    console.log('Ring: useMemo')

    return ringPositions(radius, amount).map((position, i) => {
      const scale = MathUtils.randFloat(scaleMin, scaleMax)
      return (
        <group position={position} scale={scale} key={i}>
          <Body />
        </group>
      )
    })
  }, [radius, amount, scaleMin, scaleMax, Body])

  //* Orbit
  useFrame((_, delta) => {
    ref.current.rotation.y += orbit * delta
  })

  return <group ref={ref}>{elements}</group>
}
