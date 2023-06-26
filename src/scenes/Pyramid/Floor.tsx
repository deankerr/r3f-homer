import { Plane } from '@react-three/drei'
import * as THREE from 'three'

const size = 800
const step = 80

export function Floor() {
  const start = -Math.floor(size / 2)
  const end = Math.floor(size / 2)

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
