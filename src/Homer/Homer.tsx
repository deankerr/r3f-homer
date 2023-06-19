import { Capsule, Cone, Sphere, Torus } from '@react-three/drei'

import { Arm } from './Arm'
import { Face } from './Face'

const skinColor = '#FFD700'

type Props = JSX.IntrinsicElements['group']

export function Homer(props: Props) {
  return (
    <group {...props}>
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

      <Face position={[0, 0.2, 0]} />

      {/* {body} */}
      <Cone args={[1.75, 4]} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="white" />
      </Cone>
      <Sphere args={[2]} position={[0, 1, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>

      {/* arms */}
      <Arm
        position={[-1.5, 2.6, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        skinColor={skinColor}
      />
      <Arm
        position={[1.5, 2.6, 0]}
        rotation={[0, Math.PI / 2, 0]}
        skinColor={skinColor}
      />

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

/* <Lathe args={[points]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial side={DoubleSide} />
      </Lathe> */
