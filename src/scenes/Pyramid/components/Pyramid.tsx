import { Edges, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { useRef } from 'react'

import { usePyramidStore } from '@/store'

type Props = JSX.IntrinsicElements['group']

export function Pyramid({ ...group }: Props) {
  const config = useControls(
    'pyramid outer',
    {
      radius: { value: 23, min: 1, max: 200, step: 1 },
      transmissionSampler: true,
      backside: false,
      samples: { value: 6, min: 1, max: 32, step: 1 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
      thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.5, min: 0, max: 1 },
      anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.3, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationDistance: { value: 0.05, min: 0, max: 10, step: 0.01 },
      attenuationColor: '#ffffff',
      color: '#ffffff',
      bg: '#839681',
    },
    { collapsed: true }
  )

  const mainColor = usePyramidStore(state => state.mainColor)

  const [glitchEffect, setGlitchEffect] = usePyramidStore(state => [
    state.glitchEffect,
    state.setGlitchEffect,
  ])
  const timerRef = useRef<number>(0)

  const floatingState = usePyramidStore(state => state.floatingState)
  const setFloatingState = usePyramidStore(state => state.setFloatingState)

  function handleClick() {
    if (!glitchEffect) {
      // setGlitchEffect(true)
    }

    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setGlitchEffect(false), 250)

    // transition to space
    setFloatingState(!floatingState)
  }

  return (
    <group {...group} onClick={handleClick}>
      {/* inner */}
      <mesh>
        <octahedronGeometry args={[15]} />
        <meshStandardMaterial color="black" />
        <Edges threshold={15} color={mainColor} />
      </mesh>

      {/* outer */}
      <mesh>
        <octahedronGeometry args={[config.radius]} />
        <MeshTransmissionMaterial {...config} />
        <Edges threshold={15} color={mainColor} />
      </mesh>
    </group>
  )
}
