import {
  Box,
  Environment,
  Grid,
  Html,
  OrbitControls,
  PerspectiveCamera,
  Stars,
  Stats,
} from '@react-three/drei'
import { useControls } from 'leva'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { Sun } from '@/components'

import { Effect } from './Effect'
import { Floor } from './Floor'
import { LandscapeCone } from './LandscapeCone'
import { LandscapeOctahedron } from './LandscapeOctahedron'
import { Lights } from './Lights'
import { Mask } from './Mask'
import { Obelisk } from './Obelisk'
import { ObeliskCapsule } from './ObeliskCapsule'
import { ObeliskCone } from './ObeliskCone'
import { Orb } from './Orb'
import { PyrText } from './PyrText'
import { Pyramid } from './Pyramid'
import { SceneCenter } from './SceneCenter'
import { SceneLandscape } from './SceneLandscape'
import { ShaderFX } from './ShaderFX'

export function PyramidScene() {
  const config = useControls(
    'camera',
    {
      autoRotate: false,
      positionX: 0,
      positionY: 10,
      positionZ: 200,
      targetX: 0,
      targetY: 6,
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

      <group position={[0, 40, 0]}>
        {/* <Sun position={[0, 200, 1000]} scale={200} /> */}
        {/* <Mask position={[-5, -80, 600]} scale={9} /> */}
      </group>

      <PyrText
        text="DEAN.TAXI"
        position={[100, 120, -150]}
        rotation={[(2 * Math.PI) / 8, -Math.PI / 8, Math.PI / 8]}
        scale={1}
      />

      <SceneCenter />
      <SceneLandscape />

      <ObeliskCapsule position={[300, 0, -200]} />
      {/* <LandscapeOctahedron
        position={[-200, 0, 150]}
        rotation={[-Math.PI / 4, 0, 0]}
      /> */}

      {/* stage */}
      <Stars radius={600} />

      <Floor />
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
      <Effect />
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
