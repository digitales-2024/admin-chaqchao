import * as z from "zod";

export const productsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  price: z
    .string({
      required_error: "El precio es obligatorio y debe ser mayor que 0",
    })
    .min(1, {
      message: "El precio debe ser mayor que 0",
    })
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
      message: "El precio debe ser un número válido",
    }),

  isRestricted: z.boolean().optional(),
  image: z.instanceof(File).optional(),
  categoryId: z.string().min(1, { message: "Debes seleccionar una categoría" }),
});

export type CreateProductsSchema = z.infer<typeof productsSchema>;
