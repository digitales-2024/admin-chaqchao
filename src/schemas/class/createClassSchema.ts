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
  scheduleClass: z
    .string()
    .min(1, {
      message: "El horario de la clase es obligatorio",
    })
    .regex(
      /^(?:[01]\d|2[0-3]):[0-5]\d$/,
      "Debe ser un formato válido de hora (HH:mm)",
    ),
  languageClass: z.string().min(1, {
    message: "El idioma de la clase es obligatorio",
  }),
  dateClass: z.date({
    required_error: "Seleccione un fecha para su clase",
  }),
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
  comments: z.string().optional(),
  typeCurrency: z.string().min(1, {
    message: "El tipo de moneda es obligatorio",
  }),
  methodPayment: z.string().min(1, {
    message: "El tipo de pago es obligatorio",
  }),
});

export type createClassSchema = z.infer<typeof CreateClassSchema>;
