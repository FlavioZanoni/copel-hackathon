import { Roles } from "../types"

export interface IToken {
  iat: number
  sub: string
  roles: {
    authority: string
  }
}

export interface IUser {
  id: number
  name: string
  role: Roles
  email: string
  company: {
    id: 0
    name: string
    active: boolean
  }
}
export interface IUserLogin {
  login: string
  password: string
}

export type IRegisterUser = Omit<IUser, "company" | "id" | "role"> & {
  password: string
  isApplicator: boolean
}

export interface GenericResponse {
  status: string
  message: string
}

export interface ILoginResponse {
  status: string
  token: string
  expiration: number
}
