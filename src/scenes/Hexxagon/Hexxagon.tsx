import { Box, CameraControls, Grid, Stats } from '@react-three/drei'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { useRemountKey } from '@/util'

import { Board } from './Board'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: false, board: true })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  const lightPosition = [-10, 10, 20] as const

  const key = useRemountKey()

  return (
    <>
      <CameraControls ref={cameraRef} />

      {config.board && <Board ref={boardRef} />}

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} key={key} />

      <Ruby position-z={40} />
      <Pearl position-z={40} position-x={20} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
