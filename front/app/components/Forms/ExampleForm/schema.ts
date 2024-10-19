import { Roles } from "@/app/lib/api"
import * as z from "zod"

export const validationSchema = (role: Roles) => {
  return z
    .object({
      active: z.boolean().optional(),
      name: z
        .string()
        .trim()
        .min(5, { message: "Nome deve conter no minimo 5 caracteres" })
        .max(50, { message: "Nome deve conter no maximo 50 caracteres" }),
      price: z.coerce
        .number()
        .min(0.01, { message: "Preço minimo é de 0.01 centavos" })
        .max(999999, { message: "Preço maximo é de 999999" }),

    }).strict()
}
