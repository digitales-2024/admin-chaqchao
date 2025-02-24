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
  maxStock: z
    .string({
      required_error: "El stock máximo es obligatorio y debe ser mayor que 0",
    })
    .min(1, {
      message: "El stock máximo debe ser mayor que 0",
    })
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, {
      message: "El stock máximo debe ser un número válido",
    }),
  isRestricted: z.boolean().optional(),

  images: z
    .array(z.instanceof(File))
    .min(1, { message: "Debes subir al menos una imagen" })
    .max(3, { message: "Puedes subir máximo 3 imágenes" }),
  categoryId: z.string().min(1, { message: "Debes seleccionar una categoría" }),
});

export const updateProductsSchema = z.object({
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
  maxStock: z
    .number({
      message: "El stock máximo debe ser un número",
    })
    .int(),
  images: z
    .array(z.instanceof(File))
    .max(3, { message: "Puedes subir máximo 3 imágenes" })
    .optional(),

  categoryId: z.string().min(1, { message: "Debes seleccionar una categoría" }),
});

export type CreateProductsSchema = z.infer<typeof productsSchema>;
export type UpdateProductsSchema = z.infer<typeof updateProductsSchema>;
