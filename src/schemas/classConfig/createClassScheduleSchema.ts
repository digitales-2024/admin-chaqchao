import * as z from "zod";

export const createClassScheduleSchema = z.object({
  startTime: z.string().min(1, {
    message: "La hora de inicio es obligatorio",
  }),
});

export type CreateClassScheduleSchema = z.infer<
  typeof createClassScheduleSchema
>;
