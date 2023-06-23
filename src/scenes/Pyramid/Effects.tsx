import { Effects } from '@react-three/drei'
import { Node, Object3DNode, extend, useThree } from '@react-three/fiber'
import { EffectComposer, Scanline, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import {
  DotScreenPass,
  GlitchPass,
  RenderPass,
  SSAOPass,
  ShaderPass,
} from 'three-stdlib'

extend({ GlitchPass })

declare module '@react-three/fiber' {
  interface ThreeElements {
    glitchPass: any
  }
}

export function WowEffects() {
  const { scene, camera } = useThree()
  return (
    <>
      {/* <EffectComposer>
        <Scanline
          blendFunction={BlendFunction.OVERLAY} // blend mode
          density={1.25} // scanline density
        />

        <Vignette
          offset={0.5} // vignette offset
          darkness={0.5} // vignette darkness
          eskil={false} // Eskil's vignette technique
          blendFunction={BlendFunction.OVERLAY} // blend mode
        />
      </EffectComposer> */}

      <Effects
        multisamping={8}
        renderIndex={1}
        disableGamma={false}
        disableRenderPass={false}
        disableRender={false}
      >
        <glitchPass args={[scene, camera]} />
      </Effects>
    </>
  )
}
