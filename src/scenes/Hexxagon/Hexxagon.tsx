import {
  AccumulativeShadows,
  CameraControls,
  Environment,
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
  const config = useControls({ stats: __DEV__ })
  const cameraRef = useRef<CameraControls>(null!)
  const boardRef = useRef<Group>(null!)

  useEffect(() => {
    if (cameraRef.current) {
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
      <Environment preset="night">
        <Lightformer
          form="circle" // circle | ring | rect (optional, default = rect)
          intensity={1} // power level (optional = 1)
          color="white" // (optional = white)
          // scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
          target={[0, 0, 0]} // Target position (optional = undefined)
        />
      </Environment>

      <Board ref={boardRef} />

      <group ref={starsRef}>
        <Stars radius={200} factor={5} />
      </group>

      {/* <axesHelper args={[20]} /> */}
      <pointLight position={[40, 0, 40]} intensity={2} />
      {/* <hemisphereLight intensity={0.35} position={[40, 0, 40]}  /> */}
      {config.stats && <Stats />}
    </>
  )
}
Component.displayName = 'Hexxagon'

// const nums = [94, 108, 136, 145, 156, 168, 173, 269, 284, 292, 326, 336, 341, 466, 470, 513, 550, 551, 591, 44, 124, 364, 300, 19, 189, 197, 235]
