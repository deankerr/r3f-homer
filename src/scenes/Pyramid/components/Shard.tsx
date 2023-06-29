import { Cone, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Shard({ ...group }: Props) {
  return (
    <group {...group}>
      <Cone args={[12, 40, 3, 1]} position={[0, 20, 0]}>
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Cone>
    </group>
  )
}
