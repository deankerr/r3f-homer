import { Group, MathUtils } from 'three'

import { ringPositions } from '@/util'

import { Shard } from './components'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

type Props = {
  children?: React.ReactNode
  radius: number 
  amount: number
  orbit: number
  spread: [number, number]
  scale: [number, number]
}

export function Ring(props: Props) {
  const { radius, amount, orbit, spread, scale, children } = props
  const ref = useRef<Group>(null!)

  //* Orbit
  // useFrame((_, delta) => {
    

  return (
    <group>
      {ringPositions(radius, amount).map((position, i) => (
        <group ref={ref} position={position} scale={scale[0]} key={i}>
          {children}
        </group>
      ))}
    </group>
  )
}

/* 
  <Ring radius={500} amount={30} orbit={0.1} spread={[1, 2]} scale={[1,2]}>
    <Shard>
  </Ring>


  <Shard
        position={position}
        rotation={[0, Math.random() * 2 * Math.PI, 0]}
        scale={MathUtils.randFloat(...scale)}
        key={`l${i}`}
      />
*/
