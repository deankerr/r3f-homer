import { Cone, Edges, Octahedron } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Stone({ ...group }: Props) {
  return (
    <group {...group}>
      <Octahedron
        args={[12]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Octahedron>
    </group>
  )
}
