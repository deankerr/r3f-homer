import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { damp3 } from 'maath/easing'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import * as THREE from 'three'

import { useBastetStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, MiddleRim, OuterRim, Shards, Spikes } from './region'

const initCameraPos = { x: 0, y: 7, z: 70 }
const initCameraTarget: [number, number, number] = [0, 10, 0]

export function PyramidScene() {
  const [setMainColor, reset, floatingState, setFloatingState] = useBastetStore(
    state => [
      state.setMainColor,
      state.reset,
      state.floatingState,
      state.setFloatingState,
    ]
  )

  const [config, _setConfig] = useControls(() => ({
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

    camera: folder(
      {
        pos: { value: initCameraPos, step: 1 },
        tar: initCameraTarget,
      },
      { collapsed: true }
    ),
  }))

  const targetPos = useRef<THREE.Vector3>(
    new THREE.Vector3(...initCameraTarget)
  )

  useFrame(state => {
    //* rotate camera
    if (config.rotateCam && !config.orbitControls) {
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 2) * initCameraPos.z
      state.camera.position.z = Math.cos(angle / 2) * initCameraPos.z
      state.camera.lookAt(targetPos.current)
    }
    if (floatingState && !config.orbitControls) {
      damp3(state.camera.position, [0, 0, 0], 5)
      damp3(targetPos.current, [0, 0, 0], 7)
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[config.pos.x, config.pos.y, config.pos.z]}
      />

      <URLText
        text="DEAN.TAXI"
        position={[100, 60, -150]}
        rotation={[(1 * Math.PI) / 8, (2 * -Math.PI) / 8, Math.PI / 8]}
        scale={1}
      />

      <Central scale={1.0} />
      <Shards />
      {/* <Spikes /> */}
      {/* <MiddleRim /> */}
      {/* <OuterRim /> */}

      {/* stage */}
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

      {/* <axesHelper args={[100]} position={[0, 20, 0]} /> */}

      {config.orbitControls && (
        <OrbitControls
          position={[initCameraPos.x, initCameraPos.y, initCameraPos.z]}
          target={initCameraTarget}
        />
      )}
    </>
  )
}
