import * as z from "zod";

export const businessConfigSchema = z.object({
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
