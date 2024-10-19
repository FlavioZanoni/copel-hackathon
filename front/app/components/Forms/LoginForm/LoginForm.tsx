import { loginUser } from "@auth/authApi"
import { Button } from "@folhastech/design-system/Button"
import { TextField } from "@folhastech/design-system/TextField"
import { zodResolver } from "@hookform/resolvers/zod"
import { IError } from "@lib/api"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import dayjs from "dayjs"
import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import Cookies from "universal-cookie"
import { validationSchema } from "./schema"
import { TOKEN_COOKIE_NAME } from "@/app/lib/constants"

type FormValues = {
  login: string
  password: string
}

type Props = {
  setAllowGetMe: React.Dispatch<React.SetStateAction<boolean>>
  setErrorToast: React.Dispatch<
    React.SetStateAction<AxiosError<IError> | undefined>
  >
}

export const LoginForm = ({ setAllowGetMe, setErrorToast }: Props) => {
  const cookies = new Cookies()

  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(validationSchema()),
  })
  const { mutate, isLoading } = useMutation(["login"], loginUser, {
    onSuccess: (data) => {
      cookies.set(TOKEN_COOKIE_NAME, data.token, {
        path: "/",
        expires: data.expiration
          ? new Date(data.expiration)
          : dayjs().add(45, "day").toDate(),
      })
      setAllowGetMe(true)
    },
    onError: (error: AxiosError<IError>) => {
      console.log("error", error)
      setErrorToast(error)
    },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    mutate(data)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10"
    >
      <TextField
        placeholder="Email"
        {...register("login")}
        control={control}
        autoComplete="username"
      />
      <TextField
        type={"password"}
        placeholder="Senha"
        {...register("password")}
        control={control}
        autoComplete="current-password"
      />

      <Button loading={isLoading} disabled={isLoading} type="submit">
        Entrar
      </Button>
    </form>
  )
}
