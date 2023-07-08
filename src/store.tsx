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
}

const bastetInitialState = {}

export const useBastetStore = create<BastetState>()(set => ({
  ...bastetInitialState,
  reset: () => {
    set(bastetInitialState)
  },
}))
