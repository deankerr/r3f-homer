import { Cone, Sphere } from '@react-three/drei'

import { Arm } from './Arm'

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Chest({ skinColor, ...group }: Props) {
  return (
    <group {...group}>
      {/* shirt */}
      <Cone args={[1.75, 4]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="white" />
      </Cone>
      <Sphere args={[2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      <Arm
        position={[-1.5, 2.6, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        skinColor={skinColor}
      />
      <Arm
        position={[1.5, 2.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
        skinColor={skinColor}
      />
    </group>
  )
}
