import { createSlice } from '@reduxjs/toolkit'
import { update } from 'lodash'

const initialState = {
  activeCard: null
}

export const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState,
  reducers: {
    clearCurrentCard: (state) => {
      state.activeCard = null
    },

    updateCurrentCard: (state, action) => {
      state.activeCard = action.payload
    }
  },
  extraReducers: (builder) => {}
})

export const { clearCurrentCard, updateCurrentCard } = activeCardSlice.actions

export const selectActiveCard = (state) => state.activeCard.activeCard

export const activeCardReducer = activeCardSlice.reducer
