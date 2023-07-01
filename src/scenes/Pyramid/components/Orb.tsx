import { Edges, Icosahedron, MeshTransmissionMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef } from 'react'
import { Group } from 'three'

import { usePyramidStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

export function Orb({ ...group }: Props) {
  const config = useControls(
    'orb outer',
    {
      radius: { value: 5, min: 1, max: 200, step: 1 },
      transmissionSampler: true,
      backside: false,
      samples: { value: 6, min: 1, max: 32, step: 1 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      thickness: { value: 1.5, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.5, min: 0, max: 1 },
      anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.0, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationDistance: { value: 0.05, min: 0, max: 10, step: 0.01 },
      attenuationColor: '#ffffff',
      color: '#ffffff',
      bg: '#839681',
    },
    { collapsed: true }
  )

  const ref = useRef<Group>(null!)

  useFrame((_, delta) => {
    ref.current.rotation.y -= delta
  })

  const mainColor = usePyramidStore((state) => state.mainColor)

  return (
    <group {...group} ref={ref}>
      <Icosahedron args={[3]}>
        <meshStandardMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </Icosahedron>

      <Icosahedron args={[config.radius]}>
        <MeshTransmissionMaterial {...config} />
        {/* <Edges threshold={15} color="orange" /> */}
      </Icosahedron>
    </group>
  )
}

{
  /* <Icosahedron args={[4]}>
<MeshTransmissionMaterial
  distortionScale={0.5}
  temporalDistortion={0}
  // roughness={0.05}
  thickness={1.5}
  chromaticAberration={0.5}
  anisotropicBlur={0.5}
/>
 */
}
