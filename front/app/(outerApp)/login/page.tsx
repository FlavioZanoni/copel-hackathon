"use client"
import { IError } from "@lib/api"
import { getMe } from "@api/getMe"
import { LoginForm } from "@components/Forms/LoginForm"
import { useLayoutContext } from "@context/LayoutContext"
import { useUserContext } from "@context/userContext"
import { Drawer } from "@folhastech/design-system/Drawer"
import { useSize } from "@folhastech/design-system/useSize"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import { useRouter } from "next/navigation"
import { TOKEN_COOKIE_NAME, USER_COOKIE_NAME } from "@/app/lib/constants"

const Login = () => {
  const cookies = new Cookies()
  const router = useRouter()
  const size = useSize()
  const isMobile = size === "sm" || size === "md"
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [allowGetMe, setAllowGetMe] = useState(false)
  const [errorToast, setErrorToast] = useState<AxiosError<IError>>()
  const { setToast } = useLayoutContext()
  const { setUserCtx } = useUserContext()

  useEffect(() => {
    if (cookies.get(TOKEN_COOKIE_NAME)) {
      setAllowGetMe(true) // adding this effect so user can't access the login page if he is already logged in
    }
  }, [allowGetMe])

  useEffect(() => {
    if (!errorToast) return

    setToast({
      title: "Erro no login",
      description:
        errorToast?.response?.data?.messages?.[0],
      type: "error",
    })
  }, [errorToast])

  useQuery(["getMe"], getMe, {
    enabled: allowGetMe,
    onSuccess: (data) => {
      router.push("/")
      cookies.set(USER_COOKIE_NAME, data, { path: "/" })
      setUserCtx(data)
      setToast({
        title: "Login efetuado com sucesso",
        description: "Bem vindo",
        type: "success",
      })
    },
  })

  return (
    <div className="flex h-screen flex-col items-center justify-between overflow-x-clip lg:flex-row lg:items-start">
      <div className="lg:full relative flex  w-full flex-col justify-between lg:flex-col">
        <section className="flex h-full min-h-[305px] w-[95vdh] items-center justify-center overflow-visible rounded-b-[40%] bg-primary-50 text-center align-text-top">
          <h1 className="text-3xl font-bold text-primary-0 lg:text-[40px]">
            Bem-vindo
            <br />
          </h1>
        </section>

        <div className="z-5 absolute left-1/2 top-[305px] mx-auto -translate-x-1/2 -translate-y-1/2 text-center lg:top-[345px] ">
          <section className="flex w-[160px] items-center justify-center rounded-full bg-slate-100 drop-shadow-2xl">
            <Image
              priority
              src="/logo.svg"
              alt="Login"
              width={160}
              height={160}
            />
          </section>
        </div>

        <section className="flex max-w-[462px] flex-col gap-4 self-center p-6 pt-24 lg:pt-56">
          <h2 className="text-center text-lg font-bold text-primary-0">

          </h2>

          <p className="text-center text-lg text-primary-0">
            Entrar
          </p>
        </section>
      </div>

      <div className="w-full self-center p-10 pb-16 lg:pb-0 ">
        <section className="flex flex-col items-center gap-6">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <Drawer
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
                button={{
                  text: "Entrar",
                }}
                title="Entrar"
              >
                <LoginForm
                  setErrorToast={setErrorToast}
                  setAllowGetMe={setAllowGetMe}
                />
              </Drawer>
            </div>
          ) : (
            <div className="flex w-full max-w-[462px] flex-col gap-10 self-center ">
              <h1 className="text-[40px] font-semibold text-primary-0">
                Entrar
              </h1>
              <LoginForm
                setErrorToast={setErrorToast}
                setAllowGetMe={setAllowGetMe}
              />
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Login
