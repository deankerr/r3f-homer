import { useControls } from 'leva'
import { useRef } from 'react'
import { Group } from 'three'

import { Cat } from '@/components/models/Cat'
import { useBastetStore } from '@/store'

import { Orb, Pyramid } from '../components'

export function Temple() {
  const ref = useRef<Group>(null!)

  const config = useControls('main', {
    orb: true,
    cats: true,
  })

  const mainColor = useBastetStore(state => state.mainColor)

  return (
    <group scale={2.0} ref={ref}>
      <Pyramid position={[0, 0.05, 0]} />
      <Orb position={[0, 19, 0]} visible={config.orb} />

      <Cat
        position={[20, 0, 0]}
        scale={30}
        rotation={[0, -Math.PI / 2, 0]}
        color={mainColor}
        visible={config.cats}
      />
      <Cat
        position={[-20, 0, 0]}
        scale={30}
        rotation={[0, Math.PI / 2, 0]}
        color={mainColor}
        visible={config.cats}
      />
      <Cat
        position={[0, 0, 20]}
        scale={30}
        rotation={[0, Math.PI, 0]}
        color={mainColor}
        visible={config.cats}
      />
      <Cat
        position={[0, 0, -20]}
        scale={30}
        rotation={[0, 0, 0]}
        color={mainColor}
        visible={config.cats}
      />
    </group>
  )
}
