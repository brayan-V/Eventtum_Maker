import app from "./app.js";
import { PORT } from "./config.js";

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});