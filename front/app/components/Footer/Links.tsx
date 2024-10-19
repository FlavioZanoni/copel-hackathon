"use client"
import { useUserContext } from "@/app/lib/context/userContext"
import { useSize } from "@folhastech/design-system/useSize"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Links = () => {
  const size = useSize()
  const isMobile = size === "md" || size === "sm"
  const pathname = usePathname()
  const { userCtx } = useUserContext()

  const menus = [
    {
      title: "Demandas",
      icon: "home",
      link: "/",
      alt: "Início",
      roles: []
    },
    {
      title: "Clientes",
      icon: "diversity_3",
      link: "/menu/clients",
      roles: []
    },
    {
      title: "Profissionais",
      icon: "diversity_2",
      link: "/menu/professionals",
      roles: []
    },
    {
      title: "Menu",
      icon: "more_horiz",
      link: "/menu",
      roles: []
    },
  ]
  const desktopMenus = [
    {
      title: "Demandas",
      isLogo: true,
      icon: "home",
      link: "/",
      alt: "Início",
      roles: []
    },
    {
      title: "Clientes",
      icon: "diversity_3",
      link: "/menu/clients",
      roles: []
    },
    {
      title: "Profissionais",
      icon: "diversity_2",
      link: "/menu/professionals",
      roles: []
    },
    {
      title: "Usuário",
      icon: "account_circle",
      link: "/menu",
      roles: []
    },
  ]

  if (!userCtx?.name) {
    return <> </>
  }

  if (!isMobile) {
    return (
      <>
        {desktopMenus.filter((item) => {
          return !!item.roles.includes(userCtx?.role as never)
        }).map((menu) => {
          return (
            <Link
              key={menu.link}
              href={menu.link}
              className={clsx(
                (menu.link === "/menu" && "mt-auto")
              )}
            >
              <div
                className={clsx(
                  "flex h-12 w-12 flex-col items-center justify-center gap-1",
                  pathname === menu.link &&
                  "rounded-full bg-primary-40 shadow-[0px_2px_14px_rgba(8,112,217,0.25)]"
                )}
              >
                {menu.isLogo ? (
                  <Image
                    src={
                      pathname !== menu.link ? "/logo.svg" : "/logo-white.svg"
                    }
                    alt="Logo"
                    width={24}
                    height={24}
                    className={`h-full w-full ${pathname !== menu.link ? "" : "brightness-[0] invert"
                      }`}
                  />
                ) : (
                  <span
                    className={clsx(
                      "material-symbols-outlined ",
                      pathname === menu.link ? "text-white" : "text-gray-10",
                      "flex w-full items-center text-center"
                    )}
                  >
                    {menu.icon}
                  </span>
                )}
                {pathname !== menu.link && (
                  <span className="text-xs text-gray-10">{menu.title}</span>
                )}
              </div>
            </Link>
          )
        })}
      </>
    )
  }

  return (
    <>
      {menus.filter((item) => {
        return !!item.roles.includes(userCtx?.role as never)
      }).map((menu) => {
        return (
          <Link key={menu.link} href={menu.link}>
            <div
              className={clsx(
                "flex h-12 w-12 flex-col items-center justify-center gap-1",
                pathname === menu.link &&
                "rounded-full bg-primary-40 shadow-[0px_2px_14px_rgba(8,112,217,0.25)] "
              )}
            >
              <span
                className={clsx(
                  "material-symbols-outlined ",
                  pathname === menu.link ? "text-white" : "text-gray-10",
                  "text-center"
                )}
              >
                {menu.icon}
              </span>

              {pathname !== menu.link && (
                <span className="text-xs text-gray-10">{menu.title}</span>
              )}
            </div>
          </Link>
        )
      })}
    </>
  )
}
