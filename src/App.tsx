/* eslint-disable @typescript-eslint/no-unused-vars */
import { Loader, PositionalAudio } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

import { MainScene } from './MainScene'
import { TestScene } from './TestScene'

export default function App() {
  // const music = (
  //   <Suspense fallback={null}>

  //   </Suspense>
  // )
  const [canStartAudio, setCanStateAudio] = useState(false)

  return (
    <div className="h-screen bg-black" onClick={() => setCanStateAudio(true)}>
      <Canvas camera={{ position: [0, 10, 10] }}>
        <MainScene />
        {/* {canStartAudio && music} */}
        {/* <TestScene /> */}
        {/* <Suspense fallback={null}>
          <PositionalAudio url="sound/blind_shift.mp3" />
        </Suspense> */}
      </Canvas>
      <Loader />
    </div>
  )
}

/* 
rotation-y={Math.PI / 2}
*/
