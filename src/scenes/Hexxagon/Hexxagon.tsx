import {
  AccumulativeShadows,
  CameraControls,
  Environment,
  Grid,
  Lightformer,
  RandomizedLight,
  Stars,
  Stats,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { Group } from 'three'

import { Board } from './Board'

const starsSpeed = 0.001

export function Component() {
  const config = useControls({ stats: __DEV__, grid: __DEV__ })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  useEffect(() => {
    if (cameraRef.current && boardRef.current) {
      // void cameraRef.current.setLookAt(0, 0, 50, 0, 0, 0)
      void cameraRef.current.fitToBox(boardRef.current, false)
    }
  }, [])

  const starsRef = useRef<Group>(null!)
  useFrame(() => {
    starsRef.current.rotation.y += starsSpeed
  })

  return (
    <>
      <CameraControls ref={cameraRef} />

      <Board ref={boardRef} />

      <group ref={starsRef}>{/* <Stars radius={200} factor={5} /> */}</group>

      {/* <axesHelper args={[20]} /> */}
      <pointLight position={[40, 0, 40]} intensity={2} />
      <Grid visible={config.grid} infiniteGrid={true} />
      {/* <hemisphereLight intensity={0.35} position={[40, 0, 40]}  /> */}
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'
