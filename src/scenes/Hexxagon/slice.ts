import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createInitialGridState } from './lib'

export type HexxGameState = {
  list: HexxData[]
}

export type HexxData = {
  index: Readonly<number>
  vector: Hex3
  contents: 'empty' | 'pearl' | 'ruby' | 'hole'
  selected: boolean
}

export type Hex3 = Readonly<[number, number, number]>

const initialState: HexxGameState = { list: createInitialGridState() }

const hexxGameSlice = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    setContents: (state, action: PayloadAction<[index: number, contents: HexxData['contents']]>) => {
      const [index, contents] = action.payload
      state.list[index].contents = contents
    },
    selectHex: (state, action: PayloadAction<number>) => {
      const index = action.payload
      const hex = state.list[index]

      if (hex.contents === 'pearl' || hex.contents === 'ruby') {
        // valid selection
        hex.selected = true
        console.log('selected:', index)
      } else {
        // invalid
        console.log('invalid selection', index)
      }
    },
  },
})

export const { setContents, selectHex } = hexxGameSlice.actions
export default hexxGameSlice.reducer
