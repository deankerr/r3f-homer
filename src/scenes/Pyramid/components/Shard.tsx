import { Cone, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Shard({ ...group }: Props) {
  return (
    <group {...group}>
      <Cone args={[3, 10, 3, 1]} position={[0, 5, 0]}>
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Cone>
    </group>
  )
}
