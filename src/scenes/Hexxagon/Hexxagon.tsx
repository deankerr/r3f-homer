import { CameraControls, Grid, Stats } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DoubleSide, Group } from 'three'

import { Board } from './Board'

export function Component() {
  const config = useControls({ stats: __DEV__, grid: __DEV__ })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      // void cameraRef.current.setLookAt(0, 0, 50, 0, 0, 0)
      // void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  return (
    <>
      <CameraControls ref={cameraRef} />

      <Board />

      <pointLight position={[40, 0, 40]} intensity={2} />
      <Grid visible={config.grid} infiniteGrid={true} side={DoubleSide} />
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
