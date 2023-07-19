import { useThree } from '@react-three/fiber'
import { useLayoutEffect } from 'react'

export function useFrameLoopDemand() {
  const setFrameloop = useThree(state => state.setFrameloop)

  useLayoutEffect(() => {
    setFrameloop('demand')
    return () => setFrameloop('always')
  }, [setFrameloop])
}
