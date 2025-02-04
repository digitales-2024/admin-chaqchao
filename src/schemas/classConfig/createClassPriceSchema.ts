import * as z from "zod";

export const createClassPriceSchema = z.object({
  typeClass: z.string().min(1, {
    message: "El tipo de clase es obligatorio",
  }),
  classTypeUser: z.string().min(1, {
    message: "El tipo de usuario es obligatorio",
  }),
  price: z.number().min(1, {
    message: "El precio es obligatorio y debe ser mayor que 0",
  }),
  typeCurrency: z.string().min(1, {
    message: "El tipo de moneda es obligatorio",
  }),
});

export type CreateClassPriceSchema = z.infer<typeof createClassPriceSchema>;
