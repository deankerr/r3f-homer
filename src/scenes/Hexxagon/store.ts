import { type PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'

export interface HexxState {
  value: number
}

const initialState: HexxState = {
  value: 0,
}

export const hexxSlice = createSlice({
  name: 'hexx',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = hexxSlice.actions
export default hexxSlice.reducer

//* store

export const hexxStore = configureStore({
  reducer: {
    hexx: hexxSlice.reducer,
  },
})

export type RootState = ReturnType<typeof hexxStore.getState>
export type AppDispatch = typeof hexxStore.dispatch
