import * as z from "zod";

export const filterProductSchema = z.object({
  name: z.string().optional().describe("Nombre del producto"),
  categoryName: z.string().optional().describe("Nombre de la categoría"),
  priceMin: z.number().optional().describe("Precio mínimo"),
  priceMax: z.number().optional().describe("Precio máximo"),
  isRestricted: z.boolean().optional().describe("Producto restringido"),
  isAvailable: z.boolean().optional().describe("Producto disponible"),
  isProductActive: z.boolean().optional().describe("Producto activo"),
  startDate: z.string().optional().describe("Fecha de inicio"),
  endDate: z.string().optional().describe("Fecha de fin"),
});

export type FilterProductSchema = z.infer<typeof filterProductSchema>;

export const filterTopProductsSchema = z.object({
  startDate: z.string().describe("Fecha de inicio"),
  endDate: z.string().describe("Fecha de fin"),
});

export type FilterTopProductsSchema = z.infer<typeof filterTopProductsSchema>;
