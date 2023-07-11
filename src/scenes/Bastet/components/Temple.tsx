import { Float } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Group } from 'three'

import { Orb, Pyramid } from '.'

export function Temple() {
  const ref = useRef<Group>(null!)

  const config = useControls('main', {
    orb: false,
  })

  useFrame((_, delta) => {
    ref.current.rotation.y += 0.05 * delta
  })

  return (
    <group scale={4.0} ref={ref}>
      <Pyramid position={[0, 0, 0]} />
      <Float>
        <Orb position={[0, 19, 0]} visible={config.orb} />
        <Orb position={[0, -19, 0]} visible={config.orb} />
      </Float>
    </group>
  )
}
