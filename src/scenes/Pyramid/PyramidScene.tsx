import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { usePyramidStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

export function PyramidScene() {
  const setMainColor = usePyramidStore((state) => state.setMainColor)

  const config = useControls({
    rotateCam: true,
    camAdvance: false,
    effects: true,
    showPerf: false,
    mainColor: {
      value: 'orange',
      onChange: (mainColor: string) => {
        setMainColor(mainColor)
      },
    },
  })

  const {
    positionX,
    positionY,
    positionZ,
    targetX,
    targetY,
    targetZ,
    rotationX,
  } = useControls(
    'initial camera',
    {
      autoRotate: false,
      positionX: { value: 0, min: -200, max: 200, step: 1 },
      positionY: { value: 8, min: -200, max: 200, step: 1 },
      positionZ: { value: 50, min: -200, max: 200, step: 1 },
      targetX: { value: 0, min: -200, max: 200, step: 1 },
      targetY: { value: 11, min: -200, max: 200, step: 1 },
      targetZ: { value: 0, min: -200, max: 200, step: 1 },
      rotationX: { value: 0.1, min: -Math.PI / 2, max: Math.PI / 2, step: 0.1 },
    },
    { collapsed: true }
  )

  //* rotate camera
  useFrame((state, delta) => {
    if (config.rotateCam) {
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle) * positionZ
      state.camera.position.z = Math.cos(angle) * positionZ
      state.camera.lookAt(targetX, targetY, targetZ)
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[positionX, positionY, positionZ]}
        rotation={[rotationX, 0, 0]}
      />

      <group position={[0, 40, 0]}>
        {/* <Sun position={[0, 200, 1000]} scale={200} /> */}
        {/* <Mask position={[-5, -80, 600]} scale={9} /> */}
      </group>

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
      {/* <Environment preset="night" /> */}

      {/* Utility */}
      {config.effects && <Effects />}

      {/* <Stats /> */}
      {config.showPerf && <Perf position="top-left" antialias={false} />}

      {/* <axesHelper args={[100]} position={[0, 20, 0]} /> */}

      {/* <OrbitControls
        target={[
          configInitCam.targetX,
          configInitCam.targetY,
          configInitCam.targetZ,
        ]}
        autoRotate={config.autoRotate}
        autoRotateSpeed={8}
      /> */}
    </>
  )
}
