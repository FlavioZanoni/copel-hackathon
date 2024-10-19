import axios from "axios"
import {
  GenericResponse,
  ILoginResponse,
  IRegisterUser,
  IUserLogin,
} from "./types"

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
})

authApi.defaults.headers.common["Content-Type"] = "application/json"

// se algum dia precisar de um refresh token, aqui está o código
/* export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<ILoginResponse>("auth/refresh")
  return response.data
}

authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message as string
    if (errMessage.includes("not logged in") && !originalRequest._retry) {
      originalRequest._retry = true
      await refreshAccessTokenFn()
      return authApi(originalRequest)
    }
    return Promise.reject(error)
  }
)
 */
export const signUpUser = async (user: IRegisterUser) => {
  const response = await authApi.post<GenericResponse>("auth/register", user)
  return response.data
}

export const loginUser = async (user: IUserLogin) => {
  const response = await authApi.post<ILoginResponse>("auth/authenticate", user)
  return response.data as ILoginResponse
}

export const logoutUser = async () => {
  const response = await authApi.get<GenericResponse>("auth/logout")
  return response.data
}
