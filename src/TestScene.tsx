/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, Stats } from '@react-three/drei'
import { ReactElement } from 'react'
import { Group, Object3D } from 'three'

import {
  Bust,
  Dolphin,
  Eye,
  Gnome,
  Lime,
  PlasticChair,
  Skull,
  Sun,
  Taxi,
  Toilet,
} from './components/models'

export function TestScene() {
  const models = [
    <Dolphin key="dol" position={[-20, 2, 0]} />,
    <Eye key="eye" position={[-15, 2, 0]} />,
    <Sun key="sun" position={[-10, 2, 0]} />,
    <Gnome key="a" position={[-5, 2, 0]} />,
    <Bust key="b" position={[0, 2, 0]} />,
    <PlasticChair key="c" position={[5, 2, 0]} />,
    <Lime key="d" position={[10, 2, 0]} />,
    <Skull key="e" position={[15, 2, 0]} />,
    <Taxi key="taxi" position={[20, 2, 0]} />,
    <Toilet key="tio" position={[25, 2, 0]} />,
  ]

  return (
    <>
      {...models}
      <axesHelper args={[10]} />
      <gridHelper args={[100, 50]} />
      <OrbitControls target={[0, 0, 0]} />
      <ambientLight />
      <Stats />
    </>
  )
}
