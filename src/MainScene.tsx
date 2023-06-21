/* eslint-disable @typescript-eslint/no-unused-vars */
import { OrbitControls, Stats } from '@react-three/drei'

import { BigText } from './components/BigText'
import { Homer } from './components/Homer/Homer'
import { Orbit } from './components/Orbit'
import { Starfield } from './components/Starfield'
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

export function MainScene() {
  return (
    <>
      <Starfield />
      <BigText text="DEAN.TAXI" position={[-2, 10, -50]} />

      <Orbit y={0.01}>
        <Sun scale={10} position={[0, 50, -60]} />
        <directionalLight position={[0, 50, -60]} />
      </Orbit>

      <Orbit x={0.005} y={0.005}>
        <Taxi scale={6} position={[0, 50, 60]} />
        <Dolphin scale={20} position={[0, -50, -60]} />
      </Orbit>

      <Orbit y={0.01} z={0.001}>
        <Bust scale={20} position={[-20, 5, 0]} />
        <Lime scale={80} position={[20, 5, 0]} />
        <Gnome scale={20} position={[0, 5, 20]} />
      </Orbit>

      <Orbit x={0.001} z={0.001}>
        <PlasticChair scale={16} position={[-40, 5, 0]} />
        <Skull scale={5} position={[40, 5, 0]} />
        <Toilet scale={16} position={[0, 5, 40]} />
      </Orbit>

      <Homer position={[0, 6, -100]} />

      <Eye scale={200} position={[0, 200, 0]} rotation={[Math.PI / 2, 0, 0]} />

      <ambientLight intensity={0.1} />

      {/* <axesHelper args={[20]} /> */}
      {/* <gridHelper args={[100, 50]} /> */}

      <OrbitControls target={[0, 8, 0]} enablePan={false} />
      <Stats />
    </>
  )
}

/* 

      <Cloud position={[0, -10, 0]} />
      <TorusKnot args={[100, 1]} material-color="hotpink" />
<Flower position-y={10} />
      <Float
        speed={1}
        rotationIntensity={5}
        floatIntensity={1}
        // floatingRange={[1, 4]}
      >
        <Sphere position={[5, 4, 0]} />
      </Float>

        <Sparkles color={'red'} count={100} size={5} scale={6} />
*/
