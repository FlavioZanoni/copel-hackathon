"use client"
import { Icon } from "@components/Icon"
import { useUserContext } from "@context/userContext"
import { Drawer } from "@folhastech/design-system/Drawer"
import React, { useEffect, useState } from "react"
import { createMenus, noMenuPaths } from "./menuConfig"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const FloatingMenu: React.FC = () => {
  const path = usePathname()
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openSubMenus, setOpenSubMenus] = useState<number[]>([])
  const { userCtx } = useUserContext()
  const id = Number(path.split("/")[2]) || undefined
  const menus = createMenus()

  const isAllowed = () => {
    const currentMenu = menus.find(menu => new RegExp(menu.path).test(path))
    if (!currentMenu) return false
    if (!currentMenu.roles) return true
    if (currentMenu.roles.includes(userCtx?.role!)) {
      return true
    }
    return false
  }
  //ensures that the menu is closed when the path changes
  useEffect(() => {
    setOpenDrawer(false)
  }, [path, setOpenDrawer])

  if (
    noMenuPaths.some((noMenuPath) => path === noMenuPath)
    || !isAllowed()
  ) {
    return null
  }

  return (
    <>
      <button
        type="button"
        className="absolute bottom-24 right-4 z-10 flex h-16 w-16 items-center justify-center rounded-full bg-primary-30 
        lg:right-[calc(((100vw-1032px)/2)+24px)] xl:right-[calc(((100vw-1280px)/2)+24px)]" // 1032px/1280px is the width of the content, 24px is the padding
        onClick={() => {
          setOpenDrawer(!openDrawer)
        }}
      >
        <Icon
          className={`text-white ${openDrawer && "rotate-[135deg]"
            } transition-transform duration-500 ease-in-out`}
          name={"add"}
        />
      </button>

      {menus.map((menu, index) => {
        const regex = new RegExp(menu.path)
        if (!regex.test(path) || !openDrawer) return
        if (
          menu.roles &&
          menu.roles.length > 0 &&
          !menu.roles.includes(userCtx?.role!)
        ) {
          return null
        }
        if (menu.isSubMenu && menu.subMenus) {
          return (
            <div
              key={index}
              className="fixed bottom-44 right-7 z-10 flex flex-col items-center justify-center gap-2 
              lg:right-[calc(((100vw-1032px)/2)+24px+14px)] xl:right-[calc(((100vw-1280px)/2)+36px)]" // 1032px/1280px is the width of the content, 24px is the padding, 14px centers it on the button
            >
              {menu.subMenus.map((subMenu, index) => {
                if (
                  subMenu.roles.length > 0 &&
                  !subMenu.roles.includes(userCtx?.role!)
                ) {
                  return null
                }
                const open = openSubMenus.includes(index)
                const handleClick = () => {
                  if (open) {
                    setOpenSubMenus((prev) =>
                      prev.filter((item) => item !== index)
                    )
                  } else {
                    setOpenSubMenus((prev) => [...prev, index])
                  }
                }

                if (subMenu.link) {
                  return (
                    <Link
                      key={index}
                      href={`${path}/${subMenu.link}`}
                      replace={false}
                      className="flex h-10 w-10 animate-jump-in items-center justify-center rounded-full border border-primary-30 bg-primary-60 animate-delay-200 animate-duration-300 animate-ease-in"
                    >
                      <Icon name={subMenu.icon} className={"text-primary-0"} />
                    </Link>
                  )
                }

                if (!subMenu.component) return null
                return (
                  <Drawer
                    key={index}
                    title={subMenu.title}
                    open={open}
                    setOpen={handleClick}
                    button={{
                      onClick: () => handleClick(),
                      children: (
                        <Icon
                          name={subMenu.icon}
                          className={"text-primary-0"}
                        />
                      ),
                      className:
                        "flex h-10 w-10 animate-jump-in animate-duration-300 animate-delay-200 animate-ease-in items-center justify-center rounded-full border border-primary-30 bg-primary-60",
                    }}
                  >
                    <subMenu.component id={id!} setOpenDrawer={handleClick} />
                  </Drawer>
                )
              })}
            </div>
          )
        } else {
          return (
            <Drawer
              key={index}
              title={menu.title || ""}
              open={openDrawer}
              setOpen={setOpenDrawer}
            >
              {menu.component ? (
                <menu.component id={id} setOpenDrawer={setOpenDrawer} />
              ) : null}
            </Drawer>
          )
        }
      })}
    </>
  )
}
