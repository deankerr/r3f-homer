import { Box, CameraControls, Grid, PerspectiveCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { useRemountKey } from '@/util'

import { Board } from './Board'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

export function Component() {
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
      void controlsRef.current.fitToBox(boardRef.current, true)
    }
  }, [camera, config.fov])

  const lightPosition = [-10, 10, 20] as const

  const key = useRemountKey()

  return (
    <>
      <PerspectiveCamera makeDefault position-z={20} fov={config.fov} />
      <CameraControls ref={controlsRef} />

      <Board ref={boardRef} />

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} key={key} />

      <Ruby position={[-20, 0, 40]} />
      <Pearl position={[20, 0, 40]} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
    </>
  )
}
Component.displayName = 'Hexxagon'
