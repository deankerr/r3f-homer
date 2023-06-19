/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, Stats } from '@react-three/drei'
import { useRef } from 'react'
import { Mesh } from 'three'

import { BigText } from './BigText'
import { Homer } from './Homer/Homer'
import { Sun } from './Model'
import { Orbit } from './Orbit'
import { OuterSpace } from './OuterSpace'

export function MainScene() {
  const sys = useRef<Mesh>(null!)

  return (
    <>
      <OuterSpace />
      <BigText text="DEAN.TAXI" position={[-2, 30, -40]} />

      <Orbit y={0.01}>
        <Sun scale={10} position={[0, 50, -60]} />
      </Orbit>

      <Homer position={[0, 6, 0]} />

      <ambientLight intensity={0.1} />

      <axesHelper args={[10]} />
      <gridHelper args={[100, 100]} />

      <OrbitControls target={[0, 8, 0]} />
      <Stats />
    </>
  )
}

/* 
<Sun scale={10} position={[0, 50, -60]} />
target={[0, 6, 0]}
*/
