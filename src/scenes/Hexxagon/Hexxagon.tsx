import { Box, CameraControls, Grid, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { button, useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group, Mesh, Object3D } from 'three'

import { useFrameLoopDemand } from '@/hooks'

import { Board } from './Board'
import { MeshTest } from './MeshTest'

export function Component() {
  useFrameLoopDemand()

  const config = useControls({
    grid: false,
    board: true,
    fov: { value: 50, min: 1, max: 100, step: 5 },
  })

  // fit camera to board
  const camera = useThree(state => state.camera)
  const controlsRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)
  const meshTestRef = useRef<Group>(null!)
  const lightboxRef = useRef<Mesh>(null!)

  const target = meshTestRef
  useEffect(() => {
    if (controlsRef.current && target.current) {
      void controlsRef.current.fitToBox(target.current, true)
    }
  }, [camera, config.fov, target])

  useFitToBoxControls('board', boardRef, controlsRef)
  useFitToBoxControls('mesh test', meshTestRef, controlsRef)
  useFitToBoxControls('light box', lightboxRef, controlsRef)

  const lightPosition = [-10, 10, 20] as const

  return (
    <>
      <PerspectiveCamera makeDefault position-z={20} fov={config.fov} />
      <CameraControls ref={controlsRef} />

      {config.board && <Board ref={boardRef} />}

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} ref={lightboxRef} />

      <MeshTest ref={meshTestRef} position={[0, 10, 50]} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} cellColor={'red'} />
    </>
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
