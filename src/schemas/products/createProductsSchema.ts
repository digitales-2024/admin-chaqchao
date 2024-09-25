import * as z from "zod";

export const productsSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  price: z.number().min(1, {
    message: "El precio es obligatorio y debe ser mayor que 0",
  }),
  image: z.string().optional(),
  categoryId: z.string().min(1, { message: "Debes seleccionar una categoría" }),
});

export type CreateProductsSchema = z.infer<typeof productsSchema>;
