import { OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { Lights } from '.'
import { Floor, URLText } from './components'
import { Obelisks, Shards, Starfield, Temple } from './features'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: false,
    rotateCam: true,
    r3fPerf: false,
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
      <PerspectiveCamera makeDefault {...cameraProps} />

      <URLText text="DEAN.TAXI" />
      <Temple />
      <Shards />
      <Obelisks />

      <Floor />
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
