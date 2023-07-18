import { Box, CameraControls, Grid, Stats } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { Board } from './Board'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: false })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  const lightPosition = [-20, 15, 20] as const

  return (
    <>
      <CameraControls ref={cameraRef} />

      <Board ref={boardRef} />

      {/* <pointLight position={lightPosition} intensity={2} /> */}
      <Box position={lightPosition} />

      <Ruby position-z={40} />
      <Pearl position-z={40} position-x={20} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
