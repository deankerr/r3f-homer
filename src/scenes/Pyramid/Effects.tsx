import { useThree } from '@react-three/fiber'
import {
  EffectComposer,
  GlitchProps,
  Grid,
  Noise,
  Scanline,
  useVector2,
} from '@react-three/postprocessing'
import { useControls } from 'leva'
import { BlendFunction, GlitchEffect, GlitchMode } from 'postprocessing'
import { Ref, forwardRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { Vector2 } from 'three'

import { usePyramidStore } from '@/store'

const glitchStrength = new Vector2(0.5, 0.5)

export function Effects() {
  const config = useControls(
    'Effects',
    {
      scanline: false,
      density: { value: 1.25, step: 0.25 },
      vignette: false,
      vignetteDarkness: { value: 0.5, min: 0, max: 20, step: 0.25 },
      glitch: true,
      glitchActive: false,
      grid: false,
      noise: false,
    },
    { collapsed: true }
  )

  const scanline = (
    <Scanline
      blendFunction={BlendFunction.OVERLAY} // blend mode
      density={1.25} // scanline density
    />
  )

  //* Glitch
  const glitchEffectActive = usePyramidStore(state => state.glitchEffect)

  const glitch = (
    <FixedGlitch
      strength={glitchStrength}
      mode={GlitchMode.CONSTANT_WILD}
      active={config.glitchActive || glitchEffectActive}
    />
  )

  const grid = <Grid />

  const noise = <Noise />

  return (
    <>
      <EffectComposer multisampling={4} disableNormalPass>
        {config.scanline ? scanline : <></>}
        {config.glitch ? glitch : <></>}
        {config.grid ? grid : <></>}
        {config.noise ? noise : <></>}
      </EffectComposer>
    </>
  )
}

export const FixedGlitch = forwardRef<GlitchEffect, GlitchProps>(
  function Glitch(
    { active = true, ...props }: GlitchProps,
    ref: Ref<GlitchEffect>
  ) {
    const invalidate = useThree(state => state.invalidate)
    const delay = useVector2(props, 'delay')
    const duration = useVector2(props, 'duration')
    const strength = useVector2(props, 'strength')
    const chromaticAberrationOffset = useVector2(
      props,
      'chromaticAberrationOffset'
    )
    const effect = useMemo(() => {
      const eff = new GlitchEffect({
        ...props,
        delay,
        duration,
        strength,
        chromaticAberrationOffset,
      })
      // console.log('create')
      // debugger
      return eff
    }, [delay, duration, props, strength, chromaticAberrationOffset])
    // console.log('effect', effect)
    // console.log('render')
    useLayoutEffect(() => {
      effect.mode = active
        ? props.mode || GlitchMode.SPORADIC
        : GlitchMode.DISABLED
      invalidate()
    }, [active, effect, invalidate, props.mode])
    useEffect(() => {
      return () => {
        // console.log('effect.dispose', effect)
        // debugger
        effect.dispose()
        // console.log('dispose')
      }
    }, [effect])
    return <primitive ref={ref} object={effect} />
  }
)
