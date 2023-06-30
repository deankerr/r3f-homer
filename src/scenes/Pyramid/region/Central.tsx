import { Orb, Pyramid } from '../components'

type Props = JSX.IntrinsicElements['group'] & { mainColor: string }

export function Central({ mainColor, ...group }: Props) {
  return (
    <group {...group}>
      <Pyramid position={[0, 0.05, 0]} mainColor={mainColor} />
      <Orb position={[0, 30, 0]} mainColor={mainColor} />
    </group>
  )
}
