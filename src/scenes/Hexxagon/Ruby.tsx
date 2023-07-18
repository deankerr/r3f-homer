import { useTexture } from '@react-three/drei'
import { useControls } from 'leva'
import { DoubleSide, LatheGeometry, Vector2 } from 'three'

import { useNormal } from './Textures'

type Props = JSX.IntrinsicElements['mesh']

export function Ruby(props: Props) {
  const config = useControls('ruby', {
    matcap: { value: 0, min: 0, max: paths.length - 1, step: 1 },
  })

  const matcap = useTexture('matcaps/ruby/' + paths[config.matcap])
  const normal = useNormal('ruby', 20)

  return (
    <mesh geometry={geometry} {...props}>
      <meshMatcapMaterial
        matcap={matcap}
        side={DoubleSide}
        flatShading={true}
        normalMap={normal}
        normalScale={new Vector2(0.2, 0.2)}
      />
    </mesh>
  )
}

const scale = 0.9
const sides = 10
const face = 3.8
const base = 6

const rubyShape = [
  [0, 0],
  [face, 0],
  [face, 0.3],
  [base, 2],
  [base, 4],
  [base, 6],
  [face, 7.7],
  [face, 8],
  [0, 8],
]

const geometry = new LatheGeometry(
  rubyShape.map(p => new Vector2(...p)),
  sides,
  -Math.PI / 2
)
  .rotateX(-Math.PI / 2)
  .scale(scale * 1.7, scale, scale)

const paths = [
  'AB2C2C_EBB4B3_561212_DE8484-512px.png', // r b tl
  '9D282A_38191D_DFC6CD_D6495A-512px.png', // r l tl
  'D54C2B_5F1105_F39382_F08375-512px.png', // r b u
  'BD5345_460F11_732622_EDB7B1-512px.png', // r b u
  '803537_310F10_C35A5D_D89093-512px.png', // r l l textured
  '9F1A27_F1AF7F_CD5845_D08441-512px.png', // r goldish b tr
  '965146_2B191D_DF7A5C_BFD6E1-512px.png', // r goldish l tr
]
