import * as z from "zod";

export const categoriesSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre de la categoría debe tener al menos 2 caracteres",
  }),
  description: z
    .string()
    .max(255, {
      message: "La descripción no puede tener más de 255 caracteres",
    })
    .optional(),
});

export type CreateCategoriesSchema = z.infer<typeof categoriesSchema>;
