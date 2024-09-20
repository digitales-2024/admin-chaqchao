import * as z from "zod";
import { categoriesSchema } from "./createCategoriesSchema"; // cambia el nombre de la importación

export const updateCategoriesSchema = categoriesSchema.extend({
  id: z.string().uuid({ message: "ID inválido" }),
});

export type UpdateCategoriesSchema = z.infer<typeof updateCategoriesSchema>;
