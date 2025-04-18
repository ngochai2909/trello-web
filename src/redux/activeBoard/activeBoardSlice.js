import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { API_ROOT } from '../../utils/constant'
import { mapOrder } from '../../utils/sort'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '../../utils/formatter'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailApi = createAsyncThunk(
  'activeBoard/fetchBoardDetailApi',
  async (boardId) => {
    const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

    return response.data
  }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      let board = action.payload

      state.currentActiveBoard = board
    }
  },
  extraReducers: (builder) => {
    //dùng fullfilled để lấy dữ liệu từ api và lưu vào state, chỉ dùng fullfiled vì data luôn dc trả về, nếu lỗi thì
    // sẽ bị reject và hiển thị lỗi tại axios interceptor
    builder.addCase(fetchBoardDetailApi.fulfilled, (state, action) => {
      let board = action.payload

      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')

      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)]
          column.cardOrderIds = [generatePlaceholderCard(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })

      state.currentActiveBoard = board
    })
  }
})

export const selectCurrentActiveBoard = (state) =>
  state.activeBoard.currentActiveBoard

export const { updateCurrentActiveBoard } = activeBoardSlice.actions

// export default activeBoardSlice.reducer

export const activeBoardReducer = activeBoardSlice.reducer
