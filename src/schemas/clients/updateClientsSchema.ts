import { isValidPhoneNumber } from "react-phone-number-input";
import * as z from "zod";

// Esquema base para clientes
export const clientsSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del cliente debe tener al menos 2 caracteres",
  }),
  phone: z
    .string()
    .refine(isValidPhoneNumber, { message: "Número de teléfono no válido" }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Fecha de nacimiento no válida. Use el formato YYYY-MM-DD",
  }), // Validación para fecha en formato string
});

// Esquema para actualizar clientes (con campos opcionales)
export const updateClientsSchema = clientsSchema.partial().extend({
  id: z.string().optional(),
});

// Tipos derivados de los esquemas
export type UpdateClientsSchema = z.infer<typeof updateClientsSchema>;
