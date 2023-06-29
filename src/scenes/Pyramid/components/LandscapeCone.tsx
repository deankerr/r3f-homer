import { Cone, Edges } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function LandscapeCone({ ...group }: Props) {
  return (
    <group {...group}>
      <Cone
        args={[22, 80, 3, 1]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Cone>
    </group>
  )
}
