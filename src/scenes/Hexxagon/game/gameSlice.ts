import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Vector3 } from 'three'

import { createInitialGridState } from './hexLib'

export type HexxGameState = {
  grid: { [key: string]: HexxData }
  list: HexxData[]
}

export type HexxData = {
  hash: string
  vector: Vector3
  contents: 'empty' | 'pearl' | 'ruby' | 'hole'
  selected: boolean
}

const initialState: HexxGameState = { ...createInitialGridState() }

const hexxGameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setContents: (state, action: PayloadAction<[hash: string, contents: HexxData['contents']]>) => {
      const [hash, contents] = action.payload
      state.grid[hash].contents = contents
    },
  },
})

export const { setContents } = hexxGameSlice.actions
export default hexxGameSlice.reducer
