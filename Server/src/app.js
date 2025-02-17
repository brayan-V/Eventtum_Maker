import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();

// Middlewares
app.use(cors({
    origin:"http://localhost:5173/",
    credentials: true
})); // Configurar CORS
app.use(morgan("dev")); // Registrar solicitudes HTTP en la consola
app.use(express.json()); // Habilitar el formato JSON
app.use(cookieParser()); // Habilitar el parser de cookies

// Rutas
app.use("/api/auth", authRoutes); // Rutas de autenticación
app.use("/api/events", eventRoutes); // Rutas de eventos

// Conectar a MongoDB
connectDB();

export default app;