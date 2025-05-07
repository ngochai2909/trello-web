import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { refreshTokenApi } from '~/apis'
import { logoutUserApi } from '~/redux/user/userSlice'

let axiosReduxStore

export const injectStore = (mainStore) => {
  axiosReduxStore = mainStore
}

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    interceptorLoadingElements(true)

    return config
  },
  (error) => {
    // Do something with request error

    return Promise.reject(error)
  }
)

let refreshTokenPromise = null

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)

    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    interceptorLoadingElements(false)

    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserApi())
    }

    const originalRequest = error.config
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenApi()
          .then((data) => {
            return data?.accessToken
          })
          .catch(() => {
            axiosReduxStore.dispatch(logoutUserApi(false))
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then((accessToken) => {
        return authorizedAxiosInstance(originalRequest)
      })
    }

    let errorMessage = error?.message

    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }
    if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance
