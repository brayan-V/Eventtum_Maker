import { z } from "zod";

// Función utilitaria para validar correos electrónicos
const emailValidation = z
  .string({
    required_error: "Email is required",
  })
  .email({
    message: "Email is not valid",
  });
// Función utilitaria para validar que las contraseñas cumplan con ciertos requisitos (mínimo 6 caracteres, al menos una mayúscula, al menos una minúscula, al menos un número y al menos un carácter especial)
const passwordValidation = z
  .string({
    required_error: "Password is required",
  })
  .min(6, { message: "Password must be at least 6 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/\d/, { message: "Password must contain at least one number" })
  .regex(/[@$!%*?&-/]/, {
    message: "Password must contain at least one special character (@$!%*?&-/)",
  });
// Validamos que los datos del login sean del tipo correcto
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

// Validamos que los datos del registro sean del tipo correcto
export const registerSchema = z
  .object({
    username: z.string({
      required_error: "Username is required",
    }),
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
