import { Capsule } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh } from 'three'

const armGrowthSpeed = 0.00005

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Arm({ skinColor, ...group }: Props) {
  // grow arms
  const armRef = useRef<Mesh>(null!)
  useFrame(() => {
    armRef.current.scale.setY(armRef.current.scale.y + armGrowthSpeed)
  })

  return (
    <group {...group}>
      {/* sleeves */}
      <Capsule args={[0.6, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Capsule>

      {/* arm meat */}
      <Capsule
        ref={armRef}
        args={[0.5, 2.5]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.75]}
      >
        <meshStandardMaterial color={skinColor} />
      </Capsule>
    </group>
  )
}
