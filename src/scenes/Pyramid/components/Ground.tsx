import { Plane } from '@react-three/drei'

const size = 1000
const step = 40

export function Ground() {
  return (
    <>
      <gridHelper
        args={[size, step, 'orange', 'orange']}
        position={[0, 0.5, 0]}
      />
      <Plane
        args={[size, size]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="black" />
      </Plane>
    </>
  )
}
