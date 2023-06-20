import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Vector3 } from 'three'

import { AudioReady } from '../AudioReady'
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

  return (
    <group ref={ref} {...props}>
      <AudioReady url="sounds/blind_shift.mp3" distance={100} />
      <Head skinColor={skinColor} rotation={[0, 0, 0]} />
      <Chest skinColor={skinColor} />
      <Pants />
    </group>
  )
}
