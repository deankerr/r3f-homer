import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface State {
  canStartAudio: boolean
  setCanStartAudio: () => void
}

export const useStateStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        canStartAudio: false,
        setCanStartAudio: () => set(() => ({ canStartAudio: true })),
      }),
      {
        name: 'r3f-storage',
      }
    )
  )
)
