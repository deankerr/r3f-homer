import { GradientTexture, GradientType, useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import {
  AdditiveBlending,
  MultiplyBlending,
  NoBlending,
  SphereGeometry,
  SubtractiveBlending,
  Vector2,
} from 'three'

import { useNormal } from './Textures'

type Props = JSX.IntrinsicElements['mesh']

export function Pearl(props: Props) {
  const config = useControls('pearl', {
    matcap: { value: 0, min: 0, max: matcapPaths.length - 1, step: 1 },
  })
  const matcap = useTexture('matcaps/pearl/' + matcapPaths[config.matcap])
  const normal = useNormal('pearl', 19)

  return (
    <mesh geometry={geometry} {...props}>
      {/* <meshMatcapMaterial
        matcap={matcap}
        blending={AdditiveBlending}
        transparent={true}
      /> */}

      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 0.25, 0.5, 0.65, 1]} // As many stops as you want
          colors={['blue', 'blue', 'white', 'hotpink', 'hotpink']} // Colors need to match the number of stops
          // size={16} // Size is optional, default = 1024
          // width={1024} // Width of the canvas producing the texture, default = 16
          // type={GradientType.Radial} // The type of the gradient, default = GradientType.Linear
          // innerCircleRadius={1} // Optional, the radius of the inner circle of the gradient, default = 0
          // outerCircleRadius={10} // Optional, the radius of the outer circle of the gradient, default = auto
        />
      </meshBasicMaterial>
    </mesh>
  )
}

const geometry = new SphereGeometry(6).translate(0, 0, -3).scale(1.2, 1, 1)

const matcapPaths = [
  '637598_B7C4D3_22293A_9BACBF-512px.png',
  '3E95CC_65D9F1_A2E2F6_679BD4-512px.png',
  '8CAEBC_3A4443_506463_DAEFEF-512px.png',
  '85B9D3_C9EAF9_417277_528789-512px.png',
  '416BA7_A5B8D0_0D2549_65ABEB-512px.png',
  '495CA6_CCD2E6_A5B1D8_1E2852-512px.png',
  '537387_75BBB9_152E5B_0E85E8-512px.png',
  'B6B8B1_994A24_315C81_927963-512px.png',
]
