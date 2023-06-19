import { PositionalAudio } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { Group, Vector3 } from 'three'

import { Chest } from './Chest'
import { Head } from './Head'
import { Pants } from './Pants'

const skinColor = '#FFD700'
const homerToVec = new Vector3(0, 6, 0)

type Props = JSX.IntrinsicElements['group']

export function Homer(props: Props) {
  const ref = useRef<Group>(null!)

  useFrame(() => {
    ref.current.position.lerp(homerToVec, 1 / 60 / 3)
  })

  const [homey, setHomey] = useState(false)

  return (
    <group ref={ref} {...props} onClick={() => setHomey(true)}>
      <Suspense>
        {homey && (
          // <PositionalAudio
          //   url="sound/dolphin_clicks.ogg"
          //   distance={80}
          //   loop
          //   autoplay
          //   load
          // />
          <PositionalAudio
            url="sound/blind_shift.mp3"
            distance={80}
            autoplay
            load
          />
        )}
      </Suspense>
      <Head skinColor={skinColor} rotation={[0, 0, 0]} />
      <Chest skinColor={skinColor} />
      <Pants />
    </group>
  )
}

/* 
    X
*/
