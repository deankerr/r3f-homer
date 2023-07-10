import { useControls } from 'leva'
import { useRef } from 'react'
import { Group } from 'three'

import { Cat } from '@/components/models/Cat'

import { Orb, Pyramid } from '.'

export function Temple() {
  const ref = useRef<Group>(null!)

  const config = useControls('main', {
    orb: true,
    cats: true,
  })

  const catProps = {
    color: 'orange',
    scale: 30,
    visible: config.cats,
  }

  return (
    <group scale={2.0} ref={ref}>
      <Pyramid position={[0, 0.05, 0]} />
      <Orb position={[0, 19, 0]} visible={config.orb} />

      <Cat
        {...catProps}
        position={[20, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Cat
        {...catProps}
        position={[-20, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Cat {...catProps} position={[0, 0, 20]} rotation={[0, Math.PI, 0]} />
      <Cat {...catProps} position={[0, 0, -20]} rotation={[0, 0, 0]} />
    </group>
  )
}
