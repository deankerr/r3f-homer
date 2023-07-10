import { Edges, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import * as THREE from 'three'

import { GridPlane } from '.'
import { useMaterialColorLerpAnimation } from '..'

type Props = JSX.IntrinsicElements['group']

export function Pyramid({ ...group }: Props) {
  const config = useControls('main', {
    pyramidInner: true,
    pyramidOuter: true,
  })

  const outerProps = useControls(
    'pyramid outer',
    {
      radius: { value: 30, min: 1, max: 200, step: 1 },
      transmissionSampler: false,
      backside: false,
      samples: { value: 3, min: 1, max: 32, step: 1 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.5, min: 0, max: 1 },
      anisotropy: { value: 0.01, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
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

  const lineRef1 = useRef<THREE.LineBasicMaterial>(null!)
  const lineRef2 = useRef<THREE.LineBasicMaterial>(null!)

  useMaterialColorLerpAnimation(lineRef1, 'main')
  useMaterialColorLerpAnimation(lineRef2, 'main')

  return (
    <group {...group}>
      {/* inner */}
      <mesh visible={config.pyramidInner}>
        <octahedronGeometry args={[10]} />
        <meshStandardMaterial color="black" />
        <Edges>
          <lineBasicMaterial ref={lineRef1} color={'white'} />
        </Edges>
      </mesh>

      {/* outer */}
      <mesh visible={config.pyramidOuter}>
        <octahedronGeometry args={[outerProps.radius]} />
        <MeshTransmissionMaterial {...outerProps} />
        <Edges>
          <lineBasicMaterial ref={lineRef2} color={'white'} />
        </Edges>
      </mesh>
      <GridPlane />
    </group>
  )
}
