import { Circle, Sphere, Torus } from '@react-three/drei'

type Props = JSX.IntrinsicElements['group'] & { skinColor: string }

export function Face({ skinColor, ...group }: Props) {
  return (
    <group {...group}>
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
        <meshStandardMaterial color={skinColor} />
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
