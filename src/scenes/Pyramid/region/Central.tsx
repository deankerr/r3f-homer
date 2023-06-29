import { Orb, Pyramid } from '../components'

type Props = JSX.IntrinsicElements['group']

export function Central({ ...group }: Props) {
  return (
    <group {...group}>
      <group position={[0, 0, 0]}>
        <Pyramid position={[0, 0.05, 0]} />
        <Orb position={[0, 80, 0]} />
      </group>
    </group>
  )
}
