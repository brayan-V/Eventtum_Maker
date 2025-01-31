import { z } from "zod";

// Validación para el nombre del evento
const nameValidation = z
  .string({
    required_error: "Event name is required",
  })
  .min(5, { message: "Event name must be at least 5 characters long" })
  .max(100, {
    message: "Event name can not exceed 100 characters",
  });
// Validación para la descripción del evento
const descriptionValidation = z
  .string({
    required_error: "Description is required",
  })
  .min(5, { message: "Description must be at least 5 characters long" })
  .max(500, {
    message: "Description can not exceed 500 characters",
  });
// Validación para la fecha del evento
const dateValidation = z.preprocess(
  (arg) =>
    typeof arg === "string" || arg instanceof String ? new Date(arg) : arg,
  z
    .date({
      required_error: "Date is required",
      invalid_type_error: "Date must be a valid Date object",
    })
    .refine((date) => date >= new Date(), {
      message: "Date must be in the future",
    })
);
// Validación para el formato de hora (HH:mm en 24 horas)
const timeValidation = z
  .string({
    required_error: "Time is required",
  })
  .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Time must be in the format HH:mm",
  });
// Validación de la ubicación del evento
const locationValidation = z
  .string({
    required_error: "Location is required",
  })
  .min(5, { message: "Location must be at least 5 characters long" })
  .max(200, {
    message: "Location can not exceed 200 characters",
  });

export const eventSchema = z.object({
  name: nameValidation,
  description: descriptionValidation,
  date: dateValidation,
  time: timeValidation,
  location: locationValidation,
});
