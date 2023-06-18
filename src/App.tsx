/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Center,
  Cloud,
  Float,
  OrbitControls,
  Sparkles,
  Stage,
  Stars,
  Stats,
  Text3D,
  TorusKnot,
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

import { AlarmClock } from './AlarmClock'
import Floor from './Floor'
import { Bust } from './Model/Bust'
import { Chair } from './Model/Chair'
import GFClock from './Model/GFClock'
import { Gnome } from './Model/Gnome'
import { Gnome2 } from './Model/GnomeT'
import { Grandfather } from './Model/Grandfather'
import { Lime } from './Model/Lime'
import Skull from './Model/Skull'
import Box from './Shape/Box'
import Cylinder from './Shape/Cylinder'
import Flower from './Shape/Flower'
import Sphere from './Shape/Sphere'

function App() {
  return (
    <div className="h-screen bg-black">
      <Canvas shadows>
        <Stars radius={100} factor={4} saturation={2} speed={1} />
        <Stage>
          {/* <Lights /> */}
          <Sparkles color={'red'} count={100} size={5} scale={6} />
          <Box position={[-1.2, 1, 0]} />
          <Box position={[1.2, 1, 0]} />
          <Skull />
          <Float
            speed={1}
            rotationIntensity={5}
            floatIntensity={1}
            // floatingRange={[1, 4]}
          >
            <Sphere position={[5, 4, 0]} />
          </Float>
          <Cylinder position={[0, 6, 0]} />
          <Flower position-y={10} />

          <Gnome scale={10} />
          <Gnome2 scale={10} position={[-2, 0, 0]} />
          <Bust scale={10} />
          <Chair scale={10} position={[-5, 0, 0]} />
          <Lime scale={10} position={[5, 0, 0]} />

          {/* <Floor /> */}
          <axesHelper args={[10]} />
          <OrbitControls target={[0, 0, 0]} />
        </Stage>

        <gridHelper args={[100]} position-y={-10} />

        <Center position={[0, 0, -50]}>
          <Text3D font={'font/bigblue.json'} size={20} height={10}>
            Hello
            <meshNormalMaterial />
          </Text3D>
        </Center>

        <Center position={[0, 0, 50]} rotation-y={-Math.PI}>
          <Text3D font={'font/bigblue.json'} size={20} height={10}>
            DEAN.TAXI
            <meshNormalMaterial />
          </Text3D>
        </Center>

        {/* <Cloud position={[0, -10, 0]} /> */}
        <TorusKnot args={[100, 1]} material-color="hotpink" />

        <Stats />
      </Canvas>
    </div>
  )
}

export default App

/* 
rotation-y={Math.PI / 2}

*/
