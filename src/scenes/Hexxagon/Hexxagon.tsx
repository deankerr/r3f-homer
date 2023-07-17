import { CameraControls, Environment, Float, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Group } from 'three'

import { Board } from './Board'

const starsSpeed = 0.001

export function Component() {
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
      <Environment preset="studio" />

      <Float rotationIntensity={0.25} floatIntensity={1}>
        <Board ref={boardRef} />
      </Float>

      <group ref={starsRef}>
        <Stars radius={200} factor={5} />
      </group>

      <axesHelper args={[20]} />
      <pointLight position={[15, 10, 15]} intensity={0.5} />
    </>
  )
}
Component.displayName = 'Hexxagon'

/* 
good
'matcaps/64/D64480_E27497_EA9BB1_CD156F-64px.png',
17, 18 - plain metal
pink/purple 156 168 173 269 284 292 326 336 341 466 470 513 550 551 591

white gold 235+5
emeraldy 189+4 197+4
bronze plates 19+5
gold 364+3
 */
