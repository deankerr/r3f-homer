import { Capsule, Cone, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  return (
    <group {...group}>
      <Capsule args={[5, 30, 1, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="pink" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Capsule>
    </group>
  )
}
