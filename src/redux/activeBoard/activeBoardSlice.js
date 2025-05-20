import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../utils/constant'
import { mapOrder } from '../../utils/sort'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '../../utils/formatter'
import authorizedAxiosInstance from '~/utils/authorizedAxios'

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailApi = createAsyncThunk(
  'activeBoard/fetchBoardDetailApi',
  async (boardId) => {
    const response = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    )

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
    },
    updateCardInBoard: (state, action) => {
      const inComingCard = action.payload
      const board = state.currentActiveBoard
      const column = board.columns.find(
        (column) => column._id === inComingCard.columnId
      )
      if (column) {
        const card = column.cards.find((card) => card._id === inComingCard._id)
        if (card) {
          Object.keys(inComingCard).forEach((key) => {
            card[key] = inComingCard[key]
          })
        }
      }
    }
  },
  extraReducers: (builder) => {
    //dùng fullfilled để lấy dữ liệu từ api và lưu vào state, chỉ dùng fullfiled vì data luôn dc trả về, nếu lỗi thì
    // sẽ bị reject và hiển thị lỗi tại axios interceptor
    builder.addCase(fetchBoardDetailApi.fulfilled, (state, action) => {
      let board = action.payload

      board.FE_allUsers = board.owners.concat(board.members)

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

export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions

// export default activeBoardSlice.reducer

export const activeBoardReducer = activeBoardSlice.reducer
