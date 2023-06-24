import { Circle, Sphere } from '@react-three/drei'
import {
  EffectComposer,
  Glitch,
  GodRays,
  Grid,
  Noise,
  Scanline,
  Vignette,
} from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { forwardRef, useRef, useState } from 'react'
import { Mesh, Vector2 } from 'three'

const glitchDelay = new Vector2(3, 3.1)
const glitchDuration = new Vector2(1, 1.1)
const glitchStrength = new Vector2(1, 1.1)

export function ShaderFX() {
  const config = useControls(
    'ShaderFX',
    {
      scanline: true,
      density: { value: 1.25, step: 0.25 },
      vignette: true,
      vignetteDarkness: { value: 0.5, min: 0, max: 20, step: 0.25 },
      glitch: false,
      grid: true,
      noise: true,
    },
    { collapsed: true }
  )

  const scanline = (
    <Scanline
      blendFunction={BlendFunction.OVERLAY} // blend mode
      density={1.25} // scanline density
    />
  )

  const vignette = (
    <Vignette
      offset={0.5} // vignette offset
      darkness={config.vignetteDarkness} // vignette darkness
      eskil={false} // Eskil's vignette technique
      blendFunction={BlendFunction.NORMAL} // blend mode
    />
  )

  const glitch = (
    <Glitch
      delay={glitchDelay} // min and max glitch delay
      duration={glitchDuration} // min and max glitch duration
      strength={glitchStrength} // min and max glitch strength
      mode={GlitchMode.SPORADIC} // glitch mode
      active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
      ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
    />
  )

  const grid = <Grid />

  const noise = <Noise />

  const [material, set] = useState<Mesh>(null!)
  return (
    <>
      <EffectComposer>
        {config.scanline ? scanline : <></>}
        {config.vignette ? vignette : <></>}
        {config.glitch ? glitch : <></>}
        {config.grid ? grid : <></>}
        {config.noise ? noise : <></>}
      </EffectComposer>
    </>
  )
}
