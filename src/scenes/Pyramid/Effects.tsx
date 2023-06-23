import { EffectComposer, Scanline, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

export function Effects() {
  return (
    <>
      <EffectComposer>
        <Scanline
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={1.25} // scanline density
        />

        <Vignette
          offset={0.5} // vignette offset
          darkness={0.5} // vignette darkness
          eskil={false} // Eskil's vignette technique
          blendFunction={BlendFunction.NORMAL} // blend mode
        />
      </EffectComposer>
    </>
  )
}
