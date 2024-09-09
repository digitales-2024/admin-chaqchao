import { z } from "zod";

export const updateInfoSchema = z.object({
  name: z.string().min(1, {
    message: "Ingrese su nombre completo",
  }),
  phone: z
    .string()
    .min(1, {
      message: "Ingrese su número de teléfono",
    })
    .max(15, {
      message: "Número de teléfono no válido",
    }),
});
