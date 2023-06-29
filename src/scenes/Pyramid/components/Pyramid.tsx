import { Edges, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'

type Props = JSX.IntrinsicElements['group']

export function Pyramid({ ...group }: Props) {
  const config = useControls(
    'pyramid outer',
    {
      radius: { value: 56, min: 1, max: 200, step: 1 },
      transmissionSampler: true,
      backside: false,
      samples: { value: 6, min: 1, max: 32, step: 1 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.5, min: 0, max: 1 },
      anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationDistance: { value: 0.05, min: 0, max: 10, step: 0.01 },
      attenuationColor: '#ffffff',
      color: '#ffffff',
      bg: '#839681',
    },
    { collapsed: true }
  )

  return (
    <group {...group}>
      {/* inner */}
      <mesh>
        <octahedronGeometry args={[40]} />
        <meshStandardMaterial color="black" />
        <Edges scale={1.0} threshold={15} color="orange" />
      </mesh>

      {/* outer */}
      <mesh>
        <octahedronGeometry args={[config.radius]} />
        <MeshTransmissionMaterial {...config} />
        <Edges scale={1.0} threshold={15} color="orange" />
      </mesh>
    </group>
  )
}

/* 
<MeshTransmissionMaterial
  distortionScale={0.5}
  temporalDistortion={0}
  roughness={0.05}
  // metalness={0.1}
  thickness={3.0}
  // ior={1.74}
  chromaticAberration={0.5}
  // anisotropicBlur={0.5}
/>
 */
