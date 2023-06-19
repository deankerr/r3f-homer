import { Capsule, Torus } from '@react-three/drei'

import { Face } from './Face'

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Head({ skinColor, ...group }: Props) {
  return (
    <group {...group}>
      {/* head */}
      <Capsule args={[1, 1.2]} position={[0, 5, 0]}>
        <meshStandardMaterial color={skinColor} />
      </Capsule>

      {/* hair */}
      <Torus args={[0.5, 0.05]} position={[0, 6.2, 0.1]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Torus>
      <Torus args={[0.5, 0.05]} position={[0, 6.2, -0.4]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
      </Torus>

      <Face position={[0, 0.3, 0]} skinColor={skinColor} />
    </group>
  )
}
