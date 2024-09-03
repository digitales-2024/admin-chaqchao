import { z } from "zod";

export const updateSecuritySchema = z
  .object({
    currentPassword: z.string().min(1, {
      message: "Debes ingresar tu contraseña actual",
    }),
    newPassword: z
      .string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
          "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "La nueva contraseña y la confirmación no coinciden",
    path: ["confirmPassword"], // Indica en qué campo ocurrió el error
  });
