import { Plane } from '@react-three/drei'

import { usePyramidStore } from '@/store'

const size = 1000
const step = 60

export function Ground() {
  const mainColor = usePyramidStore((state) => state.mainColor)

  return (
    <>
      <gridHelper
        args={[size, step, mainColor, mainColor]}
        position={[0, 0.5, 0]}
        visible={true}
      />
      <Plane
        args={[size, size]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        visible={true}
      >
        <meshStandardMaterial color="black" />
      </Plane>
    </>
  )
}
