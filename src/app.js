import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middlewares
app.use(cors()); // Configurar CORS
app.use(morgan("dev")); // Registrar solicitudes HTTP en la consola
app.use(express.json()); // Habilitar el formato JSON
app.use(cookieParser()); // Habilitar el parser de cookies

// Rutas
app.use("/api/auth", authRoutes); // Rutas de autenticación

// Conectar a MongoDB
connectDB();

export default app;