import { IUser } from "@auth/types"
import { Icon } from "@components/Icon"
import { useUserContext } from "@context/userContext"
import { useEffect, useState } from "react"

export const MenuHeader: React.FC<{ user?: IUser }> = () => {
  const [usr, setUser] = useState<IUser | undefined>(undefined)
  const { userCtx } = useUserContext()
  //FIXME: this is a workaround to trigger hydration
  useEffect(() => {
    setUser(userCtx)
  }, [userCtx])

  return (
    <div className="sticky top-0 flex items-center bg-white px-4 pb-6 pt-8 lg:items-start lg:rounded-t-xl">
      <div className="flex gap-4 text-primary-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-30">
          <Icon name={"account_circle"} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg"> {usr?.name} </h1>
          <h2 className="text-xs">Ajustar info</h2>
        </div>
      </div>
    </div>
  )
}
