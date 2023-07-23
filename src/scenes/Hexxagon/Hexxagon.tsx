import { CameraControls, Grid } from '@react-three/drei'
import { Canvas, invalidate, useThree } from '@react-three/fiber'
import { Leva, buttonGroup, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useCallback, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { DoubleSide, Group, Object3D } from 'three'

import { useRemountKey } from '@/util'

import { Game } from './components/Game'
import { hexxStore } from './store'

function Scene() {
  const controlsRef = useRef<CameraControls>(null!)

  // * fov config
  const config = useControls({
    fov: { value: 40, min: 1, max: 100, step: 5 },
  })

  const camera = useThree(state => state.camera)
  useEffect(() => {
    if ('fov' in camera) {
      camera.fov = config.fov
      camera.updateProjectionMatrix()
      invalidate()
    }
  }, [camera, config.fov])

  // * fit objects to box
  const fitToCamera = useCallback((targetRef: React.MutableRefObject<Object3D>) => {
    if (!controlsRef.current || !targetRef.current)
      return console.error('fitToCamera: invalid ref', controlsRef, targetRef)
    void controlsRef.current.fitToBox(targetRef.current, true)
  }, [])

  const gameRef = useRef<Group>(null!)
  const meshTestRef = useRef<Group>(null!)

  useControls({
    fit: buttonGroup({
      game: () => fitToCamera(gameRef),
      test: () => fitToCamera(meshTestRef),
    }),
  })

  // * fit camera to game
  useEffect(() => {
    fitToCamera(gameRef)
  }, [fitToCamera])

  const dummyKey = useRemountKey()
  return (
    <>
      <CameraControls ref={controlsRef} />

      <Game ref={gameRef} key={dummyKey} />

      <pointLight position={[-10, 10, 20]} intensity={2} />
      <ambientLight intensity={0.2} />

      {/* <MeshTest ref={meshTestRef} position={[0, 10, 50]} name="meshtest" /> */}
      <Utility />
    </>
  )
}

export function Component() {
  return (
    <Provider store={hexxStore}>
      <Leva collapsed={false} />
      <Canvas frameloop="demand" camera={{ position: [0, 0, 20], fov: 40 }}>
        <Scene />
      </Canvas>
    </Provider>
  )
}
Component.displayName = 'Hexxagon'

function Utility() {
  const setFrameloop = useThree(state => state.setFrameloop)

  const config = useControls(
    'utility',
    {
      grid: false,
      perf: {
        value: true,
        onChange: (v: boolean) => {
          setFrameloop(v ? 'always' : 'demand')
        },
        transient: false,
      },
    },
    { collapsed: true }
  )

  return (
    <>
      {/* <StatsGl minimal /> */}
      {config.grid && <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} cellColor={'red'} />}
      {config.grid && <axesHelper visible={config.grid} args={[20]} />}
      {config.perf && <Perf logsPerSecond={1} antialias={false} chart={{ hz: 1 }} position={'top-left'} />}
    </>
  )
}
