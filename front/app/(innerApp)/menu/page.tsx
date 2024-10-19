"use client"
import { Icon } from "@components/Icon"
import { useUserContext } from "@context/userContext"
import { Button } from "@folhastech/design-system/Button"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import Cookies from "universal-cookie"
import { getMenus } from "./menus"
import Link from "next/link"
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from "@/app/lib/constants"

const Menu = () => {
  const cookies = new Cookies()
  const router = useRouter()
  const { userCtx } = useUserContext()
  const queryClient = useQueryClient()
  const menus = getMenus()

  return (
    <div className="flex h-[calc(100dvh-104px-88px)] flex-col justify-between overflow-y-scroll">
      <div className="first:border-t first:border-primary-40">
        {menus.map((menu, index) => {
          if (
            !menu.allowedRoles.includes(userCtx?.role || "Admin")
          ) {
            return null
          }

          return (
            <Link href={menu.path} key={index}>
              <div className="flex items-center justify-between border-b border-primary-40 p-6">
                <div className="flex items-center gap-4">
                  <Icon name={menu.icon} className="text-primary-10" />

                  <span className="text-lg text-primary-10">{menu.name}</span>
                </div>
                <Icon
                  className="h-5 w-5 text-primary-10"
                  name={"arrow_forward_ios"}
                />
              </div>
            </Link>
          )
        })}
      </div>

      <Button
        variant="text"
        onClick={() => {
          cookies.remove(TOKEN_COOKIE_NAME, { path: "/" })
          cookies.remove(USER_COOKIE_NAME, { path: "/" })
          queryClient.clear()
          router.push("/login")
        }}
        className="bottom-0 p-6"
      >
        <div className="flex gap-4 text-error-10">
          <Icon name={"logout"} />
          <span>Sair</span>
        </div>
      </Button>
    </div>
  )
}

export default Menu
