import { IUser } from "@api/auth"
import { Icon } from "@components/Icon"
import { useUserContext } from "@context/userContext"
import clsx from "clsx"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const BackHeader: React.FC<{ pathname: string }> = ({ pathname }) => {
  const router = useRouter()
  const { userCtx } = useUserContext()

  const [usr, setUser] = useState<IUser | undefined>(undefined)

  //FIXME: this is a workaround to trigger hydration
  useEffect(() => {
    setUser(userCtx)
  }, [userCtx])

  return (
    <div
      className={clsx(
        "sticky top-0 flex items-center bg-white px-4 pb-6 pt-8 lg:px-6 ",
        pathname === "/" && "justify-center border border-b-gray-30",
        "lg:justify-start lg:rounded-t-xl"
      )}
    >
      {pathname !== "/" ? (
        <button
          onClick={() => {
            router.back()
          }}
        >
          <Icon name={"arrow_back"} className="text-primary-0" />
        </button>
      ) : (
        <h1 className="text-xl text-primary-0">
          {"Olá"}, {usr?.name}
        </h1>
      )}
    </div>
  )
}
