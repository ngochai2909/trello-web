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
