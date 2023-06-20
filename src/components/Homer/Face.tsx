import { Circle, Sphere, Torus } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group, Vector3 } from 'three'

import { useTaxiStore } from '@/store'

const roatationSpeed = 0.3

type Props = JSX.IntrinsicElements['group'] & {
  skinColor: string
  faceIsRotating: React.MutableRefObject<boolean>
}

const headTransformSeconds = 2
const margeFacePosition = new Vector3(0, 1.5, 0)

export function Face({ skinColor, faceIsRotating, ...group }: Props) {
  const ref = useRef<Group>(null!)

  const homerState = useTaxiStore((state) => state.homerState)

  useFrame(() => {
    // rotate around the face quickly, once
    if (faceIsRotating.current) {
      ref.current.rotation.y += roatationSpeed

      // stop after a full rotation
      if (ref.current.rotation.y >= 2 * Math.PI) {
        faceIsRotating.current = false
        ref.current.rotation.y = 0
      }
    }

    // move face up
    if (homerState === 'headMarging') {
      ref.current.position.lerp(margeFacePosition, headTransformSeconds / 60)
    }
  })

  return (
    <group {...group} ref={ref}>
      {/* left eye */}
      <Sphere args={[0.35]} position={[-0.4, 5, 0.8]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Circle args={[0.075]} position={[-0.4, 5, 1.15]}>
        <meshStandardMaterial color="black" />
      </Circle>

      {/* right eye */}
      <Sphere args={[0.35]} position={[0.4, 5, 0.8]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Circle args={[0.075]} position={[0.4, 5, 1.15]}>
        <meshStandardMaterial color="black" />
      </Circle>

      {/* nose */}
      <Sphere args={[0.2]} position={[0, 4.6, 1]}>
        <meshStandardMaterial color={skinColor} />
      </Sphere>

      {/* mouth */}
      <Torus
        args={[0.4, 0.4, 6]}
        position={[0, 4, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="sienna" />
      </Torus>
      <Torus
        args={[0.7, 0.1, 6]}
        position={[0, 4, 0.525]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#723911" />
      </Torus>
    </group>
  )
}
