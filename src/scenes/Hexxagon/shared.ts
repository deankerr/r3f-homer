import { useFrame } from '@react-three/fiber'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { Object3D } from 'three'

import type { AppDispatch, RootState } from './store'

export const useHexxDispatch: () => AppDispatch = useDispatch
export const useHexxSelector: TypedUseSelectorHook<RootState> = useSelector

export function useRotation(ref: React.MutableRefObject<Object3D>, x: number, y: number, z: number) {
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += x * delta
      ref.current.rotation.y += y * delta
      ref.current.rotation.z += z * delta
    }
  })
}
