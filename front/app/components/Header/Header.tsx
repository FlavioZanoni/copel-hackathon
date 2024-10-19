"use client"
import { useUserContext } from "@context/userContext"
import React from "react"
import { BackHeader } from "./BackHeader"
import { MenuHeader } from "./MenuHeader"
import { usePathname } from "next/navigation"

export const Header: React.FC<{ isMenu?: boolean }> = () => {
  const { userCtx } = useUserContext()
  const pathname = usePathname()
  const isMenu = pathname === "/menu"

  return (
    <>
      {isMenu ? (
        <MenuHeader user={userCtx} />
      ) : (
        <BackHeader pathname={pathname} />
      )}
    </>
  )
}
