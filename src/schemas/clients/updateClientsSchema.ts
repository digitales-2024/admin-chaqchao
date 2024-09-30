import * as z from "zod";

// Esquema base para clientes
export const clientsSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del cliente debe tener al menos 2 caracteres",
  }),
  phone: z.string().min(1, { message: "El teléfono es obligatorio" }),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Fecha de nacimiento no válida. Use el formato YYYY-MM-DD",
  }),
});

// Esquema para actualizar clientes (con campos opcionales)
export const updateClientsSchema = clientsSchema.partial().extend({
  // Opción 1: Hacer el ID opcional si no siempre lo necesitas
  id: z.string().optional(),

  // Opción 2: Aceptar tanto UUID como cualquier cadena no vacía
  // id: z.union([z.string().uuid({ message: "ID inválido" }), z.string().min(1, { message: "ID inválido" })]),
});

// Tipos derivados de los esquemas
export type UpdateClientsSchema = z.infer<typeof updateClientsSchema>;
