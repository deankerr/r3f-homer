import {
  Box,
  CameraControls,
  Grid,
  PerspectiveCamera,
  Stats,
} from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { useRemountKey } from '@/util'

import { Board } from './Board'
import { Pearl } from './Pearl'
import { Ruby } from './Ruby'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: false, board: true })

  // fit camera to board
  const boardRef = useRef<Group>(null!)
  const controlsRef = useRef<CameraControls>(null!)
  const camera = useThree(state => state.camera)
  useEffect(() => {
    if (controlsRef.current && boardRef.current) {
      void controlsRef.current.fitToBox(boardRef.current, true)
    }
  }, [camera])

  const lightPosition = [-10, 10, 20] as const

  const key = useRemountKey()

  return (
    <>
      <PerspectiveCamera makeDefault position-z={20} fov={50} />
      <CameraControls ref={controlsRef} />

      <Board ref={boardRef} />

      <pointLight position={lightPosition} intensity={2} />
      <ambientLight intensity={0.2} />
      <Box position={lightPosition} key={key} />

      <Ruby position-z={40} />
      <Pearl position-z={40} position-x={20} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats className="mt-8" />}
    </>
  )
}
Component.displayName = 'Hexxagon'
