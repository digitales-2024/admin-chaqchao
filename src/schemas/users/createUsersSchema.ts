import * as z from "zod";

export const usersSchema = z
  .object({
    nombre: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    email: z
      .string()
      .email({ message: "Ingrese un correo electrónico válido" }),
    phone: z.string().optional(),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
    fechaNacimiento: z.date({
      required_error: "Se requiere una fecha de nacimiento",
    }),
    avatar: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type createUsersSchema = z.infer<typeof usersSchema>;

// export const updateTaskSchema = z.object({
//   title: z.string().optional(),
//   label: z.enum(users.label.enumValues).optional(),
//   status: z.enum(tasks.status.enumValues).optional(),
//   priority: z.enum(tasks.priority.enumValues).optional(),
// });

// export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
