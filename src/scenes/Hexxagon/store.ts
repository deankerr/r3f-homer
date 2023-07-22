import { configureStore } from '@reduxjs/toolkit'

import hexxGameReducer from './slice'

export const hexxStore = configureStore({
  reducer: {
    gameState: hexxGameReducer,
  },
})

export type RootState = ReturnType<typeof hexxStore.getState>
export type AppDispatch = typeof hexxStore.dispatch
