import * as z from "zod";

export const usersSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido" })
    .min(1, { message: "El correo electrónico es obligatorio" }),
  phone: z.string().optional(),
  password: z
    .string()
    .min(6, { message: "Debes generar una contraseña" })
    .regex(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        "La contraseña debe tener al menos una mayúscula, una minúscula y un número",
    }),
  roles: z.array(z.string()).min(1, { message: "Debes seleccionar un rol" }),
});

export type CreateUsersSchema = z.infer<typeof usersSchema>;

// export const updateTaskSchema = z.object({
//   title: z.string().optional(),
//   label: z.enum(users.label.enumValues).optional(),
//   status: z.enum(tasks.status.enumValues).optional(),
//   priority: z.enum(tasks.priority.enumValues).optional(),
// });

// export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
