import { z } from "zod";

interface ClassCapacity {
  typeClass: string;
  minCapacity: number;
  maxCapacity: number;
}

export const createClassCapacitySchema: z.ZodSchema<ClassCapacity> = z
  .object({
    typeClass: z.string().min(1, {
      message: "El tipo de clase es obligatorio",
    }),
    minCapacity: z.coerce.number().min(1, {
      message: "La capacidad mínima es obligatoria",
    }),
    maxCapacity: z.coerce.number().min(1, {
      message: "La capacidad máxima es obligatoria",
    }),
  })
  .superRefine((data, context) => {
    if (data.minCapacity >= data.maxCapacity) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La capacidad mínima debe ser menor que la máxima",
        path: ["minCapacity"],
      });
    }
    if (data.maxCapacity <= data.minCapacity) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La capacidad máxima debe ser mayor que la mínima",
        path: ["maxCapacity"],
      });
    }
  });

export type CreateClassCapacitySchema = z.TypeOf<
  typeof createClassCapacitySchema
>;
