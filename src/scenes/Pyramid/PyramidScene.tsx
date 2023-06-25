import {
  Box,
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { Floor } from './Floor'
import { Lights } from './Lights'
import { Obelisk } from './Obelisk'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'
import { ShaderFX } from './ShaderFX'

export function PyramidScene() {
  const config = useControls(
    'camera',
    {
      autoRotate: false,
      positionX: 0,
      positionY: 10,
      positionZ: 50,
      targetX: 0,
      targetY: 6,
      targetZ: 0,
    },
    { collapsed: true }
  )

  const configEffects = useControls('enable ShaderFX', { enable: false })

  const cams = [
    [config.positionX, config.positionY, config.positionZ],
    [0, 30, 60],
    [0, 60, 90],
    [0, 80, 120],
    [0, 20, 160],
  ] as [number, number, number][]

  const cinema = useControls('cinema', {
    autoIncrement: false,
    pos: { value: 0, min: 0, max: cams.length - 1, step: 1 },
  })

  const [camPos, setCamPos] = useState(0)

  const nextCam = useCallback(() => {
    if (cinema.autoIncrement) {
      const next = camPos + 1
      setCamPos(next >= cams.length ? 0 : next)
    }
  }, [camPos, cams.length, cinema.autoIncrement])

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

      <PyrText
        text="DEAN.TAXI"
        position={[0, 80, -100]}
        rotation={[Math.PI / 8, 0, 0]}
        scale={1}
      />

      <group position={[0, 0, 0]} scale={1}>
        <Pyramid position={[0, 0.1, 0]} onClick={nextCam} />
        <Orb position={[0, 20, 0]} scale={1} />
      </group>

      <group>
        <Obelisk position={[-30, 0.1, 0]} />
        <Obelisk position={[30, 0.1, 0]} />
      </group>

      {/* <Obelisk position={[0, 0.1, 27]} /> */}
      {/* <Obelisk position={[0, 0.1, -27]} /> */}

      {/* stage */}
      <Stars radius={100} />

      <Floor />
      <Box
        args={[800, 400, 800]}
        position={[0, 190, 0]}
        material-side={THREE.BackSide}
        material-color={0x000000}
      />

      <Lights />
      {/* <Environment preset="night" /> */}

      {/* Utility */}
      {configEffects.enable && <ShaderFX />}
      <Stats />

      <OrbitControls
        target={[config.targetX, config.targetY, config.targetZ]}
        autoRotate={config.autoRotate}
        autoRotateSpeed={8}
      />
    </>
  )
}
