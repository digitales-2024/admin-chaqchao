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
  birthDate: z.date({
    required_error: "Ingrese la fecha de nacimiento",
  }),
});

// Esquema para actualizar clientes (con campos opcionales)
export const updateClientsSchema = clientsSchema.partial().extend({
  id: z.string().optional(),
});

// Tipos derivados de los esquemas
export type UpdateClientsSchema = z.infer<typeof updateClientsSchema>;
