import { Capsule, Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import {
  Color,
  Mesh,
  MeshStandardMaterial,
  PositionalAudio,
  Vector3,
} from 'three'

import { useTaxiStore } from '@/store'

import { AudioReady } from '..'
import { Face } from './Face'
import { Pearls } from './Pearls'

const headTransformSeconds = 2
const headGrowVec = new Vector3(1, 2.4, 1)
const margeColor = new Color('blue')

const headShrinkVec = new Vector3(1, 1, 1)

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Head({ skinColor, ...group }: Props) {
  const headRef = useRef<Mesh>(null!)
  const headMaterialRef = useRef<MeshStandardMaterial>(null!)

  const [homerState, setHomerState] = useTaxiStore((state) => [
    state.homerState,
    state.setHomerState,
  ])

  const audioRef = useRef<PositionalAudio>(null!)

  const skinColorC = new Color(skinColor)

  useFrame(() => {
    if (homerState === 'headMarging') {
      headMaterialRef.current.color.lerp(margeColor, headTransformSeconds / 60)
      headRef.current.scale.lerp(headGrowVec, headTransformSeconds / 60)
    } else if (homerState === 'headDemarging') {
      headMaterialRef.current.color.lerp(skinColorC, headTransformSeconds / 60)
      headRef.current.scale.lerp(headShrinkVec, headTransformSeconds / 60)
    }
  })

  function handleHeadClick() {
    if (homerState === 'idle' || homerState === 'headDemarging') {
      setHomerState('headMarging')
      audioRef.current.play()
    } else if (homerState === 'headMarging') {
      setHomerState('headDemarging')
      audioRef.current.play()
    }
  }

  return (
    <>
      <group {...group} onClick={handleHeadClick}>
        <AudioReady ref={audioRef} url="sounds/long_groan.mp3" loop={false} />

        {/* head */}
        <Capsule ref={headRef} args={[1, 1.2]} position={[0, 5, 0]}>
          <meshStandardMaterial ref={headMaterialRef} color={skinColor} />
        </Capsule>

        {/* hair */}
        <Torus args={[0.5, 0.05]} position={[0, 6.2, 0.1]} rotation={[0, 0, 0]}>
          <meshStandardMaterial color="black" />
        </Torus>
        <Torus
          args={[0.5, 0.05]}
          position={[0, 6.2, -0.4]}
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial color="black" />
        </Torus>

        <Face position={[0, 0.3, 0]} skinColor={skinColor} />

        <Pearls />
      </group>
    </>
  )
}
