import { Edges, Lathe, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { DoubleSide, Vector2 } from 'three'

type Props = JSX.IntrinsicElements['group']

const points = [
  [0, 16],
  [2.5, 12],
  [2.5, 0],
]

const points2 = [
  [0, 17.5],
  [3.75, 12],
  [3.75, 0],
]

export function Obelisk(props: Props) {
  const config = useControls(
    'obelisk outer',
    {
      radius: { value: 13, min: 1, max: 200, step: 1 },
      transmissionSampler: true,
      backside: false,
      samples: { value: 6, min: 1, max: 32, step: 1 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      thickness: { value: 0.5, min: 0, max: 10, step: 0.01 },
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
    <group {...props}>
      <Lathe args={[points.map((p) => new Vector2(...p)), 4]}>
        <meshStandardMaterial color="black" side={DoubleSide} />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Lathe>

      <Lathe args={[points2.map((p) => new Vector2(...p)), 4]}>
        <MeshTransmissionMaterial {...config} side={DoubleSide} />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Lathe>
    </group>
  )
}
