import { Capsule, Cone } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group']

export function Pants(props: Props) {
  return (
    <group {...props}>
      {/* pants */}
      <Capsule args={[1.7, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color={'blue'} />
      </Capsule>

      <Capsule args={[0.7, 2.7]} position={[-0.8, -3, 0]}>
        <meshStandardMaterial color={'blue'} />
      </Capsule>

      <Capsule args={[0.7, 2.7]} position={[0.8, -3, 0]}>
        <meshStandardMaterial color={'blue'} />
      </Capsule>

      {/* feet */}
      <Cone args={[1, 1]} position={[-0.8, -4.7, 0.1]}>
        <meshStandardMaterial color={'#4a250a'} />
      </Cone>

      <Cone args={[1, 1]} position={[0.8, -4.7, 0.1]}>
        <meshStandardMaterial color={'#4a250a'} />
      </Cone>
    </group>
  )
}
