import * as z from "zod";

export const filterOrdersSchema = z.object({
  startDate: z.string().optional().describe("Fecha de inicio"),
  endDate: z.string().optional().describe("Fecha de fin"),
  orderStatus: z.string().optional().describe("Estado de la orden"),
  totalAmount: z.number().optional().describe("Monto total"),
  isActive: z.boolean().optional().describe("Orden activa"),
});

export type FilterOrdersSchema = z.infer<typeof filterOrdersSchema>;
