import { ROLES } from "../constants"
import { IUser } from "./auth"

export type DefType = {
}

export interface Company extends DefType { }

export interface IError {
  code: number
  moreInfo: string
  developerMessage: string
  status: number
  messages: string[]
}

export interface Pagination<T> {
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    unpaged: boolean
  }
  size: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  totalElements: number
  totalPages: number
  content: T[]
}

export interface User {
  name: string
  role: IUser["role"]
  company: Company
}

export interface GetApiParams {
  id?: number
  offset: number
  limit: number
  filter?: string
}

export type Roles = (typeof ROLES)[number];
