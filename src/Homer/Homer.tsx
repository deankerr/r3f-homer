import {
  Box,
  Capsule,
  Circle,
  Cone,
  Cylinder,
  Lathe,
  Sphere,
  Torus,
} from '@react-three/drei'
import { DoubleSide, Vector2 } from 'three'

import { Arm } from './Arm'
import { Face } from './Face'

const points: Vector2[] = []
for (let i = 0; i < 10; ++i) {
  const x = Math.sin(i * 0.4) * 3 + 0
  const y = (i - 5) * 0.8
  points.push(new Vector2(x, y))
  console.log(x, y)
}
// console.log(points)

export function Homer() {
  return (
    <group>
      {/* head */}
      <Capsule args={[1, 1.2]} position={[0, 5, 0]}>
        <meshStandardMaterial color="yellow" />
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
      <Cone args={[1.75, 4]} position={[0, 3.5, 0]} />
      <Sphere args={[2]} position={[0, 1, 0]} />

      {/* arms */}
      <Arm position={[-1.5, 2.6, 0]} rotation={[0, -Math.PI / 2, 0]} />
      <Arm position={[1.5, 2.6, 0]} rotation={[0, Math.PI / 2, 0]} />

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
