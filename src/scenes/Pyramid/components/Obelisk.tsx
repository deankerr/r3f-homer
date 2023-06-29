import {
  Center,
  Edges,
  Lathe,
  MeshTransmissionMaterial,
  Text,
  Text3D,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { DoubleSide, Group, Vector2 } from 'three'

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

  const textRef = useRef<Group>(null!)

  useFrame(() => {
    textRef.current.rotation.y += 0.02
  })

  return (
    <group {...props}>
      <Lathe args={[points.map((p) => new Vector2(...p)), 4]}>
        <meshStandardMaterial color="black" side={DoubleSide} />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Lathe>

      <group rotation={[0, Math.PI / 4, 0]} ref={textRef}>
        <ObText />
      </group>

      <Lathe args={[points2.map((p) => new Vector2(...p)), 4]}>
        <MeshTransmissionMaterial {...config} side={DoubleSide} />
        <Edges scale={1.0} threshold={15} color="orange" />
      </Lathe>
    </group>
  )
}

function ObText() {
  // const material = <meshStandardMaterial color="orange" />
  const material = <meshBasicMaterial color="orange" />

  const height = 8.7
  const radius = 2.0
  const shift = 0.5

  return (
    <>
      <Text3D
        {...textConfig}
        rotation={[0, 2 * (Math.PI / 4), 0]}
        position={[radius, height, shift]}
      >
        {material}
        {`W\nI\nN\nE`}
      </Text3D>

      <Text3D
        {...textConfig}
        rotation={[0, 6 * (Math.PI / 4), 0]}
        position={[-radius, height, -shift]}
      >
        {material}
        {`C\nO\nK\nE`}
      </Text3D>

      <Text3D
        {...textConfig}
        rotation={[0, 8 * (Math.PI / 4), 0]}
        position={[-shift, height, radius]}
      >
        {material}
        {`M\nD\nM\nA`}
      </Text3D>

      <Text3D
        {...textConfig}
        rotation={[0, 4 * (Math.PI / 4), 0]}
        position={[shift, height, -radius]}
      >
        {material}
        {`A\nC\nI\nD`}
      </Text3D>
    </>
  )
}

const textConfig = {
  font: 'font/bigblue.json',
  size: 1.5,
  height: 0.5,
}
