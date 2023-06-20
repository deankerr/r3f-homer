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

import { AudioReady } from '..'
import { Face } from './Face'
import { Pearls } from './Pearls'

const headTransformSeconds = 2
const headGrowVec = new Vector3(1, 2.4, 1)
const margeColor = new Color('blue')

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Head({ skinColor, ...group }: Props) {
  const headRef = useRef<Mesh>(null!)
  const headMaterialRef = useRef<MeshStandardMaterial>(null!)

  const faceIsRotating = useRef<boolean>(false)
  const headIsMarging = useRef<boolean>(false)

  const audioRef = useRef<PositionalAudio>(null!)

  useFrame(() => {
    if (headIsMarging.current) {
      headMaterialRef.current.color.lerp(margeColor, headTransformSeconds / 60)
      headRef.current.scale.lerp(headGrowVec, headTransformSeconds / 60)
    }
  })

  function handleHeadClick() {
    headIsMarging.current = true
    audioRef.current.play()
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

        <Face
          position={[0, 0.3, 0]}
          skinColor={skinColor}
          faceIsRotating={faceIsRotating}
          headIsMarging={headIsMarging}
        />

        <Pearls headIsMarging={headIsMarging} />
      </group>
    </>
  )
}
