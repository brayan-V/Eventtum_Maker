import dotenv from "dotenv";
dotenv.config();

// Exportar variables de entorno con valores por defecto
export const {
    PORT = 3000, // Puerto del servidor
    MONGODB_URI = "mongodb://localhost:27017/eventmanager", // URL de MongoDB
    TOKEN_SECRET_KEY = "mi_clave_secreta", // Clave secreta para JWT
} = process.env;