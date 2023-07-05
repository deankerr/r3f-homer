import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type HomerState = 'idle' | 'faceRotating' | 'headMarging' | 'headDemarging'

type State = {
  canStartAudio: boolean
  setCanStartAudio: () => void

  homerState: HomerState
  setHomerState: (to: HomerState) => void

  homerFace: boolean
  setHomerFace: (to: boolean) => void
}

export const useTaxiStore = create<State>()(
  devtools((set) => ({
    canStartAudio: false,
    setCanStartAudio: () => set(() => ({ canStartAudio: true })),

    homerState: 'idle',
    setHomerState: (to: HomerState) => set(() => ({ homerState: to })),

    homerFace: false,
    setHomerFace: (to: boolean) => set(() => ({ homerFace: to })),
  }))
)

type PyramidState = {
  mainColor: string
  setMainColor: (to: string) => void
  glitchEffect: boolean
  setGlitchEffect: (to: boolean) => void
  floatingState: boolean
  setFloatingState: (to: boolean) => void
}

export const usePyramidStore = create<PyramidState>()((set) => ({
  mainColor: 'orange',
  setMainColor: (to: string) => set(() => ({ mainColor: to })),
  glitchEffect: false,
  setGlitchEffect: (to: boolean) => set(() => ({ glitchEffect: to })),
  floatingState: false,
  setFloatingState: (to: boolean) => set(() => ({ floatingState: to })),
}))

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTaxiStore)
}
