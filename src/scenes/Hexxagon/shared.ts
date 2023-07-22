import { useFrame } from '@react-three/fiber'
import { Object3D } from 'three'

export function useRotation(ref: React.MutableRefObject<Object3D>, x: number, y: number, z: number) {
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += x * delta
      ref.current.rotation.y += y * delta
      ref.current.rotation.z += z * delta
    }
  })
}
