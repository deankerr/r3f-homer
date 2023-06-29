import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { Lights, ShaderFX } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

export function PyramidScene() {
  const { autoRotate, camAdvance } = useControls({
    autoRotate: false,
    camAdvance: false,
  })
  const config = useControls(
    'initial camera',
    {
      autoRotate: false,
      positionX: 0,
      positionY: 12,
      positionZ: 100,
      targetX: 0,
      targetY: 14,
      targetZ: 0,
    },
    { collapsed: true }
  )

  const configEffects = useControls('enable ShaderFX', { enable: false })

  const cams = [
    [config.positionX, config.positionY, config.positionZ],
    [0, 30, 200],
    [0, 60, 90],
    [0, 80, 120],
    [0, 20, 160],
  ] as [number, number, number][]

  const [camPos, setCamPos] = useState(0)

  const nextCam = useCallback(() => {
    if (camAdvance) {
      const next = camPos + 1
      setCamPos(next >= cams.length ? 0 : next)
    }
  }, [camPos, cams.length, camAdvance])

  const intervalRef = useRef<NodeJS.Timer>()

  useEffect(() => {
    // TODO switch to useFrame
    // TODO CameraControls
    intervalRef.current = setInterval(nextCam, 3000)

    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  }, [nextCam])

  return (
    <>
      <PerspectiveCamera makeDefault position={cams[camPos]} />

      <group position={[0, 40, 0]}>
        {/* <Sun position={[0, 200, 1000]} scale={200} /> */}
        {/* <Mask position={[-5, -80, 600]} scale={9} /> */}
      </group>

      <URLText
        text="DEAN.TAXI"
        position={[100, 120, -150]}
        rotation={[(2 * Math.PI) / 8, -Math.PI / 8, Math.PI / 8]}
        scale={1}
      />

      <Central />
      <InnerRim />
      <MiddleRim />
      <OuterRim />

      {/* stage */}
      <Stars radius={600} />

      <Ground />
      <Box
        args={[2600, 3000, 2600]}
        position={[0, 0, 0]}
        material-side={THREE.BackSide}
        material-color={0x000000}
        visible={true}
      />

      <Lights />
      {/* <Environment preset="night" /> */}

      {/* Utility */}
      {configEffects.enable && <ShaderFX />}
      {/* <Effect /> */}
      <Stats />

      {/* <axesHelper args={[100]} position={[0, 20, 0]} /> */}

      <OrbitControls
        target={[config.targetX, config.targetY, config.targetZ]}
        autoRotate={config.autoRotate}
        autoRotateSpeed={8}
      />
    </>
  )
}
