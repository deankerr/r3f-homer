import {
  Box,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { Lights, ShaderFX } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

export function PyramidScene() {
  const config = useControls({
    autoRotate: false,
    camAdvance: false,
    showPerf: false,
  })

  const { mainColor } = useControls({ mainColor: 'orange' })

  const configInitCam = useControls(
    'initial camera',
    {
      autoRotate: false,
      positionX: { value: 0, min: -200, max: 200, step: 1 },
      positionY: { value: 4, min: -200, max: 200, step: 1 },
      positionZ: { value: 50, min: -200, max: 200, step: 1 },
      targetX: { value: 0, min: -200, max: 200, step: 1 },
      targetY: { value: 11, min: -200, max: 200, step: 1 },
      targetZ: { value: 0, min: -200, max: 200, step: 1 },
    },
    { collapsed: true }
  )

  const configEffects = useControls('enable ShaderFX', { enable: false })

  const cams = [
    [configInitCam.positionX, configInitCam.positionY, configInitCam.positionZ],
    [0, 4, 150],
    [0, 60, 120],
  ] as [number, number, number][]

  const [camPos, setCamPos] = useState(0)

  const nextCam = useCallback(() => {
    if (config.camAdvance) {
      const next = camPos + 1
      setCamPos(next >= cams.length ? 0 : next)
    }
  }, [camPos, cams.length, config.camAdvance])

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
        mainColor={mainColor}
      />

      <Central mainColor={mainColor} />
      <InnerRim mainColor={mainColor} />
      <MiddleRim mainColor={mainColor} />
      <OuterRim mainColor={mainColor} />

      {/* stage */}
      <Stars radius={300} />

      <Ground mainColor={mainColor} />
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
      {configEffects.enable && <ShaderFX />}
      {/* <Effect /> */}
      {/* <Stats /> */}
      {config.showPerf && <Perf position="top-left" antialias={false} />}

      {/* <axesHelper args={[100]} position={[0, 20, 0]} /> */}

      <OrbitControls
        target={[
          configInitCam.targetX,
          configInitCam.targetY,
          configInitCam.targetZ,
        ]}
        autoRotate={config.autoRotate}
        autoRotateSpeed={8}
      />
    </>
  )
}
