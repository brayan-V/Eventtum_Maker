import mongoose from "mongoose";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true }, // Nombre de usuario
    email: { type: String, required: true, unique: true, trim: true }, // Correo electrónico
    password: { type: String, required: true }, // Contraseña
  },
  { timestamps: true }
); // Añadir campos de creación y actualización

// Exportar el modelo de usuario
export default mongoose.model("User", userSchema);
