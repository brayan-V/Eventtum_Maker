import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // Usa el proxy configurado en Vite
  withCredentials: true, // Permitir el envío de cookies
});

export default instance;