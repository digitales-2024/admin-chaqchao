import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const CreateClassSchema = z.object({
  typeClass: z.string().min(1, {
    message: "El tipo de clase es obligatorio",
  }),
  userName: z.string().min(1, {
    message: "El nombre de la clase es obligatorio",
  }),
  userEmail: z.string().email({
    message: "El correo electrónico es obligatorio",
  }),
  userPhone: z.string().refine(isValidPhoneNumber, {
    message: "El número de teléfono es inválido",
  }),
  scheduleClass: z.string().min(1, {
    message: "El horario de la clase es obligatorio",
  }),
  languageClass: z.string().min(1, {
    message: "El idioma de la clase es obligatorio",
  }),
  dateClass: z.date().refine(
    (value) => {
      const date = new Date(value);
      return date > new Date();
    },
    { message: "La fecha de la clase debe ser futura" },
  ),
  totalAdults: z.number().int().min(0, {
    message: "El total de adultos es obligatorio",
  }),
  totalChildren: z.number().int().min(0, {
    message: "El total de niños es obligatorio",
  }),
  totalPriceAdults: z.number().int().min(0, {
    message: "El precio total de adultos es obligatorio",
  }),
  totalPriceChildren: z.number().int().min(0, {
    message: "El precio total de niños es obligatorio",
  }),
  totalPrice: z.number().int().min(0, {
    message: "El precio total es obligatorio",
  }),
  typeCurrency: z.string().min(1, {
    message: "El tipo de moneda es obligatorio",
  }),
  comments: z.string().min(1, {
    message: "Los comentarios son obligatorios",
  }),
});

export type createClassSchema = z.infer<typeof CreateClassSchema>;
