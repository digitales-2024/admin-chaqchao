import * as z from "zod";

export const createClassLanguageSchema = z.object({
  languageName: z.string().min(1, {
    message: "El nombre de lenguaje es obligatorio",
  }),
});

export type CreateClassLanguageSchema = z.infer<
  typeof createClassLanguageSchema
>;
