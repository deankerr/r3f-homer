import { useHelper } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

export function Lights() {
  const dirLightRef = useRef<DirectionalLight>(null!)
  // useHelper(dirLightRef, DirectionalLightHelper, 1, 'red')

  const { x, y, z, intensity, color, visible } = useControls(
    'directional light',
    {
      x: { value: 600, min: -200, max: 1000, step: 1 },
      y: { value: 180, min: -200, max: 200, step: 1 },
      z: { value: 0, min: -200, max: 200, step: 1 },
      intensity: { value: 2, min: 0, max: 10, step: 0.1 },
      color: 'red',
      visible: true,
    }
  )

  return (
    <>
      <directionalLight
        position={[x, y, z]}
        color={color}
        intensity={intensity}
        ref={dirLightRef}
        visible={visible}
      />
      {/* <ambientLight intensity={1} /> */}
    </>
  )
}
