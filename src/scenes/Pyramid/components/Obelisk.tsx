import { Capsule, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  return (
    <group {...group}>
      <Capsule args={[1.5, 10, 1, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Capsule>
    </group>
  )
}
