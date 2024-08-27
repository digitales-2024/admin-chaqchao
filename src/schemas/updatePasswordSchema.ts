import { z } from "zod";

export const updatePasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Ingrese su email",
    })
    .email({
      message: "Email no válido",
    }),

  password: z.string().min(1, {
    message: "Ingrese su contraseña",
  }),
  newPassword: z.string().min(1, {
    message: "Ingrese su nueva contraseña",
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirme su nueva contraseña",
  }),
});
