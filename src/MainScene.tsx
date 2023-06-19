/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, Stats } from '@react-three/drei'

import { BigText } from './BigText'
import { Homer } from './Homer/Homer'
import {
  Bust,
  Chair,
  Eye,
  Gnome,
  Lime,
  Skull,
  Sun,
  Taxi,
  Toilet,
} from './Model'
import { Orbit } from './Orbit'
import { OuterSpace } from './OuterSpace'

export function MainScene() {
  return (
    <>
      <OuterSpace />
      <BigText text="DEAN.TAXI" position={[-2, 30, -40]} />

      <Orbit y={0.01}>
        <Sun scale={10} position={[0, 50, -60]} />
        <directionalLight position={[0, 50, -60]} />
      </Orbit>

      {/*<Orbit x={0.01} y={0.01}>
        <Taxi scale={8} position={[0, 50, 60]} />
      </Orbit>

      <Orbit y={0.01} z={0.001}>
        <Bust scale={10} position={[-20, 5, 0]} />
        <Lime scale={40} position={[20, 5, 0]} />
        <Gnome scale={10} position={[0, 5, 20]} />
      </Orbit>

      <Orbit x={0.001} z={0.001}>
        <Chair scale={8} position={[-40, 5, 0]} />
        <Skull scale={5} position={[40, 5, 0]} />
        <Toilet scale={8} position={[0, 5, 40]} />
      </Orbit> */}

      <Homer position={[0, 6, 0]} />

      <Eye scale={20} position={[0, 40, 0]} rotation={[Math.PI / 2, 0, 0]} />

      {/* <ambientLight intensity={0.1} /> */}
      <ambientLight intensity={0.5} />

      <axesHelper args={[20]} />
      <gridHelper args={[100, 50]} />

      <OrbitControls target={[0, 8, 0]} />
      <Stats />
    </>
  )
}
