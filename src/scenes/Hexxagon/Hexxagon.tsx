import { Box, CameraControls, Grid, Stats } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group, PlaneGeometry } from 'three'

import { Board } from './Board'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: false, board: true })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  const { camera } = useThree()
  console.log('cam', camera.toJSON())

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      // void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  const lightPosition = [-20, 15, 20] as const

  const tg = new PlaneGeometry(16, 16)
  return (
    <>
      <CameraControls ref={cameraRef} />

      {config.board && <Board ref={boardRef} />}

      {/* <pointLight position={lightPosition} intensity={2} /> */}
      <ambientLight intensity={0.5} />
      <Box position={lightPosition} />

      <Ruby position-z={40} />
      <Pearl position-z={40} position-x={20} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
