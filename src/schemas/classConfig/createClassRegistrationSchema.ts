import { z } from "zod";

export const createClassRegistrationSchema = z.object({
  closeBeforeStartInterval: z
    .number({
      required_error: "El intervalo de cierre antes del inicio es obligatorio",
      invalid_type_error:
        "El intervalo de cierre antes del inicio debe ser un número",
    })
    .min(1, "El intervalo debe ser al menos 1 minuto"),
  finalRegistrationCloseInterval: z
    .number({
      required_error: "El intervalo final de cierre de registro es obligatorio",
      invalid_type_error:
        "El intervalo final de cierre de registro debe ser un número",
    })
    .min(1, "El intervalo debe ser al menos 1 minuto"),
});

export type CreateClassRegistrationSchema = z.infer<
  typeof createClassRegistrationSchema
>;
