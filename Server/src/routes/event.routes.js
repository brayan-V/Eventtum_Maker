import { Router } from "express";
import { getEvents, createEvent, updateEvent, deleteEvent } from "../controllers/events.controller.js";
import { authRequired } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta para obtener todos los eventos (con filtros opcionales)
router.get("/", authRequired, getEvents);

// Ruta para crear un nuevo evento
router.post("/", authRequired, createEvent);

// Ruta para actualizar un evento existente
router.put("/:id", authRequired, updateEvent);

// Ruta para eliminar un evento
router.delete("/:id", authRequired, deleteEvent);

export default router;