import { CameraControls, Grid } from '@react-three/drei'
import { Canvas, invalidate, useFrame, useThree } from '@react-three/fiber'
import { Leva, buttonGroup, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { useEffect, useRef, useState } from 'react'
import { Provider } from 'react-redux'
import { DoubleSide, Group, Vector3Tuple } from 'three'

import { Board } from './components/Board'
import { MeshTest } from './components/MeshTest'
import { hexxStore } from './store'

function Scene() {
  const controlsRef = useRef<CameraControls>(null!)
  useZoomToControls(controlsRef)

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

  // * fit camera to board
  const boardRef = useRef<Group>(null!)

  const [initialZoomDone, setInitialZoomDone] = useState(false)
  useFrame(() => {
    if (!initialZoomDone && controlsRef.current && boardRef.current) {
      void controlsRef.current.fitToBox(boardRef.current, true)
      setInitialZoomDone(true)
    }
  })

  // * board rotation
  function rotateBoard(to: Vector3Tuple) {
    boardRef.current.rotation.set(...to)
    void controlsRef.current.fitToBox(boardRef.current, true)
  }
  useControls({
    'board rotation': buttonGroup({ zero: () => rotateBoard([0, 0, 0]), one: () => rotateBoard([0, 0, Math.PI / 6]) }),
  })

  return (
    <>
      <CameraControls ref={controlsRef} />

      <Board ref={boardRef} name="board" />

      <pointLight position={[-10, 10, 20]} intensity={2} />
      <ambientLight intensity={0.2} />

      <MeshTest position={[0, 10, 50]} name="meshtest" />
      <Utility />
    </>
  )
}

export function Component() {
  return (
    <Provider store={hexxStore}>
      <Leva collapsed />
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
        value: false,
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

function useZoomToControls(controlsRef: React.MutableRefObject<CameraControls>) {
  const { children } = useThree(state => state.scene)

  const list: { [key: string]: () => void } = {}

  children.forEach(t => {
    if (t.name) list[t.name] = () => void controlsRef.current.fitToBox(t, true)
  })

  useControls(
    {
      zoomTo: buttonGroup(list),
    },
    [children.length]
  )
}
