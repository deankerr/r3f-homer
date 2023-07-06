import { Capsule, Edges } from '@react-three/drei'

import { useBastetStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

export function Obelisk({ ...group }: Props) {
  const mainColor = useBastetStore(state => state.mainColor)

  return (
    <group {...group}>
      <Capsule args={[1.5, 16, 1, 4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </Capsule>
    </group>
  )
}
