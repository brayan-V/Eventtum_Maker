import jwt from "jsonwebtoken";
import { TOKEN_SECRET_KEY } from "../config.js";

// Middleware para verificar el token JWT
export const authRequired = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies
  if (!token) return res.status(401).json({ message: "Unauthorized" }); // Si no hay token, devolver error

  // Verificar el token
  jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" }); // Si el token es inválido, devolver error
    req.user = user; // Añadir el usuario decodificado a la solicitud
    next(); // Continuar con la siguiente función
  });
};
