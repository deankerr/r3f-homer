import { Box, CameraControls, Grid, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group, MeshBasicMaterial } from 'three'

import { useFrameLoopDemand } from '@/hooks'
import { useRemountKey } from '@/util'

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
  const boardRef = useRef<Group>(null!)
  const controlsRef = useRef<CameraControls>(null!)
  const camera = useThree(state => state.camera)
  useEffect(() => {
    if (controlsRef.current && boardRef.current) {
      // void controlsRef.current.fitToBox(boardRef.current, true)
      void controlsRef.current.setLookAt(0, 0, 10, 0, 0, 20)
    }
  }, [camera, config.fov])

  const lightPosition = [-10, 10, 20] as const

  const key = useRemountKey()

  const hexmat = new MeshBasicMaterial({ side: DoubleSide })
  return (
    <>
      <PerspectiveCamera makeDefault position-z={20} fov={config.fov} />
      <CameraControls ref={controlsRef} />

      {config.board && <Board ref={boardRef} key={key} />}

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} />

      <MeshTest position={[0, 0, 20]} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} cellColor={'red'} />
    </>
  )
}
Component.displayName = 'Hexxagon'
