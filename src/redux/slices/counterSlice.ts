import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number | null
}

const initialState: CounterState = {
  value: null,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    setAmount: (state, action: PayloadAction<number>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAmount } = counterSlice.actions

export default counterSlice.reducer