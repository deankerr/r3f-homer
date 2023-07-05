import { Cone, Edges } from '@react-three/drei'

import { usePyramidStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

export function Shard({ ...group }: Props) {
  const mainColor = usePyramidStore(state => state.mainColor)

  return (
    <group {...group}>
      <Cone args={[3, 10, 3, 1]} position={[0, 5, 0]}>
        <meshStandardMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </Cone>
    </group>
  )
}
