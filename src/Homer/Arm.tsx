import { Capsule } from '@react-three/drei'

export function Arm(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      <Capsule args={[0.6, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="white" />
      </Capsule>
      <Capsule
        args={[0.5, 3.5]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 2]}
      >
        <meshStandardMaterial color="yellow" />
      </Capsule>
    </group>
  )
}

/* 
rotation={[0, 0, Math.PI / 2]}

position={[-1.5, 2.6, 0]}
position={[-2.75, 2.6, 0]}
*/
