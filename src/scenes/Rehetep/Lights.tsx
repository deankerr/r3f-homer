import { useHelper } from '@react-three/drei'
import { folder, useControls } from 'leva'
import { useRef } from 'react'
import { DirectionalLight, DirectionalLightHelper } from 'three'

export function Lights() {
  const ref = useRef<DirectionalLight>(null!)

  const { x, y, z, intensity, color, visible, helper } = useControls(
    'lighting',
    {
      directional: folder({
        helper: false,
        x: { value: 600, min: -200, max: 1000, step: 1 },
        y: { value: 180, min: -200, max: 200, step: 1 },
        z: { value: 0, min: -200, max: 200, step: 1 },
        intensity: { value: 2, min: 0, max: 10, step: 0.1 },
        color: 'red',
        visible: true,
      }),
    },
    { collapsed: true }
  )
  useHelper(helper ? ref : undefined, DirectionalLightHelper, 10, color)

  const ambientProps = useControls('lighting', {
    ambient: folder({
      visible: false,
      color: 'white',
      intensity: 1,
    }),
  })

  return (
    <>
      <directionalLight
        position={[x, y, z]}
        color={color}
        intensity={intensity}
        ref={ref}
        visible={visible}
      />
      <ambientLight {...ambientProps} />
    </>
  )
}
