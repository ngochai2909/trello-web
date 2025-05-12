import { toast } from 'react-toastify'
import { API_ROOT } from '../utils/constant'
import authorizedAxiosInstance from '~/utils/authorizedAxios'

// export const fetchBoardDetailApi = async (boardId) => {
//   const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)

//   return response.data
// }

export const updateBoardDetailApi = async (boardId, updateData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  )

  return response.data
}

export const moveCardToOtherColumnApi = async (updateData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/boards/supports/moving_card`,
    updateData
  )

  return response.data
}

export const updateColumnDetailApi = async (columnId, updateData) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  )

  return response.data
}

export const deleteColumnApi = async (columnId) => {
  const response = await authorizedAxiosInstance.delete(
    `${API_ROOT}/v1/columns/${columnId}`
  )
  return response.data
}

export const createNewColumnApi = async (newColumnData) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/columns`,
    newColumnData
  )

  return response.data
}

export const createNewCardApi = async (newCardData) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/cards`,
    newCardData
  )

  return response.data
}

export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/users/register`,
    data
  )
  toast.success(
    'Account created successfully! Please check and verify your account before logging in!',
    { theme: 'colored' }
  )
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/users/verify`,
    data
  )
  toast.success(
    'Account verified successfully! Now you can login to enjoy our services! Have a good day!',
    { theme: 'colored' }
  )
  return response.data
}

export const refreshTokenApi = async () => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/users/refresh_token`
  )
  return response.data
}

export const fetchBoardsApi = async (searchParams) => {
  const response = await authorizedAxiosInstance.get(
    `${API_ROOT}/v1/boards${searchParams}`
  )
  return response.data
}

export const createBoardApi = async (data) => {
  const response = await authorizedAxiosInstance.post(
    `${API_ROOT}/v1/boards`,
    data
  )
  toast.success('Board created successfully!', { theme: 'colored' })
  return response.data
}

export const updateCardApi = async (cardId, data) => {
  const response = await authorizedAxiosInstance.put(
    `${API_ROOT}/v1/cards/${cardId}`,
    data
  )
  return response.data
}
