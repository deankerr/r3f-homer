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
        <octahedronGeometry args={[12]} />
        <MeshTransmissionMaterial distortionScale={0} temporalDistortion={0} />
        <Edges scale={1.0} threshold={15} color="orange"></Edges>
      </mesh>
    </group>
  )
}
