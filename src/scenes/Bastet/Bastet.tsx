import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { Lights, Ring } from '.'
import {
  GridPlane,
  Obelisk,
  Shard,
  Starfield,
  Temple,
  URLText,
} from './components'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: true,
    rotateCam: true,
    r3fPerf: true,
  })

  //* camera
  const cameraProps = useControls(
    'camera',
    {
      position: [124, 18, 124],
      target: [0, 14, 0],
    },
    { collapsed: true }
  )

  useFrame(state => {
    if (config.rotateCam && !config.orbitControls) {
      // rotate
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 10) * cameraProps.position[2]
      state.camera.position.z = Math.cos(angle / 10) * cameraProps.position[2]
      state.camera.lookAt(new THREE.Vector3(...cameraProps.target))
    }
  })

  return (
    <>
      <PerspectiveCamera fov={60} far={3000} makeDefault {...cameraProps} />

      <URLText text="DEAN.TAXI" />
      <Temple />

      <Ring
        Body={Shard}
        radius={400}
        amount={32}
        orbit={0.04}
        spread={30}
        size={[4, 5]}
      />

      <Ring
        Body={Obelisk}
        radius={600}
        amount={10}
        orbit={0.03}
        spread={1}
        size={[7, 7]}
      />

      <Ring
        Body={Shard}
        radius={1000}
        amount={100}
        orbit={0.08}
        spread={300}
        size={[6, 8]}
      />

      <Ring
        Body={Shard}
        radius={1500}
        amount={200}
        orbit={0.04}
        spread={400}
        size={[15, 20]}
      />

      <Starfield />

      <Lights />

      {config.orbitControls && <OrbitControls {...cameraProps} />}
      {config.r3fPerf && (
        <Perf
          position="bottom-left"
          antialias={false}
          logsPerSecond={2}
          chart={{ hz: 1, length: 30 }}
        />
      )}
    </>
  )
}
