import { Roles } from "@/app/lib/api"
import { ExampleForm } from "../Forms/ExampleForm"

export const noMenuPaths = []

export type SubMenus = {
  title: string
  component?: React.FC<any>
  icon: string
  link?: string
  roles: Roles[]
  onClick?: () => void
}

export type Menu = {
  title: string
  path: string
  component?: React.FC<any>
  isSubMenu?: boolean
  subMenus?: SubMenus[]
  roles?: Roles[]
}

export const createMenus = (): Menu[] => {
  return [
    {
      title: "Novo Example",
      path: "/",
      component: ExampleForm,
      roles: ["exampleRole"],
    },
  ]
}
