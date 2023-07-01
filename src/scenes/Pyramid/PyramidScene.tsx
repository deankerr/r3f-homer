import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { usePyramidStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

export function PyramidScene() {
  const config = useControls({
    autoRotate: false,
    camAdvance: false,
    effects: true,
    showPerf: false,
  })

  const setMainColor = usePyramidStore((state) => state.setMainColor)

  useControls({
    mainColor: {
      value: 'orange',
      onChange: (mainColor: string) => {
        setMainColor(mainColor)
      },
    },
  })

  const configInitCam = useControls(
    'initial camera',
    {
      autoRotate: false,
      positionX: { value: 0, min: -200, max: 200, step: 1 },
      positionY: { value: 6, min: -200, max: 200, step: 1 },
      positionZ: { value: 50, min: -200, max: 200, step: 1 },
      targetX: { value: 0, min: -200, max: 200, step: 1 },
      targetY: { value: 11, min: -200, max: 200, step: 1 },
      targetZ: { value: 0, min: -200, max: 200, step: 1 },
    },
    { collapsed: true }
  )

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
