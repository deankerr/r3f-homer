import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createInitialGridState } from './lib'

export type HexxGameState = {
  list: HexxData[]
  selected: number | null
}

export type HexxData = {
  index: Readonly<number>
  vector: Hex3
  contents: 'empty' | 'pearl' | 'ruby' | 'hole'
}

export type Hex3 = Readonly<[number, number, number]>
export type HexSelectionStyle = 'selected' | 'near' | 'far'

const initialState: HexxGameState = { list: createInitialGridState(), selected: null }

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
        state.selected = state.selected !== index ? index : null
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
