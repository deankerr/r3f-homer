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
      <Capsule
        args={[0.6, 1]}
        position={[-1.5, 2.6, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="white" />
      </Capsule>
      <Capsule
        args={[0.5, 3.5]}
        position={[-2.75, 2.6, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="yellow" />
      </Capsule>

      <Capsule
        args={[0.6, 1]}
        position={[1.5, 2.6, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="white" />
      </Capsule>
      <Capsule
        args={[0.5, 3.5]}
        position={[2.75, 2.6, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="yellow" />
      </Capsule>

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

function Face(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      {/* left eye */}
      <Sphere args={[0.35]} position={[-0.4, 5, 0.8]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Circle args={[0.075]} position={[-0.4, 5, 1.15]}>
        <meshStandardMaterial color="black" />
      </Circle>

      {/* right eye */}
      <Sphere args={[0.35]} position={[0.4, 5, 0.8]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      <Circle args={[0.075]} position={[0.4, 5, 1.15]}>
        <meshStandardMaterial color="black" />
      </Circle>

      {/* nose */}
      <Sphere args={[0.2]} position={[0, 4.6, 1]}>
        <meshStandardMaterial color="yellow" />
      </Sphere>

      {/* mouth */}
      <Torus
        args={[0.4, 0.4, 6]}
        position={[0, 4, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="sienna" />
      </Torus>
      <Torus
        args={[0.7, 0.1, 6]}
        position={[0, 4, 0.525]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#723911" />
      </Torus>
    </group>
  )
}
/* <Lathe args={[points]} rotation={[Math.PI, 0, 0]}>
        <meshStandardMaterial side={DoubleSide} />
      </Lathe> */
