import * as z from "zod";

// Esquema base para categorías
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
  family: z.string().min(1, { message: "Debes seleccionar una familia" }),
});

// Esquema para crear categorías
export const createCategoriesSchema = categoriesSchema;

// Esquema para actualizar categorías
export const updateCategoriesSchema = categoriesSchema.extend({
  id: z.string().uuid({ message: "ID inválido" }), // No se necesita .required()
});

// Tipos derivados de los esquemas
export type CreateCategoriesSchema = z.infer<typeof createCategoriesSchema>;
export type UpdateCategoriesSchema = z.infer<typeof updateCategoriesSchema>;
