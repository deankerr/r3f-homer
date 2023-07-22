import { create } from 'zustand'

type HomerState = 'idle' | 'faceRotating' | 'headMarging' | 'headDemarging'

type TaxiState = {
  refresh: boolean
  toggleRefresh: () => void

  canStartAudio: boolean
  setCanStartAudio: () => void

  homerState: HomerState
  setHomerState: (to: HomerState) => void

  homerFace: boolean
  setHomerFace: (to: boolean) => void
}

export const useTaxiStore = create<TaxiState>()(set => ({
  refresh: false,
  toggleRefresh: () => set(state => ({ refresh: !state.refresh })),

  canStartAudio: false,
  setCanStartAudio: () => set(() => ({ canStartAudio: true })),

  homerState: 'idle',
  setHomerState: (to: HomerState) => set(() => ({ homerState: to })),

  homerFace: false,
  setHomerFace: (to: boolean) => set(() => ({ homerFace: to })),
}))

// if (process.env.NODE_ENV === 'development') {
//   mountStoreDevtool('Store', useTaxiStore)
// }
