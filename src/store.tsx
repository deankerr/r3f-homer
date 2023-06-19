import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface State {
  canStartAudio: boolean
  setCanStartAudio: () => void
}

export const useTaxiStore = create<State>()(
  devtools((set) => ({
    canStartAudio: false,
    setCanStartAudio: () => set(() => ({ canStartAudio: true })),
  }))
)

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useTaxiStore)
}
