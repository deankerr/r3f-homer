import { Cone, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { mainColor: string }

export function Shard({ mainColor, ...group }: Props) {
  return (
    <group {...group}>
      <Cone args={[3, 10, 3, 1]} position={[0, 5, 0]}>
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color={mainColor} />
      </Cone>
    </group>
  )
}
