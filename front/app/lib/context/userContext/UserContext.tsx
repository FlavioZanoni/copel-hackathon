"use client"
import { IUser } from "@auth/index"
import React, { createContext, useContext, useState } from "react"
import Cookies from "universal-cookie"
import { USER_COOKIE_NAME } from "../../constants"
type UserProps = {
  userCtx?: IUser
  setUserCtx: React.Dispatch<React.SetStateAction<IUser | undefined>>
}

export const UserContext = createContext({} as UserProps)

type Props = {
  children: React.ReactNode
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const cookies = new Cookies()
  // const router = useRouter()
  // const params = useSearchParams()
  // const path = usePathname()
  const userInCookie = cookies.get(USER_COOKIE_NAME)
  const [userCtx, setUserCtx] = useState<IUser | undefined>({
    ...(userInCookie as IUser)
  })
  // this is not being used and needs a better implementation
  /*   useEffect(() => {
      // if route is in (outterApp) do nothing
      if (path === "/403" || path === "/usageTerms") return
  
      if (!userCtx) {
        const plan = params.get("plan")
        router.push(`/login${plan ? `?plan=${plan}` : ""}`)
      }
    }, [router, userCtx])
   */
  const values = {
    userCtx,
    setUserCtx,
  }

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider")
  }

  return context
}
