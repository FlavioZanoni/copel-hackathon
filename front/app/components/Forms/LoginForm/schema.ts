import * as z from "zod"

export const validationSchema = () => {
  return z
    .object({
      login: z
        .string({
          required_error: 'Login é obrigatório',
        })
        .trim(),
      password: z
        .string({
          required_error: 'Senha é obrigatória',
        })
        .trim()
        .min(5, "Senha deve ter no mínimo 5 caracteres")
        .max(50, "Senha deve ter no máximo 50 caracteres"),
    })
    .refine(
      (data) => {
        const validateEmail = (email: string) => {
          const re = /\S+@\S+\.\S+/
          return re.test(email)
        }
        return validateEmail(data.login)
      },
      {
        message: "Login deve ser um e-mail válido",
        path: ["login"],
      }
    )
}
