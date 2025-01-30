import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

// Función para conectar a MongoDB
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI); // Conectar a la base de datos
        console.log("MongoDB connected..."); // Mensaje de éxito
    } catch (error) {
        console.error("Error connecting to MongoDB:", error); // Mensaje de error
    }
};