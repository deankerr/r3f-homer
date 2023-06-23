import { Edges, MeshTransmissionMaterial } from '@react-three/drei'

export function Pyramid(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      {/* inner */}
      <mesh>
        <octahedronGeometry args={[10]} />
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </mesh>

      {/* outer */}
      <mesh>
        <octahedronGeometry args={[13]} />
        <MeshTransmissionMaterial
          distortionScale={0.5}
          temporalDistortion={0}
          roughness={0.05}
          // metalness={0.1}
          thickness={3.0}
          // ior={1.74}
        />
        <Edges scale={1.0} threshold={15} color="orange" />
      </mesh>
    </group>
  )
}
