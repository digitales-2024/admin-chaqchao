import * as z from "zod";

export const businessConfigSchema = z.object({
  ruc: z
    .string()
    .min(11, {
      message: "Ingrese el RUC de su negocio",
    })
    .max(11, {
      message: "El RUC debe tener 11 dígitos",
    })
    .regex(/^\d+$/, {
      message: "El RUC debe contener solo números",
    }),

  businessName: z.string().min(1, {
    message: "Ingrese el nombre de su negocio",
  }),
  contactNumber: z.string().min(1, {
    message: "Ingrese el número de contacto de su negocio",
  }),
  email: z
    .string()
    .min(1, {
      message: "Ingrese el email de su negocio",
    })
    .email({
      message: "Ingrese un email válido",
    }),
  address: z.string().min(1, {
    message: "Ingrese la dirección de su negocio",
  }),
});

export type CreateBusinessConfigSchema = z.infer<typeof businessConfigSchema>;
