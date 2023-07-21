import { Box, CameraControls, Edges, Grid, PerspectiveCamera, Svg } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import { DoubleSide, Group, Mesh, MeshBasicMaterial, Object3D } from 'three'

import { Board } from './Board'
import { MeshTest } from './MeshTest'

function Scene() {
  const config = useControls({
    grid: false,
    board: true,
    fov: { value: 50, min: 1, max: 100, step: 5 },
  })

  const camera = useThree(state => state.camera)
  useEffect(() => {
    if ('fov' in camera) {
      camera.fov = config.fov
      camera.updateProjectionMatrix()
    }
  }, [camera, config.fov])

  // fit camera to board
  const controlsRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)
  const meshTestRef = useRef<Group>(null!)
  const lightboxRef = useRef<Mesh>(null!)

  useFitToBoxControls('board', boardRef, controlsRef)
  useFitToBoxControls('mesh test', meshTestRef, controlsRef)
  useFitToBoxControls('light box', lightboxRef, controlsRef)

  const [initialZoomDone, setInitialZoomDone] = useState(false)
  useFrame(() => {
    if (!initialZoomDone && controlsRef.current && boardRef.current) {
      void controlsRef.current.fitToBox(boardRef.current, true)
      setInitialZoomDone(true)
    }
  })

  const viewport = useThree(state => state.viewport)
  useEffect(() => {
    if (controlsRef.current && boardRef.current) {
      void controlsRef.current.fitToBox(boardRef.current, true)
    }
  }, [viewport])

  const lightPosition = [-10, 10, 20] as const

  return (
    <>
      <CameraControls ref={controlsRef} />

      {config.board && <Board ref={boardRef} scale={[1, 1, 1]} />}

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} ref={lightboxRef} />

      <MeshTest ref={meshTestRef} position={[0, 10, 50]} />

      <axesHelper visible={config.grid} args={[20]} />
      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} cellColor={'red'} />
    </>
  )
}

export function Component() {
  return (
    <Canvas frameloop="demand" camera={{ position: [0, 0, 20] }}>
      <Scene />
    </Canvas>
  )
}
Component.displayName = 'Hexxagon'

function useFitToBoxControls(
  label: string,
  targetRef: React.MutableRefObject<Object3D>,
  controlsRef: React.MutableRefObject<CameraControls>
) {
  useControls('fit to box', {
    [label]: button(() => {
      if (!controlsRef.current) return console.error('f2b no camera')
      if (!targetRef.current) return console.error('f2b no target?')
      void controlsRef.current.fitToBox(targetRef.current, true)
    }),
  })
}

/* 

const camera = useThree(state => state.camera)
  const target = meshTestRef
  useEffect(() => {
    if (controlsRef.current && target.current) {
      void controlsRef.current.fitToBox(target.current, true)
    }
  }, [camera, config.fov, target])

*/
