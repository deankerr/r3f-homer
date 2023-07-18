import { Box, CameraControls, Grid, Stats } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { Board } from './Board'
import { Ruby } from './Ruby'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: false })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  const rconfig = useControls('ruby', {
    color: '#f41600',
    flatshading: true,
  })

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      // void cameraRef.current.setLookAt(0, 0, 50, 0, 0, 0)
      // void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  const lightPosition = [-20, 15, 20] as const

  return (
    <>
      <CameraControls ref={cameraRef} />

      <Board />

      {/* <pointLight position={lightPosition} intensity={2} /> */}
      <Box position={lightPosition} />

      <Ruby flatShading={true} position-z={40} />

      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
