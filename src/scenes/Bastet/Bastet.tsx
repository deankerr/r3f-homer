import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { Effects, Lights } from '.'
import { Floor, URLText } from './components'
import { Shards, Temple } from './features'

export function Bastet() {
  const config = useControls('main', {
    orbitControls: false,
    rotateCam: true,
    effects: true,
    r3fPerf: true,
    mainColor: 'orange',
    skybox: true,
    stars: true,
  })

  //* camera
  const cameraProps = useControls(
    'camera',
    {
      position: [118, 18, 118],
      target: [0, 14, 0],
    },
    { collapsed: true }
  )

  //* rotate camera
  useFrame(state => {
    if (config.rotateCam && !config.orbitControls) {
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 4) * cameraProps.position[2]
      state.camera.position.z = Math.cos(angle / 4) * cameraProps.position[2]
      state.camera.lookAt(new THREE.Vector3(...cameraProps.target))
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault {...cameraProps} />

      <URLText text="DEAN.TAXI" />

      <Temple />
      <Shards />
      <Floor />

      {config.stars && <Stars radius={300} />}
      <Box
        args={[1500, 1500, 1500]}
        material-side={THREE.BackSide}
        material-color={0x000000}
        visible={config.skybox}
      />

      <Lights />

      {config.effects && <Effects />}
      {config.orbitControls && <OrbitControls {...cameraProps} />}
      {config.r3fPerf && <Perf position="bottom-left" antialias={false} />}
    </>
  )
}
