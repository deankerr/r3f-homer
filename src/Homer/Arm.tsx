import { Capsule } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Arm({ skinColor, ...group }: Props) {
  return (
    <group {...group}>
      {/* sleeves */}
      <Capsule args={[0.6, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Capsule>

      {/* arm meat */}
      <Capsule
        args={[0.5, 3.5]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.75]}
      >
        <meshStandardMaterial color={skinColor} />
      </Capsule>
    </group>
  )
}
