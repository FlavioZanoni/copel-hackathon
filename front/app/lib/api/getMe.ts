import { IUser } from "./auth"
import { makeApiRequest } from "./makeApiRequest"

export const getMe = async () => {
  return makeApiRequest<IUser>({
    method: "get",
    url: "users/context/detail",
  })
}
