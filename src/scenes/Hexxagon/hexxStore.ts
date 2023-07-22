import { configureStore } from '@reduxjs/toolkit'

import hexxGameReducer from './game/gameSlice'

export const hexxStore = configureStore({
  reducer: {
    gameState: hexxGameReducer,
  },
})

export type HexxRootState = ReturnType<typeof hexxStore.getState>
export type HexxAppDispatch = typeof hexxStore.dispatch
