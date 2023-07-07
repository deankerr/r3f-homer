import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, Shards } from './region'

export function PyramidScene() {
  const [setMainColor, setFloatingState, reset] = useBastetStore(state => [
    state.setMainColor,

    state.setFloatingState,
    state.reset,
  ])

  const config = useControls({
    main: folder({
      reset: { value: false, onChange: () => reset() },
      orbitControls: true,
      rotateCam: true,
      floatingState: {
        value: false,
        onChange: (v: boolean) => setFloatingState(v),
      },
      ground: true,
      effects: true,
      showPerf: true,
      mainColor: {
        value: 'orange',
        onChange: (mainColor: string) => {
          setMainColor(mainColor)
        },
      },
    }),
  })

  const cameraProps = useControls(
    'camera',
    {
      position: [0, 7, 120],
      target: [0, 10, 0],
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

      <URLText
        text="DEAN.TAXI"
        position={[100, 60, -150]}
        rotation={[(1 * Math.PI) / 8, (2 * -Math.PI) / 8, Math.PI / 8]}
        scale={1}
      />

      <Central scale={2.0} />
      <Shards />
      {/* <InstanceShards /> */}

      {/*  stage */}
      <Stars radius={300} />

      {config.ground && <Ground />}
      <Box
        args={[1500, 1500, 1500]}
        position={[0, 0, 0]}
        material-side={THREE.BackSide}
        material-color={0x000000}
        visible={true}
      />

      <Lights />

      {/* Utility */}
      {config.effects && <Effects />}

      {/* <Stats /> */}
      {config.showPerf && <Perf position="bottom-left" antialias={false} />}

      {config.orbitControls && <OrbitControls {...cameraProps} />}
    </>
  )
}
