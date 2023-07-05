import { Box, OrbitControls, PerspectiveCamera, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import * as THREE from 'three'

import { usePyramidStore } from '@/store'

import { Effects, Lights } from '.'
import { Ground, URLText } from './components'
import { Central, InnerRim, MiddleRim, OuterRim } from './region'

export function PyramidScene() {
  const [mainColor, setMainColor, mainColorIsCycling] = usePyramidStore(
    (state) => [state.mainColor, state.setMainColor, state.mainColorIsCycling]
  )

  const config = useControls({
    main: folder({
      orbitControls: false,
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
    }),

    camera: folder(
      {
        positionX: { value: 0, min: 0, max: 50, step: 1 },
        positionY: { value: 10, min: 0, max: 50, step: 1 },
        positionZ: { value: 80, min: 40, max: 100, step: 1 },
        targetX: { value: 0, min: 0, max: 50, step: 1 },
        targetY: { value: 15, min: 0, max: 50, step: 1 },
        targetZ: { value: 0, min: 0, max: 50, step: 1 },
        rotationX: {
          value: 0.1,
          min: -Math.PI / 2,
          max: Math.PI / 2,
          step: 0.1,
        },
      },
      { collapsed: true }
    ),
  })

  useFrame((state, delta) => {
    //* rotate camera
    if (config.rotateCam) {
      const angle = state.clock.elapsedTime
      state.camera.position.x = Math.sin(angle / 2) * config.positionZ
      state.camera.position.z = Math.cos(angle / 2) * config.positionZ
      state.camera.lookAt(config.targetX, config.targetY, config.targetZ)
    }

    //* cycle color
    //! slow, switch to hue stepping?
    if (mainColorIsCycling) {
      const color = new THREE.Color(mainColor)
      color.offsetHSL(delta / 4, 0, 0)
      setMainColor('#' + color.getHexString())
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[config.positionX, config.positionY, config.positionZ]}
        rotation={[config.rotationX, 0, 0]}
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
      {config.showPerf && <Perf position="top-left" antialias={false} />}

      {/* <axesHelper args={[100]} position={[0, 20, 0]} /> */}

      {config.orbitControls && (
        <OrbitControls
          target={[config.targetX, config.targetY, config.targetZ]}
        />
      )}
    </>
  )
}
