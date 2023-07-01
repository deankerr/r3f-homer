import { Orb, Pyramid } from '../components'

type Props = JSX.IntrinsicElements['group']

export function Central({ ...group }: Props) {
  return (
    <group {...group}>
      <Pyramid position={[0, 0.05, 0]} />
      <Orb position={[0, 30, 0]} />
    </group>
  )
}
