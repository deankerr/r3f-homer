import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type HomerState = 'idle' | 'faceRotating' | 'headMarging' | 'headDemarging'

type State = {
  canStartAudio: boolean
  setCanStartAudio: () => void

  homerState: HomerState
  setHomerState: (to: HomerState) => void
}

export const useTaxiStore = create<State>()(
  devtools((set) => ({
    canStartAudio: false,
    setCanStartAudio: () => set(() => ({ canStartAudio: true })),

    homerState: 'idle',
    setHomerState: (to: HomerState) => set(() => ({ homerState: to })),
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTaxiStore)
}
