import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useRef } from 'react'
import * as THREE from 'three'

import { usePyramidStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

const floatingYPos = 26

export function PyramidScene() {
  const setMainColor = usePyramidStore((state) => state.setMainColor)

  const [config, setConfig] = useControls(() => ({
    main: folder({
      orbitControls: false,
      rotateCam: true,
      camAdvance: false,
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
        pos: { value: { x: 0, y: 10, z: 80 }, step: 1 },
        tar: { value: { x: 0, y: 15, z: 0 }, step: 1 },
      },
      { collapsed: true }
    ),
  }))

  const floatingState = usePyramidStore((state) => state.floatingState)

  useFrame((state, delta) => {
    //* rotate camera
    if (config.rotateCam) {
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 2) * config.pos.z
      state.camera.position.z = Math.cos(angle / 2) * config.pos.z
      state.camera.lookAt(config.tar.x, config.tar.y, config.tar.z)
    }

    if (floatingState) {
      const { pos, tar } = config

      if (pos.y > 0) {
        const y = pos.y - delta
        setConfig({ pos: { ...pos, y } })
      }

      if (tar.y > 0) {
        const y = tar.y - delta / 0.8
        setConfig({ tar: { ...tar, y } })
      }
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

      {/* stage */}
      <Stars radius={300} />

      <Ground />
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
        <OrbitControls target={[config.tar.x, config.tar.y, config.tar.z]} />
      )}
    </>
  )
}
