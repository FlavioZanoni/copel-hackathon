import axios from "axios"
import Cookies from "universal-cookie"
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from "../constants"

const cookies = new Cookies()

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

axiosInstance.interceptors.request.use(
  function(config) {
    const token = cookies.get(TOKEN_COOKIE_NAME)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      cookies.remove(TOKEN_COOKIE_NAME, { path: "/" })
      cookies.remove(USER_COOKIE_NAME, { path: "/" })

      window.location.href = `/login`
      return
    }
    if (error.response.status === 403) {
      window.location.href = `/403`
      return
    } else {
      return Promise.reject(error)
    }
  }
)
