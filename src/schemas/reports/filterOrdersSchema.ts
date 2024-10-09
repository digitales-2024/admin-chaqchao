import * as z from "zod";

export const filterOrdersSchema = z.object({
  dateRange: z
    .object({
      from: z.date().describe("Fecha de inicio"),
      to: z.date().describe("Fecha de fin"),
    })
    .optional()
    .describe("Rango de fechas"),
  orderStatus: z.string().optional().describe("Estado de la orden"),
  totalAmountMin: z.number().optional().describe("Monto total mínimo"),
  totalAmountMax: z.number().optional().describe("Monto total máximo"),
  isOrderActive: z.boolean().optional().describe("Orden activa"),
});

export type FilterOrdersSchema = z.infer<typeof filterOrdersSchema>;
