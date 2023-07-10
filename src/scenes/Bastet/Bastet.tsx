import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { Lights, Ring } from '.'
import { Floor, Obelisk, Shard, URLText } from './components'
import { Obelisks, Shards, Starfield, Temple } from './features'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: true,
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

  // console.log(useThree(state => state.camera).toJSON())

  return (
    <>
      <PerspectiveCamera fov={60} far={3000} makeDefault {...cameraProps} />

      <URLText text="DEAN.TAXI" />
      <Temple />
      {/* <Shards /> */}
      {/* <Obelisks /> */}

      <Ring
        Body={Shard}
        radius={100}
        amount={8}
        orbit={0.1}
        spread={10}
        size={[1, 6]}
      />

      <Ring
        Body={Obelisk}
        radius={300}
        amount={8}
        orbit={0.2}
        spread={10}
        size={[1, 6]}
      />

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

/* 
 <Bodies body={Shard} size={[1, 2]} 
*/
