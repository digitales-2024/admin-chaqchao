import * as z from "zod";

export const filterProductSchema = z.object({
  name: z.string().optional().describe("Nombre del producto"),
  categoryId: z.string().optional().describe("ID de la categoría"),
  priceMin: z.number().optional().describe("Precio mínimo"),
  priceMax: z.number().optional().describe("Precio máximo"),
  isRestricted: z.boolean().optional().describe("Producto restringido"),
  isAvailable: z.boolean().optional().describe("Producto disponible"),
  isProductActive: z.boolean().optional().describe("Producto activo"),
  dateRange: z
    .object({
      from: z.date().describe("Fecha de inicio"),
      to: z.date().describe("Fecha de fin"),
    })
    .optional()
    .describe("Rango de fechas"),
});

export type FilterProductSchema = z.infer<typeof filterProductSchema>;
