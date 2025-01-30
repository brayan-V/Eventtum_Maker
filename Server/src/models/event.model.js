import mongoose from "mongoose";

// Definir el esquema del evento
const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nombre del evento
    date: { type: Date, required: true }, // Fecha del evento
    time: { type: String, required: true }, // Hora del evento
    location: { type: String, required: true }, // Ubicación del evento
    description: { type: String, required: true }, // Descripción del evento
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Relación con el usuario
  },
  { timestamps: true }
); // Añadir campos de creación y actualización

// Exportar el modelo de evento
export default mongoose.model("Event", eventSchema);
