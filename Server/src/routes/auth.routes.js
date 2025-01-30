import { Router } from "express";
import { register, login,verifyToken  } from "../controllers/auth.controller.js";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);
// Ruta para verificar el token
router.get("/verify", verifyToken);
export default router;