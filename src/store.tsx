import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type HomerState = 'idle' | 'faceRotating' | 'headMarging' | 'headDemarging'

type State = {
  refresh: boolean
  toggleRefresh: () => void

  canStartAudio: boolean
  setCanStartAudio: () => void

  homerState: HomerState
  setHomerState: (to: HomerState) => void

  homerFace: boolean
  setHomerFace: (to: boolean) => void
}

export const useTaxiStore = create<State>()(
  devtools(set => ({
    refresh: false,
    toggleRefresh: () => set(state => ({ refresh: !state.refresh })),

    canStartAudio: false,
    setCanStartAudio: () => set(() => ({ canStartAudio: true })),

    homerState: 'idle',
    setHomerState: (to: HomerState) => set(() => ({ homerState: to })),

    homerFace: false,
    setHomerFace: (to: boolean) => set(() => ({ homerFace: to })),
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTaxiStore)
}

type BastetState = {
  reset: () => void
  mainColor: string
  setMainColor: (to: string) => void

  mainColorSteps: string[]
  mainColorIndex: number
  nextMainColor: () => void

  glitchEffect: boolean
  setGlitchEffect: (to: boolean) => void
  floatingState: boolean
  setFloatingState: (to: boolean) => void
}

const bastetInitialState = {
  mainColor: 'orange',
  mainColorSteps: ['orange', 'violet', 'cyan', 'magenta', 'red'],
  mainColorIndex: 0,
  glitchEffect: false,
  floatingState: false,
}

export const useBastetStore = create<BastetState>()(set => ({
  ...bastetInitialState,
  reset: () => {
    set(bastetInitialState)
  },

  setMainColor: (to: string) => set(() => ({ mainColor: to })),

  nextMainColor: () =>
    set(state => {
      const { mainColorIndex, mainColorSteps } = state
      const index = mainColorIndex + 1
      const color = mainColorSteps[index % mainColorSteps.length]
      return { mainColorIndex: index, mainColor: color }
    }),

  setGlitchEffect: (to: boolean) => set(() => ({ glitchEffect: to })),
  setFloatingState: (to: boolean) => set(() => ({ floatingState: to })),
}))
