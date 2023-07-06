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
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

const initCameraPos = { x: 0, y: 10, z: 80 }
const initCameraTarget: [number, number, number] = [0, 10, 0]

export function PyramidScene() {
  const [setMainColor, reset] = useBastetStore(state => [
    state.setMainColor,
    state.reset,
  ])

  const [config, _setConfig] = useControls(() => ({
    main: folder({
      reset: { value: false, onChange: () => reset() },
      orbitControls: true,
      rotateCam: true,
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

  const floatingState = useBastetStore(state => state.floatingState)

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

      <Central />
      <InnerRim />
      <MiddleRim />
      <OuterRim />
      {/* <Shard position={[60, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} /> */}

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

      {config.orbitControls && <OrbitControls target={initCameraTarget} />}
    </>
  )
}
