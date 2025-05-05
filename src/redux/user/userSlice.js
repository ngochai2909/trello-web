import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_ROOT } from '../../utils/constant'

import authorizedAxiosInstance from '~/utils/authorizedAxios'

const initialState = {
  currentUser: null
}

export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(
      `${API_ROOT}/v1/users/login`,
      data
    )

    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //dùng fullfilled để lấy dữ liệu từ api và lưu vào state, chỉ dùng fullfiled vì data luôn dc trả về, nếu lỗi thì
    // sẽ bị reject và hiển thị lỗi tại axios interceptor
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      const user = action.payload

      state.currentUser = user
    })
  }
})

export const selectCurrentUser = (state) => state.user.currentUser

// export const {} = userSlice.actions

// export default activeBoardSlice.reducer

export const userReducer = userSlice.reducer
